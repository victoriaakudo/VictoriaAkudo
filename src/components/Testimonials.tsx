"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Testimonial } from "@/lib/types";
import TestimonialCard from "@/components/TestimonialCard";
import TestimonialScroller from "@/components/TestimonialScroller";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials({
  testimonials,
  eyebrow,
  title,
}: {
  testimonials: Testimonial[];
  eyebrow: string;
  title: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".t-reveal",
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
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
    <section ref={root} className="py-14 md:py-28">
      <div className="mx-auto max-w-[1500px] flex flex-col gap-6 border-b border-foreground/10 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between md:pb-8">
        <div className="t-reveal">
          <p className="text-[12px] font-medium uppercase leading-4 tracking-[1.8px] text-muted">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display font-black uppercase text-[28px] leading-[37.33px] tracking-[-0.28px] text-brand">
            {title}
          </h2>
        </div>
        <Link
          href="/about"
          className="t-reveal inline-flex items-center gap-1 font-(family-name:--font-satoshi) text-[14px] font-medium leading-5 text-brand transition-opacity hover:opacity-70"
        >
          More about me
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <TestimonialScroller>
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} testimonial={t} />
        ))}
      </TestimonialScroller>
    </section>
  );
}
