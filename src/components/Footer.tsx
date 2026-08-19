import Link from "next/link";
import { Mail, FileText, type LucideIcon } from "lucide-react";
import type { SiteConfig } from "@/lib/types";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

interface FooterProps {
  footer: SiteConfig["footer"];
  contact: SiteConfig["contact"];
  nav: SiteConfig["nav"];
  brand: string;
}

type Cta = { label: string; href: string };

function CtaButton({
  cta,
  primary,
  icon: Icon,
}: {
  cta: Cta;
  primary: boolean;
  icon: LucideIcon;
}) {
  const base =
    "inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-4 text-sm font-medium transition-opacity hover:opacity-90 sm:flex-none sm:px-6";
  const className = primary
    ? `${base} bg-accent text-[#FFFFFF]`
    : `${base} border-[0.5px] border-foreground/10 bg-[#FFFFFF] text-accent`;

  const content = (
    <>
      <Icon className="h-4 w-4" />
      {cta.label}
    </>
  );

  return cta.href.startsWith("/") ? (
    <Link href={cta.href} className={className}>
      {content}
    </Link>
  ) : (
    <a href={cta.href} className={className}>
      {content}
    </a>
  );
}

const eyebrowClass =
  "text-[12px] font-semibold uppercase leading-4 tracking-[1.8px] text-white/50";
const linkClass =
  "text-[14px] font-normal leading-5 text-white/60 transition-colors hover:text-white";

export default function Footer({ footer, contact, nav, brand }: FooterProps) {
  const navLinks = [{ label: "Product Design", href: "/" }, ...nav];

  return (
    <footer className="bg-footer text-background">
      <div className="mx-auto max-w-[1500px] px-6 pt-16 pb-28 md:pt-20 md:pb-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(44px,14vw,60px)] font-black uppercase leading-none tracking-[-0.025em] sm:text-6xl lg:text-7xl">
            {footer.heading}
          </h2>
          <div className="flex gap-3">
            <CtaButton cta={footer.ctaPrimary} primary icon={Mail} />
            <CtaButton cta={footer.ctaSecondary} primary={false} icon={FileText} />
          </div>
        </div>

        <div className="my-12 border-t border-background/15" />

        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-[16px] font-bold leading-6 tracking-[-0.4px] text-white">
              {brand}
            </p>
            <p className="mt-4 max-w-xs text-[14px] font-normal leading-[22.75px] text-white/50">
              {footer.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-background/15 pt-10 md:contents md:gap-0 md:border-0 md:pt-0">
            <div>
              <p className={eyebrowClass}>Navigate</p>
              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={eyebrowClass}>Say Hello</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className={`inline-flex items-center gap-2 ${linkClass}`}
                  >
                    <Mail className="h-4 w-4" />
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${linkClass}`}
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    LinkedIn Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 text-[12px] font-normal leading-4 text-white/50 sm:hidden">
          {footer.roleLine}
        </p>

        <div className="mt-6 mb-8 border-t border-background/15 sm:mt-12" />

        <div className="flex flex-col gap-2 text-[12px] font-normal leading-4 text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>{footer.copyright}</span>
          <span className="hidden sm:inline">{footer.roleLine}</span>
        </div>
      </div>
    </footer>
  );
}
