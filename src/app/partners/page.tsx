import type { Metadata } from "next";
import { Nav, Footer } from "@/components/SiteChrome";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners | Ambient Thread Foundation",
  description:
    "The partners and supporters helping the Ambient Thread Foundation build accessible, personalized listening tools for the sound-sensitive community.",
  alternates: {
    canonical: `${SITE_URL}/partners`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/partners`,
    siteName: "Ambient Thread Foundation",
    title: "Partners | Ambient Thread Foundation",
    description:
      "The partners and supporters helping the Ambient Thread Foundation build accessible, personalized listening tools for the sound-sensitive community.",
    locale: "en_US",
  },
};

const PARTNERS = [
  {
    name: "Web Launch Academy",
    role: "Website Design, Development & Technology",
    url: "https://www.weblaunchacademy.com",
    urlLabel: "weblaunchacademy.com",
    email: "hello@weblaunchacademy.com",
    description:
      "Web Launch Academy designed and built this website from the ground up: custom-coded, accessibility-first, and fully owned by the foundation rather than rented from a website builder. They also engineered the systems behind it, from secure contact handling to the tools our team uses every day. If you want to build, launch, and truly own your own digital assets, we highly recommend checking them out.",
  },
  {
    name: "Zeffy",
    role: "Donation Processing",
    url: "https://www.zeffy.com",
    urlLabel: "zeffy.com",
    email: null,
    description:
      "Zeffy processes our online donations with zero platform or processing fees, which means 100% of every gift goes directly to our mission.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <Nav />
      <main className="bg-navy pt-24">
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 lg:pb-28">
          <p className="eyebrow mb-5 text-gold-bright">Better Together</p>
          <h1 className="font-display max-w-3xl text-5xl font-semibold text-paper sm:text-6xl">
            Our partners.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-paper/80">
            Building a more accessible world is not a solo project. These are the partners
            whose work and generosity help carry the thread, and we are glad to recognize
            them here.
          </p>

          <div className="mt-14 space-y-8">
            {PARTNERS.map((p) => (
              <article key={p.name} className="rounded-lg bg-navy-raise p-8 sm:p-10">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-display text-3xl font-semibold text-paper">{p.name}</h2>
                  <p className="eyebrow text-gold-bright">{p.role}</p>
                </div>
                <p className="mt-5 max-w-3xl leading-relaxed text-paper/80">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-gold-bright underline underline-offset-4 hover:text-gold"
                  >
                    {p.urlLabel}
                  </a>
                  {p.email && (
                    <a
                      href={`mailto:${p.email}`}
                      className="font-bold text-gold-bright underline underline-offset-4 hover:text-gold"
                    >
                      {p.email}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-navy-deep">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
                  Become a partner.
                </h2>
                <p className="mt-4 text-paper/75">
                  We are building relationships with accessibility advocates, audio and
                  technology professionals, community organizations, and potential
                  collaborators. If your organization shares our vision, we would love to
                  talk.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:AmbientThread@gmail.com"
                  className="rounded-full bg-gold px-8 py-3.5 font-bold text-navy transition-colors duration-200 hover:bg-gold-bright"
                >
                  Email Us
                </a>
                <a
                  href="/#involved"
                  className="rounded-full border border-paper/30 px-8 py-3.5 font-bold text-paper transition-colors duration-200 hover:border-gold hover:text-gold-bright"
                >
                  Ways to Get Involved
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
