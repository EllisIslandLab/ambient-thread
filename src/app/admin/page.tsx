"use client";

// Admin dashboard for Ambient Thread Foundation.
// Sign-in: Supabase magic link (signups disabled; only pre-created admin
// users exist). Data access is enforced by RLS: the leads SELECT policy
// allows only the admin emails, so this page holds no secrets — the
// publishable key below is public by design.
import { useCallback, useEffect, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";

const supabase = createClient(
  "https://iorqovbeunehkvejcquc.supabase.co",
  "sb_publishable_ZLEqxC3sYSKRho_M_tih_A_IJG-JFeH"
);

type Lead = {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  created_at: string;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function toCsv(leads: Lead[]): string {
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    [formatDate(l.created_at), l.name, l.email, l.interest, l.message].map(esc).join(",")
  );
  return ["Date,Name,Email,Interest,Message", ...rows].join("\r\n");
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Establish the session. Magic links land with tokens in the URL hash;
  // parse them manually (createBrowserClient-style PKCE detection does not
  // apply to hash tokens) and fall back to any stored session.
  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const hashError = params.get("error_description");
      if (hashError) {
        setNotice(hashError.replace(/\+/g, " "));
      }
      if (accessToken && refreshToken) {
        const { data } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (data.session) {
          window.history.replaceState(null, "", window.location.pathname);
          setSession(data.session);
          setChecking(false);
          return;
        }
      }
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setChecking(false);
    })();
  }, []);

  const loadLeads = useCallback(async () => {
    setLoadError(null);
    const { data, error } = await supabase
      .from("leads")
      .select("id, name, email, interest, message, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      setLoadError("Could not load messages. Your account may not have admin access.");
      setLeads([]);
      return;
    }
    setLeads((data as Lead[]) ?? []);
  }, []);

  useEffect(() => {
    if (session) loadLeads();
  }, [session, loadLeads]);

  async function sendLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        shouldCreateUser: false,
      },
    });
    if (error) {
      setNotice(
        "Could not send a sign-in link to that address. Only foundation admins can sign in."
      );
    } else {
      setNotice("Check your email for a sign-in link. It expires in one hour.");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setLeads(null);
  }

  function downloadCsv() {
    if (!leads?.length) return;
    const blob = new Blob([toCsv(leads)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ambient-thread-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-navy px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="" className="h-11 w-11 rounded-sm object-contain" />
            <div>
              <p className="font-display text-lg font-semibold tracking-[0.14em] text-paper">
                AMBIENT THREAD
              </p>
              <p className="eyebrow text-gold-bright">Admin Dashboard</p>
            </div>
          </div>
          {session && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-paper/60">{session.user.email}</span>
              <button
                onClick={signOut}
                className="rounded-full border border-paper/30 px-5 py-2 text-sm font-bold text-paper hover:border-gold hover:text-gold-bright"
              >
                Sign Out
              </button>
            </div>
          )}
        </header>

        {checking ? (
          <p className="mt-10 text-paper/70">Checking your session...</p>
        ) : !session ? (
          <div className="mx-auto mt-14 max-w-md">
            <h1 className="font-display text-3xl font-semibold text-paper">Admin sign-in</h1>
            <p className="mt-3 text-paper/70">
              Enter your admin email and we will send you a sign-in link.
            </p>
            <form onSubmit={sendLink} className="mt-8">
              <label htmlFor="admin-email" className="mb-2 block font-bold text-paper">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-white/20 bg-navy-raise px-4 py-3 text-paper placeholder:text-paper/40"
                placeholder="you@example.com"
              />
              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-gold px-8 py-3.5 font-bold text-navy hover:bg-gold-bright"
              >
                Send Sign-In Link
              </button>
            </form>
            {notice && (
              <p role="status" className="mt-5 text-gold-bright">
                {notice}
              </p>
            )}
          </div>
        ) : (
          <section className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="font-display text-3xl font-semibold text-paper">
                Website messages
                {leads !== null && (
                  <span className="ml-3 text-xl text-paper/50">({leads.length})</span>
                )}
              </h1>
              <div className="flex gap-3">
                <button
                  onClick={loadLeads}
                  className="rounded-full border border-paper/30 px-5 py-2 text-sm font-bold text-paper hover:border-gold hover:text-gold-bright"
                >
                  Refresh
                </button>
                <button
                  onClick={downloadCsv}
                  disabled={!leads?.length}
                  className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy hover:bg-gold-bright disabled:opacity-50"
                >
                  Download CSV
                </button>
              </div>
            </div>

            {loadError && (
              <p role="alert" className="mt-6 rounded-md border border-gold/40 bg-navy-raise p-4 text-gold-bright">
                {loadError}
              </p>
            )}

            {leads !== null && leads.length === 0 && !loadError && (
              <p className="mt-10 text-paper/70">
                No messages yet. When someone submits the contact form, it will appear here.
              </p>
            )}

            <ul className="mt-8 space-y-4">
              {(leads ?? []).map((lead) => (
                <li key={lead.id} className="rounded-lg bg-navy-raise p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-paper">
                      {lead.name}
                      <a
                        href={`mailto:${lead.email}`}
                        className="ml-3 font-normal text-gold-bright underline underline-offset-4"
                      >
                        {lead.email}
                      </a>
                    </p>
                    <p className="text-sm text-paper/50">{formatDate(lead.created_at)}</p>
                  </div>
                  <p className="eyebrow mt-3 text-gold-bright">{lead.interest}</p>
                  <p className="mt-2 whitespace-pre-wrap text-paper/85">{lead.message}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
