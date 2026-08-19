export interface ImageRef {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface Metric {
  value: string;
  label: string;
}

export interface SubSection {
  heading: string;
  body?: string[];
  bullets?: string[];
}

export type ContentBlock =
  | { kind: "text"; heading?: string; paragraphs: string[] }
  | { kind: "quote"; text: string }
  | { kind: "bullets"; heading?: string; items: string[] }
  | { kind: "image"; image: ImageRef; width?: "inset" | "full" | "bleed" }
  | {
      kind: "video";
      src: string;
      poster?: string;
      caption?: string;
      loop?: boolean;
      autoplay?: boolean;
      muted?: boolean;
    }
  | { kind: "audio"; src?: string; caption?: string }
  | { kind: "gallery"; images: ImageRef[]; columns?: number; caption?: string }
  | { kind: "marquee"; images: ImageRef[]; pauseOnHover?: boolean; caption?: string }
  | { kind: "metrics"; metrics: Metric[] };

export interface Section {
  eyebrow?: string;
  heading?: string;
  body?: string[];
  bullets?: string[];
  subsections?: SubSection[];
  gallery?: ImageRef[];
  metrics?: Metric[];
  blocks?: ContentBlock[];
}

export interface ProjectSections {
  overview?: Section;
  problem?: Section;
  goals?: Section;
  process?: Section;
  design?: Section;
  collaboration?: Section;
  challenges?: Section;
  impact?: Section;
  reflection?: Section;
}

export interface Project {
  slug: string;
  titleLead?: string;
  title: string;
  summary: string;
  tags: string[];
  meta: {
    role: string;
    timeline: string;
    tools: string[];
  };
  live?: { url: string; label: string };
  thumbnail: ImageRef;
  heroDevices?: ImageRef[];
  accentColor?: string;
  order: number;
  sections: ProjectSections;
  nextProjectSlug?: string;
}

export interface Interaction {
  slug: string;
  title: string;
  category: string;
  year: number;
  description: string;
  tags: string[];
  prototypeUrl?: string;
  fullPrototypeUrl?: string;
  previewVideo?: string;
  previewWidth?: number;
  previewHeight?: number;
  watchUrl?: string;
  watchLabel?: string;
  preview?: ImageRef;
  accentColor?: string;
  aspectRatio?: string;
  order: number;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
  accentColor?: string;
  order: number;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary?: string;
  bullets?: string[];
  group?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Resume {
  badges: string[];
  resumeFileUrl: string;
  experience: ExperienceEntry[];
  skills: SkillGroup[];
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar?: ImageRef;
  order: number;
}

export type AboutItem =
  | { kind: "banner"; title: string; subtitle?: string; quote?: string; source?: string }
  | { kind: "polaroid"; label?: string; image: ImageRef; caption?: string; rotate?: number }
  | { kind: "profileCard"; name: string; role: string; subtitle?: string; image: ImageRef; footnote?: string }
  | { kind: "socialCard"; caption: string; handles: { platform: string; handle: string; url?: string }[] }
  | { kind: "spotify"; label?: string; trackTitle?: string; artist?: string; embedUrl?: string; url?: string; audioUrl?: string }
  | { kind: "substack"; label?: string; title: string; excerpt?: string; url: string }
  | { kind: "note"; text: string };

export interface About {
  eyebrow: string;
  title: string;
  items: AboutItem[];
}

export interface SiteConfig {
  brand: string;
  nav: { label: string; href: string }[];
  contact: {
    email: string;
    linkedinUrl: string;
  };
  hero: {
    title: string;
    roles: string[];
    intro: string;
    ctaLabel: string;
    prototypeUrl?: string;
  };
  selectedProjectsIntro: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  footer: {
    heading: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    tagline: string;
    copyright: string;
    roleLine: string;
  };
}
