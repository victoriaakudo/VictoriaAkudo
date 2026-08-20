"use client";

import { useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import MediaLightbox, { useIsMobileMedia } from "./MediaLightbox";

interface ZoomableVideoProps {
  src: string;
  label: string;
  poster?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
}

export default function ZoomableVideo({
  src,
  label,
  poster,
  muted,
  loop,
  autoPlay,
  controls,
  className,
}: ZoomableVideoProps) {
  const isMobile = useIsMobileMedia();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (!isMobile) {
    return (
      <video
        src={src}
        poster={poster}
        muted={muted}
        loop={loop}
        autoPlay={autoPlay}
        playsInline
        controls={controls}
        className={className}
      />
    );
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Expand video: ${label}`}
        className="group relative block w-full cursor-zoom-in appearance-none overflow-hidden border-0 bg-transparent p-0 text-left active:scale-[0.99]"
      >
        <video
          src={src}
          poster={poster}
          muted
          loop={loop}
          autoPlay={autoPlay}
          playsInline
          preload="metadata"
          className={className}
        />
        <span className="pointer-events-none absolute bottom-3 right-3 flex h-10 items-center gap-1.5 rounded-full bg-black/65 px-3 text-[11px] font-semibold text-white shadow-lg backdrop-blur-sm">
          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
          Expand
        </span>
      </button>

      <MediaLightbox
        open={open}
        onClose={() => setOpen(false)}
        label={label}
        triggerRef={triggerRef}
      >
        <video
          src={src}
          poster={poster}
          muted={muted}
          loop={loop}
          autoPlay={autoPlay}
          playsInline
          controls
          className="max-h-[calc(100dvh-8rem)] w-auto max-w-[94vw] object-contain"
        />
      </MediaLightbox>
    </>
  );
}
