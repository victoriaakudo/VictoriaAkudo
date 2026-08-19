import Image from "next/image";
import RichText from "@/components/RichText";
import type { ContentBlock, ImageRef } from "@/lib/types";

const IMG_WIDTH: Record<"inset" | "full" | "bleed", string> = {
  inset: "max-w-xl",
  full: "max-w-3xl",
  bleed: "max-w-5xl",
};

function blockHeading(text: string) {
  return (
    <h3 className="mb-4 font-display text-xl font-bold uppercase tracking-tight text-foreground">
      {text}
    </h3>
  );
}

function Figure({ image, className }: { image: ImageRef; className?: string }) {
  return (
    <figure className={className}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width ?? 1600}
        height={image.height ?? 1000}
        sizes="(max-width: 768px) 100vw, 800px"
        className="h-auto w-full rounded-2xl"
      />
      {image.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <div className="mx-auto max-w-2xl">
          {block.heading && blockHeading(block.heading)}
          <div className="space-y-4">
            {block.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-7 text-foreground/80">
                <RichText text={p} />
              </p>
            ))}
          </div>
        </div>
      );

    case "quote":
      return (
        <blockquote className="mx-auto max-w-2xl border-l-2 border-accent pl-5 text-lg font-medium italic leading-8 text-foreground">
          <RichText text={block.text} />
        </blockquote>
      );

    case "bullets":
      return (
        <div className="mx-auto max-w-2xl">
          {block.heading && blockHeading(block.heading)}
          <ul className="space-y-3">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-3 text-base leading-7 text-foreground/80">
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span>
                  <RichText text={it} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "image":
      return (
        <Figure image={block.image} className={`mx-auto ${IMG_WIDTH[block.width ?? "full"]}`} />
      );

    case "video":
      return (
        <figure className="mx-auto max-w-4xl">
          <video
            src={block.src}
            poster={block.poster}
            muted={block.muted}
            loop={block.loop}
            autoPlay={block.autoplay}
            playsInline
            controls={!block.autoplay}
            className="h-auto w-full rounded-2xl"
          />
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "audio":
      return (
        <figure className="mx-auto max-w-4xl">
          {block.src ? (
            <audio src={block.src} controls className="w-full">
              <track kind="captions" />
            </audio>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <span aria-hidden="true">🔇</span>
            </div>
          )}
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "gallery":
      return (
        <div
          className={`mx-auto grid max-w-5xl gap-4 ${
            block.columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {block.images.map((img, i) => (
            <Image
              key={i}
              src={img.src}
              alt={img.alt}
              width={img.width ?? 800}
              height={img.height ?? 600}
              sizes="(max-width: 640px) 100vw, 500px"
              className="h-auto w-full rounded-xl"
            />
          ))}
        </div>
      );

    case "marquee": {
      const pause = block.pauseOnHover
        ? "group-hover:[animation-play-state:paused]"
        : "";
      return (
        <div className="group w-full overflow-hidden">
          <div className={`flex w-max animate-[marquee_60s_linear_infinite] ${pause}`}>
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 items-center gap-4 pr-4"
                aria-hidden={copy === 1}
              >
                {block.images.map((img, i) => (
                  <li key={i}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={500}
                      height={320}
                      className="h-56 w-auto rounded-xl"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      );
    }

    case "metrics":
      return (
        <dl className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3">
          {block.metrics.map((m, i) => (
            <div key={i}>
              <dt className="font-display text-4xl font-black tracking-tight text-brand">
                {m.value}
              </dt>
              <dd className="mt-1 text-sm text-muted">{m.label}</dd>
            </div>
          ))}
        </dl>
      );
  }
}
