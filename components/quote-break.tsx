/* Hallmark · component: quote-break — single huge atelier creed line · editorial · tokens: Oge Atelier
 * a "credibility breath" between sections; display serif, muted attribution, no interactive elements
 */

export function QuoteBreak() {
  return (
    <section className="bg-paper py-24 md:py-32 px-5 text-center">
      <div className="mx-auto max-w-[44ch]">
        <blockquote className="font-display text-[clamp(2.25rem,5vw,4rem)] font-normal italic leading-[1.1] text-ink">
          “We design clothes that fit a body and carry a story.”
        </blockquote>
        <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-ink-muted">
          — Oge, founder
        </p>
      </div>
    </section>
  );
}
