import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjects, getProject } from "@/lib/data";
import type { ProjectSections } from "@/lib/types";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import LoanCaseStudy from "@/components/case-study/LoanCaseStudy";
import DesignSystemCaseStudy from "@/components/case-study/DesignSystemCaseStudy";
import EventsCaseStudy from "@/components/case-study/EventsCaseStudy";
import QuicklyCaseStudy from "@/components/case-study/QuicklyCaseStudy";
import SponditCaseStudy from "@/components/case-study/SponditCaseStudy";

const SECTION_ORDER: (keyof ProjectSections)[] = [
  "overview",
  "problem",
  "goals",
  "process",
  "design",
  "impact",
  "reflection",
];

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Victoria Akudo`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const next = project.nextProjectSlug
    ? await getProject(project.nextProjectSlug)
    : null;

  if (slug === "sycamore-loan-redesign") {
    return <LoanCaseStudy project={project} next={next} />;
  }
  if (slug === "sycamore-design-system") {
    return <DesignSystemCaseStudy project={project} next={next} />;
  }
  if (slug === "events-by-sycamore") {
    return <EventsCaseStudy project={project} next={next} />;
  }
  if (slug === "quickly-word-game") {
    return <QuicklyCaseStudy project={project} next={next} />;
  }
  if (slug === "spondit-smart-traffic") {
    return <SponditCaseStudy project={project} next={next} />;
  }

  return (
    <article className="pb-24">
      <header className="mx-auto max-w-6xl px-6 pt-12 md:pt-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mt-8 max-w-3xl">
          <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl">
            {project.titleLead
              ? `${project.titleLead} ${project.title}`
              : project.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            {project.summary}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8 border-t border-foreground/10 pt-8 md:flex-row md:items-end md:justify-between">
          <dl className="grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                Role
              </dt>
              <dd className="mt-1 text-sm text-foreground">{project.meta.role}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                Timeline
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {project.meta.timeline}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                Tools
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {project.meta.tools.join(", ")}
              </dd>
            </div>
          </dl>

          {project.live && (
            <a
              href={project.live.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              {project.live.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <div
          className="mt-12 w-full overflow-hidden rounded-[39px] border-[2.93px] border-foreground/10"
          style={{ backgroundColor: project.accentColor ?? "#F5F8DE" }}
        >
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            width={1132}
            height={570}
            sizes="(max-width: 1152px) 100vw, 1104px"
            className="h-auto w-full"
            priority
          />
        </div>
      </header>

      <div className="mt-16 space-y-16 px-6 md:mt-24 md:space-y-24">
        {SECTION_ORDER.map((key) => {
          const section = project.sections[key];
          if (!section?.blocks?.length) return null;
          return (
            <section key={key} className="mx-auto max-w-6xl">
              {section.eyebrow && (
                <p className="mx-auto mb-8 max-w-2xl font-display text-sm font-bold uppercase tracking-wide text-brand">
                  {section.eyebrow}
                </p>
              )}
              <div className="space-y-10">
                {section.blocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {next && (
        <div className="mx-auto mt-24 max-w-6xl px-6">
          <Link
            href={`/case-studies/${next.slug}`}
            className="group block border-t border-foreground/10 pt-10"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Next project
            </p>
            <div className="mt-3 flex items-center justify-between gap-6">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-brand sm:text-4xl">
                {next.titleLead ? `${next.titleLead} ${next.title}` : next.title}
              </h2>
              <ArrowUpRight className="h-8 w-8 shrink-0 text-brand" />
            </div>
          </Link>
        </div>
      )}
    </article>
  );
}
