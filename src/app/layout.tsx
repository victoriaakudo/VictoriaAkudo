import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getSiteConfig } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cabinetGrotesk = localFont({
  src: "./fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet",
  weight: "100 900",
  display: "swap",
});

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Victoria Akudo — Product & Interaction Designer",
  description:
    "Portfolio of Victoria Akudo, a product & interaction designer with 4+ years translating complex problems into intuitive interfaces across fintech & SaaS.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteConfig();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${cabinetGrotesk.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SmoothScroll>
          <Nav brand={site.brand} nav={site.nav} contact={site.contact} />
          <main className="flex-1">{children}</main>
          <Footer
            footer={site.footer}
            contact={site.contact}
            nav={site.nav}
            brand={site.brand}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
