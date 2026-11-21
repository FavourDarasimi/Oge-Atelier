import type { Metadata } from "next";
import { Wardrobe } from "@/components/lookbook/Wardrobe";

export const metadata: Metadata = {
  title: "Lookbook — Oge Atelier",
  description:
    "Selected looks from the Oge Atelier workroom in Lagos — women, men, kids, bridal and traditional.",
  openGraph: {
    title: "Lookbook — Oge Atelier",
    description:
      "Selected looks from the Oge Atelier workroom in Lagos — women, men, kids, bridal and traditional.",
    type: "website",
  },
};

export default function LookbookPage() {
  return (
    <main className="flex-1 bg-paper">
      <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-14 md:px-10 md:pb-28 md:pt-20">
        <div className="grid gap-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink">
            The lookbook
          </p>
          <div>
            <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.02] text-ink">
              Pieces from the rail
            </h1>
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-ink-muted">
              Current pieces from the Lagos workroom, each cut and finished to
              your measurements.
            </p>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <Wardrobe />
        </div>
      </section>
    </main>
  );
}
