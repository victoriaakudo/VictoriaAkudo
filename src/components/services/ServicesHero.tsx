"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function ServicesHero({ intro }: { intro: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-hero-in]",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.05 },
        );
        gsap.fromTo(
          "[data-hero-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power3.out", delay: 0.55, transformOrigin: "left" },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="mx-auto max-w-[1500px] px-6 pt-20 pb-16 md:px-8 md:pt-28 md:pb-24"
    >
      <p
        data-hero-in
        className="font-display text-[14px] font-semibold uppercase tracking-[2.4px] text-muted"
      >
        What I Do
      </p>
      <h1
        data-hero-in
        className="mt-4 font-display text-[64px] font-black uppercase leading-[0.95] tracking-[1px] text-[#173042] md:text-[104px]"
      >
        Services.
      </h1>
      <div
        data-hero-rule
        className="mt-6 h-[3px] w-[72px] origin-left rounded-full bg-[#BC7553]"
      />
      <p
        data-hero-in
        className="mt-8 max-w-[760px] font-sans text-[18px] leading-[29.25px] text-muted"
      >
        {intro}
      </p>
    </section>
  );
}
