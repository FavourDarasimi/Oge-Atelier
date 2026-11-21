/* Hallmark · component: process — numbered step sequence, left-margin Clay numerals with hairline connector · editorial · tokens: Oge Atelier
 * four steps kill the "will it fit me?" objection: style → measurements → deposit → delivery
 * label follows the services pattern (unnumbered, tracked small caps + hairline rule)
 * a11y: ordered list semantics; numerals are decorative (list position conveys order); connector hidden from AT
 */

const STEPS = [
  {
    title: "Choose a style",
    body: "Pick a look from the collections or bring your own reference. We agree on fabric, cut and budget before anything is cut.",
  },
  {
    title: "Send your measurements",
    body: "Visit the atelier in Lekki for a fitting, or send a current measurement chart. We confirm every number before drafting.",
  },
  {
    title: "Pay the 50% deposit",
    body: "We start once the 50% deposit is paid — the balance on delivery. Your slot in the workroom is booked at payment.",
  },
  {
    title: "Delivery or collection",
    body: "Delivery in Lagos and nationwide shipping, or collect from the studio. Fittings are included along the way.",
  },
];

export function SiteProcess() {
  return (
    <section id="process" aria-label="How it works">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex items-center gap-4 pt-20 md:pt-28">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink">
            How it works.
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
        </div>

        <div className="pb-20 pt-12 md:pb-28 md:pt-16">
          <ol className="relative mx-auto max-w-[980px]">
            <span
              aria-hidden="true"
              className="absolute bottom-8 left-[12px] top-8 hidden w-px bg-hairline sm:block"
            />
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-2 py-8 first:pt-0 last:pb-0 sm:grid-cols-12 sm:items-baseline sm:gap-6"
              >
                <span className="font-display text-xl tabular-nums text-accent-text sm:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl text-ink sm:col-span-4 md:text-[1.75rem]">
                  {step.title}
                </h3>
                <p className="max-w-[56ch] text-[15px] leading-relaxed text-ink-muted sm:col-span-7">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-10 max-w-[980px] border-t border-hairline pt-6 text-center text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            Fittings included · Alterations at handover
          </p>
        </div>
      </div>
    </section>
  );
}
