"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";

const MOBILE_QUERY = "(max-width: 767px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.showModal();
    const box = scrollRef.current;
    if (box) box.scrollLeft = (box.scrollWidth - box.clientWidth) / 2;
    lenis?.stop();
    document.body.dataset.lightbox = "open";
    return () => {
      lenis?.start();
      delete document.body.dataset.lightbox;
    };
  }, [open, lenis]);

  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
    />
  );

  if (!isMobile) return img;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`View larger: ${alt}`}
        className="block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left"
      >
        {img}
      </button>

      {open &&
        createPortal(
          <dialog
            ref={dialogRef}
            onClose={() => setOpen(false)}
            aria-label={alt}
            className="m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/90"
          >
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close image"
              className="fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div
              ref={scrollRef}
              data-lenis-prevent
              className="h-full w-full overflow-auto overscroll-contain"
            >
              <div className="grid min-h-full w-max min-w-full place-items-center">
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  sizes="200vw"
                  className="h-auto w-[200vw] max-w-none"
                />
              </div>
            </div>
          </dialog>,
          document.body,
        )}
    </>
  );
}
