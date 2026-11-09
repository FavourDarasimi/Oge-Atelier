"use client";

/* Hallmark · component: nav — N9 edge-aligned bar + marquee announcement strip · editorial · tokens: Oge Atelier (Ivory/Sand/Ink/Forest/Clay)
 * states: default · hover · focus-visible · active · menu-open (aria-expanded) · scrolled
 * a11y: 44px targets, Esc closes sheet, focus moves in/out of the sheet, body scroll lock
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/#collections" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const MARQUEE_ITEMS = [
  "Made in Lagos",
  "Worldwide Delivery",
  "Private Appointments",
  "Bespoke & Ready-to-Wear",
];

const WHATSAPP_URL = "https://wa.me/2340000000000?text=Hello%20Oge%20Atelier%2C%20I%27d%20like%20to%20order%20a%20custom%20outfit.";
const BOOK_URL = "/#contact";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.173.232-.297.347-.495.115-.198.058-.371-.014-.52-.071-.148-.644-1.553-.882-2.126-.184-.464-.37-.401-.512-.409-.132-.007-.283-.009-.434-.009-.151 0-.398.071-.606.347-.209.276-.795.925-1.218 1.557-.423.631-.825 1.434-.825 2.687 0 1.253.944 2.464 1.076 2.786.132.322.932 1.426 2.194 2.196 1.112.675 2.319 1.03 2.769 1.105.448.076.842.089 1.158.053.364-.043.795-.202 1.153-.554.316-.316.628-.914.739-1.48.172-.895.116-1.663-.056-1.83Z" />
      <path d="M12.05 2C6.472 2 2 6.472 2 12.05c0 1.86.545 3.595 1.485 5.054L2 22l5.665-1.485A9.7 9.7 0 0 0 12.05 22.1h.001c5.577 0 10.049-4.472 10.049-10.05C22.1 6.472 17.627 2 12.05 2Zm0 18.236h-.001a8.2 8.2 0 0 1-4.184-1.146l-.3-.179-3.105.814.829-3.03-.195-.31a8.182 8.182 0 0 1-1.256-4.362c0-4.527 3.686-8.212 8.213-8.212 4.528 0 8.212 3.685 8.212 8.212 0 4.528-3.684 8.213-8.212 8.213Z" />
    </svg>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const burger = burgerRef.current;
    const prevY = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflowY = prevY;
      burger?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const trapTab = (event: React.KeyboardEvent) => {
    if (event.key !== "Tab") return;
    const sheet = event.currentTarget as HTMLElement;
    const focusables = Array.from(
      sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
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
    <>
      <div className="sticky top-0 z-40">
        <div
          className={`overflow-hidden border-b border-hairline transition-colors duration-300 ${
            scrolled ? "bg-paper" : "bg-transparent"
          }`}
        >
          <div className="marquee-track flex w-max items-center py-2" aria-label="Made in Lagos — Worldwide delivery — Private appointments — Bespoke and Ready-to-Wear">
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center" aria-hidden={half === 1 ? true : undefined}>
                {Array.from({ length: 3 }, () => MARQUEE_ITEMS).flat().map((item, index) => (
                  <span key={`${half}-${index}`} className="flex items-center whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-ink">
                    {item}
                    <span className="px-10 text-accent" aria-hidden="true">✳</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <header
          className={`transition-colors duration-300 ${
            scrolled ? "border-b border-hairline bg-paper" : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
            <Link
              href="/"
              aria-label="Oge Atelier — home"
              className="font-display text-xl uppercase tracking-[0.14em] text-ink md:text-2xl"
            >
              Oge Atelier
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="nav-link text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-forest active:text-accent-text"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order on WhatsApp"
                className="hidden h-11 w-11 place-items-center text-ink transition-colors hover:text-forest sm:grid"
              >
                <WhatsAppGlyph className="h-5 w-5" />
              </a>
              <Link
                href={BOOK_URL}
                className="hidden h-11 items-center bg-ink px-5 text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-forest active:translate-y-px md:inline-flex"
              >
                Book a Fitting
              </Link>
              <button
                ref={burgerRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                aria-label="Open menu"
                className="relative grid h-11 w-11 place-items-center md:hidden"
              >
                <span aria-hidden="true" className="absolute h-px w-6 bg-ink" />
                <span aria-hidden="true" className="absolute h-px w-6 translate-y-[3px] bg-ink" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {menuOpen && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="site-menu fixed inset-0 z-50 flex flex-col bg-paper md:hidden"
          onKeyDown={(event) => {
            if (event.key === "Escape") closeMenu();
            trapTab(event);
          }}
        >
          <div className="flex h-16 items-center justify-between border-b border-hairline px-5">
            <span className="font-display text-xl uppercase tracking-[0.14em]">Oge Atelier</span>
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="relative grid h-11 w-11 place-items-center"
            >
              <span aria-hidden="true" className="absolute h-px w-6 rotate-45 bg-ink" />
              <span aria-hidden="true" className="absolute h-px w-6 -rotate-45 bg-ink" />
            </button>
          </div>

          <nav aria-label="Primary menu" className="flex-1 px-5 pt-2">
            <ul>
              {NAV_LINKS.map((link, index) => (
                <li key={link.label} className={index === NAV_LINKS.length - 1 ? "" : "border-b border-hairline"}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-baseline gap-4 py-5 text-ink"
                  >
                    <span aria-hidden="true" className="font-sans text-[11px] tracking-[0.18em] text-accent-text">
                      0{index + 1}
                    </span>
                    <span className="font-display text-4xl">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-4 border-t border-hairline p-5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex h-12 items-center justify-center gap-3 bg-ink text-[12px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-forest active:translate-y-px"
            >
              <WhatsAppGlyph className="h-5 w-5 text-wa" />
              Order on WhatsApp
            </a>
            <Link
              href={BOOK_URL}
              onClick={closeMenu}
              className="nav-link h-9 self-center text-[11px] uppercase tracking-[0.16em] text-ink"
            >
              Book a Fitting →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
