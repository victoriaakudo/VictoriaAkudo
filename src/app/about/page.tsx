import type { Metadata } from "next";
import Image from "next/image";
import { getAbout, getSiteConfig } from "@/lib/data";
import type { AboutItem } from "@/lib/types";
import AboutBoard from "@/components/about/AboutBoard";
import MusicCard from "@/components/about/MusicCard";

export const metadata: Metadata = {
  title: "About — Victoria Akudo",
  description: "The human behind the screen — Victoria Akudo.",
};

const DIR = "/images/projects/about";

function pick<K extends AboutItem["kind"]>(items: AboutItem[], kind: K) {
  return items.find((i): i is Extract<AboutItem, { kind: K }> => i.kind === kind);
}

function FloatCard({
  left,
  top,
  width,
  rotate,
  children,
}: {
  left: number;
  top: number;
  width: number;
  rotate: number;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute" style={{ left, top, width }}>
      <div style={{ transform: `rotate(${rotate}deg)` }}>{children}</div>
    </div>
  );
}

const PHOTOS = [
  { src: `${DIR}/sitcoms.svg`, w: 355, h: 391, svg: true, alt: "Sitcoms — Friends, The Office, Modern Family…", left: 60, top: 245, width: 235, rotate: -4 },
  { src: `${DIR}/profile.svg`, w: 270, h: 432, svg: true, alt: "Victoria Akudo — Product & Interaction Designer", left: 360, top: 255, width: 195, rotate: -1 },
  { src: `${DIR}/boardgames.svg`, w: 344, h: 388, svg: true, alt: "Boardgames", left: 615, top: 250, width: 250, rotate: 5 },
  { src: `${DIR}/mangoes.svg`, w: 346, h: 410, svg: true, alt: "I love mangoes", left: 45, top: 585, width: 240, rotate: -3 },
  { src: `${DIR}/lagos.svg`, w: 367, h: 409, svg: true, alt: "Based in Lagos, Nigeria", left: 580, top: 575, width: 265, rotate: 4 },
];

export default async function AboutPage() {
  const [about, site] = await Promise.all([getAbout(), getSiteConfig()]);

  const banner = pick(about.items, "banner");
  const spotify = pick(about.items, "spotify");
  const substack = pick(about.items, "substack");
  const social = pick(about.items, "socialCard");

  const socialUrl =
    social?.handles.find((h) => h.platform === "Instagram")?.url ??
    social?.handles[0]?.url ??
    "#";
  const email = site.contact.email;

  return (
    <div className="pb-24">
      <header className="mx-auto max-w-[1500px] px-6 pt-20 md:pt-24">
        <p className="font-sans text-[16px] font-medium uppercase leading-[24px] text-muted">
          {about.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-[52px] font-black uppercase leading-[100%] tracking-[-1%] text-[#073042] md:text-[100px]">
          {about.title}
        </h1>
      </header>

      <div className="mx-auto mt-3 max-w-[1500px] px-4 md:px-6">
        <AboutBoard>
          {banner && (
            <FloatCard left={230} top={50} width={460} rotate={0}>
              <Image
                src={`${DIR}/believer.svg`}
                alt={banner.title}
                width={590}
                height={221}
                unoptimized
                className="h-auto w-full drop-shadow-md"
              />
            </FloatCard>
          )}

          {PHOTOS.map((c) => (
            <FloatCard
              key={c.src}
              left={c.left}
              top={c.top}
              width={c.width}
              rotate={c.rotate}
            >
              <Image
                src={c.src}
                alt={c.alt}
                width={c.w}
                height={c.h}
                unoptimized={c.svg}
                className="h-auto w-full drop-shadow-md"
              />
            </FloatCard>
          ))}

          {social && (
            <FloatCard left={345} top={635} width={225} rotate={-7}>
              <a
                href={socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Find me on social media"
                className="block transition-[filter] hover:brightness-105"
              >
                <Image
                  src={`${DIR}/Envelope.svg`}
                  alt="Find me on social media"
                  width={332}
                  height={312}
                  unoptimized
                  className="h-auto w-full drop-shadow-md"
                />
              </a>
            </FloatCard>
          )}

          {substack && (
            <FloatCard left={405} top={855} width={235} rotate={2}>
              <a
                href={substack.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read on Substack: ${substack.title}`}
                className="block transition-[filter] hover:brightness-105"
              >
                <Image
                  src={`${DIR}/substack.svg`}
                  alt={`Substack — ${substack.title}`}
                  width={319}
                  height={316}
                  unoptimized
                  className="h-auto w-full drop-shadow-md"
                />
              </a>
            </FloatCard>
          )}

          <FloatCard left={665} top={895} width={215} rotate={5}>
            <a
              href={`mailto:${email}`}
              aria-label="Send an email"
              className="block transition-[filter] hover:brightness-105"
            >
              <Image
                src={`${DIR}/note.svg`}
                alt="Send an email"
                width={270}
                height={215}
                unoptimized
                className="h-auto w-full drop-shadow-md"
              />
            </a>
          </FloatCard>

          {spotify && (
            <FloatCard left={60} top={885} width={290} rotate={-12}>
              <div style={{ height: 168 }}>
                <MusicCard
                  label={spotify.label ?? "My Current Shuffle"}
                  trackTitle={spotify.trackTitle ?? ""}
                  artist={spotify.artist ?? ""}
                  embedUrl={spotify.embedUrl}
                  url={spotify.url}
                />
              </div>
            </FloatCard>
          )}
        </AboutBoard>
      </div>
    </div>
  );
}
