"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  useEffect(() => {
    const resize = () => lenisRef.current?.lenis?.resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);
    window.addEventListener("load", resize);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", resize);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;

      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (
        el?.isContentEditable ||
        (el && ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))
      ) {
        return;
      }

      const page = window.innerHeight * 0.9;
      const step = 100;
      let target: number;

      switch (e.key) {
        case "ArrowDown":
          target = lenis.targetScroll + step;
          break;
        case "ArrowUp":
          target = lenis.targetScroll - step;
          break;
        case "PageDown":
          target = lenis.targetScroll + page;
          break;
        case "PageUp":
          target = lenis.targetScroll - page;
          break;
        case " ":
          target = lenis.targetScroll + (e.shiftKey ? -page : page);
          break;
        case "Home":
          target = 0;
          break;
        case "End":
          target = lenis.limit;
          break;
        default:
          return;
      }

      e.preventDefault();
      lenis.scrollTo(target);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
