import type { Metadata } from "next";
import { getInteractions } from "@/lib/data";
import InteractionCard from "@/components/InteractionCard";
import InteractionHero from "@/components/InteractionHero";

export const metadata: Metadata = {
  title: "Interaction Design — Victoria Akudo",
  description:
    "Animated Figma prototypes — motion and micro-interaction work by Victoria Akudo.",
};

export default async function InteractionDesignPage() {
  const interactions = await getInteractions();

  return (
    <div className="mx-auto max-w-[1500px] px-6 pt-20 pb-20 md:px-8 md:pt-24 md:pb-28">
      <InteractionHero />

      <section className="mt-16 md:mt-24">
        <div className="flex flex-col gap-4 border-b border-foreground/15 pb-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[28px] font-black uppercase tracking-[1px] text-[#5C3111] md:text-[32px]">
            Interaction Work.
          </h2>
          <p className="max-w-[560px] font-sans text-[15px] leading-[24px] text-muted md:text-right">
            All interaction design displayed below were created in Figma. Click
            the Figma link on each of them to interact directly, or click the
            watch button to watch the recorded design process.
          </p>
        </div>
      </section>

      <section className="mt-12 flex flex-col gap-12 md:mt-16">
        {interactions.map((it) => (
          <InteractionCard key={it.slug} it={it} />
        ))}
      </section>
    </div>
  );
}
