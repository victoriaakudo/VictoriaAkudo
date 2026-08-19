"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ExternalLink, User, Clock, Wrench } from "lucide-react";
import RichText from "@/components/RichText";
import ScrollToTop from "@/components/ScrollToTop";
import HeroTitle from "@/components/case-study/HeroTitle";
import ZoomableImage from "@/components/case-study/ZoomableImage";
import { useCaseStudyMotion } from "@/components/case-study/useCaseStudyMotion";
import type {
  Project,
  Section,
  ContentBlock,
  ImageRef,
} from "@/lib/types";

const C = {
  overview: "#C57B57",
  problem: "#C57B57",
  goals: "#073042",
  process: "#2E5E44",
  design: "#5C3111",
  impact: "#C57B57",
  reflection: "#073042",
} as const;

const NAVY = "#073042";

const textOf = (s?: Section): string[] =>
  s?.blocks?.flatMap((b) => (b.kind === "text" ? b.paragraphs : [])) ?? [];

const bulletsOf = (s?: Section): string[] =>
  s?.blocks?.flatMap((b) => (b.kind === "bullets" ? b.items : [])) ?? [];

const firstImage = (s?: Section): ImageRef | undefined => {
  for (const b of s?.blocks ?? []) {
    if (b.kind === "image") return b.image;
    if (b.kind === "gallery" && b.images.length) return b.images[0];
  }
  return undefined;
};

const videoOf = (s?: Section) =>
  s?.blocks?.find(
    (b): b is Extract<ContentBlock, { kind: "video" }> => b.kind === "video",
  );

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
        <span
          className="inline-block pb-1 font-display text-[14px] font-semibold uppercase tracking-[2.4px] text-muted"
          style={{ borderColor: color }}
        >
          {label}
          <div className="h-[2px] w-[32px] bg-[#BC7553]" />
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

function Panel({ image, className }: { image: ImageRef; className?: string }) {
  return (
    <figure data-panel className={className}>
      <ZoomableImage
        src={image.src}
        alt={image.alt}
        width={image.width ?? 2000}
        height={image.height ?? 1500}
        sizes="(max-width: 1200px) 100vw, 1132px"
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

const SECTION = "py-12 md:py-24 ";
const GoalSECTION = "bg-white py-12 md:py-[64px] ";
const TEXT = "mx-auto max-w-[1500px] px-6 md:px-8";
const IMG = "mx-auto max-w-[1500px] px-6 md:px-8";
const INDENT = "mt-10  md:ml-35 ";
const OverWRAP =
  "mx-auto max-w-[1500px] px-6 md:px-8 flex flex-col gap-6 md:flex-row md:items-start w-full md:justify-between";
const OverINDENT = "font-medium text-[16px] font-sans leading-[26px] md:leading-[29.25px] max-w-[738px] ";

export default function DesignSystemCaseStudy({
  project,
  next,
}: {
  project: Project;
  next: Project | null;
}) {
  const s = project.sections;
  const beforeImg = firstImage(s.problem);
  const processImg = firstImage(s.process);
  const designVideo = videoOf(s.design);

  const root = useRef<HTMLElement>(null);
  useCaseStudyMotion(root);

  const metaItems = [
    { icon: User, label: "Role", value: project.meta.role },
    { icon: Clock, label: "Timeline", value: project.meta.timeline },
    { icon: Wrench, label: "Tools", value: project.meta.tools.join(" • ") },
  ];

  return (
    <article ref={root}>
      <header
        className="relative"
        style={{
          backgroundColor: NAVY,
          backgroundImage:
            "url('/images/projects/design-system/hero-pattern.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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

            <div className="max-w-[830px]">
              <p
                data-hero-in
                className="mt-6 font-sans text-[17px] font-normal leading-[27px] md:text-[18px] md:leading-[29.25px] text-[#F5F8DECC]"
              >
                {project.summary}
              </p>

              <div data-hero-in className="mt-9 flex flex-wrap gap-x-[24px] gap-y-6">
                {metaItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2">
                    <Icon
                      className="h-3.5 w-3.5 mt-1 text-[#F5F8DE]/70"
                      aria-hidden="true"
                    />
                    <div className="font-sans text-[14px] font-semibold leading-[20px]">
                      <span className="font-sans text-[12px] font-medium uppercase leading-[16px] text-[#F5F8DECC] tracking-[0.6px]">
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
        <section className="bg-white py-[64px] md:py-24">
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

        <section className={SECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader label={s.problem?.eyebrow ?? "Problem"} color={C.problem} />
            <div className={INDENT}>
              <Body paras={textOf(s.problem)} />
              <Bullets items={bulletsOf(s.problem)} color={C.problem} />
            </div>
          </div>
          {beforeImg && (
            <div className={`${IMG} mx-auto max-w-[1500px]`}>
              <Panel image={beforeImg} className="mt-14" />
            </div>
          )}
        </section>

        <section className={GoalSECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader label={s.goals?.eyebrow ?? "Goals"} color={C.goals} />
            <div className={INDENT}>
              <Body paras={textOf(s.goals)} />
              <Bullets items={bulletsOf(s.goals)} color={C.goals} />
            </div>
          </div>
        </section>

        <section className={SECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader label={s.process?.eyebrow ?? "Process"} color={C.process} />
            <div className={INDENT}>
              <Body paras={textOf(s.process)} />
              <Bullets items={bulletsOf(s.process)} color={C.process} />
            </div>
          </div>
          {processImg && (
            <div className={`${IMG} mx-auto max-w-[1500px]`}>
              <Panel image={processImg} className="mt-14" />
            </div>
          )}
        </section>

        <section className={GoalSECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader label={s.design?.eyebrow ?? "Design"} color={C.design} />
            <div className={INDENT}>
              <Body paras={textOf(s.design)} />
              <Bullets items={bulletsOf(s.design)} color={C.design} />
            </div>
          </div>
        </section>
        {designVideo && (
          <section className="w-full bg-white">
            <figure data-panel>
              <video
                src={designVideo.src}
                poster={designVideo.poster}
                autoPlay={designVideo.autoplay}
                loop={designVideo.loop}
                muted={designVideo.muted}
                playsInline
                controls={!designVideo.autoplay}
                className="h-auto w-full"
              />
              {designVideo.caption && (
                <figcaption className=" pb-20 pt-5 text-center font-sans text-[14px] italic text-muted">
                  {designVideo.caption}
                </figcaption>
              )}
            </figure>
          </section>
        )}

        <section className={SECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader label={s.impact?.eyebrow ?? "Impact"} color={C.impact} />
            <div className={INDENT}>
              <Body paras={textOf(s.impact)} />
              <Bullets items={bulletsOf(s.impact)} color={C.impact} />
            </div>
          </div>
        </section>

        <section className={GoalSECTION}>
          <div data-reveal className={TEXT}>
            <SectionHeader
              label={s.reflection?.eyebrow ?? "Reflection"}
              color={C.reflection}
            />
            <div className={INDENT}>
              <Body paras={textOf(s.reflection)} />
            </div>
          </div>
        </section>

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
