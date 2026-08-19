"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ExperienceEntry } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#BC7553";

export default function ExperienceTimeline({
  experience,
}: {
  experience: ExperienceEntry[];
}) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current!.querySelectorAll("[data-entry]"),
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="relative mt-10 space-y-11 border-l-2 border-[#D1D1D1]">
      {experience.map((entry, i) => {
        const grouped = Boolean(entry.group);
        const showGroup = entry.group && entry.group !== experience[i - 1]?.group;
        return (
          <li key={i} data-entry className="relative pl-8">
            <span
              className="absolute -left-[5px] top-2 h-2 w-2 rounded-full"
              style={{ backgroundColor: grouped ? "#B4AFA6" : ACCENT }}
              aria-hidden="true"
            />

            {showGroup && (
              <p className="mb-3 font-display text-[13px] font-semibold uppercase tracking-[1.5px] text-muted">
                {entry.group}
              </p>
            )}

            <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-6">
              <div>
                <h3 className="font-sans text-[16px] font-bold leading-[24px] text-[#073042]">
                  {entry.role}
                </h3>
                <p
                  className="mt-0.5 font-sans text-[14px] font-semibold leading-[20px]"
                  style={{ color: ACCENT }}
                >
                  {entry.company}
                </p>
              </div>
              <div className="shrink-0 md:text-right">
                <p className="font-sans text-[14px] font-medium leading-[20px] text-[#888888]">
                  {entry.period}
                </p>
                {entry.location && (
                  <p className="mt-0.5 font-sans text-[12px] font-normal leading-[16px] text-[#B0B0B0]">
                    {entry.location}
                  </p>
                )}
              </div>
            </div>

            {entry.summary && (
              <div className="mt-3 space-y-4">
                {entry.summary.split("\n\n").map((p, j) => (
                  <p
                    key={j}
                    className="font-sans text-[14px] font-normal leading-[20px] text-[#4F4F4F]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {entry.bullets && entry.bullets.length > 0 && (
              <ul className="mt-4 space-y-2.5">
                {entry.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex gap-3 font-sans text-[14px] font-normal leading-[20px] text-[#4F4F4F]"
                  >
                    <ArrowRight
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: ACCENT }}
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}
