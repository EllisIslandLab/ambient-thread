"use client";

import { useState } from "react";
import { IconInstagram, IconMail, IconPhone } from "@/components/icons";

// The contact form is the only interactive part of the homepage body, so it is the
// only section that ships as client JavaScript.
const LEAD_ENDPOINT = "https://iorqovbeunehkvejcquc.supabase.co/functions/v1/submit-lead";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const interest = String(data.get("interest") || "");
    const message = String(data.get("message") || "");
    const website = String(data.get("website") || "");

    setStatus("sending");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest, message, website }),
      });
      const result = await res.json();
      if (res.ok && result.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      throw new Error("submit failed");
    } catch {
      // Fallback: open the visitor's mail client so the message is never lost.
      const subject = encodeURIComponent(`${interest || "Website message"}: ${name}`);
      const body = encodeURIComponent(
        `${message}\n\nName: ${name}\nEmail: ${email}\nInterested in: ${interest || "Not specified"}`
      );
      window.location.href = `mailto:AmbientThread@gmail.com?subject=${subject}&body=${body}`;
      setStatus("error");
    }
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
              {/* Honeypot: hidden from real users, tempting to bots */}
              <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
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
                disabled={status === "sending"}
                className="mt-8 w-full rounded-full bg-gold px-8 py-4 text-lg font-bold text-navy transition-colors duration-200 hover:bg-gold-bright disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              <p role="status" className="mt-5 min-h-[1.5rem] text-gold-bright">
                {status === "sent" &&
                  "Thank you! Your message is on its way. We will get back to you soon."}
                {status === "error" &&
                  "We could not send that automatically, so your email app should have opened instead. If it did not, please email us directly at AmbientThread@gmail.com."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
