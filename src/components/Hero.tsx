"use client";

import { useRef } from "react";
import { Mail } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { SiteConfig } from "@/lib/types";
import RichText from "@/components/RichText";

export default function Hero({
  hero,
  email,
}: {
  hero: SiteConfig["hero"];
  email: string;
}) {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<SVGTextElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          titleRef.current,
          { attr: { textLength: 720 }, autoAlpha: 0 },
          { attr: { textLength: 1240 }, autoAlpha: 1, duration: 1.0 },
        ).fromTo(
          ".hero-reveal",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.12 },
          "-=0.55",
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="mx-auto max-w-[1500px] px-6 pt-12 pb-16 md:pt-24 md:pb-28">
      <div className="mb-6 flex flex-col gap-4 md:mb-8">
        <h1 aria-label={hero.title}>
          <svg
            viewBox="0 0 1240 88"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="block w-full overflow-visible"
          >
            <text
              ref={titleRef}
              x="0"
              y="78"
              textLength="1240"
              lengthAdjust="spacingAndGlyphs"
              style={{ fontSize: "100px" }}
              className="fill-foreground font-display font-black uppercase"
            >
              {hero.title}
            </text>
          </svg>
        </h1>

        <p className="hero-reveal text-[clamp(9px,2.3vw,16px)] font-medium uppercase leading-6 text-[#B0B0B0] md:text-base">
          {hero.roles.join("  •  ")}
        </p>
      </div>

      <div className="w-full flex flex-col items-end">
        <div className=" max-w-md  flex flex-col items-start">
          <p className="hero-reveal text-base font-medium leading-6 text-[#888888]">
            <RichText text={hero.intro} />
          </p>
          <a
            href={`mailto:${email}`}
            className="hero-reveal mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-4 text-base font-medium text-background transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            {hero.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
