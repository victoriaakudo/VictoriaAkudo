"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { AIProject } from "@/data/ai-projects";

gsap.registerPlugin(ScrollTrigger);

export default function AIProjectCard({ project }: { project: AIProject }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = { trigger: root.current, start: "top 84%", once: true };

        gsap.fromTo(
          "[data-project-image]",
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.out", scrollTrigger: trigger },
        );
        gsap.fromTo(
          "[data-project-copy]",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07, ease: "power3.out", scrollTrigger: trigger },
        );
      });
    },
    { scope: root },
  );

  return (
    <article ref={root} className="border-t border-foreground/15 pt-6 md:pt-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.7fr)] lg:gap-12">
        <div
          data-project-image
          className="group relative aspect-[16/9] overflow-hidden rounded-[20px] border border-foreground/10 md:rounded-[30px]"
          style={{ backgroundColor: project.wash }}
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority={project.number === "01"}
            sizes="(max-width: 1024px) 100vw, 68vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.13), transparent)" }}
          />
        </div>

        <div className="flex flex-col lg:py-1">
          <div data-project-copy className="flex items-start justify-between gap-5">
            <span
              className="inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[1.4px]"
              style={{ color: project.accent, backgroundColor: project.wash }}
            >
              {project.category}
            </span>
            <span className="font-display text-[14px] font-bold text-muted/70">
              {project.number} / 03
            </span>
          </div>

          <p
            data-project-copy
            className="mt-8 text-[12px] font-semibold uppercase tracking-[1.7px] text-muted"
          >
            {project.eyebrow}
          </p>
          <h2
            data-project-copy
            className="mt-2 font-display text-[48px] font-black uppercase leading-none tracking-[-0.035em] text-[#173042] md:text-[64px]"
          >
            {project.title}.
          </h2>
          <p data-project-copy className="mt-5 text-[16px] leading-[26px] text-[#454545]">
            {project.description}
          </p>

          <div data-project-copy className="mt-7">
            <p className="text-[11px] font-bold uppercase tracking-[1.6px] text-muted">
              Technology
            </p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-foreground/10 bg-white/50 px-3 py-1.5 text-[12px] font-medium text-[#454545]"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          <div data-project-copy className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-10">
            {project.links.map((link) => {
              const Icon = link.href.includes("github.com") ? Code2 : ArrowUpRight;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-[14px] font-semibold transition-[transform,opacity,background-color] duration-150 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 ${
                    link.kind === "primary"
                      ? "text-white hover:opacity-90"
                      : "border border-foreground/15 bg-white/50 text-[#173042] hover:bg-white"
                  }`}
                  style={link.kind === "primary" ? { backgroundColor: project.accent } : undefined}
                >
                  {link.label}
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
