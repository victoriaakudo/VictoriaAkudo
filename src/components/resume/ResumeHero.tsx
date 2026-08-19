"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function ResumeHero({
  badges,
  resumeFileUrl,
}: {
  badges: string[];
  resumeFileUrl: string;
}) {
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
          { scaleX: 1, duration: 0.7, ease: "power3.out", delay: 0.5, transformOrigin: "left" },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="mx-auto max-w-[1500px] px-6 pt-20 pb-14 md:px-8 md:pt-28 md:pb-20"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p
            data-hero-in
            className="font-display text-[14px] font-semibold uppercase tracking-[2.4px] text-muted"
          >
            My Background
          </p>
          <h1
            data-hero-in
            className="mt-4 font-display text-[64px] font-black uppercase leading-[0.95] tracking-[1px] text-[#173042] md:text-[104px]"
          >
            Resume.
          </h1>
          <div
            data-hero-rule
            className="mt-6 h-[3px] w-[72px] origin-left rounded-full bg-[#BC7553]"
          />
          <div data-hero-in className="mt-8 flex flex-wrap gap-3">
            {badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-foreground/15 bg-white px-4 py-1.5 font-sans text-[14px] text-[#454545]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <a
          data-hero-in
          href={resumeFileUrl}
          download
          className="inline-flex shrink-0 self-start items-center gap-2 rounded-xl border-[1.5px] border-accent bg-white px-6 py-3 font-sans text-[15px] font-medium text-accent transition-colors hover:bg-accent hover:text-white"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
