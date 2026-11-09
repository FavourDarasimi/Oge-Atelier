/* Hallmark · component: hero — H6 photographic fold (full-bleed campaign image; text overlays below 1024px) · editorial · tokens: Oge Atelier
 * states: none (static) · reveal handled at section-0 animation pass, not here
 * a11y: image alt describes the garment; buttons 48px tall, single-line labels, keyboard reachable
 */

import Image from "next/image";
import Link from "next/link";

function HeroCopy() {
  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.2em] text-ink">
        Lagos · Made-to-Measure
      </p>
      <h1 className="text-balance mt-4 max-w-[16ch] font-display text-[clamp(2.5rem,5.2vw,5rem)] font-normal leading-[1.04] text-ink">
        Bespoke Nigerian fashion, made to fit you.
      </h1>
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/#collections"
          className="flex h-12 items-center bg-ink px-7 text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-forest active:translate-y-px"
        >
          View Collections
        </Link>
        <Link
          href="/#contact"
          className="nav-link h-12 text-[11px] uppercase tracking-[0.16em] leading-none text-ink"
        >
          Book a Fitting →
        </Link>
      </div>
    </>
  );
}

export function SiteHero() {
  return (
    <section
      aria-label="Introduction"
      className="relative -mt-(--nav-height) bg-paper-deep"
    >
      <div className="relative flex h-[72svh] flex-col overflow-hidden lg:h-[100svh] lg:min-h-[640px]">
        <Image
          src="/hero.jpeg"
          alt="Model wearing a hand-woven forest-green agbada, photographed in a sand-toned studio in Lagos"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_35%] md:object-[68%_center] lg:object-[72%_center]"
        />
        <div className="relative z-10 mt-auto w-full max-w-3xl px-10 pb-14 hidden lg:block">
          <HeroCopy />
        </div>
        <span
          aria-hidden="true"
          className="absolute right-10 bottom-14 hidden h-16 w-px bg-ink/40 lg:block"
        />
      </div>
      <div className="px-5 pb-14 pt-10 lg:hidden">
        <HeroCopy />
      </div>
    </section>
  );
}
