import { Nav, Footer } from "@/components/SiteChrome";

export type LegalSection = { heading: string; body: React.ReactNode };

// Shared layout for the Privacy Policy and Terms of Use: same navy page, eyebrow and
// display heading as the Partners page, readable measure for long text.
export function LegalPage({ eyebrow, title, updated, intro, sections }: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <Nav />
      <main className="bg-navy pt-24">
        <article className="mx-auto max-w-3xl px-5 pb-24 pt-14 sm:px-8">
          <p className="eyebrow mb-5 text-gold-bright">{eyebrow}</p>
          <h1 className="font-display text-5xl font-semibold text-paper sm:text-6xl">{title}</h1>
          <p className="mt-4 text-sm text-paper/55">Last updated {updated}</p>
          <div className="mt-8 text-lg leading-relaxed text-paper/80">{intro}</div>
          <div className="mt-12 space-y-10">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">{s.heading}</h2>
                <div className="legal-body mt-4 space-y-4 leading-relaxed text-paper/80">{s.body}</div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
