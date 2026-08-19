"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialScroller({
  children,
}: {
  children: ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const setOuter = useCallback((el: HTMLDivElement | null) => {
    outerRef.current = el;
    if (el) el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = innerRef.current
          ? Array.from(innerRef.current.children)
          : [];
        gsap.fromTo(
          cards,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: outerRef.current, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: outerRef },
  );

  return (
    <div
      ref={setOuter}
      data-lenis-prevent
      className="mt-12 overflow-x-auto px-6 pb-4 md:mt-16"
    >
      <div ref={innerRef} className="mx-auto max-w-[1500px] flex w-max gap-5">
        {children}
      </div>
    </div>
  );
}
