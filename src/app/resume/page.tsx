import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { getResume } from "@/lib/data";
import ResumeHero from "@/components/resume/ResumeHero";
import ExperienceTimeline from "@/components/resume/ExperienceTimeline";
import SkillsPanel from "@/components/resume/SkillsPanel";

export const metadata: Metadata = {
  title: "Resume — Victoria Akudo",
  description:
    "The background of Victoria Akudo — product design experience, skills, and tools.",
};

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <>
      <ResumeHero badges={resume.badges} resumeFileUrl={resume.resumeFileUrl} />

      <section className="mx-auto max-w-[1500px] px-6 pb-24 md:px-8 md:pb-32">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3 border-b border-foreground/15 pb-4">
              <Briefcase className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="font-display text-[20px] font-black uppercase tracking-[1px] text-[#5C3111]">
                Experience
              </h2>
            </div>
            <ExperienceTimeline experience={resume.experience} />
          </div>

          <div>
            <div className="flex items-center gap-3 border-b border-foreground/15 pb-4">
              <Briefcase className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="font-display text-[20px] font-black uppercase tracking-[1px] text-[#5C3111]">
                Skills
              </h2>
            </div>
            <SkillsPanel skills={resume.skills} />
          </div>
        </div>
      </section>
    </>
  );
}
