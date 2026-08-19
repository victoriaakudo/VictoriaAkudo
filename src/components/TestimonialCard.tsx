import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article
      data-testimonial={testimonial.name}
      className="flex h-full w-[min(389px,82vw)] shrink-0 flex-col gap-5 rounded-2xl border-[0.91px] border-foreground/10 bg-white p-7.25"
    >
      <Quote className="h-7 w-7 text-accent" aria-hidden="true" />

      <p className="flex-1 text-[14px] font-normal leading-[22.75px] text-foreground/80">
        {testimonial.quote}
      </p>

      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-background"
          aria-hidden="true"
        >
          {initials(testimonial.name)}
        </span>
        <div>
          <p className="text-[14px] font-semibold leading-5 text-foreground">
            {testimonial.name}
          </p>
          <p className="text-[12px] font-normal leading-4 text-muted">
            {testimonial.title}
          </p>
        </div>
      </div>
    </article>
  );
}
