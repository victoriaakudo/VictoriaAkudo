"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { Minus, Plus, X } from "lucide-react";

const MOBILE_QUERY = "(max-width: 767px)";
const MIN_SCALE = 1;
const MAX_SCALE = 4;

function subscribe(onChange: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useIsMobileMedia() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

type Point = { x: number; y: number };

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function MediaLightbox({
  open,
  onClose,
  label,
  triggerRef,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  triggerRef: React.RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointers = useRef(new Map<number, Point>());
  const previousPoint = useRef<Point | null>(null);
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);
  const moved = useRef(false);
  const lastTap = useRef(0);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lenis = useLenis();

  const resetView = useCallback(() => {
    scaleRef.current = 1;
    setScale(1);
    setOffset({ x: 0, y: 0 });
    pointers.current.clear();
    previousPoint.current = null;
    pinchStart.current = null;
    setDragging(false);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    dialog?.showModal();
    lenis?.stop();
    document.body.dataset.lightbox = "open";

    return () => {
      lenis?.start();
      delete document.body.dataset.lightbox;
      trigger?.focus();
    };
  }, [lenis, open, resetView, triggerRef]);

  const setZoom = useCallback((nextScale: number) => {
    const next = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    scaleRef.current = next;
    setScale(next);
    if (next === 1) setOffset({ x: 0, y: 0 });
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = { x: event.clientX, y: event.clientY };
    pointers.current.set(event.pointerId, point);
    previousPoint.current = point;
    moved.current = false;
    setDragging(true);

    if (pointers.current.size === 2) {
      const [first, second] = Array.from(pointers.current.values());
      pinchStart.current = {
        distance: distance(first, second),
        scale: scaleRef.current,
      };
    }
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    const point = { x: event.clientX, y: event.clientY };
    const previous = pointers.current.get(event.pointerId)!;
    if (Math.hypot(point.x - previous.x, point.y - previous.y) > 4) moved.current = true;
    pointers.current.set(event.pointerId, point);

    if (pointers.current.size === 2 && pinchStart.current) {
      const [first, second] = Array.from(pointers.current.values());
      const ratio = distance(first, second) / pinchStart.current.distance;
      setZoom(pinchStart.current.scale * ratio);
      return;
    }

    if (pointers.current.size === 1 && scaleRef.current > 1 && previousPoint.current) {
      const deltaX = point.x - previousPoint.current.x;
      const deltaY = point.y - previousPoint.current.y;
      const limitX = window.innerWidth * (scaleRef.current - 1) * 0.6;
      const limitY = window.innerHeight * (scaleRef.current - 1) * 0.6;
      setOffset((current) => ({
        x: clamp(current.x + deltaX, -limitX, limitX),
        y: clamp(current.y + deltaY, -limitY, limitY),
      }));
    }
    previousPoint.current = point;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    previousPoint.current = pointers.current.values().next().value ?? null;
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) setDragging(false);

    if (!moved.current) {
      const now = Date.now();
      if (now - lastTap.current < 320) {
        lastTap.current = 0;
        close();
      } else {
        lastTap.current = now;
      }
    }
  };

  if (!open) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={() => {
        resetView();
        onClose();
      }}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      aria-label={label}
      className="m-auto h-full max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-white backdrop:bg-[#071119]/95 backdrop:backdrop-blur-sm"
    >
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-start justify-between gap-4 bg-gradient-to-b from-black/65 to-transparent px-4 pb-12 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="min-w-0 pt-2">
          <p className="truncate text-[13px] font-medium text-white/85">{label}</p>
          <p className="mt-1 text-[11px] text-white/55">Pinch or drag · Double-tap to close</p>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close expanded media"
          className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-transform duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div
        data-lenis-prevent
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={close}
        className={`grid h-full w-full touch-none place-items-center overflow-hidden select-none ${
          scale > 1 ? "cursor-grab" : "cursor-zoom-in"
        } ${dragging ? "cursor-grabbing" : ""}`}
      >
        <div
          className="will-change-transform"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            transition: dragging ? "none" : "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {children}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 flex justify-center bg-gradient-to-t from-black/70 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-12">
        <div className="flex items-center rounded-full border border-white/15 bg-black/60 p-1.5 shadow-2xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => setZoom(scaleRef.current - 0.5)}
            disabled={scale <= MIN_SCALE}
            aria-label="Zoom out"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 active:bg-white/15 disabled:opacity-35"
          >
            <Minus className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={resetView}
            aria-label="Reset zoom"
            className="min-w-16 rounded-full px-3 py-2 text-center text-[12px] font-semibold tabular-nums text-white/80 transition-colors hover:bg-white/10"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            type="button"
            onClick={() => setZoom(scaleRef.current + 0.5)}
            disabled={scale >= MAX_SCALE}
            aria-label="Zoom in"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 active:bg-white/15 disabled:opacity-35"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
