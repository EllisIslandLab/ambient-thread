// Contact-form intake for ambientthread.org.
// Public endpoint (verify_jwt off): validation, honeypot, and per-IP rate
// limiting happen here; the leads table itself grants no API access at all,
// so this function's service role is the only write path.
import { createClient } from "npm:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  });
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const ALLOWED_INTERESTS = new Set([
  "Just saying hello",
  "Volunteering",
  "Sharing my story",
  "Pro-bono skills",
  "Partnership or introduction",
  "Donation question",
  "Board, committee, or internship",
]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_json" }, 400);
  }

  // Honeypot: hidden field real users never see. Bots that fill it get a
  // quiet success so they don't adapt.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const rawInterest = typeof body.interest === "string" ? body.interest.trim() : "";
  const interest = ALLOWED_INTERESTS.has(rawInterest) ? rawInterest : "Just saying hello";

  const emailOk = email.length > 0 && email.length <= 320 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!name || name.length > 200 || !emailOk || !message || message.length > 5000) {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = await sha256Hex(ip);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  // Rate limit: at most 5 submissions per IP per hour.
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error: countError } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", oneHourAgo);
  if (countError) return json({ ok: false, error: "db" }, 500);
  if ((count ?? 0) >= 5) return json({ ok: false, error: "rate_limited" }, 429);

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    interest,
    message,
    ip_hash: ipHash,
  });
  if (error) return json({ ok: false, error: "db" }, 500);

  // Notify the foundation inbox. Best-effort: a mail hiccup must never fail
  // the submission (the lead is already safe in the database).
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
          // Resend sits behind Cloudflare, which rejects default non-browser agents.
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
        },
        body: JSON.stringify({
          from: "Ambient Thread Website <admin@ambientthread.org>",
          to: ["AmbientThread@gmail.com"],
          reply_to: email,
          subject: `New website message: ${interest} (${name})`,
          text: `${message}\n\nFrom: ${name}\nEmail: ${email}\nInterested in: ${interest}\n\nView all messages: https://ambient-thread.vercel.app/admin`,
        }),
      });
    } catch {
      /* lead is stored; notification failure is non-fatal */
    }
  }

  return json({ ok: true });
});
