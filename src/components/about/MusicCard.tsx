"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Play, X } from "lucide-react";

function MusicNote({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#BC7553" aria-hidden="true">
      <rect x="7" y="7.6" width="1.7" height="10.4" rx="0.6" />
      <rect x="16.6" y="5.2" width="1.7" height="10.4" rx="0.6" />
      <path d="M7 7.6 L18.3 5.2 L18.3 8 L7 10.4 Z" />
      <ellipse cx="5.9" cy="17.7" rx="3" ry="2.4" />
      <ellipse cx="15.5" cy="15.3" rx="3" ry="2.4" />
    </svg>
  );
}

const BARS = [0, 0.2, 0.4, 0.15, 0.35, 0.1, 0.3, 0.45, 0.25, 0.05, 0.4, 0.18, 0.32, 0.08];

export default function MusicCard({
  label,
  trackTitle,
  artist,
  embedUrl,
  url,
}: {
  label: string;
  trackTitle: string;
  artist: string;
  embedUrl?: string;
  url?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
  }, [open]);

  return (
    <div
      className="flex h-full w-full flex-col justify-between rounded-[18px] border-4 border-[#BC7553] p-5 shadow-md"
      style={{ backgroundColor: "#12542F" }}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-sans text-[13.09px] font-medium uppercase leading-none tracking-[1.31px] text-[#EFFCF3]">
          <MusicNote className="h-[18px] w-[18px]" />
          {label}
        </span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${trackTitle} on Spotify`}
            className="-m-1 p-1 text-[#BC7553] transition-opacity hover:opacity-70"
          >
            <ArrowUpRight className="h-[22px] w-[22px]" aria-hidden="true" />
          </a>
        )}
      </div>

      <div className="mt-3">
        <p className="font-sans text-[17.18px] font-bold leading-[25.77px] text-[#F8FAFC]">
          {trackTitle}
        </p>
        <p className="font-sans text-[14.24px] font-normal leading-[21.37px] text-white/50">
          {artist}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex h-8 items-end gap-1" aria-hidden="true">
          {BARS.map((d, i) => (
            <span
              key={i}
              className={`w-1 rounded-full bg-[#BC7553] ${
                open ? "[animation:soundbar_1s_ease-in-out_infinite]" : ""
              }`}
              style={{
                height: "100%",
                transformOrigin: "bottom",
                transform: "scaleY(0.4)",
                animationDelay: `${d}s`,
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Play ${trackTitle}`}
          aria-haspopup="dialog"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow transition-transform hover:scale-105"
          style={{ backgroundColor: "#BC7553" }}
        >
          <Play
            className="h-5 w-5 translate-x-[1px]"
            fill="#12542F"
            color="#12542F"
            aria-hidden="true"
          />
        </button>
      </div>

      {open &&
        createPortal(
          <dialog
            ref={dialogRef}
            onClose={() => setOpen(false)}
            onClick={(e) => {
              if (e.target === dialogRef.current) dialogRef.current?.close();
            }}
            aria-label={`${trackTitle} — player`}
            className="m-auto w-[min(560px,92vw)] rounded-[18px] border-4 border-[#BC7553] p-4 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
            style={{ backgroundColor: "#12542F" }}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 font-sans text-[13.09px] font-medium uppercase leading-none tracking-[1.31px] text-[#EFFCF3]">
                <MusicNote className="h-[18px] w-[18px]" />
                {label}
              </span>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close player"
                className="-m-1 p-1 text-[#BC7553] transition-opacity hover:opacity-70"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {embedUrl && (
              <iframe
                src={embedUrl}
                title={`${trackTitle} on Spotify`}
                className="mt-4 h-[152px] w-full rounded-xl sm:h-[352px]"
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            )}

            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 font-sans text-[13px] text-white/60 underline underline-offset-2 transition-colors hover:text-white"
              >
                Open in Spotify
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </dialog>,
          document.body,
        )}
    </div>
  );
}
