"use client";

import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function AIProjectsHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { duration: 0.8, ease: "power3.out" },
        });

        timeline
          .fromTo("[data-ai-hero]", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1 })
          .fromTo(
            "[data-ai-rule]",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, transformOrigin: "left" },
            "-=0.45",
          );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="mx-auto max-w-[1500px] px-6 pt-16 pb-12 md:px-8 md:pt-24 md:pb-20"
    >
      <div data-ai-hero className="flex items-center gap-2 text-accent">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        <p className="font-display text-[13px] font-bold uppercase tracking-[2.4px]">
          AI in practice
        </p>
      </div>

      <h1
        data-ai-hero
        className="mt-5 max-w-[1120px] font-display text-[clamp(54px,11vw,150px)] font-black uppercase leading-[0.83] tracking-[-0.045em] text-[#173042]"
      >
        Built with AI.
        <span className="block text-accent">Designed with intent.</span>
      </h1>

      <div data-ai-rule className="mt-9 h-[3px] w-[72px] rounded-full bg-accent" />

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.15fr] md:items-start md:gap-16">
        <p
          data-ai-hero
          className="font-display text-[25px] font-bold leading-[1.18] tracking-[-0.02em] text-[#173042] md:text-[34px]"
        >
          From working products to AI-aided product design.
        </p>
        <p
          data-ai-hero
          className="max-w-[690px] text-[16px] leading-[26px] text-muted md:text-[18px] md:leading-[29px]"
        >
          A collection of experiments where I used AI as a hands-on collaborator—shaping product strategy, accelerating implementation, and turning complex ideas into clear, usable experiences.
        </p>
      </div>
    </section>
  );
}
