/* Hallmark · component: services — two feature cards side by side ("What we make.") · editorial · tokens: Oge Atelier
 * features sit 2-up from md, each centred in its column: photo capped at 400px with 12px corners, name + short copy overlaid on an ink scrim; each card is one full-size WhatsApp deep link
 * a11y: cards are single ≥44px links; images lazy below the fold
 */

import Image from "next/image";
import { waLink } from "@/lib/whatsapp";

const FEATURES = [
  {
    name: "Bespoke outfits",
    body: "Cut for one body — measured in the atelier and fitted until the line is yours.",
    src: "/services/bespoke.jpeg",
    alt: "Tailor's hands pinning a calico toile on a dress form in the atelier",
    sizes: "(min-width: 768px) 400px, 100vw",
    message: "Hello Oge Atelier, I'd like to start a bespoke / custom outfit.",
  },
  {
    name: "Bridal & wedding attire",
    body: "Traditional and white wedding looks, fitted through to the final week.",
    src: "/services/bridal.jpeg",
    alt: "Beaded wedding gown and veil hanging on a rail in a sunlit atelier",
    sizes: "(min-width: 768px) 400px, 100vw",
    message: "Hello Oge Atelier, I'd like to talk about bridal & traditional wedding attire.",
  },
];

export function SiteServices() {
  return (
    <section id="services" aria-label="Services">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex items-center gap-4 pt-20 md:pt-28">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink">
            What we make.
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
        </div>

        <div className="mx-auto grid max-w-[860px] gap-10 pb-20 pt-12 md:grid-cols-2 md:gap-x-10 md:pb-28 md:pt-16">
          {FEATURES.map((feature) => (
            <article key={feature.name}>
              <a
                href={waLink(feature.message)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${feature.name} — start on WhatsApp`}
                className="group relative mx-auto block aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-xl bg-paper-deep"
              >
                <Image
                  src={feature.src}
                  alt={feature.alt}
                  fill
                  sizes={feature.sizes}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-paper md:p-6">
                  <h3 className="font-display text-2xl md:text-3xl">
                    {feature.name}
                  </h3>
                  <p className="mt-2 max-w-[40ch] text-[14px] leading-snug text-paper/80 md:text-[15px]">
                    {feature.body}
                  </p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
