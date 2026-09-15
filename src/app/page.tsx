"use client";

import { useEffect, useRef, useState } from "react";

/* ----------------------------------------------------------------------------
   Ambient Thread Foundation
   Concept: "a quieter world." Stillness as design language. Navy and gold from
   the foundation's own logo; the flowing thread from the mark recurs as the
   site's single decorative motif. All copy sourced from the foundation's own
   published material.
---------------------------------------------------------------------------- */

/* ------------------------------- Icons (SVG) ------------------------------ */

function IconEar({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8.5a6 6 0 1 1 12 0c0 3-2 4-3.2 5.6-.9 1.2-.8 2.4-1.3 3.9a3 3 0 0 1-5.6-.5" />
      <path d="M9.5 8.5a2.5 2.5 0 0 1 5 0c0 1.6-1.2 2.2-2 3.2" />
    </svg>
  );
}

function IconSliders({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M5 4v6M5 14v6M12 4v10M12 18v2M19 4v2M19 10v10" />
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="16" r="2" />
      <circle cx="19" cy="8" r="2" />
    </svg>
  );
}

function IconConversation({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3.5V6z" />
      <path d="M19 9h1a2 2 0 0 1 2 2v9l-3.5-2.5H13" />
    </svg>
  );
}

function IconCompass({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 5-4.8 2 2.2-5 4.8-2z" />
    </svg>
  );
}

function IconHeadphones({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
    </svg>
  );
}

function IconHeart({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.5s-7.5-4.6-9.3-9A5.2 5.2 0 0 1 12 6.9a5.2 5.2 0 0 1 9.3 4.6c-1.8 4.4-9.3 9-9.3 9z" />
    </svg>
  );
}

function IconMail({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconPhone({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function IconInstagram({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* --------------------------- Decorative thread ---------------------------- */

function ThreadDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${flip ? "rotate-180" : ""}`}>
      <svg viewBox="0 0 1440 90" fill="none" className="w-full" preserveAspectRatio="none">
        <path
          d="M0 60 C 220 20, 380 85, 560 55 C 720 28, 800 70, 960 52 C 1140 32, 1280 68, 1440 40"
          stroke="#D0B040"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />
        <circle cx="960" cy="52" r="2.5" fill="#D0B040" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

/* ------------------------------- Navigation -------------------------------- */

const NAV_LINKS = [
  { href: "#mission", label: "Mission" },
  { href: "#story", label: "Our Story" },
  { href: "#app", label: "The App" },
  { href: "#involved", label: "Get Involved" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const DONATE_URL = "https://www.zeffy.com/en-US/donation-form/donate-to-pay-our-developer-and-backend-support";

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur-md">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt="" className="h-11 w-11 rounded-sm object-contain" />
          <span className="font-display text-lg font-semibold tracking-[0.14em] text-paper">
            AMBIENT THREAD
            <span className="block text-[0.62rem] font-normal tracking-[0.3em] text-gold-bright">FOUNDATION</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.95rem] text-paper/85 transition-colors duration-200 hover:text-gold-bright">
              {l.label}
            </a>
          ))}
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-6 py-2 text-[0.95rem] font-bold text-navy transition-colors duration-200 hover:bg-gold-bright"
          >
            Donate
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-paper lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-navy px-5 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block rounded-md px-3 py-3 text-lg text-paper/90 hover:bg-white/5 hover:text-gold-bright" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-3">
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-gold px-5 py-3 text-center font-bold text-navy"
                onClick={() => setOpen(false)}
              >
                Donate
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------- Hero ----------------------------------- */

function Hero({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  return (
    <section ref={heroRef} id="top" className="relative flex min-h-[92svh] flex-col overflow-hidden bg-navy pt-24">
      {/* The lotus mark, blooming quietly out of the right edge. Its background
          is the exact same navy as the page, so it sits seamlessly. */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-1/2 hidden w-[520px] -translate-y-1/2 select-none md:block lg:w-[620px]">
        <img src="/images/lotus-mark.webp" alt="" className="w-full" />
      </div>

      {/* Faint full-width thread behind the headline */}
      <svg aria-hidden="true" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-1/3 h-[400px] w-full select-none opacity-40">
        <path
          className="thread-line"
          d="M-20 300 C 240 180, 420 330, 640 250 C 830 180, 950 280, 1120 220 C 1260 170, 1360 230, 1460 190"
          stroke="#D0B040"
          strokeWidth="1.2"
          strokeDasharray="6 6"
        />
      </svg>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-20 pt-10 sm:px-8">
        <p className="eyebrow mb-6 text-gold-bright">A Nonprofit Foundation</p>

        <h1 className="font-display max-w-3xl text-5xl font-semibold text-paper sm:text-6xl lg:text-7xl">
          The world is loud.
        </h1>
        <p className="font-display mt-4 max-w-2xl text-2xl font-medium italic text-paper/90 sm:text-3xl">
          We want to help people navigate it with more clarity and confidence.
        </p>

        <p className="mt-8 max-w-xl text-lg text-paper/80">
          Ambient Thread Foundation brings inclusive, personalized audio management to the
          sound-sensitive community: thoughtful software for people with different hearing
          and auditory needs.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-paper/30 bg-navy px-8 py-3.5 text-base font-bold text-paper transition-colors duration-200 hover:border-gold hover:text-gold-bright"
          >
            Support the Mission
          </a>
          <a
            href="#story"
            className="rounded-full bg-gold px-8 py-3.5 text-base font-bold text-navy transition-colors duration-200 hover:bg-gold-bright"
          >
            Read Melissa&rsquo;s Story
          </a>
        </div>

        {/* Quiet credibility line */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-paper/60">
          <span className="flex items-center gap-2">
            <IconHeadphones className="h-5 w-5 text-gold" />
            Works with the headphones you already own
          </span>
          <span className="flex items-center gap-2">
            <IconHeart className="h-5 w-5 text-gold" />
            Accessibility first, always
          </span>
        </div>
      </div>

      {/* Mobile lotus, below text */}
      <div aria-hidden="true" className="pointer-events-none relative mx-auto -mb-10 w-64 select-none md:hidden">
        <img src="/images/lotus-mark.webp" alt="" className="w-full" />
      </div>
    </section>
  );
}

/* --------------------------- Outcomes strip -------------------------------- */

const OUTCOMES = ["Everyday Comfort", "Situational Awareness", "Communication", "Connection"];

function OutcomesStrip() {
  return (
    <section aria-label="What we work to improve" className="border-y border-gold/25 bg-navy-deep">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 sm:px-8">
        {OUTCOMES.map((o, i) => (
          <span key={o} className="flex items-center gap-10">
            <span className="eyebrow text-paper/75">{o}</span>
            {i < OUTCOMES.length - 1 && (
              <span aria-hidden="true" className="hidden h-1.5 w-1.5 rounded-full bg-gold/60 sm:block" />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Mission --------------------------------- */

function Mission() {
  return (
    <section id="mission" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5" style={{ color: "#6B5713" }}>
              Our Mission
            </p>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              Making everyday listening easier, for everyone.
            </h2>
            <div aria-hidden="true" className="mt-8 h-px w-24 bg-gold" />
            <p className="mt-8 text-lg text-ink-soft">
              We believe everyone should have access to high-quality audio tools that support
              daily life and allow for personalized listening solutions.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-8 text-lg leading-relaxed text-ink-soft">
              <p>
                The Ambient Thread Foundation is a nonprofit organization focused on making
                everyday listening easier, more accessible, and more inclusive for people with
                different hearing and auditory needs.
              </p>
              <p>
                We provide education, peer-informed support, resource navigation, and an open
                source app for people who have sound sensitivities, such as those who are
                single-sided deaf or hard of hearing.
              </p>
              <p>
                Our goal is to create thoughtful, easy-to-use software that helps people feel
                more comfortable, aware, and connected to the world around them.
              </p>
              <p>
                By making these tools more accessible and affordable, we hope to improve
                everyday comfort, situational awareness, communication, and connection for
                more people.
              </p>
            </div>

            <ul className="mt-12 space-y-6">
              <li className="flex gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-gold-bright">
                  <IconEar className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ink">Accessible by design</p>
                  <p className="text-ink-soft">
                    Built for people with different hearing and auditory needs, not adapted for
                    them as an afterthought.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-gold-bright">
                  <IconSliders className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ink">Personal, not one-size-fits-all</p>
                  <p className="text-ink-soft">
                    Each person experiences hearing differently, so listening tools should be
                    customizable to the individual.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-gold-bright">
                  <IconHeart className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-ink">Affordable on purpose</p>
                  <p className="text-ink-soft">
                    Specialized audio hardware can be prohibitively expensive. Software on the
                    phone you already carry should not be.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Story ---------------------------------- */

function Story() {
  return (
    <section id="story" className="relative bg-navy">
      <ThreadDivider />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src="/images/melissa-story.webp"
                  alt="Melissa Burns, founder of the Ambient Thread Foundation"
                  className="h-full w-full object-cover object-[center_30%]"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-lg border border-gold/40" />
            </div>
            <p className="mt-6 text-sm text-paper/60">
              Melissa Burns, founder of the Ambient Thread Foundation
            </p>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-gold-bright">Melissa&rsquo;s Story</p>
            <h2 className="font-display text-4xl font-semibold text-paper sm:text-5xl">
              One morning, the world sounded completely different.
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-paper/80">
              <p>
                Our founder, Melissa Burns, is newly single-sided deaf. After needing urgent
                brain surgery to remove a huge acoustic neuroma in 2024, she woke up, at age
                37, to a completely different listening experience.
              </p>
              <p>
                The shift from balanced, two-sided listening to relying on one side made
                everyday environments feel fundamentally different. Conversations were harder
                to follow, noise brought a familiar feeling of sensory overload, and
                situational awareness took far more attention and energy.
              </p>
              <blockquote className="border-l-2 border-gold pl-6">
                <p className="font-display text-2xl font-medium italic text-gold-bright">
                  &ldquo;The previous invisible privilege of balanced, two-sided listening
                  became acutely apparent.&rdquo;
                </p>
              </blockquote>
              <p>
                While adjusting to managing sound from a single dominant side, she encountered
                a consistent frustration: a lack of accessible consumer software options to
                help balance everyday environmental noise. The existing specialized audio
                hardware options were prohibitively expensive and lacked customizable consumer
                flexibility.
              </p>
              <p>
                That experience became the foundation for our work. Though we are aware that
                each person experiences hearing loss differently, our goal is to present an
                innovative, user-friendly mobile application. We believe sophisticated
                environmental audio solutions should be accessible to anyone interested in
                optimizing their daily listening.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- The App --------------------------------- */

const APP_FEATURES = [
  {
    icon: IconHeadphones,
    title: "The headphones you already own",
    text: "Designed to help you get more out of standard iOS devices and everyday headphones, with no specialized, costly audio equipment required.",
  },
  {
    icon: IconSliders,
    title: "Advanced sound routing",
    text: "Personalized routing brings features typically associated with expensive dedicated hardware to the phone in your pocket.",
  },
  {
    icon: IconEar,
    title: "Built for asymmetrical listening",
    text: "Made for people who experience uneven listening environments, including those who rely more heavily on one side for hearing.",
  },
  {
    icon: IconConversation,
    title: "Follow conversations more easily",
    text: "Helping you keep up with the people in front of you, even when the room around you refuses to cooperate.",
  },
  {
    icon: IconCompass,
    title: "Stay aware of your surroundings",
    text: "Support for situational awareness, so you can stay connected to what is happening around you.",
  },
  {
    icon: IconHeart,
    title: "Comfort in louder spaces",
    text: "Feel more at ease in restaurants, gatherings, and busy places that used to feel overwhelming.",
  },
];

function PhoneIllustration() {
  return (
    <figure className="mx-auto w-full max-w-[300px]">
      <svg viewBox="0 0 300 600" fill="none" role="img" aria-label="Illustration of a phone showing personalized left and right listening balance" className="w-full">
        {/* Phone body */}
        <rect x="10" y="10" width="280" height="580" rx="42" fill="#111B3D" stroke="#D0B040" strokeOpacity="0.45" strokeWidth="1.5" />
        <rect x="110" y="26" width="80" height="10" rx="5" fill="#0B132B" />

        {/* Title line */}
        <text x="150" y="86" textAnchor="middle" fill="#F7F2E6" fontSize="17" fontWeight="700">
          Your listening, your way
        </text>

        {/* L / R balance */}
        <text x="60" y="140" textAnchor="middle" fill="#E3C96A" fontSize="15" fontWeight="700">L</text>
        <text x="240" y="140" textAnchor="middle" fill="#E3C96A" fontSize="15" fontWeight="700">R</text>
        <line x1="80" y1="135" x2="220" y2="135" stroke="#F7F2E6" strokeOpacity="0.25" strokeWidth="4" strokeLinecap="round" />
        <line x1="80" y1="135" x2="185" y2="135" stroke="#D0B040" strokeWidth="4" strokeLinecap="round" />
        <circle cx="185" cy="135" r="9" fill="#E3C96A" />

        {/* Equalizer bars settling toward calm */}
        <g>
          {[
            { x: 55, h: 90, d: "0s" },
            { x: 85, h: 130, d: "0.6s" },
            { x: 115, h: 70, d: "1.2s" },
            { x: 145, h: 150, d: "0.3s" },
            { x: 175, h: 95, d: "0.9s" },
            { x: 205, h: 125, d: "1.5s" },
            { x: 235, h: 60, d: "0.45s" },
          ].map((b) => (
            <rect
              key={b.x}
              className="eq-bar"
              x={b.x}
              y={330 - b.h}
              width="12"
              height={b.h}
              rx="6"
              fill="#D0B040"
              fillOpacity="0.75"
              style={{ animationDelay: b.d }}
            />
          ))}
        </g>
        <line x1="45" y1="345" x2="255" y2="345" stroke="#F7F2E6" strokeOpacity="0.15" strokeWidth="1.5" />

        {/* Ambient level card */}
        <rect x="40" y="380" width="220" height="72" rx="14" fill="#0B132B" stroke="#D0B040" strokeOpacity="0.3" />
        <text x="58" y="410" fill="#F7F2E6" fontSize="13" opacity="0.8">
          Environment
        </text>
        <text x="58" y="434" fill="#E3C96A" fontSize="15" fontWeight="700">
          Softened for comfort
        </text>

        {/* Thread flourish */}
        <path d="M30 505 C 90 480, 130 520, 180 500 C 220 484, 250 505, 275 495" stroke="#D0B040" strokeOpacity="0.6" strokeWidth="1.4" fill="none" />
        <circle cx="180" cy="500" r="2.5" fill="#E3C96A" />
      </svg>
      <figcaption className="mt-4 text-center text-sm text-ink-soft">
        Concept illustration of personalized listening balance
      </figcaption>
    </figure>
  );
}

function AppSection() {
  return (
    <section id="app" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5" style={{ color: "#6B5713" }}>
            In Development
          </p>
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            An accessibility-focused audio app for iOS.
          </h2>
          <p className="mt-6 text-lg text-ink-soft">
            Our flagship iOS app is being developed to help users get more out of the
            headphones they already own. Expected in 2027, it will use advanced sound-routing
            technology to bring features typically associated with specialized, costly audio
            equipment to standard iOS devices.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <ul className="space-y-9">
              {APP_FEATURES.map((f) => (
                <li key={f.title} className="flex gap-5">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-gold-bright">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                    <p className="mt-1 text-ink-soft">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <blockquote className="mt-12 border-l-2 border-gold pl-6">
              <p className="font-display text-2xl font-medium italic text-ink">
                This is not about creating a single &ldquo;correct&rdquo; way to hear. It is
                about expanding control, choice, and access for people whose listening needs
                are too often overlooked.
              </p>
            </blockquote>

            <div className="mt-10 rounded-lg border border-navy/15 bg-paper-dim p-6">
              <p className="text-sm leading-relaxed text-ink-soft">
                <span className="font-bold text-ink">A note on what this is: </span>
                the app is intended for general wellness and everyday audio customization. It
                is not a medical device, a hearing aid, or a treatment for hearing loss. The
                full statement is in the footer below.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <PhoneIllustration />
            <div className="mx-auto mt-10 max-w-[300px] rounded-lg bg-navy p-6 text-center">
              <p className="eyebrow text-gold-bright">Expected</p>
              <p className="font-display mt-1 text-5xl font-semibold text-paper">2027</p>
              <p className="mt-2 text-sm text-paper/70">on iOS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- How We're Building --------------------------- */

const BUILDING_NOW = [
  "Further develop the concept and technology behind our future iOS application",
  "Learn from people with lived experience of hearing loss, asymmetrical hearing, sound sensitivity, and difficult listening environments",
  "Build relationships with accessibility advocates, audio and technology professionals, community organizations, and potential collaborators",
  "Explore ways to make personalized audio support more understandable, attainable, and inclusive",
  "Shape future educational, advocacy, and community-resource efforts alongside the people they are intended to serve",
];

function HowWereBuilding() {
  return (
    <section id="vision" className="relative bg-navy">
      <ThreadDivider />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 text-gold-bright">Our Vision</p>
            <h2 className="font-display text-4xl font-semibold text-paper sm:text-5xl">
              A world where everyday listening feels more accessible.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-paper/80">
              <p>
                Ambient Thread Foundation envisions a world where people with different
                auditory needs can move through daily life with greater confidence, comfort,
                and connection. Sound is such a large part of everyday moments that people
                forget so many of us experience sound differently.
              </p>
              <p>
                We are in our founding stage. That means we are focused on creating a strong,
                responsible foundation before making promises about outcomes. Right now,
                Ambient Thread is working to:
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              {BUILDING_NOW.map((item) => (
                <li key={item} className="flex gap-4">
                  <svg className="mt-1.5 h-4 w-4 shrink-0 text-gold" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m3 8.5 3.5 3.5L13 4" />
                  </svg>
                  <span className="text-paper/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-6 text-lg leading-relaxed text-paper/80">
              <p>
                We believe that people most affected by a problem should have a meaningful
                voice in shaping the solution, which is why we are community-informed by
                design. We will be transparent about what we are learning, what we are still
                exploring, and how feedback informs our next steps.
              </p>
              <p className="font-display text-2xl font-medium italic text-gold-bright">
                After all, it was just noise until Ambient Thread entered the chat.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src="/images/stage-performance.webp"
                  alt="A stage performance in warm light, with flowing fabric wings unfurled"
                  className="h-full w-full object-cover"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-lg border border-gold/40" />
              <p className="mt-5 text-sm text-paper/60">
                Life is meant to be experienced fully. Sound is a thread that connects us to it.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-sm rounded-lg bg-navy-raise p-7">
              <p className="eyebrow text-gold-bright">More Than an App</p>
              <p className="mt-4 leading-relaxed text-paper/80">
                We are committed to more than building an app. Through advocacy, education,
                and community-based inclusion efforts, we hope to make helpful listening
                technology easier to understand and more accessible to the people who could
                benefit from it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Get Involved ------------------------------ */

const INVOLVEMENT = [
  {
    title: "Bring your skills",
    text: "Offer professional expertise or pro-bono support. We are actively seeking skills such as design, legal, accounting, grant research, photography, social media, translation, and wellness expertise. Apply to be a community advisor, subject-matter advisor, or lived experience contributor.",
  },
  {
    title: "Share your perspective",
    text: "Email us your story with permission to share. Give insights about what makes you unique and how hearing loss or sensitivity affects you. Help us understand what support would make the greatest difference.",
  },
  {
    title: "Make an introduction",
    text: "Spread the word about us and our mission. Introduce us to potential partners, venues, businesses, sponsors, journalists, clinicians, educators, community leaders, and more.",
  },
  {
    title: "Join a leadership pipeline",
    text: "Email us to express your interest in future board, committee, ambassador, or internship roles.",
  },
  {
    title: "Help shape our resources",
    text: "Tell us if you would like to review guides or social media posts, test an app concept, join a focus group, or give feedback on website language and accessibility.",
  },
  {
    title: "Stay in the loop",
    text: "Become a founding supporter: follow us on Instagram for launch updates, behind-the-scenes progress, and first access to opportunities.",
  },
];

function GetInvolved() {
  return (
    <section id="involved" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5" style={{ color: "#6B5713" }}>
            Help Shape What Comes Next
          </p>
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            Ways to get involved.
          </h2>
          <p className="mt-6 text-lg text-ink-soft">
            This work grows through the people who join it. Whatever you can offer, from
            lived experience to professional skills to a simple introduction, there is a
            place for it here.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
          {INVOLVEMENT.map((item) => (
            <div key={item.title} className="border-t border-navy/15 pt-6">
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-ink-soft">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="mailto:AmbientThread@gmail.com"
            className="inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 font-bold text-paper transition-colors duration-200 hover:bg-navy-raise"
          >
            <IconMail className="h-5 w-5 text-gold-bright" />
            Email Us to Get Started
          </a>
          <a
            href="https://instagram.com/AmbientThread"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-navy/30 px-7 py-3.5 font-bold text-ink transition-colors duration-200 hover:border-navy"
          >
            <IconInstagram className="h-5 w-5" />
            Follow @AmbientThread
          </a>
        </div>

        {/* Donate band */}
        <div className="mt-16 rounded-lg bg-navy-deep p-8 sm:p-12">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="eyebrow text-gold-bright">Support the Work</p>
              <h3 className="font-display mt-3 text-3xl font-semibold text-paper sm:text-4xl">
                Every donation moves the app closer to launch.
              </h3>
              <p className="mt-4 text-paper/75">
                Contributions go toward development and backend support for the foundation&rsquo;s
                accessibility-focused iOS app. Donations are processed securely through Zeffy.
              </p>
            </div>
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-gold px-10 py-4 text-lg font-bold text-navy transition-colors duration-200 hover:bg-gold-bright"
            >
              Donate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ ------------------------------------ */

const FAQS = [
  {
    q: "How can I support your mission right now?",
    a: "You can support us by making a financial gift through our secure donation page, signing up for our volunteer list, or sharing our mission with your community on social media.",
  },
  {
    q: "Do you accept in-kind donations (supplies, equipment, or services)?",
    a: "Yes! We welcome professional pro-bono services and specific community supplies for the hearing sensitive communities. Please contact our team before sending items so that we can coordinate.",
  },
  {
    q: "Is my donation tax-deductible?",
    a: "The Ambient Thread Foundation is a registered New Mexico non-profit organization currently awaiting its official 501(c)(3) tax-exempt status from the IRS. Once approved, tax-exempt status is typically retroactive from our formation date (August 5, 2026), meaning your gift may become retroactively tax-deductible. We recommend holding onto your receipt and consulting a tax professional.",
  },
  {
    q: "Where can I find your EIN or official registration details?",
    a: "Transparency is core to our mission. Our EIN is 42-4819969, and we are legally registered with the State of New Mexico.",
  },
  {
    q: "Are there any transaction fees taken out of my online donation?",
    a: "No! We use Zeffy to process our online donations, which means 100% of your gift goes directly to our mission. Zeffy does not charge us any platform or credit card processing fees.",
  },
  {
    q: "Can I volunteer remotely from any location?",
    a: "Yes! Because we are a remote organization, we have plenty of digital and remote volunteer opportunities. Please email us to get started.",
  },
  {
    q: "Your website is beautiful and incredibly fast! How did you build it and how can I create one like this?",
    a: "Our website is completely custom-coded and built through Web Launch Academy. Visit weblaunchacademy.com or email hello@weblaunchacademy.com to learn how to completely build, launch, and own your own digital assets. We highly recommend checking them out.",
  },
];

function Faq() {
  return (
    <section id="faq" className="relative bg-navy">
      <ThreadDivider />
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="eyebrow mb-5 text-gold-bright">Questions, Answered</p>
        <h2 className="font-display text-4xl font-semibold text-paper sm:text-5xl">
          Frequently asked questions.
        </h2>

        <div className="mt-12">
          {FAQS.map((item) => (
            <details key={item.q} className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold text-paper marker:hidden [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-gold-bright transition-transform duration-200 group-open:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <div className="pb-7 pr-10 leading-relaxed text-paper/80">
                {item.q.startsWith("Your website") ? (
                  <p>
                    Our website is completely custom-coded and built through Web Launch
                    Academy. Visit{" "}
                    <a
                      href="https://www.weblaunchacademy.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-gold-bright underline underline-offset-4 hover:text-gold"
                    >
                      weblaunchacademy.com
                    </a>{" "}
                    or email{" "}
                    <a
                      href="mailto:hello@weblaunchacademy.com"
                      className="font-bold text-gold-bright underline underline-offset-4 hover:text-gold"
                    >
                      hello@weblaunchacademy.com
                    </a>{" "}
                    to learn how to completely build, launch, and own your own digital
                    assets. We highly recommend checking them out.
                  </p>
                ) : (
                  <p>{item.a}</p>
                )}
              </div>
            </details>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}

/* --------------------------------- Contact --------------------------------- */

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const interest = String(data.get("interest") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`${interest || "Website message"}: ${name}`);
    const body = encodeURIComponent(
      `${message}\n\nName: ${name}\nEmail: ${email}\nInterested in: ${interest || "Not specified"}`
    );
    window.location.href = `mailto:AmbientThread@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5" style={{ color: "#6B5713" }}>
              Contact Us
            </p>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              We would love to hear from you.
            </h2>
            <p className="mt-6 text-lg text-ink-soft">
              Questions, ideas, lived experience you want to share, or interest in supporting
              the foundation&rsquo;s work: every message reaches Melissa.
            </p>

            <ul className="mt-10 space-y-5">
              <li>
                <a href="mailto:AmbientThread@gmail.com" className="group flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold-bright">
                    <IconMail />
                  </span>
                  <span className="font-bold text-ink underline-offset-4 group-hover:underline">
                    AmbientThread@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:Admin@ambientthread.org" className="group flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold-bright">
                    <IconMail />
                  </span>
                  <span className="font-bold text-ink underline-offset-4 group-hover:underline">
                    Admin@ambientthread.org
                    <span className="block text-sm font-normal text-ink-soft">Administrative inquiries</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+15057504327" className="group flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold-bright">
                    <IconPhone />
                  </span>
                  <span className="font-bold text-ink underline-offset-4 group-hover:underline">
                    505-750-4327
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/AmbientThread"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold-bright">
                    <IconInstagram />
                  </span>
                  <span className="font-bold text-ink underline-offset-4 group-hover:underline">
                    @AmbientThread
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-gold-bright">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <span className="font-bold text-ink">
                  1209 Mountain Road Pl NE, Ste N
                  <span className="block text-sm font-normal text-ink-soft">
                    Albuquerque, NM 87110 (mailing address; we are a remote organization)
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="rounded-lg bg-navy p-7 sm:p-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="mb-2 block font-bold text-paper">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-md border border-white/20 bg-navy-raise px-4 py-3 text-paper placeholder:text-paper/40"
                    placeholder="Your name"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="mb-2 block font-bold text-paper">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-md border border-white/20 bg-navy-raise px-4 py-3 text-paper placeholder:text-paper/40"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="interest" className="mb-2 block font-bold text-paper">
                    How would you like to get involved?
                  </label>
                  <div className="relative">
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-bright"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m4 6 4 4 4-4" />
                    </svg>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full appearance-none rounded-md border border-white/20 bg-navy-raise px-4 py-3 pr-11 text-paper"
                      defaultValue=""
                    >
                    <option value="">Just saying hello</option>
                    <option value="Volunteering">Volunteering</option>
                    <option value="Sharing my story">Sharing my story or lived experience</option>
                    <option value="Pro-bono skills">Offering pro-bono skills</option>
                    <option value="Partnership or introduction">Partnership or introduction</option>
                    <option value="Donation question">Donation question</option>
                      <option value="Board, committee, or internship">Board, committee, or internship</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block font-bold text-paper">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full rounded-md border border-white/20 bg-navy-raise px-4 py-3 text-paper placeholder:text-paper/40"
                    placeholder="How can we help, or how would you like to help?"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-gold px-8 py-4 text-lg font-bold text-navy transition-colors duration-200 hover:bg-gold-bright sm:w-auto"
              >
                Send Message
              </button>
              {sent && (
                <p role="status" className="mt-5 text-gold-bright">
                  Your email app should have opened with your message ready to send. If it did
                  not, please email us directly at AmbientThread@gmail.com.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Footer ---------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-deep">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <a href="#top" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="" className="h-12 w-12 rounded-sm object-contain" />
            <span className="font-display text-lg font-semibold tracking-[0.14em] text-paper">
              AMBIENT THREAD
              <span className="block text-[0.62rem] font-normal tracking-[0.3em] text-gold-bright">FOUNDATION</span>
            </span>
          </a>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-paper/75 transition-colors duration-200 hover:text-gold-bright">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div aria-hidden="true" className="my-10 h-px w-full bg-white/10" />

        <p className="max-w-4xl text-sm leading-relaxed text-paper/55">
          The software application and the Ambient Thread Foundation are intended solely for
          general wellness purposes to enhance and customize everyday consumer audio
          experiences and situational environmental listening. This software does not provide
          medical diagnoses, treatment, or clinical mitigation for hearing loss, single-sided
          deafness, or any medical condition. It is not an FDA-approved medical device or a
          registered hearing aid. Users experiencing persistent hearing difficulty should
          consult a licensed healthcare professional.
        </p>

        <p className="mt-6 max-w-4xl text-sm leading-relaxed text-paper/55">
          Ambient Thread Foundation is a registered New Mexico non-profit organization;
          federal 501(c)(3) tax-exempt status is pending with the IRS. EIN 42-4819969.
          Mailing address: 1209 Mountain Road Pl NE, Ste N, Albuquerque, NM 87110.
        </p>

        <div className="mt-10 flex flex-col gap-3 text-sm text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Ambient Thread Foundation. All rights reserved.</p>
          <a
            href="https://weblaunchacademy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            Built with Web Launch Academy
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------- Sticky mobile CTA ---------------------------- */

function StickyBar({ visible }: { visible: boolean }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-gold/40 bg-navy-deep transition-opacity duration-300 md:hidden"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <a href="tel:+15057504327" className="flex flex-1 items-center justify-center gap-2 py-4 font-bold text-paper">
        <IconPhone className="h-5 w-5 text-gold-bright" />
        Call
      </a>
      <span aria-hidden="true" className="w-px bg-white/15" />
      <a href="#contact" className="flex flex-1 items-center justify-center gap-2 py-4 font-bold text-gold-bright">
        <IconMail className="h-5 w-5" />
        Message Us
      </a>
    </div>
  );
}

/* ----------------------------------- Page ----------------------------------- */

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      (entries) => setHeroVisible(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:font-bold focus:text-navy"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero heroRef={heroRef} />
        <OutcomesStrip />
        <Mission />
        <Story />
        <AppSection />
        <HowWereBuilding />
        <GetInvolved />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyBar visible={!heroVisible} />
    </>
  );
}
