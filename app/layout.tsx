import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display-face",
  subsets: ["latin"],
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oge Atelier — Bespoke Nigerian Fashion, Lagos",
  description:
    "Bespoke Nigerian fashion, made to fit you. Ready-to-wear, bridal and traditional attire designed and made in Lagos, delivered worldwide.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
