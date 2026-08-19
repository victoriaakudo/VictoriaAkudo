"use client";

import { useEffect, useRef, useState } from "react";

export const BOARD_W = 920;
export const BOARD_H = 1180;
const MAX_W = 1500;

export default function AboutBoard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / BOARD_W);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const id = requestAnimationFrame(measure);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div ref={ref} className="mx-auto w-full" style={{ maxWidth: MAX_W }}>
      <div style={{ height: BOARD_H * scale }}>
        <div
          className="relative overflow-hidden border-20 border-[#c19b6a]"
          style={{
            width: BOARD_W,
            height: BOARD_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            backgroundColor: "#e1d4b6",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
