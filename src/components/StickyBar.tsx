"use client";

import { useEffect, useState } from "react";
import { IconMail, IconPhone } from "@/components/icons";

export function StickyBar() {
  // Shown on phones once the hero has scrolled away (the hero is section#top).
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver((entries) => setVisible(!entries[0].isIntersecting), { threshold: 0.1 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

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
