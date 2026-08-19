"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function InteractionHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-hero-in]",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.14, ease: "power3.out", delay: 0.05 },
        );
        gsap.fromTo(
          "[data-hero-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power3.out", delay: 0.5, transformOrigin: "left" },
        );
        gsap.fromTo(
          "[data-hero-preview]",
          { autoAlpha: 0, scale: 1.06 },
          { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.15 },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="grid items-center gap-10 md:grid-cols-2 md:gap-14"
    >
      <div>
        <h1
          data-hero-in
          className="font-display text-[48px] font-black uppercase leading-[0.95] tracking-[1px] text-[#173042] md:text-[72px]"
        >
          Interaction Design.
        </h1>
        <div
          data-hero-rule
          className="mt-5 h-[3px] w-[64px] origin-left rounded-full bg-[#BC7553]"
        />
        <p
          data-hero-in
          className="mt-6 max-w-[460px] font-sans text-[18px] leading-[29.25px] text-[#454545]"
        >
          A space where I make things move, jump, float, flow or bounce, cause
          motion is what makes design come alive.
        </p>
      </div>
      <div className="overflow-hidden rounded-[24px] bg-[#2A4A5C]">
        <div data-hero-preview>
          <video
            src="/interactive/interaction-hero.mp4"
            width={1280}
            height={966}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Screen recording of an interaction design prototype"
            className="block h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
