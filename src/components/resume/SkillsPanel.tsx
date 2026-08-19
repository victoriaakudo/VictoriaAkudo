"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { SkillGroup } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsPanel({ skills }: { skills: SkillGroup[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current!.querySelectorAll("[data-group]"),
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mt-10 space-y-8">
      {skills.map((group, i) => (
        <div key={i} data-group>
          <p className="font-display text-[12px] font-semibold uppercase tracking-[2px] text-muted">
            {group.category}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {group.skills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-foreground/15 bg-white px-4 py-1.5 font-sans text-[14px] text-[#454545]"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
