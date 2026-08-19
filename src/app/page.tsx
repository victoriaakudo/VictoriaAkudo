import Hero from "@/components/Hero";
import SelectedProjects from "@/components/SelectedProjects";
import Testimonials from "@/components/Testimonials";
import { getProjects, getSiteConfig, getTestimonials } from "@/lib/data";

export default async function Home() {
  const [site, projects, testimonials] = await Promise.all([
    getSiteConfig(),
    getProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero hero={site.hero} email={site.contact.email} />
      <SelectedProjects
        projects={projects}
        intro={site.selectedProjectsIntro}
      />
      <Testimonials
        testimonials={testimonials}
        eyebrow={site.testimonialsEyebrow}
        title={site.testimonialsTitle}
      />
    </>
  );
}
