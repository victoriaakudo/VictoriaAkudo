export type AIProjectCategory = "Built & deployed" | "AI-aided design";

export interface AIProject {
  number: string;
  title: string;
  category: AIProjectCategory;
  eyebrow: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  technologies: string[];
  accent: string;
  wash: string;
  links: {
    label: string;
    href: string;
    kind: "primary" | "secondary";
  }[];
}

export const aiProjects: AIProject[] = [
  {
    number: "01",
    title: "Again",
    category: "Built & deployed",
    eyebrow: "Repetition tracker · PWA",
    description:
      "A calm, mobile-first repetition tracker for the things that do not fit a daily routine. Again puts elapsed time first, lets people log a repeat in one tap, and replaces streak pressure with quiet, optional reminders.",
    image: {
      src: "/images/projects/ai/again.png",
      alt: "Again landing page showing an elapsed-time tracker for a haircut",
      width: 2854,
      height: 1622,
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "React Hook Form",
      "Zod",
      "Web Push",
      "Vercel",
    ],
    accent: "#557A68",
    wash: "#E8EFE7",
    links: [
      {
        label: "Open live app",
        href: "https://again-eight-iota.vercel.app/",
        kind: "primary",
      },
      {
        label: "View on GitHub",
        href: "https://github.com/victoriaakudo/Again",
        kind: "secondary",
      },
    ],
  },
  {
    number: "02",
    title: "SlotWise",
    category: "Built & deployed",
    eyebrow: "Appointment scheduling · SaaS",
    description:
      "A professional scheduling platform that turns availability into a polished, shareable booking experience. SlotWise helps independent professionals manage hours, prevent double-bookings, respect timezones, and keep clients informed with automated confirmations.",
    image: {
      src: "/images/projects/ai/slotwise.png",
      alt: "SlotWise landing page with a daily appointment schedule",
      width: 2880,
      height: 1624,
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "React Hook Form",
      "Zod",
      "Resend",
      "Inngest",
      "Vercel",
    ],
    accent: "#2468E8",
    wash: "#E8F0FF",
    links: [
      {
        label: "Open live app",
        href: "https://slot-wise-virid.vercel.app/",
        kind: "primary",
      },
      {
        label: "View on GitHub",
        href: "https://github.com/victoriaakudo/SlotWise",
        kind: "secondary",
      },
    ],
  },
  {
    number: "03",
    title: "EduPay",
    category: "AI-aided design",
    eyebrow: "Stablecoin school fees · Fintech",
    description:
      "A trust-first payment concept for Nigerian private schools. EduPay guides parents through paying fees with USDT or USDC—without requiring crypto knowledge—while giving finance teams a clear dashboard for invoices, payment tracking, and exception review.",
    image: {
      src: "/images/projects/ai/edupay.png",
      alt: "EduPay admin dashboard with school fee payment metrics and recent payments",
      width: 2564,
      height: 1466,
    },
    technologies: [
      "Figma Make",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Recharts",
      "Radix UI",
      "Lucide",
    ],
    accent: "#22884F",
    wash: "#E8F5EE",
    links: [
      {
        label: "Explore the design",
        href: "https://www.figma.com/design/ZP0UXEjjphQXJmiDXDVyZA/Stable-Coin-School-Fees-Payment?node-id=1-3&t=ZttGzQHogrAXRwR6-1",
        kind: "primary",
      },
    ],
  },
];
