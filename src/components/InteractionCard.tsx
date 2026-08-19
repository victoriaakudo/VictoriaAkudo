"use client";

import { useRef } from "react";
import { Play, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { onAccent } from "@/lib/accent";
import type { Interaction } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export function PrototypePlaceholder({
  accent,
  aspectRatio = "16 / 10",
  fill = false,
  label = "Interactive prototype",
  className,
}: {
  accent: string;
  aspectRatio?: string;
  fill?: boolean;
  label?: string;
  className?: string;
}) {
  const fg = onAccent(accent);
  return (
    <div
      className={`relative w-full ${fill ? "h-full" : ""} ${className ?? ""}`}
      style={fill ? { backgroundColor: accent } : { aspectRatio, backgroundColor: accent }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full shadow-sm"
          style={{ backgroundColor: fg }}
        >
          <Play
            className="h-6 w-6"
            style={{ color: accent, fill: accent }}
            aria-hidden="true"
          />
        </span>
        <span
          className="font-sans text-[12px] font-medium uppercase tracking-[1.5px]"
          style={{ color: fg }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default function InteractionCard({ it }: { it: Interaction }) {
  const accent = it.accentColor ?? "#C57B57";
  const action = it.watchUrl
    ? { href: it.watchUrl, label: it.watchLabel ?? "Watch Design Process" }
    : it.fullPrototypeUrl
      ? { href: it.fullPrototypeUrl, label: it.watchLabel ?? "See Full Prototype" }
      : null;

  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current,
          { y: 48, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
          },
        );
        if (preview.current) {
          gsap.set(preview.current, { scale: 1.14 });
          gsap.fromTo(
            preview.current,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <article
      ref={root}
      className="flex w-full flex-col overflow-hidden rounded-[19.11px] border-[1.5px] border-foreground/10 bg-white shadow-sm"
    >
      <div
        className="relative aspect-video w-full overflow-hidden"
        style={{
          backgroundColor: accent,
          aspectRatio:
            it.previewWidth && it.previewHeight
              ? `${it.previewWidth} / ${it.previewHeight}`
              : undefined,
        }}
      >
        {it.previewVideo ? (
          <video
            src={it.previewVideo}
            title={it.title}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <div ref={preview} className="absolute inset-0">
            <PrototypePlaceholder accent={accent} fill />
          </div>
        )}
      </div>

      <div className="px-6 py-6 md:px-8 md:py-8">
        <p className="font-sans text-[12px] font-medium uppercase tracking-[1.5px] text-muted">
          {it.category} · {it.year}
        </p>
        <h3 className="mt-2 font-sans text-[20px] font-bold text-[#173042]">
          {it.title}
        </h3>
        <p className="mt-3 max-w-[900px] font-sans text-[16px] leading-[26px] text-[#454545]">
          {it.description}
        </p>

        {it.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {it.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-foreground/15 px-3 py-1 font-sans text-[13px] text-[#454545]"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {action && (
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-sans text-[14px] font-medium text-white transition-opacity hover:opacity-90"
          >
            {action.label}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
