"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ project }: { project: Project }) {
  const accent = project.accentColor ?? "#F5F8DE";
  const title = project.titleLead
    ? `${project.titleLead} ${project.title}`
    : project.title;

  const root = useRef<HTMLElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          linkRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
          },
        );
        gsap.fromTo(
          labelRef.current,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
          },
        );
        gsap.set(imgWrap.current, { scale: 1.03 });
        gsap.fromTo(
          imgWrap.current,
          { yPercent: -1.5 },
          {
            yPercent: 1.5,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <article ref={root} data-project={project.slug}>
      <Link
        ref={linkRef}
        href={`/case-studies/${project.slug}`}
        aria-label={`View case study: ${title}`}
        className="group relative block w-full overflow-hidden rounded-[20px] border-[2px] border-foreground/10 aspect-[1132/570] md:rounded-[39px] md:border-[2.93px]"
        style={{ backgroundColor: accent }}
      >
        <div ref={imgWrap} className="absolute inset-0">
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            fill
            sizes="(max-width: 1152px) 100vw, 1104px"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="inline-flex scale-95 items-center gap-2 rounded-lg bg-white px-6 py-4 text-sm font-medium text-accent shadow-lg transition-transform duration-300 group-hover:scale-100">
            View Case Study
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>

      <div
        ref={labelRef}
        className="mt-5 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6"
      >
        <h3 className="text-[17px] font-bold leading-[1.2] text-[#232323] md:text-[22px] md:leading-[23.41px]">
          {title}
        </h3>
        <p className="text-[14px] font-medium uppercase leading-[23.41px] text-muted md:text-right">
          {project.tags.join(" • ")}
        </p>
      </div>
    </article>
  );
}
