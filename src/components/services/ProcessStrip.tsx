"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ProcessStep } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessStrip({ steps }: { steps: ProcessStep[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current!.querySelectorAll("[data-step]"),
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="mt-14 grid grid-cols-2 gap-8 md:mt-16 md:grid-cols-5 md:gap-6"
    >
      {steps.map((step, i) => (
        <div
          key={step.number}
          data-step
          className="relative flex flex-col items-center text-center"
        >
          {i < steps.length - 1 && (
            <div
              className="absolute left-1/2 top-7 hidden h-px w-[calc(100%+1.5rem)] bg-foreground/20 md:block"
              aria-hidden="true"
            />
          )}
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#073042] bg-background font-display text-[15px] font-bold text-[#073042]">
            {step.number}
          </div>
          <h3 className="mt-5 font-display text-[16px] font-black uppercase tracking-[1px] text-[#173042]">
            {step.title}
          </h3>
          <p className="mt-3 max-w-[246px] font-sans text-[12px] leading-[19.5px] text-muted">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
