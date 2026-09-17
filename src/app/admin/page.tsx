"use client";

// Admin console for Ambient Thread Foundation.
// Auth: Supabase magic link (signups disabled; two pre-created admins).
// Access control is enforced by RLS on every table this page reads, so the
// page itself holds no secrets; the publishable key below is public by design.
import { Fragment, useCallback, useEffect, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";

const supabase = createClient(
  "https://iorqovbeunehkvejcquc.supabase.co",
  "sb_publishable_ZLEqxC3sYSKRho_M_tih_A_IJG-JFeH"
);

/* --------------------------------- Types ----------------------------------- */

type Lead = {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  created_at: string;
};

type Donation = {
  id: string;
  created_at: string;
  amount_cents: number;
  currency: string;
  status: string | null;
  refund_status: string | null;
  donor_email: string | null;
  donor_first_name: string | null;
  donor_last_name: string | null;
  company_name: string | null;
  receipt_url: string | null;
};

type SecureNote = {
  id: string;
  label: string;
  value: string;
  created_by: string;
  created_at: string;
};

type Tab = "messages" | "donations" | "notes" | "dns";

/* DNS records for pointing ambientthread.org at the new website (Vercel).
   Read from the Vercel project's own config; the values are stable. */
const DNS_WEBSITE_RECORDS = [
  { type: "A", name: "@", value: "216.198.79.1", note: "the domain itself" },
  { type: "A", name: "@", value: "64.29.17.1", note: "the domain itself, second address" },
  { type: "CNAME", name: "www", value: "07ba9b6183ee63a2.vercel-dns-017.com", note: "the www version" },
];

/* -------------------------------- Helpers ---------------------------------- */

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function money(cents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

function donorName(d: Donation): string {
  return (
    `${d.donor_first_name ?? ""} ${d.donor_last_name ?? ""}`.trim() || d.company_name || "Anonymous"
  );
}

function downloadCsv(filename: string, header: string, rows: string[][]) {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const csv = [header, ...rows.map((r) => r.map(esc).join(","))].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ------------------------------ Small pieces -------------------------------- */

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="border-l-2 border-gold/60 pl-4">
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-paper/50">{label}</p>
      <p className="font-display mt-1 text-3xl font-semibold text-paper [font-variant-numeric:tabular-nums]">
        {value}
      </p>
      {hint && <p className="mt-0.5 text-xs text-paper/45">{hint}</p>}
    </div>
  );
}

function GhostButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-paper/25 px-4 py-1.5 text-sm font-bold text-paper transition-colors duration-150 hover:border-gold hover:text-gold-bright active:translate-y-px disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function GoldButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-navy transition-colors duration-150 hover:bg-gold-bright active:translate-y-px disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function CopyField({ value, mono = true }: { value: string; mono?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <span className="inline-flex max-w-full items-center gap-2">
      <code
        className={`truncate rounded bg-navy-deep px-2 py-1 text-[0.82rem] text-paper/85 ${mono ? "font-mono" : ""}`}
      >
        {value}
      </code>
      <button
        type="button"
        aria-label={`Copy ${value}`}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            /* clipboard unavailable: the value is selectable text */
          }
        }}
        className="shrink-0 rounded-full border border-paper/25 px-2.5 py-1 text-[0.7rem] font-bold text-paper/70 transition-colors duration-150 hover:border-gold hover:text-gold-bright active:translate-y-px"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-10 rounded-lg border border-dashed border-paper/20 px-6 py-12 text-center">
      <p className="font-display text-xl font-semibold text-paper/80">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-paper/55">{body}</p>
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="mt-8 space-y-2" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-11 animate-pulse rounded-md bg-navy-raise" style={{ opacity: 1 - i * 0.25 }} />
      ))}
    </div>
  );
}

/* ---------------------------------- Page ------------------------------------ */

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("messages");

  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [leadsError, setLeadsError] = useState<string | null>(null);
  const [openLead, setOpenLead] = useState<string | null>(null);

  const [donations, setDonations] = useState<Donation[] | null>(null);
  const [donationsError, setDonationsError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const [notes, setNotes] = useState<SecureNote[] | null>(null);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [noteLabel, setNoteLabel] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [noteStatus, setNoteStatus] = useState<string | null>(null);

  /* Session bootstrap: magic links land with tokens in the URL hash. */
  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const hashError = params.get("error_description");
      if (hashError) setNotice(hashError.replace(/\+/g, " "));
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
    setLeadsError(null);
    const { data, error } = await supabase
      .from("leads")
      .select("id, name, email, interest, message, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      setLeadsError("Could not load messages. Your account may not have admin access.");
      setLeads([]);
      return;
    }
    setLeads((data as Lead[]) ?? []);
  }, []);

  const loadDonations = useCallback(async () => {
    setDonationsError(null);
    const { data, error } = await supabase
      .from("donations")
      .select(
        "id, created_at, amount_cents, currency, status, refund_status, donor_email, donor_first_name, donor_last_name, company_name, receipt_url"
      )
      .order("created_at", { ascending: false });
    if (error) {
      setDonationsError("Could not load donations. Your account may not have admin access.");
      setDonations([]);
      return;
    }
    setDonations((data as Donation[]) ?? []);
  }, []);

  const loadNotes = useCallback(async () => {
    const { data, error } = await supabase
      .from("secure_notes")
      .select("id, label, value, created_by, created_at")
      .order("created_at", { ascending: false });
    if (!error) setNotes((data as SecureNote[]) ?? []);
  }, []);

  useEffect(() => {
    if (session) {
      loadLeads();
      loadDonations();
      loadNotes();
    }
  }, [session, loadLeads, loadDonations, loadNotes]);

  async function sendLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/admin`, shouldCreateUser: false },
    });
    setNotice(
      error
        ? "Could not send a sign-in link to that address. Only foundation admins can sign in."
        : "Check your email for a sign-in link. It expires in one hour."
    );
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setLeads(null);
    setDonations(null);
    setNotes(null);
  }

  async function syncDonations() {
    if (!session) return;
    setSyncing(true);
    try {
      await fetch("https://iorqovbeunehkvejcquc.supabase.co/functions/v1/zeffy-sync", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      await loadDonations();
    } finally {
      setSyncing(false);
    }
  }

  async function addNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session?.user.email) return;
    setNoteStatus(null);
    const { error } = await supabase.from("secure_notes").insert({
      label: noteLabel.trim(),
      value: noteValue,
      created_by: session.user.email,
    });
    if (error) {
      setNoteStatus("Could not save that note.");
      return;
    }
    setNoteLabel("");
    setNoteValue("");
    setNoteStatus("Saved. Only the two admins can see it.");
    loadNotes();
  }

  async function deleteNote(id: string) {
    await supabase.from("secure_notes").delete().eq("id", id);
    loadNotes();
  }

  async function copyNote(value: string, id: string) {
    try {
      await navigator.clipboard.writeText(value);
      setNoteStatus("Copied to clipboard.");
    } catch {
      setRevealed((r) => ({ ...r, [id]: true }));
    }
  }

  const totalCents = (donations ?? [])
    .filter((d) => !d.refund_status || d.refund_status === "none")
    .reduce((sum, d) => sum + d.amount_cents, 0);

  const TABS: { id: Tab; label: string; count: number | null }[] = [
    { id: "messages", label: "Messages", count: leads?.length ?? null },
    { id: "donations", label: "Donations", count: donations?.length ?? null },
    { id: "notes", label: "Secure Notes", count: notes?.length ?? null },
    { id: "dns", label: "DNS Setup", count: null },
  ];

  return (
    <main className="min-h-[100dvh] bg-navy px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 pb-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="" className="h-10 w-10 rounded-sm object-contain" />
            <div>
              <p className="font-display text-base font-semibold tracking-[0.14em] text-paper">
                AMBIENT THREAD
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-bright">Admin</p>
            </div>
          </div>
          {session && (
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-paper/55 sm:inline">{session.user.email}</span>
              <GhostButton onClick={signOut}>Sign Out</GhostButton>
            </div>
          )}
        </header>

        {checking ? (
          <LoadingRows />
        ) : !session ? (
          /* ------------------------------ Sign-in ------------------------------ */
          <div className="mx-auto mt-12 max-w-md">
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
                className="mt-6 w-full rounded-full bg-gold px-8 py-3.5 font-bold text-navy transition-colors duration-150 hover:bg-gold-bright active:translate-y-px"
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
          <>
            {/* Stats */}
            <section aria-label="Overview" className="grid grid-cols-1 gap-6 border-y border-white/10 py-6 sm:grid-cols-3">
              <Stat
                label="Total raised"
                value={donations === null ? "..." : money(totalCents)}
                hint="via Zeffy, refunds excluded"
              />
              <Stat
                label="Gifts"
                value={donations === null ? "..." : String(donations.length)}
                hint="synced daily each morning"
              />
              <Stat
                label="Messages"
                value={leads === null ? "..." : String(leads.length)}
                hint="from the website contact form"
              />
            </section>

            {/* Tabs */}
            <div role="tablist" aria-label="Admin sections" className="mt-8 flex gap-1 border-b border-white/10">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-bold transition-colors duration-150 ${
                    tab === t.id
                      ? "border-gold text-gold-bright"
                      : "border-transparent text-paper/60 hover:text-paper"
                  }`}
                >
                  {t.label}
                  {t.count !== null && t.count > 0 && (
                    <span className="ml-2 rounded-full bg-navy-raise px-2 py-0.5 text-xs font-bold text-paper/60 [font-variant-numeric:tabular-nums]">
                      {t.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* ------------------------------ Messages ----------------------------- */}
            {tab === "messages" && (
              <section role="tabpanel" aria-label="Messages">
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-paper/55">
                    Contact-form submissions, newest first. Select a row to read the full message.
                  </p>
                  <div className="flex gap-2">
                    <GhostButton onClick={loadLeads}>Refresh</GhostButton>
                    <GoldButton
                      onClick={() =>
                        leads?.length &&
                        downloadCsv(
                          `ambient-thread-messages-${new Date().toISOString().slice(0, 10)}.csv`,
                          "Date,Name,Email,Interest,Message",
                          leads.map((l) => [formatDate(l.created_at), l.name, l.email, l.interest, l.message])
                        )
                      }
                      disabled={!leads?.length}
                    >
                      Download CSV
                    </GoldButton>
                  </div>
                </div>

                {leadsError && (
                  <p role="alert" className="mt-6 rounded-md border border-gold/40 bg-navy-raise p-4 text-gold-bright">
                    {leadsError}
                  </p>
                )}

                {leads === null ? (
                  <LoadingRows />
                ) : leads.length === 0 && !leadsError ? (
                  <EmptyState
                    title="No messages yet"
                    body="When someone submits the contact form on the website, it will appear here and stay even after you read it."
                  />
                ) : (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[640px] text-left text-sm">
                      <thead>
                        <tr className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-paper/45">
                          <th scope="col" className="py-3 pr-4 font-bold">Date</th>
                          <th scope="col" className="py-3 pr-4 font-bold">Name</th>
                          <th scope="col" className="py-3 pr-4 font-bold">Email</th>
                          <th scope="col" className="py-3 pr-4 font-bold">Interest</th>
                          <th scope="col" className="py-3 font-bold">Message</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {leads.map((l) => (
                          <Fragment key={l.id}>
                            <tr
                              onClick={() => setOpenLead(openLead === l.id ? null : l.id)}
                              className="cursor-pointer align-top transition-colors duration-150 hover:bg-navy-raise/60"
                            >
                              <td className="whitespace-nowrap py-3 pr-4 text-paper/55 [font-variant-numeric:tabular-nums]">
                                {formatDay(l.created_at)}
                              </td>
                              <td className="py-3 pr-4 font-bold text-paper">{l.name}</td>
                              <td className="py-3 pr-4">
                                <a
                                  href={`mailto:${l.email}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-gold-bright underline-offset-4 hover:underline"
                                >
                                  {l.email}
                                </a>
                              </td>
                              <td className="py-3 pr-4 text-paper/70">{l.interest}</td>
                              <td className="max-w-[280px] py-3 text-paper/70">
                                {openLead === l.id ? (
                                  <span className="text-xs font-bold text-gold-bright">shown below</span>
                                ) : (
                                  <span className="line-clamp-1">{l.message}</span>
                                )}
                              </td>
                            </tr>
                            {openLead === l.id && (
                              <tr className="bg-navy-raise/40">
                                <td colSpan={5} className="px-4 py-4">
                                  <p className="whitespace-pre-wrap text-paper/85">{l.message}</p>
                                  <p className="mt-3 text-xs text-paper/45">
                                    Received {formatDate(l.created_at)}
                                  </p>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}

            {/* ----------------------------- Donations ----------------------------- */}
            {tab === "donations" && (
              <section role="tabpanel" aria-label="Donations">
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-paper/55">
                    Mirrored from Zeffy automatically every morning.
                  </p>
                  <div className="flex gap-2">
                    <GhostButton onClick={syncDonations} disabled={syncing}>
                      {syncing ? "Syncing..." : "Sync from Zeffy"}
                    </GhostButton>
                    <GoldButton
                      onClick={() =>
                        donations?.length &&
                        downloadCsv(
                          `ambient-thread-donations-${new Date().toISOString().slice(0, 10)}.csv`,
                          "Date,Donor,Email,Company,Amount,Currency,Status,Refund Status",
                          donations.map((d) => [
                            formatDate(d.created_at),
                            donorName(d),
                            d.donor_email ?? "",
                            d.company_name ?? "",
                            (d.amount_cents / 100).toFixed(2),
                            d.currency.toUpperCase(),
                            d.status ?? "",
                            d.refund_status ?? "",
                          ])
                        )
                      }
                      disabled={!donations?.length}
                    >
                      Download CSV
                    </GoldButton>
                  </div>
                </div>

                {donationsError && (
                  <p role="alert" className="mt-6 rounded-md border border-gold/40 bg-navy-raise p-4 text-gold-bright">
                    {donationsError}
                  </p>
                )}

                {donations === null ? (
                  <LoadingRows />
                ) : donations.length === 0 && !donationsError ? (
                  <EmptyState
                    title="No donations synced yet"
                    body="Gifts made on the Zeffy donation page land here automatically. Use Sync from Zeffy to pull the latest right now."
                  />
                ) : (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[640px] text-left text-sm">
                      <thead>
                        <tr className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-paper/45">
                          <th scope="col" className="py-3 pr-4 font-bold">Date</th>
                          <th scope="col" className="py-3 pr-4 font-bold">Donor</th>
                          <th scope="col" className="py-3 pr-4 font-bold">Email</th>
                          <th scope="col" className="py-3 pr-4 text-right font-bold">Amount</th>
                          <th scope="col" className="py-3 pr-4 font-bold">Status</th>
                          <th scope="col" className="py-3 font-bold">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {donations.map((d) => (
                          <tr key={d.id} className="align-top">
                            <td className="whitespace-nowrap py-3 pr-4 text-paper/55 [font-variant-numeric:tabular-nums]">
                              {formatDay(d.created_at)}
                            </td>
                            <td className="py-3 pr-4 font-bold text-paper">{donorName(d)}</td>
                            <td className="py-3 pr-4">
                              {d.donor_email ? (
                                <a
                                  href={`mailto:${d.donor_email}`}
                                  className="text-gold-bright underline-offset-4 hover:underline"
                                >
                                  {d.donor_email}
                                </a>
                              ) : (
                                <span className="text-paper/40">none</span>
                              )}
                            </td>
                            <td className="whitespace-nowrap py-3 pr-4 text-right font-bold text-gold-bright [font-variant-numeric:tabular-nums]">
                              {money(d.amount_cents, d.currency)}
                            </td>
                            <td className="py-3 pr-4 text-paper/70">
                              {d.status ?? ""}
                              {d.refund_status && d.refund_status !== "none" && (
                                <span className="ml-2 font-bold text-gold-bright">
                                  refund: {d.refund_status}
                                </span>
                              )}
                            </td>
                            <td className="py-3">
                              {d.receipt_url ? (
                                <a
                                  href={d.receipt_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-paper/60 underline underline-offset-4 hover:text-gold-bright"
                                >
                                  View
                                </a>
                              ) : (
                                <span className="text-paper/40">none</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}

            {/* ----------------------------- DNS Setup ------------------------------ */}
            {tab === "dns" && (
              <section role="tabpanel" aria-label="DNS setup">
                <p className="mt-6 max-w-2xl text-sm text-paper/55">
                  The records below get added at Northwest Registered Agent (log in, open
                  ambientthread.org, then DNS Records). Use the copy buttons so nothing is
                  mistyped. Leave TTL at its default on every record.
                </p>

                <div className="mt-6 rounded-md border border-gold/40 bg-navy-raise p-4">
                  <p className="text-sm text-paper/80">
                    <span className="font-bold text-gold-bright">Hold off on this section: </span>
                    these website records go in during our Zoom call, after final testing. The
                    moment they are added, the new website replaces the old one.
                  </p>
                </div>

                <h2 className="font-display mt-8 text-xl font-semibold text-paper">
                  Website records (for the call)
                </h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead>
                      <tr className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-paper/45">
                        <th scope="col" className="py-3 pr-4 font-bold">Type</th>
                        <th scope="col" className="py-3 pr-4 font-bold">Name</th>
                        <th scope="col" className="py-3 pr-4 font-bold">Value</th>
                        <th scope="col" className="py-3 font-bold">What it covers</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {DNS_WEBSITE_RECORDS.map((r, i) => (
                        <tr key={i} className="align-middle">
                          <td className="py-3 pr-4 font-bold text-paper">{r.type}</td>
                          <td className="py-3 pr-4">
                            <CopyField value={r.name} />
                          </td>
                          <td className="max-w-[300px] py-3 pr-4">
                            <CopyField value={r.value} />
                          </td>
                          <td className="py-3 text-paper/55">{r.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-paper/55">
                  If Northwest will not accept @ as the Name, leave the Name field empty
                  instead; both mean the domain itself. The old records currently pointing @
                  and www at the WordPress host get deleted at the same time (we will identify
                  those together).
                </p>

                <h2 className="font-display mt-10 text-xl font-semibold text-paper">
                  Email records (Resend)
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-paper/55">
                  These are unique to your Resend account, so they are not listed here: find
                  them in Resend under Domains, then click ambientthread.org. Copy each one
                  from that page into Northwest the same way. These are safe to add anytime;
                  they do not affect the current website.
                </p>
                <div className="mt-4 rounded-md bg-navy-raise p-4">
                  <p className="text-sm text-paper/80">
                    <span className="font-bold text-gold-bright">One quirk at Northwest: </span>
                    enter each Name without the ambientthread.org ending. So
                    &ldquo;send.ambientthread.org&rdquo; becomes just{" "}
                    <code className="rounded bg-navy-deep px-1.5 py-0.5 font-mono text-[0.82rem]">send</code>
                    , and &ldquo;resend._domainkey.ambientthread.org&rdquo; becomes{" "}
                    <code className="rounded bg-navy-deep px-1.5 py-0.5 font-mono text-[0.82rem]">resend._domainkey</code>
                    . The MX record also asks for a Priority: use the number Resend shows.
                  </p>
                </div>
              </section>
            )}

            {/* ---------------------------- Secure Notes ---------------------------- */}
            {tab === "notes" && (
              <section role="tabpanel" aria-label="Secure notes">
                <p className="mt-6 max-w-2xl text-sm text-paper/55">
                  A private channel between the two site admins for passing API keys and
                  credentials. Nothing here travels by email or text. Delete each note once the
                  other admin has picked it up.
                </p>

                <form onSubmit={addNote} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="note-label" className="mb-2 block text-sm font-bold text-paper">
                      Label
                    </label>
                    <input
                      id="note-label"
                      required
                      maxLength={200}
                      value={noteLabel}
                      onChange={(e) => setNoteLabel(e.target.value)}
                      className="w-full rounded-md border border-white/20 bg-navy-raise px-4 py-2.5 text-sm text-paper placeholder:text-paper/40"
                      placeholder="e.g. Resend API key"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="note-value" className="mb-2 block text-sm font-bold text-paper">
                      Secret
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="note-value"
                        required
                        maxLength={10000}
                        value={noteValue}
                        onChange={(e) => setNoteValue(e.target.value)}
                        autoComplete="off"
                        className="w-full rounded-md border border-white/20 bg-navy-raise px-4 py-2.5 font-mono text-sm text-paper placeholder:font-body placeholder:text-paper/40"
                        placeholder="Paste the key or credential here"
                      />
                      <GoldButton type="submit">Save</GoldButton>
                    </div>
                  </div>
                </form>
                {noteStatus && (
                  <p role="status" className="mt-3 text-sm text-gold-bright">
                    {noteStatus}
                  </p>
                )}

                {notes === null ? (
                  <LoadingRows />
                ) : notes.length === 0 ? (
                  <EmptyState
                    title="No notes right now"
                    body="Notes are meant to be short-lived. Save one here, let the other admin copy it, then delete it."
                  />
                ) : (
                  <ul className="mt-6 divide-y divide-white/[0.06]">
                    {notes.map((note) => (
                      <li key={note.id} className="py-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-bold text-paper">{note.label}</p>
                            <p className="text-xs text-paper/45">
                              from {note.created_by}, {formatDay(note.created_at)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <GhostButton
                              onClick={() => setRevealed((r) => ({ ...r, [note.id]: !r[note.id] }))}
                            >
                              {revealed[note.id] ? "Hide" : "Reveal"}
                            </GhostButton>
                            <GhostButton onClick={() => copyNote(note.value, note.id)}>Copy</GhostButton>
                            <GoldButton onClick={() => deleteNote(note.id)}>Delete</GoldButton>
                          </div>
                        </div>
                        {revealed[note.id] && (
                          <p className="mt-3 break-all rounded-md bg-navy-deep p-3 font-mono text-sm text-gold-bright">
                            {note.value}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
