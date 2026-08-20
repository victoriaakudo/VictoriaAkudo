"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, User, Clock, Wrench } from "lucide-react";
import RichText from "@/components/RichText";
import ScrollToTop from "@/components/ScrollToTop";
import HeroTitle from "@/components/case-study/HeroTitle";
import ZoomableImage from "@/components/case-study/ZoomableImage";
import { useCaseStudyMotion } from "@/components/case-study/useCaseStudyMotion";
import type { Project, Section, ContentBlock, ImageRef } from "@/lib/types";

const RUST = "#B94325";
const GREY_BLUE = "#C2CCD4";
const SAGE = "#C3D0BF";
const NAVY = "#073042";

const C: Record<string, string> = {
  overview: "#C57B57",
  problem: "#C57B57",
  goals: "#073042",
  process: "#2E5E44",
  design: "#5C3111",
  impact: "#C57B57",
  reflection: "#073042",
};

const textOf = (s?: Section): string[] =>
  s?.blocks?.flatMap((b) => (b.kind === "text" ? b.paragraphs : [])) ?? [];
const bulletsOf = (s?: Section): string[] =>
  s?.blocks?.flatMap((b) => (b.kind === "bullets" ? b.items : [])) ?? [];
const marqueeOf = (s?: Section) =>
  s?.blocks?.find(
    (b): b is Extract<ContentBlock, { kind: "marquee" }> => b.kind === "marquee",
  );
const designTexts = (s?: Section) =>
  s?.blocks?.filter(
    (b): b is Extract<ContentBlock, { kind: "text" }> => b.kind === "text",
  ) ?? [];

const SECTION = "py-12 md:py-24 ";
const GoalSECTION = "bg-white py-12 md:py-[64px] ";
const TEXT = "mx-auto max-w-[1500px] px-6 md:px-8";
const IMG = "mx-auto max-w-[1500px] px-6 md:px-8";
const INDENT = "mt-10  md:ml-35 ";
const OverWRAP =
  "mx-auto max-w-[1500px] px-6 md:px-8 flex flex-col gap-6 md:flex-row md:items-start w-full md:justify-between";
const OverINDENT = "font-medium text-[16px] font-sans leading-[26px] md:leading-[29.25px] max-w-[738px] ";

function SectionHeader({
  label,
  color,
  underline = false,
}: {
  label: string;
  color: string;
  underline?: boolean;
}) {
  return (
    <div className="flex items-center gap-5">
      {underline ? (
        <span className="inline-block pb-1 font-display text-[14px] font-semibold uppercase tracking-[2.4px] text-muted">
          {label}
          <div className="mt-2 h-[2px] w-[32px] rounded-full bg-[#BC7553]" />
        </span>
      ) : (
        <span
          className="inline-flex rounded-full px-5 py-2 font-display text-[12px] leading-[16px] font-medium uppercase tracking-[0.6px] text-white"
          style={{ backgroundColor: color }}
        >
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-foreground/15" />
    </div>
  );
}

function Body({ paras }: { paras: string[] }) {
  return (
    <div className="space-y-4 md:space-y-5">
      {paras.map((p, i) => (
        <p
          key={i}
          className="font-sans text-[15px] font-normal leading-[25px] md:text-[16px] md:leading-[29.25px] text-[#454545]"
        >
          <RichText text={p} />
        </p>
      ))}
    </div>
  );
}

function Bullets({ items, color }: { items: string[]; color: string }) {
  if (!items.length) return null;
  return (
    <ul className="mt-6 space-y-2 md:mt-8 md:space-y-3">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex gap-2 font-sans text-[14px] font-medium leading-[23px] md:text-[16px] md:leading-[26px] text-[#454545]"
        >
          <span
            className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full md:mt-[5px] md:h-3.5 md:w-3.5"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          <span>
            <RichText text={it} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function AutoScroll({
  images,
  caption,
  bg,
  className,
}: {
  images: ImageRef[];
  caption?: string;
  bg: string;
  className?: string;
}) {
  return (
    <figure data-reveal className={className}>
      <div
        className="group w-full overflow-hidden rounded-[16px] p-4 md:p-8"
        style={{ backgroundColor: bg }}
      >
        <div className="marquee-track flex w-max animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center gap-5 pr-5"
              aria-hidden={copy === 1}
            >
              {images.map((img, i) => (
                <li key={i}>
                  <ZoomableImage
                    src={img.src}
                    alt={img.alt}
                    width={img.width ?? 1600}
                    height={img.height ?? 1000}
                    className="h-[260px] w-auto rounded-lg md:h-[440px]"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-4 text-center font-sans text-[14px] italic text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function BodyGroup({ sec, color }: { sec?: Section; color: string }) {
  return (
    <div className={INDENT}>
      <Body paras={textOf(sec)} />
      <Bullets items={bulletsOf(sec)} color={color} />
    </div>
  );
}

export default function SponditCaseStudy({
  project,
  next,
}: {
  project: Project;
  next: Project | null;
}) {
  const s = project.sections;
  const problemMq = marqueeOf(s.problem);
  const designMq = marqueeOf(s.design);

  const root = useRef<HTMLElement>(null);
  useCaseStudyMotion(root);

  const metaItems = [
    { icon: User, label: "Role", value: project.meta.role },
    { icon: Clock, label: "Timeline", value: project.meta.timeline },
    { icon: Wrench, label: "Tools", value: project.meta.tools.join(" • ") },
  ];

  return (
    <article ref={root}>
      <header className="relative" style={{ backgroundColor: RUST }}>
        <div className="mx-auto max-w-[1500px] px-6 pt-14 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-[14px] text-[#F5F8DECC] transition-opacity hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All Projects
          </Link>

          <div data-hero-sink className="flex flex-col items-start md:items-end">
            <div className="mt-8 w-full">
              <p
                data-hero-in
                className="font-sans text-[clamp(10px,1.74vw,12px)] font-medium uppercase leading-[16px] tracking-[0.2em] text-[#F5F8DECC]"
              >
                {project.tags.join("  •  ")}
              </p>
              <HeroTitle
                className="mt-4 text-[#F5F8DE]"
                text={
                  project.titleLead
                    ? `${project.titleLead} ${project.title}`
                    : project.title
                }
              />
            </div>

            <div>
              <p
                data-hero-in
                className="mt-6 max-w-[773px] font-sans text-[17px] font-normal leading-[27px] md:text-[18px] md:leading-[29.25px] text-[#F5F8DECC]"
              >
                {project.summary}
              </p>

              <div data-hero-in className="mt-9 flex flex-wrap gap-x-[24px] gap-y-6">
                {metaItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2">
                    <Icon className="h-3.5 w-3.5 mt-1 text-[#F5F8DE]/70" aria-hidden="true" />
                    <div className="font-sans text-[14px] font-semibold leading-[20px]">
                      <span className="font-sans text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-[#F5F8DECC]">
                        {label}
                      </span>
                      <p className="font-sans text-[13px] font-bold leading-[20px] md:text-[14px] text-[#F5F8DE]">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {project.live && (
                <a
                  data-hero-in
                  href={project.live.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-sans text-[14px] leading-[24px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  {project.live.label}
                </a>
              )}
            </div>
          </div>

          <div className="-mx-4 mt-14 max-w-[1132px] overflow-hidden rounded-[20px] md:mx-auto md:rounded-[32px] border-[2.93px] border-[#F5F8DECC]/25">
            <ZoomableImage
              src={project.thumbnail.src}
              alt={project.thumbnail.alt}
              width={1132}
              height={570}
              sizes="(max-width: 1200px) 100vw, 1132px"
              priority
              heroBanner
              className="h-auto w-full"
            />
          </div>
        </div>
      </header>

      <div className="relative z-10  bg-background">
        <section className={SECTION}>
          <div className={OverWRAP}>
            <SectionHeader
              label={s.overview?.eyebrow ?? "Overview"}
              color={C.overview}
              underline
            />
            <div className={OverINDENT}>
              <Body paras={textOf(s.overview)} />
            </div>
          </div>
        </section>

        <section className={GoalSECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader label={s.problem?.eyebrow ?? "Problem"} color={C.problem} />
            <BodyGroup sec={s.problem} color={C.problem} />
          </div>
          {problemMq && (
            <AutoScroll
              images={problemMq.images}
              caption={problemMq.caption}
              bg={GREY_BLUE}
              className={`${IMG} mt-14`}
            />
          )}
        </section>

        <section className={SECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader label={s.goals?.eyebrow ?? "Design Goals"} color={C.goals} />
            <BodyGroup sec={s.goals} color={C.goals} />
          </div>
        </section>

        <section className={GoalSECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader
              label={s.process?.eyebrow ?? "Research & Process"}
              color={C.process}
            />
            <BodyGroup sec={s.process} color={C.process} />
          </div>
        </section>

        <section className={SECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader label={s.design?.eyebrow ?? "Designs"} color={C.design} />
            <div className={INDENT}>
              {designTexts(s.design).map((t, i) => (
                <div key={i} className={i === 0 ? "" : "mt-8"}>
                  <p className="font-sans text-[16px] font-bold text-[#222222]">
                    {t.heading}
                  </p>
                  <div className="mt-1">
                    <Body paras={t.paragraphs} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {designMq && (
            <AutoScroll
              images={designMq.images}
              caption={designMq.caption}
              bg={SAGE}
              className={`${IMG} mt-14`}
            />
          )}
        </section>

        <section className={GoalSECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader label={s.impact?.eyebrow ?? "Impact"} color={C.impact} />
            <BodyGroup sec={s.impact} color={C.impact} />
          </div>
        </section>

        <section className={SECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader
              label={s.reflection?.eyebrow ?? "Reflection"}
              color={C.reflection}
            />
            <BodyGroup sec={s.reflection} color={C.reflection} />
          </div>
        </section>

        <section className="w-full" style={{ backgroundColor: NAVY }}>
          <Link
            href={next ? `/case-studies/${next.slug}` : "/interaction-design"}
            className="group block"
          >
            <div
              data-reveal
              className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-6 py-12 md:px-8 md:py-20"
            >
              <div>
                <p className="font-sans text-[12px] font-medium uppercase tracking-[2.4px] text-[#F5F8DE]/60">
                  {next ? "Next Project" : "What Next?"}
                </p>
                <h2 className="mt-3 font-display text-[24px] font-black uppercase leading-[1.06] tracking-[1px] text-[#F5F8DE] md:text-[44px]">
                  {next
                    ? next.titleLead
                      ? `${next.titleLead} ${next.title}`
                      : next.title
                    : "Check Out My Interaction Designs"}
                </h2>
              </div>
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#F5F8DECC]/40 text-[#F5F8DECC] transition-colors group-hover:bg-[#F5F8DECC] group-hover:text-[#073042]">
                <ArrowUpRight className="h-7 w-7" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </section>
      </div>

      <ScrollToTop />
    </article>
  );
}
