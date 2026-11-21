/* Hallmark · component: lookbook — filterable 3:4 portfolio grid + lightbox (client) · editorial · tokens: Oge Atelier
 * filters are small-caps text chips with a hairline underline active state; detail shots stay in All for texture
 * every look is numbered ("Look 01") in tiny small caps under the image; captions muted, no prices
 * lightbox: ink scrim, image centred at ≤90vh, prev/next hairline arrows, Esc / click-outside / arrow keys, focus trap, scroll lock
 * a11y: tiles are buttons (whole card target), dialog labelled, focus returns to the triggering tile on close
 */

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const FILTERS = ["All", "Women", "Men", "Kids", "Bridal", "Traditional"] as const;
type Filter = (typeof FILTERS)[number];

type Look = {
  no: string;
  src: string;
  caption: string;
  alt: string;
  category: Exclude<Filter, "All"> | null;
};

const LOOKS: Look[] = [
  {
    no: "01",
    src: "/lookbook/terracotta-satin.jpeg",
    caption: "Terracotta satin, draped waist",
    alt: "Model in a terracotta satin midi dress with a draped waist, against a plaster wall",
    category: "Women",
  },
  {
    no: "02",
    src: "/lookbook/bridal-pearl-train.jpeg",
    caption: "Pearl-button train, bridal",
    alt: "Bride seen from behind, pearl-buttoned back and veil flowing into a long train",
    category: "Bridal",
  },
  {
    no: "03",
    src: "/lookbook/kids-ankara.jpeg",
    caption: "Ankara pair, kids",
    alt: "Two children in matching green and rust Ankara outfits, laughing together",
    category: "Kids",
  },
  {
    no: "04",
    src: "/lookbook/kaftan-forest.jpeg",
    caption: "Forest kaftan, tailored",
    alt: "Man in a forest-green kaftan and trousers standing in a sunlit corridor",
    category: "Men",
  },
  {
    no: "05",
    src: "/lookbook/aso-oke-gele.jpeg",
    caption: "Aso Oke and gele, cream",
    alt: "Woman in a cream hand-woven Aso Oke set with a matching gele head wrap",
    category: "Traditional",
  },
  {
    no: "06",
    src: "/lookbook/three-piece-black.jpeg",
    caption: "Three-piece, black wool",
    alt: "Man in a black three-piece suit leaning against a wooden doorframe",
    category: "Men",
  },
  {
    no: "07",
    src: "/lookbook/corset-gown.jpeg",
    caption: "Corset bodice, forest satin",
    alt: "Woman seated in a forest-green corset-bodice gown with a full satin skirt",
    category: "Women",
  },
  {
    no: "08",
    src: "/lookbook/girls-cream-dress.jpeg",
    caption: "Cream dress, clay sash",
    alt: "Little girl twirling in a cream tiered dress with a clay-coloured sash",
    category: "Kids",
  },
  {
    no: "09",
    src: "/lookbook/cape-gown.jpeg",
    caption: "Cape gown, emerald",
    alt: "Woman in an emerald green gown with a flowing cape sleeve",
    category: "Women",
  },
  {
    no: "10",
    src: "/lookbook/kaftan-ivory.jpeg",
    caption: "Ivory kaftan, tonal embroidery",
    alt: "Man in an ivory kaftan with tonal chest embroidery and matching trousers",
    category: "Men",
  },
];

export function SiteLookbook() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visible = filter === "All" ? LOOKS : LOOKS.filter((look) => look.category === filter);
  const current = open === null ? null : visible[open];

  useEffect(() => {
    if (open === null) return;
    const previous = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflowY = previous;
    };
  }, [open]);

  const close = () => {
    setOpen(null);
    triggerRef.current?.focus();
  };

  const step = (direction: 1 | -1) => {
    setOpen((index) =>
      index === null ? index : (index + direction + visible.length) % visible.length,
    );
  };

  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      close();
      return;
    }
    if (event.key === "ArrowRight") {
      step(1);
      return;
    }
    if (event.key === "ArrowLeft") {
      step(-1);
      return;
    }
    if (event.key !== "Tab") return;
    const dialog = event.currentTarget;
    const focusables = Array.from(
      dialog.querySelectorAll<HTMLElement>("button:not([disabled])"),
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <section id="lookbook" aria-label="Lookbook" className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex items-center gap-4 pt-20 md:pt-28">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink">
            The lookbook.
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
        </div>

        <div
          role="group"
          aria-label="Filter looks"
          className="flex flex-wrap gap-x-6 gap-y-1 pt-8 md:pt-10"
        >
          {FILTERS.map((option) => {
            const active = option === filter;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option)}
                className={`border-b pb-2 pt-2 text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 pb-20 pt-8 md:grid-cols-3 md:pb-28 md:pt-10 lg:gap-x-6 2xl:grid-cols-4">
          {visible.map((look, index) => (
            <li key={look.no}>
              <button
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setOpen(index);
                }}
                aria-label={`Open ${look.caption}`}
                className="group block w-full text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
                  <Image
                    src={look.src}
                    alt={look.alt}
                    fill
                    sizes="(min-width: 1536px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-accent-text">
                  Look {look.no}
                </p>
                <p className="text-[12px] text-ink-muted">{look.caption}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Look ${current.no} — ${current.caption}`}
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-4 [animation:sheet-in_0.24s_ease-out] motion-reduce:[animation:none] md:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          onKeyDown={onDialogKeyDown}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.18em] text-paper/60">
              Look {current.no} / {String(visible.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close lookbook viewer"
              className="relative grid h-11 w-11 place-items-center text-paper"
            >
              <span aria-hidden="true" className="absolute h-px w-6 rotate-45 bg-paper" />
              <span aria-hidden="true" className="absolute h-px w-6 -rotate-45 bg-paper" />
            </button>
          </div>

          <div className="relative my-4 min-h-0 flex-1">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous look"
              className="flex h-12 w-12 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-paper"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={1.8} />
            </button>
            <div className="min-w-0 text-center">
              <p className="text-[11px] uppercase tracking-[0.18em] text-paper/60">
                {current.category ? `${current.category} · ` : ""}Look {current.no}
              </p>
              <p className="mt-1 truncate text-sm text-paper">{current.caption}</p>
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next look"
              className="flex h-12 w-12 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-paper"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
