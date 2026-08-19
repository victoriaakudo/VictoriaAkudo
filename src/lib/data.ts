import type {
  Project,
  Interaction,
  Service,
  ProcessStep,
  Resume,
  Testimonial,
  About,
  SiteConfig,
} from "./types";

import projectsData from "../data/projects.json";
import interactionsData from "../data/interactions.json";
import servicesData from "../data/services.json";
import resumeData from "../data/resume.json";
import testimonialsData from "../data/testimonials.json";
import aboutData from "../data/about.json";
import siteData from "../data/site.json";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export async function getProjects(): Promise<Project[]> {
  return [...(projectsData as Project[])].sort(byOrder);
}

export async function getProject(slug: string): Promise<Project | null> {
  const found = (projectsData as Project[]).find((p) => p.slug === slug);
  return found ?? null;
}

export async function getNextProject(slug: string): Promise<Project | null> {
  const current = await getProject(slug);
  if (!current?.nextProjectSlug) return null;
  return getProject(current.nextProjectSlug);
}

export async function getInteractions(): Promise<Interaction[]> {
  return [...(interactionsData as Interaction[])].sort(byOrder);
}

export async function getServices(): Promise<Service[]> {
  return [...((servicesData as { services: Service[] }).services)].sort(byOrder);
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return (servicesData as { process: ProcessStep[] }).process;
}

export async function getServicesIntro(): Promise<string> {
  return (servicesData as { intro: string }).intro;
}

export async function getResume(): Promise<Resume> {
  return resumeData as Resume;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return [...(testimonialsData as Testimonial[])].sort(byOrder);
}

export async function getAbout(): Promise<About> {
  return aboutData as About;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return siteData as SiteConfig;
}
