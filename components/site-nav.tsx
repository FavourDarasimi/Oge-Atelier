"use client";

/* Hallmark · component: nav — N9 edge-aligned bar + marquee announcement strip · editorial · tokens: Oge Atelier (Ivory/Sand/Ink/Forest/Clay)
 * states: default · hover · focus-visible · active · menu-open (aria-expanded) · scrolled
 * a11y: 44px targets, Esc closes sheet, focus moves in/out of the sheet, body scroll lock
 */

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/#collections" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const WHATSAPP_URL = "https://wa.me/2340000000000?text=Hello%20Oge%20Atelier%2C%20I%27d%20like%20to%20order%20a%20custom%20outfit.";
const BOOK_URL = "/#contact";

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

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
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
                className="hidden h-11 w-11 place-items-center text-ink transition-colors hover:text-forest lg:grid"
              >
                <HugeiconsIcon icon={WhatsappIcon} size={24} strokeWidth={1.8} />
              </a>
              <Link
                href={BOOK_URL}
                className="hidden h-11 items-center justify-center text-center bg-ink px-5 text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-forest active:translate-y-px lg:inline-flex"
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
                className="relative grid h-11 w-11 place-items-center lg:hidden"
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
          className="site-menu fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
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
              <HugeiconsIcon icon={WhatsappIcon} size={24} strokeWidth={1.8} className="text-wa" />
              Order on WhatsApp
            </a>
            <Link
              href={BOOK_URL}
              onClick={closeMenu}
              className="nav-link inline-flex h-9 items-center justify-center self-center text-[11px] uppercase tracking-[0.16em] text-ink"
            >
              Book a Fitting →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
