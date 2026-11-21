"use client";

import { motion } from "framer-motion";
import type { Look } from "@/data/looks";
import { waLink } from "@/lib/whatsapp";

const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

export function LookDetails({ look, index }: { look: Look; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const orderUrl = waLink(
    `Hello Oge Atelier, I’d like to order the ${look.name} (Look ${number}).`,
  );
  const fittingUrl = waLink("Hello Oge Atelier, I’d like to book a fitting.");

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="grid gap-10 min-[760px]:grid-cols-[1.1fr_1fr] min-[760px]:gap-12"
    >
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-accent-text">
          Look {number} · {look.category}
        </p>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink">
          {look.name}
        </h2>
        <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-ink-muted">
          {look.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center bg-forest px-6 text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
          >
            Order this on WhatsApp
          </a>
          <a
            href={fittingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center text-sm text-accent-text underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
          >
            Book a fitting →
          </a>
        </div>
      </div>

      <dl className="border-t border-hairline text-sm">
        <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-hairline py-3">
          <dt className="text-ink-muted">Fabric</dt>
          <dd className="text-ink">{look.fabric}</dd>
        </div>
        <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-hairline py-3">
          <dt className="text-ink-muted">Colours</dt>
          <dd className="flex flex-wrap gap-x-4 gap-y-2 text-ink">
            {look.colors.map(([name, hex]) => (
              <span key={name} className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 border border-hairline"
                  style={{ backgroundColor: hex }}
                />
                {name}
              </span>
            ))}
          </dd>
        </div>
        <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-hairline py-3">
          <dt className="text-ink-muted">Made in</dt>
          <dd className="text-ink">Lagos, to your measurements</dd>
        </div>
        <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-hairline py-3">
          <dt className="text-ink-muted">Turnaround</dt>
          <dd className="text-ink">{look.turnaround}</dd>
        </div>
        <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-hairline py-3">
          <dt className="text-ink-muted">Price</dt>
          <dd className="tabular-nums text-ink">{look.price}</dd>
        </div>
      </dl>
    </motion.div>
  );
}
