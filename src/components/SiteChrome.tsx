"use client";

// Shared site chrome: navigation and footer, used by the home page and the
// Partners page. Anchor links are root-relative so they work from any route.
import { useState } from "react";

export const NAV_LINKS = [
  { href: "/#mission", label: "Mission" },
  { href: "/#story", label: "Our Story" },
  { href: "/#app", label: "The App" },
  { href: "/#involved", label: "Get Involved" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

const FOOTER_LINKS = [...NAV_LINKS, { href: "/partners", label: "Partners" }];

export const DONATE_URL =
  "https://www.zeffy.com/en-US/donation-form/donate-to-pay-our-developer-and-backend-support";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur-md">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/images/logo.webp" alt="" width={128} height={128} className="h-11 w-11 rounded-sm object-contain" />
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

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-deep">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <a href="/" className="flex items-center gap-3">
            <img src="/images/logo.webp" alt="" width={128} height={128} loading="lazy" className="h-12 w-12 rounded-sm object-contain" />
            <span className="font-display text-lg font-semibold tracking-[0.14em] text-paper">
              AMBIENT THREAD
              <span className="block text-[0.62rem] font-normal tracking-[0.3em] text-gold-bright">FOUNDATION</span>
            </span>
          </a>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {FOOTER_LINKS.map((l) => (
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
