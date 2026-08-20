"use client";

import { useRef } from "react";
import {
  Smartphone,
  Globe,
  Layers,
  Search,
  BarChart3,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Service } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  globe: Globe,
  layers: Layers,
  search: Search,
  "bar-chart": BarChart3,
  sparkles: Sparkles,
};

export default function ServiceCard({ service }: { service: Service }) {
  const accent = service.accentColor ?? "#5C3111";
  const Icon = ICONS[service.icon ?? ""] ?? Layers;

  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = { trigger: root.current, start: "top 88%", once: true };
        gsap.fromTo(
          root.current,
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", scrollTrigger },
        );
        gsap.fromTo(
          bar.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power3.out", scrollTrigger },
        );
      });
    },
    { scope: root },
  );

  return (
    <article
      ref={root}
      className="relative flex flex-col overflow-hidden rounded-[20px] border border-foreground/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md md:p-10"
    >
      <div
        ref={bar}
        className="absolute inset-x-0 top-0 h-[6px] origin-left"
        style={{ backgroundColor: accent }}
        aria-hidden="true"
      />
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${accent}14` }}
      >
        <Icon className="h-6 w-6" style={{ color: accent }} aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-sans text-[20px] font-bold text-[#173042]">
        {service.title}
      </h3>
      <p className="mt-3 font-sans text-[16px] leading-[26px] text-[#454545]">
        {service.description}
      </p>
      <ul className="mt-6 space-y-2.5">
        {service.features.map((f) => (
          <li
            key={f}
            className="flex gap-2.5 font-sans text-[15px] leading-[24px] text-[#454545]"
          >
            <span
              className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
