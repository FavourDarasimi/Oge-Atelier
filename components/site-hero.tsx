/* Hallmark · component: hero — typographic hero + arched rainbow gallery (featured collections) · editorial · tokens: Oge Atelier
 * row from lg (1024px): tiles flex ~150px → 220px (capped) so the rainbow always fits without scroll; below lg the fanned deck runs (collections-deck)
 * rainbow: tiles translate along a linear arc (--arc * n, n = 2,1,0,0,1,2) so every pair steps down by one equal increment
 * a11y: CTAs 48px, single-line labels; arches are links; deck auto-advances every 2s, swipe or trackpad scroll to browse
 */

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CollectionsDeck } from "@/components/collections-deck";
import { COLLECTIONS } from "@/lib/collections";

const CENTER = (COLLECTIONS.length - 1) / 2;

export function SiteHero() {
  return (
    <>
      <section
        aria-label="Introduction"
        className="px-5 pb-2 pt-16 text-center md:pt-24"
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-accent-text">
          Lagos · Made-to-Measure
        </p>
        <h1 className="text-balance mx-auto mt-5 max-w-[18ch] font-display text-[clamp(2.75rem,6.5vw,5.75rem)] font-normal leading-[1.04] text-ink">
          Bespoke Nigerian fashion, made to fit you.
        </h1>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link
            href="/#collections"
            className="flex h-12 items-center justify-center text-center bg-ink px-7 text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-forest active:translate-y-px"
          >
            View Collections
          </Link>
          <Link
            href="/#contact"
            className="nav-link inline-flex h-12 items-center justify-center text-[11px] uppercase tracking-[0.16em] text-ink"
          >
            Book a Fitting →
          </Link>
        </div>
        <p className="mt-10 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          Bespoke · Bridal · Aso Oke · Ready-to-Wear · Corporate
        </p>
      </section>

      <section id="collections" aria-label="Featured collections" className="pb-6 md:pb-8">
        <div className="w-full px-5 pb-8 md:px-10 md:pb-12">
          <ul className="mx-auto hidden w-full items-end justify-center gap-4 [--arc:16px] lg:flex lg:[--arc:22px]">
            {COLLECTIONS.map((collection, index) => {
              const dip = Math.abs(index - CENTER) - 0.5;
              return (
                <li
                  key={collection.name}
                  style={{ "--n": dip } as CSSProperties}
                  className="min-w-0 flex-1 lg:max-w-[220px] [transform:translateY(calc(var(--arc)*var(--n)*var(--n)))]"
                >
                  <Link
                    href="/#lookbook"
                    aria-label={`${collection.name} — view the collection`}
                    className="group block"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-[110px] bg-paper-deep">
                      <Image
                        src={collection.src}
                        alt={collection.alt}
                        fill
                        sizes="(min-width: 1024px) 220px, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <CollectionsDeck />
        </div>
      </section>
    </>
  );
}
