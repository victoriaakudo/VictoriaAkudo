"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCaseStudyMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-hero-in]",
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.05 },
        );

        gsap.fromTo(
          "[data-hero-banner]",
          { scale: 1.16, yPercent: -14, autoAlpha: 0, transformOrigin: "50% 0%" },
          { scale: 1, yPercent: 0, autoAlpha: 1, duration: 1.15, ease: "power2.out", delay: 0.05 },
        );

        q("[data-panel]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
          gsap.fromTo(
            el,
            { y: 26 },
            {
              y: -26,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        q("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
        });

        q("[data-count]").forEach((el) => {
          const raw = el.getAttribute("data-count") ?? el.textContent ?? "";
          const m = raw.match(/^(\D*)([\d,]*\.?\d+)(.*)$/);
          if (!m) return;
          const [, prefix, numStr, suffix] = m;
          const target = parseFloat(numStr.replace(/,/g, ""));
          if (!isFinite(target)) return;
          const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
          const useGrouping = numStr.includes(",");
          const fmt = (v: number) =>
            `${prefix}${v.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
              useGrouping,
            })}${suffix}`;
          const obj = { v: 0 };
          el.textContent = fmt(0);
          gsap.to(obj, {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = fmt(obj.v);
            },
          });
        });
      });
    },
    { scope: root },
  );
}
