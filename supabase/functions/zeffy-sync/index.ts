// Mirrors Zeffy payments into public.donations so the admin dashboard can
// show donors alongside website leads. Read-only against Zeffy; idempotent
// upserts locally. Runs on a daily schedule (pg_cron) and on demand from the
// admin dashboard's Sync button. ZEFFY_API_KEY lives in edge function secrets.
import { createClient } from "npm:@supabase/supabase-js@2";

const ZEFFY_BASE = "https://api.zeffy.com/api/v1";
// Zeffy sits behind Cloudflare, which rejects default non-browser agents.
const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36";

type ZeffyPayment = {
  id: string;
  created: number;
  amount: number;
  eligible_amount: number | null;
  currency: string;
  status: string | null;
  refund_status: string | null;
  description: string | null;
  campaign_type: string | null;
  campaign_category: string | null;
  receipt_url: string | null;
  buyer: {
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    company_name: string | null;
  } | null;
};

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  const zeffyKey = Deno.env.get("ZEFFY_API_KEY");
  if (!zeffyKey) {
    return new Response(JSON.stringify({ ok: false, error: "no_zeffy_key" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  let cursor: string | null = null;
  let pages = 0;
  let upserted = 0;

  try {
    do {
      const url = new URL(`${ZEFFY_BASE}/payments`);
      url.searchParams.set("limit", "100");
      if (cursor) url.searchParams.set("starting_after", cursor);

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${zeffyKey}`,
          Accept: "application/json",
          "User-Agent": UA,
        },
      });
      if (!res.ok) {
        return new Response(
          JSON.stringify({ ok: false, error: "zeffy_http_" + res.status, pages, upserted }),
          { status: 502, headers: { "content-type": "application/json" } },
        );
      }
      const body = await res.json();
      const payments: ZeffyPayment[] = body.data ?? [];

      if (payments.length > 0) {
        const rows = payments.map((p) => ({
          id: p.id,
          created_at: new Date(p.created * 1000).toISOString(),
          amount_cents: p.amount,
          eligible_amount_cents: p.eligible_amount,
          currency: p.currency ?? "usd",
          status: p.status,
          refund_status: p.refund_status,
          donor_email: p.buyer?.email?.toLowerCase() ?? null,
          donor_first_name: p.buyer?.first_name ?? null,
          donor_last_name: p.buyer?.last_name ?? null,
          company_name: p.buyer?.company_name ?? null,
          campaign_type: p.campaign_type,
          campaign_category: p.campaign_category,
          description: p.description,
          receipt_url: p.receipt_url,
          raw: p,
          synced_at: new Date().toISOString(),
        }));
        const { error } = await supabase.from("donations").upsert(rows, { onConflict: "id" });
        if (error) {
          return new Response(
            JSON.stringify({ ok: false, error: "db_upsert", pages, upserted }),
            { status: 500, headers: { "content-type": "application/json" } },
          );
        }
        upserted += rows.length;
      }

      cursor = body.has_more ? (body.next_cursor as string) : null;
      pages += 1;
    } while (cursor && pages < 50);
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "sync_failed", pages, upserted }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, pages, upserted }), {
    headers: { "content-type": "application/json" },
  });
});
