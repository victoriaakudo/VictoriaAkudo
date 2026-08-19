import type { Metadata } from "next";
import { getServices, getProcessSteps, getServicesIntro } from "@/lib/data";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceCard from "@/components/services/ServiceCard";
import ProcessStrip from "@/components/services/ProcessStrip";

export const metadata: Metadata = {
  title: "Services — Victoria Akudo",
  description:
    "Product design services by Victoria Akudo — mobile & web app design, design systems, UX research, and design audits.",
};

export default async function ServicesPage() {
  const [services, steps, intro] = await Promise.all([
    getServices(),
    getProcessSteps(),
    getServicesIntro(),
  ]);

  return (
    <>
      <ServicesHero intro={intro} />

      <section className="bg-white">
        <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-8 md:py-28">
          <div className="flex items-center gap-6">
            <h2 className="shrink-0 font-display text-[28px] font-black uppercase tracking-[1px] text-[#5C3111] md:text-[32px]">
              What I Offer.
            </h2>
            <div className="h-px flex-1 bg-foreground/15" />
          </div>
          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-8 md:py-28">
        <div className="flex items-center gap-6">
          <h2 className="shrink-0 font-display text-[28px] font-black uppercase tracking-[1px] text-[#5C3111] md:text-[32px]">
            How I Work.
          </h2>
          <div className="h-px flex-1 bg-foreground/15" />
        </div>
        <ProcessStrip steps={steps} />
      </section>
    </>
  );
}
