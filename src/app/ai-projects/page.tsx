import type { Metadata } from "next";
import AIProjectsHero from "@/components/ai-projects/AIProjectsHero";
import AIProjectCard from "@/components/ai-projects/AIProjectCard";
import { aiProjects } from "@/data/ai-projects";

export const metadata: Metadata = {
  title: "AI Projects — Victoria Akudo",
  description:
    "AI applications and AI-aided product design work by Victoria Akudo, including Again, SlotWise, and EduPay.",
};

export default function AIProjectsPage() {
  const applications = aiProjects.filter((project) => project.category === "Built & deployed");
  const aidedDesigns = aiProjects.filter((project) => project.category === "AI-aided design");

  return (
    <div>
      <AIProjectsHero />

      <div className="mx-auto max-w-[1500px] px-6 pb-20 md:px-8 md:pb-28">
        <section aria-labelledby="built-deployed-heading">
          <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[1.8px] text-accent">
                Category 01
              </p>
              <h2
                id="built-deployed-heading"
                className="mt-2 font-display text-[30px] font-black uppercase tracking-[-0.02em] text-brand md:text-[38px]"
              >
                Built & deployed.
              </h2>
            </div>
            <p className="max-w-[520px] text-[15px] leading-[24px] text-muted md:text-right">
              End-to-end products shaped with AI and developed into working, publicly accessible applications.
            </p>
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {applications.map((project) => (
              <AIProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section className="mt-24 md:mt-36" aria-labelledby="ai-aided-heading">
          <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[1.8px] text-accent">
                Category 02
              </p>
              <h2
                id="ai-aided-heading"
                className="mt-2 font-display text-[30px] font-black uppercase tracking-[-0.02em] text-brand md:text-[38px]"
              >
                AI-aided design.
              </h2>
            </div>
            <p className="max-w-[520px] text-[15px] leading-[24px] text-muted md:text-right">
              Product concepts where AI accelerated exploration and prototyping while design judgment shaped the final experience.
            </p>
          </div>

          {aidedDesigns.map((project) => (
            <AIProjectCard key={project.title} project={project} />
          ))}
        </section>
      </div>
    </div>
  );
}
