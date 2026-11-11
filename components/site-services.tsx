/* Hallmark · component: services — two feature cards side by side + quiet tabular rows (02 — SERVICES) · editorial · tokens: Oge Atelier
 * features sit 2-up from md, each centred in its column: photo capped at 400px with 12px corners, small copy overlaid on an ink scrim for legibility; three ruled rows sit on the paper-deep band
 * each card is one full-size WhatsApp deep link (whole image tappable, ≥44px); prices are honest placeholders (From ₦—) until the atelier confirms ranges
 * a11y: rows are single ≥44px links; feature CTAs 48px; images lazy below the fold
 */

import Image from "next/image";
import { waLink } from "@/lib/whatsapp";

const FEATURES = [
  {
    name: "Bespoke & custom outfits",
    body: "Each piece is cut for one body — measured in the atelier, toiled in calico, fitted until the line is yours. Fabric is sourced with you, from Lagos markets to imported mills.",
    price: "₦—",
    src: "/services/bespoke.jpeg",
    alt: "Tailor's hands pinning a calico toile on a dress form in the atelier",
    sizes: "(min-width: 768px) 400px, 100vw",
    message: "Hello Oge Atelier, I'd like to start a bespoke / custom outfit.",
  },
  {
    name: "Bridal & traditional wedding attire",
    body: "Wedding attire built for the day itself — Nigerian traditional, white wedding, or both in one story. Beading, aso-oke and structure are decided with you and fitted through to the final week.",
    price: "₦—",
    src: "/services/bridal.jpeg",
    alt: "Beaded wedding gown and veil hanging on a rail in a sunlit atelier",
    sizes: "(min-width: 768px) 400px, 100vw",
    message: "Hello Oge Atelier, I'd like to talk about bridal & traditional wedding attire.",
  },
];

const SERVICE_ROWS = [
  {
    name: "Ready-to-Wear",
    body: "Pieces cut this season, in stock at the atelier.",
    price: "₦—",
    message: "Hello Oge Atelier, I'd like to ask about ready-to-wear pieces.",
  },
  {
    name: "Aso Ebi group orders",
    body: "Group orders for families and friends — one fabric story, many bodies.",
    price: null,
    message: "Hello Oge Atelier, I'd like to ask about an Aso Ebi order for our event.",
  },
  {
    name: "Corporate & uniform wear",
    body: "Staff uniforms and corporate wardrobes, ordered in batches.",
    price: "₦—",
    message: "Hello Oge Atelier, I'd like to ask about corporate & uniform wear.",
  },
];

export function SiteServices() {
  return (
    <section id="services" aria-label="Services">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex items-center gap-4 pt-20 md:pt-28">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink">
            <span className="text-accent-text">02</span>
            <span aria-hidden="true"> — </span>
            Services.
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
        </div>

        <div className="mx-auto grid max-w-[860px] gap-10 pb-20 pt-12 md:grid-cols-2 md:gap-x-10 md:pb-24 md:pt-16">
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
                  className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/5"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-paper md:p-6">
                  <h3 className="font-display text-xl md:text-2xl">
                    {feature.name}
                  </h3>
                  <p className="mt-2 max-w-[40ch] text-[13px] leading-snug text-paper/80">
                    {feature.body}
                  </p>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <p className="text-[13px]">
                      From <span className="tabular-nums">{feature.price}</span>
                    </p>
                    <span className="nav-link text-[11px] uppercase tracking-[0.18em] text-paper">
                      Start on WhatsApp →
                    </span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="bg-paper-deep">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <ul className="divide-y divide-hairline">
            {SERVICE_ROWS.map((row) => (
              <li key={row.name}>
                <a
                  href={waLink(row.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-1 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-4"
                >
                  <span className="text-[12px] uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-forest sm:col-span-3">
                    {row.name}
                  </span>
                  <span className="text-[14px] text-ink-muted sm:col-span-5">
                    {row.body}
                  </span>
                  {row.price ? (
                    <span className="text-[14px] tabular-nums text-ink sm:col-span-2 sm:text-right">
                      From {row.price}
                    </span>
                  ) : (
                    <span className="hidden sm:col-span-2 sm:block" />
                  )}
                  <span
                    aria-hidden="true"
                    className="text-[14px] text-ink transition-all group-hover:translate-x-1 group-hover:text-forest sm:col-span-2 sm:justify-self-end"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
