"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/lib/types";
import ProjectCard from "@/components/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function SelectedProjects({
  projects,
  intro,
}: {
  projects: Project[];
  intro: string;
}) {
  const [before, after] = intro.split("HERE");

  const root = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: root.current, start: "top 80%", once: true };
        gsap.fromTo(
          headingRef.current,
          { x: -32, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", scrollTrigger: st },
        );
        gsap.fromTo(
          introRef.current,
          { x: 32, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", scrollTrigger: st },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="mx-auto max-w-[1500px] px-6 py-14 md:py-28">
      <div className="flex flex-col gap-4 border-b border-foreground/10 pb-6 md:flex-row md:items-start md:justify-between md:gap-6 md:border-0 md:pb-0">
        <h2
          ref={headingRef}
          className="shrink-0 font-display font-black uppercase text-[26px] leading-[1.1] tracking-[-0.72px] text-brand md:whitespace-nowrap md:text-[28.67px] md:leading-[38.23px]"
        >
          Selected Projects.
        </h2>
        <p
          ref={introRef}
          className="w-full text-left text-[15px] font-normal leading-[23px] text-foreground md:w-213.5 md:text-right md:text-[16px] md:leading-[23.89px] md:text-muted"
        >
          {after !== undefined ? (
            <>
              {before}
              <Link
                href="/"
                className="font-bold text-foreground underline underline-offset-2 transition-opacity hover:opacity-70"
              >
                HERE
              </Link>
              {after}
            </>
          ) : (
            intro
          )}
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-12 md:mt-16 md:gap-24">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
