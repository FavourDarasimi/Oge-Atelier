/* Hallmark · component: collections-deck — fixed-size image cards spread on one baseline (client) · editorial · tokens: Oge Atelier
 * shown below lg (1024px) only — cards are flat rectangles, all the same size on the same line, spread sideways (alternating offsets, slight tilt); the arched rainbow row takes over at lg and up
 * advances automatically every 2s; a manual swipe restarts the timer; paused entirely for reduced-motion users
 * manual: horizontal swipe/drag or trackpad scroll (vertical page scroll never hijacked); --fan widens offsets/tilt on medium screens
 * a11y: counter is aria-live
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from "react";
import { COLLECTIONS } from "@/lib/collections";

const COUNT = COLLECTIONS.length;
const AUTO_MS = 2000;

const SPREAD = [
  { dx: "0px", dy: "0px", rot: "0deg" },
  { dx: "24px", dy: "0px", rot: "1.5deg" },
  { dx: "-24px", dy: "0px", rot: "-1.5deg" },
  { dx: "48px", dy: "0px", rot: "2.5deg" },
  { dx: "-48px", dy: "0px", rot: "-2.5deg" },
] as const;

function cardStyle(position: number): CSSProperties {
  const spread = SPREAD[position];
  if (!spread) {
    return {
      opacity: 0,
      transform: "translate(-50%, 0) rotate(0deg)",
      zIndex: 0,
      pointerEvents: "none",
    };
  }
  return {
    opacity: 1,
    transform:
      "translate(calc(-50% + var(--dx) * var(--fan, 1)), calc(var(--dy) * var(--fan, 1))) rotate(calc(var(--rot) * var(--fan, 1)))",
    zIndex: SPREAD.length - position,
    pointerEvents: position === 0 ? "auto" : "none",
    "--dx": spread.dx,
    "--dy": spread.dy,
    "--rot": spread.rot,
  } as CSSProperties;
}

export function CollectionsDeck() {
  const [active, setActive] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const lastAdvance = useRef(0);

  const tryAdvance = useCallback((direction: 1 | -1) => {
    const now = Date.now();
    if (now - lastAdvance.current < 550) return;
    lastAdvance.current = now;
    setActive((current) => (current + direction + COUNT) % COUNT);
    setResetKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % COUNT), AUTO_MS);
    return () => clearInterval(timer);
  }, [resetKey]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 40) return;
    tryAdvance(delta < 0 ? 1 : -1);
  }

  function onWheel(event: ReactWheelEvent<HTMLDivElement>) {
    if (Math.abs(event.deltaX) < 24 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    tryAdvance(event.deltaX > 0 ? 1 : -1);
  }

  return (
    <div className="flex flex-col items-center lg:hidden">
      <div
        aria-label="Featured collections — advances automatically; swipe or scroll sideways to browse"
        className="relative mt-2 h-[350px] w-[340px] touch-pan-y select-none [--fan:1] md:w-[500px] md:[--fan:2.5]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onWheel={onWheel}
      >
        {COLLECTIONS.map((collection, index) => {
          const position = (index - active + COUNT) % COUNT;
          return (
            <div
              key={collection.name}
              style={cardStyle(position)}
              className="absolute bottom-0 left-1/2 h-[330px] w-[220px] origin-bottom transition-all duration-500 ease-out"
            >
              {position === 0 ? (
                <Link
                  href="/#lookbook"
                  aria-label={`${collection.name} — view the collection`}
                  className="group block h-full w-full"
                >
                  <div className="relative h-full w-full overflow-hidden bg-paper-deep ring-1 ring-ink/10">
                    <Image
                      src={collection.src}
                      alt={collection.alt}
                      fill
                      sizes="220px"
                      draggable={false}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              ) : (
                <div className="h-full w-full overflow-hidden bg-paper-deep ring-1 ring-ink/10">
                  <Image
                    src={collection.src}
                    alt=""
                    fill
                    sizes="220px"
                    draggable={false}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className="mt-5 text-[11px] uppercase tracking-[0.18em] text-ink-muted"
      >
        {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
      </p>
    </div>
  );
}
