"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  Home,
  MousePointerClick,
  LayoutGrid,
  Sparkles,
  FileText,
  User,
  type LucideIcon,
} from "lucide-react";

const ITEM = 52;
const PAD = 28;
const BAR_H = 60;
const CORNER = 20;
const NOTCH_R = 26;
const NOTCH_D = 26;
const SHOULDER = 8;
const KNOB = 44;

function barPath(width: number, cx: number) {
  return [
    `M ${CORNER},0`,
    `H ${cx - NOTCH_R - SHOULDER}`,
    `C ${cx - NOTCH_R},0 ${cx - NOTCH_R},${NOTCH_D} ${cx},${NOTCH_D}`,
    `C ${cx + NOTCH_R},${NOTCH_D} ${cx + NOTCH_R},0 ${cx + NOTCH_R + SHOULDER},0`,
    `H ${width - CORNER}`,
    `A ${CORNER},${CORNER} 0 0 1 ${width},${CORNER}`,
    `V ${BAR_H - CORNER}`,
    `A ${CORNER},${CORNER} 0 0 1 ${width - CORNER},${BAR_H}`,
    `H ${CORNER}`,
    `A ${CORNER},${CORNER} 0 0 1 0,${BAR_H - CORNER}`,
    `V ${CORNER}`,
    `A ${CORNER},${CORNER} 0 0 1 ${CORNER},0`,
    "Z",
  ].join(" ");
}
import type { SiteConfig } from "@/lib/types";

interface NavProps {
  brand: string;
  nav: SiteConfig["nav"];
  contact: SiteConfig["contact"];
}

const ICONS: Record<string, LucideIcon> = {
  "/ai-projects": Sparkles,
  "/interaction-design": MousePointerClick,
  "/services": LayoutGrid,
  "/resume": FileText,
  "/about": User,
};

export default function Nav({ brand, nav, contact }: NavProps) {
  const pathname = usePathname();
  const dockRef = useRef<HTMLElement>(null);
  const mailto = `mailto:${contact.email}`;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const dockItems = [
    { href: "/", label: "Home", icon: Home },
    ...nav.map((item) => ({
      href: item.href,
      label: item.label,
      icon: ICONS[item.href] ?? LayoutGrid,
    })),
  ];
  const dockW = dockItems.length * ITEM + PAD * 2;
  const activeIndex = Math.max(
    0,
    dockItems.findIndex((item) => isActive(item.href)),
  );
  const notchX = PAD + (activeIndex + 0.5) * ITEM;

  useGSAP(
    () => {
      gsap.fromTo(
        dockRef.current,
        { y: 48, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", delay: 0.25 },
      );
    },
    { scope: dockRef },
  );

  return (
    <>
      <header className=" sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-[#C6C5CA]">
        <nav className="mx-auto max-w-[1500px] flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-sans text-[16px] font-bold uppercase tracking-[-1%] leading-[100%] text-[#062937]"
          >
            {brand}
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`text-[16px] font-semibold border-r pr-2 border-[#C6C5CA] font-sans tracking-[-1%] leading-[100%] transition-colors hover:text-[#073042] ${
                  isActive(item.href) ? "text-[#073042]" : "text-[#6D6D6D]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={mailto}
              className="rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Send Me An Email
            </a>
          </div>
        </nav>
      </header>

      <nav
        ref={dockRef}
        aria-label="Primary"
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 md:hidden"
      >
        <div
          className="relative w-full"
          style={{ maxWidth: dockW, height: BAR_H }}
        >
          <svg
            viewBox={`0 0 ${dockW} ${BAR_H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full overflow-visible drop-shadow-lg"
          >
            <path d={barPath(dockW, notchX)} fill="#331B17" />
          </svg>

          <ul className="absolute inset-0">
            {dockItems.map((item, i) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const left = `${((PAD + (i + 0.5) * ITEM) / dockW) * 100}%`;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                    style={
                      active
                        ? { left, top: -2 - KNOB / 2, width: KNOB, height: KNOB }
                        : { left }
                    }
                    className={`absolute flex -translate-x-1/2 items-center justify-center rounded-full ${
                      active
                        ? "bg-[#331B17] text-accent shadow-lg"
                        : "top-1/2 h-11 w-11 -translate-y-1/2 text-background/70 transition-colors hover:text-background"
                    }`}
                  >
                    <Icon className={active ? "h-6 w-6" : "h-5 w-5"} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
