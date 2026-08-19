"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  User,
  Clock,
  Wrench,
  VolumeX,
} from "lucide-react";
import RichText from "@/components/RichText";
import ScrollToTop from "@/components/ScrollToTop";
import HeroTitle from "@/components/case-study/HeroTitle";
import ZoomableImage from "@/components/case-study/ZoomableImage";
import { useCaseStudyMotion } from "@/components/case-study/useCaseStudyMotion";
import type {
  Project,
  ProjectSections,
  Section,
  ContentBlock,
  ImageRef,
  Metric,
} from "@/lib/types";

const GREEN = "#1A3020";
const SOUND = "#12542F";
const NAVY = "#073042";

const C: Record<string, string> = {
  overview: "#C57B57",
  problem: "#C57B57",
  process: "#073042",
  design: "#2E5E44",
  collaboration: "#5C3111",
  challenges: "#2E5E44",
  impact: "#C57B57",
  reflection: "#073042",
};

const BARS = [26, 44, 20, 52, 34, 60, 30, 58, 24, 50, 32, 42, 22];

const textOf = (s?: Section): string[] =>
  s?.blocks?.flatMap((b) => (b.kind === "text" ? b.paragraphs : [])) ?? [];

const SECTION = "py-12 md:py-24 ";
const GoalSECTION = "bg-white py-12 md:py-[64px] ";
const TEXT = "mx-auto max-w-[1500px] px-6 md:px-8";
const IMG = "mx-auto max-w-[1500px] px-6 md:px-8";
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

function SubHeading({ text }: { text: string }) {
  return (
    <h3 className="font-display text-[14px] font-semibold uppercase tracking-[2.4px] text-muted">
      {text}
      <div className="mt-2 h-[2px] w-[32px] rounded-full bg-[#BC7553]" />
    </h3>
  );
}

function Panel({ image, className }: { image: ImageRef; className?: string }) {
  return (
    <figure data-panel className={className}>
      <ZoomableImage
        src={image.src}
        alt={image.alt}
        width={image.width ?? 2000}
        height={image.height ?? 1500}
        sizes="100vw"
        className="h-auto w-full rounded-[12px]"
      />
      {image.caption && (
        <figcaption className="mt-4 text-center font-sans text-[14px] italic text-muted">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function AudioPlaceholder({
  src,
  caption,
  className,
}: {
  src?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure data-reveal className={className}>
      {src ? (
        <audio src={src} controls className="w-full">
          <track kind="captions" />
        </audio>
      ) : (
        <div
          className="flex h-[300px] w-full flex-col items-center justify-center gap-6 rounded-[16px]"
          style={{ backgroundColor: SOUND }}
        >
          <VolumeX className="h-11 w-11 text-white" aria-hidden="true" />
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {BARS.map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-full bg-white"
                style={{ height: h }}
              />
            ))}
          </div>
        </div>
      )}
      {caption && (
        <figcaption className="mt-4 text-center font-sans text-[14px] italic text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Metrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className={TEXT}>
      <dl
        data-reveal
        className="mt-12 md:ml-35 flex flex-wrap items-start gap-x-[20px] gap-y-[18px]"
      >
        {metrics.map((m, i) => (
          <div
            key={i}
            className="w-[calc(50%-10px)] h-[124px] min-[460px]:w-[196px] rounded-2xl border border-black/[0.07] bg-white pt-[20.91px] px-[20.91px] pb-[0.91px] shadow-sm"
          >
            <dt
              data-count={m.value}
              className="font-display text-[26px] font-black leading-[32px] min-[460px]:text-[32px] min-[460px]:leading-[38px] text-accent"
            >
              {m.value}
            </dt>
            <dd className="mt-4 max-w-[130px] text-balance font-sans text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-muted">
              {m.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function SectionBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "text") {
          return (
            <div key={i} className={TEXT}>
              <div
                data-reveal
                className={`${i === 0 ? "mt-10" : "mt-16"} max-w-[900px] md:ml-35`}
              >
                {b.heading && <SubHeading text={b.heading} />}
                <div className={b.heading ? "mt-4" : ""}>
                  <Body paras={b.paragraphs} />
                </div>
              </div>
            </div>
          );
        }
        if (b.kind === "image") {
          return (
            <div key={i} className={IMG}>
              <Panel image={b.image} className="mt-10" />
            </div>
          );
        }
        if (b.kind === "audio") {
          return (
            <div key={i} className={IMG}>
              <AudioPlaceholder src={b.src} caption={b.caption} className="mt-10" />
            </div>
          );
        }
        if (b.kind === "metrics") {
          return <Metrics key={i} metrics={b.metrics} />;
        }
        return null;
      })}
    </>
  );
}

const PILLS: { key: keyof ProjectSections; bg: string }[] = [
  { key: "problem", bg: SECTION },
  { key: "process", bg: GoalSECTION },
  { key: "design", bg: SECTION },
  { key: "collaboration", bg: GoalSECTION },
  { key: "challenges", bg: SECTION },
  { key: "impact", bg: GoalSECTION },
  { key: "reflection", bg: SECTION },
];

export default function QuicklyCaseStudy({
  project,
  next,
}: {
  project: Project;
  next: Project | null;
}) {
  const s = project.sections;

  const root = useRef<HTMLElement>(null);
  useCaseStudyMotion(root);

  const metaItems = [
    { icon: User, label: "Role", value: project.meta.role },
    { icon: Clock, label: "Timeline", value: project.meta.timeline },
    { icon: Wrench, label: "Tools", value: project.meta.tools.join(" • ") },
  ];

  return (
    <article ref={root}>
      <header className="relative" style={{ backgroundColor: GREEN }}>
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
                <RichText text={project.summary} />
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

          <div className="-mx-4 mt-14 overflow-hidden rounded-[20px] md:mx-0 md:rounded-[32px]">
            <Image
              data-hero-banner
              src={project.thumbnail.src}
              alt={project.thumbnail.alt}
              width={1132}
              height={570}
              sizes="(max-width: 1200px) 100vw, 1132px"
              priority
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

        {PILLS.map(({ key, bg }) => {
          const sec = s[key];
          if (!sec) return null;
          return (
            <section key={key} className={bg}>
              <div className={TEXT} data-reveal>
                <SectionHeader label={sec.eyebrow ?? key} color={C[key] ?? NAVY} />
              </div>
              <SectionBlocks blocks={sec.blocks ?? []} />
            </section>
          );
        })}

        {next && (
          <section className="w-full" style={{ backgroundColor: NAVY }}>
            <Link href={`/case-studies/${next.slug}`} className="group block">
              <div
                data-reveal
                className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-6 py-12 md:px-8 md:py-20"
              >
                <div>
                  <p className="font-sans text-[12px] font-medium uppercase tracking-[2.4px] text-[#F5F8DE]/60">
                    Next Project
                  </p>
                  <h2 className="mt-3 font-display text-[24px] font-black uppercase leading-[1.06] tracking-[1px] text-[#F5F8DE] md:text-[44px]">
                    {next.titleLead
                      ? `${next.titleLead} ${next.title}`
                      : next.title}
                  </h2>
                </div>
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#F5F8DECC]/40 text-[#F5F8DECC] transition-colors group-hover:bg-[#F5F8DECC] group-hover:text-[#073042]">
                  <ArrowUpRight className="h-7 w-7" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </section>
        )}
      </div>

      <ScrollToTop />
    </article>
  );
}
