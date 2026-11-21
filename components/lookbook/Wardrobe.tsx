"use client";

import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimation,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { LOOKS, type Look } from "@/data/looks";
import { Hanger } from "./Hanger";
import { LookDetails } from "./LookDetails";

const COUNT = LOOKS.length;
const ROD_TOP = 44;
const DEFAULT_WIDTH = 220;
const SPRING: Transition = {
  type: "spring",
  stiffness: 70,
  damping: 17,
  mass: 0.9,
};
const INSTANT: Transition = { duration: 0 };

function offsetFor(index: number, current: number) {
  let offset = (((index - current) % COUNT) + COUNT) % COUNT;
  if (offset > COUNT / 2) offset -= COUNT;
  return offset;
}

function positionFor(offset: number, width: number) {
  const gap = width * 0.1;
  const x1 = width * 0.5 + width * 0.74 * 0.5 + gap;
  const x2 = x1 + width * 0.74 * 0.5 + gap + width * 0.56 * 0.5;
  const magnitude = Math.abs(offset);
  const sign = offset < 0 ? -1 : 1;
  if (magnitude === 0) return 0;
  if (magnitude === 1) return sign * x1;
  if (magnitude === 2) return sign * x2;
  return sign * (x2 + width * 0.45);
}

function lookNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function instantFor(from: number, to: number) {
  return LOOKS.map((_, index) => {
    const previous = offsetFor(index, from);
    const next = offsetFor(index, to);
    return (
      Math.abs(next - previous) > 1 &&
      (Math.abs(previous) >= 3 || Math.abs(next) >= 3)
    );
  });
}

type ItemProps = {
  look: Look;
  index: number;
  offset: number;
  width: number;
  top: number;
  hookY: number;
  x: number;
  scale: number;
  opacity: number;
  zIndex: number;
  hidden: boolean;
  transition: Transition;
  tick: number;
  direction: 1 | -1;
  reduceMotion: boolean;
  isCurrent: boolean;
  onJump: (index: number) => void;
};

function WardrobeItem({
  look,
  index,
  offset,
  width,
  top,
  hookY,
  x,
  scale,
  opacity,
  zIndex,
  hidden,
  transition,
  tick,
  direction,
  reduceMotion,
  isCurrent,
  onJump,
}: ItemProps) {
  const sway = useAnimation();

  useEffect(() => {
    if (tick === 0 || Math.abs(offset) > 3 || reduceMotion) return;
    sway.start({
      rotate: [0, -direction * 4, direction * 1.6, 0],
      transition: { duration: 1.1, times: [0, 0.32, 0.68, 1], ease: "easeInOut" },
    });
  }, [tick, direction, offset, reduceMotion, sway]);

  const number = lookNumber(index);

  return (
    <motion.div
      className="absolute left-1/2 select-none"
      style={{
        width,
        marginLeft: -width / 2,
        top,
        zIndex,
        pointerEvents: hidden ? "none" : "auto",
        transformOrigin: `50% ${hookY}px`,
      }}
      animate={{ x, scale, opacity }}
      transition={transition}
    >
      <motion.span
        className="block"
        animate={sway}
        style={{ transformOrigin: `50% ${hookY}px` }}
      >
        <button
          type="button"
          data-look-index={index}
          aria-label={`Look ${number}: ${look.name}`}
          aria-current={isCurrent ? "true" : undefined}
          aria-hidden={hidden || undefined}
          tabIndex={hidden ? -1 : 0}
          onClick={() => onJump(index)}
          className="block w-full cursor-pointer bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
        >
          <span className="mx-auto -mb-[6px] block w-[78%]">
            <Hanger className="block w-full text-ink" />
          </span>
          <span
            className={`relative block aspect-[3/4] w-full overflow-hidden ${
              look.image ? "" : "border border-hairline"
            }`}
            style={{ backgroundColor: look.tone }}
          >
            {look.image ? (
              <Image
                src={look.image}
                alt={look.name}
                fill
                sizes="(min-width: 640px) 270px, 52vw"
                preload={index === 0}
                className="object-cover"
              />
            ) : (
              <span
                className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em]"
                style={{ color: look.textColor }}
              >
                Look {number} / Photo to add
              </span>
            )}
          </span>
        </button>
      </motion.span>
    </motion.div>
  );
}

export function Wardrobe() {
  const [current, setCurrent] = useState(0);
  const [tick, setTick] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);
  const [wide, setWide] = useState(true);
  const [ready, setReady] = useState(false);
  const [laidOut, setLaidOut] = useState(false);
  const [instantFlags, setInstantFlags] = useState<boolean[]>(() =>
    LOOKS.map(() => false),
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const dragged = useRef(false);
  const reduceMotion = useReducedMotion() ?? false;

  const goTo = useCallback((target: number) => {
    const from = currentRef.current;
    if (target === from) return;
    setInstantFlags(instantFor(from, target));
    setDirection(offsetFor(target, from) > 0 ? 1 : -1);
    currentRef.current = target;
    setCurrent(target);
    setTick((value) => value + 1);
  }, []);

  const move = useCallback(
    (step: 1 | -1) => goTo((currentRef.current + step + COUNT) % COUNT),
    [goTo],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const media = window.matchMedia("(min-width: 640px)");
    const sync = () => {
      setStageWidth(stage.clientWidth);
      setWide(media.matches);
    };
    sync();
    const frame = window.requestAnimationFrame(() => setLaidOut(true));
    const observer = new ResizeObserver(sync);
    observer.observe(stage);
    media.addEventListener("change", sync);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const read = () => {
      const match = window.location.hash.match(/^#look-(\d+)$/);
      const index = match ? Number(match[1]) - 1 : -1;
      if (index >= 0 && index < COUNT) {
        goTo(index);
      } else {
        window.history.replaceState(
          null,
          "",
          `#look-${currentRef.current + 1}`,
        );
      }
      setReady(true);
    };
    const timer = window.setTimeout(read, 0);
    window.addEventListener("hashchange", read);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", read);
    };
  }, [goTo]);

  useEffect(() => {
    if (!ready) return;
    const next = `#look-${current + 1}`;
    if (window.location.hash !== next) {
      window.history.replaceState(null, "", next);
    }
  }, [current, ready]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move]);

  const measured = stageWidth > 0;
  const width = measured
    ? Math.min(270, Math.max(150, stageWidth * (wide ? 0.27 : 0.52)))
    : DEFAULT_WIDTH;
  const hookY = (width * 0.78 * 14) / 200;
  const stageHeight = width * 1.62 + 58;

  const offsets = LOOKS.map((_, index) => offsetFor(index, current));
  const transitions: Transition[] = LOOKS.map((_, index) =>
    laidOut && !instantFlags[index] ? SPRING : INSTANT,
  );

  const tapAt = (x: number, y: number) => {
    const stack = document.elementsFromPoint(x, y);
    for (const element of stack) {
      const hanger = element.closest<HTMLElement>("[data-look-index]");
      if (!hanger) continue;
      const index = Number(hanger.dataset.lookIndex);
      if (Number.isInteger(index) && index >= 0 && index < COUNT) {
        goTo(index);
      }
      return;
    }
  };

  const currentLook = LOOKS[current];

  const select = (index: number) => {
    if (dragged.current) return;
    goTo(index);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div>
        <div className="border-[1.5px] border-ink">
          <div aria-hidden="true" className="h-4 border-b border-ink bg-paper" />
          <div
            ref={stageRef}
            role="group"
            aria-roledescription="carousel"
            aria-label="Lookbook rail"
            className="relative overflow-hidden bg-paper-deep"
            style={{ height: stageHeight }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[44px] z-[1] h-[6px] bg-ink"
            />

            <div
              className="absolute inset-0"
              style={{ opacity: measured ? 1 : 0 }}
            >
              {LOOKS.map((look, index) => {
                const offset = offsets[index];
                const magnitude = Math.abs(offset);
                const hidden = magnitude >= 3;
                const scale =
                  magnitude === 0 ? 1 : magnitude === 1 ? 0.74 : magnitude === 2 ? 0.56 : 0.5;
                const opacity =
                  magnitude === 0 ? 1 : magnitude === 1 ? 1 : magnitude === 2 ? 0.8 : 0;
                const zIndex =
                  magnitude === 0 ? 3 : magnitude === 1 ? 2 : magnitude === 2 ? 1 : 0;
                return (
                  <WardrobeItem
                    key={look.name}
                    look={look}
                    index={index}
                    offset={offset}
                    width={width}
                    top={ROD_TOP - hookY}
                    hookY={hookY}
                    x={positionFor(offset, width) + dragX}
                    scale={scale}
                    opacity={opacity}
                    zIndex={zIndex}
                    hidden={hidden}
                    transition={dragging ? INSTANT : transitions[index]}
                    tick={tick}
                    direction={direction}
                    reduceMotion={reduceMotion}
                    isCurrent={index === current}
                    onJump={select}
                  />
                );
              })}
            </div>

            <motion.div
              aria-hidden="true"
              className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
              style={{ touchAction: "pan-y" }}
              drag="x"
              dragSnapToOrigin
              dragElastic={0.25}
              dragMomentum={false}
              onDragStart={() => {
                dragged.current = true;
                setDragging(true);
              }}
              onDrag={(_, info) => {
                setDragX(info.offset.x);
              }}
              onDragEnd={(_, info) => {
                const power =
                  Math.abs(info.offset.x) > 50
                    ? info.offset.x
                    : Math.abs(info.velocity.x) > 400
                      ? info.velocity.x
                      : 0;
                setDragging(false);
                setDragX(0);
                if (power > 0) move(-1);
                else if (power < 0) move(1);
                window.setTimeout(() => {
                  dragged.current = false;
                }, 60);
              }}
              onClick={(event) => {
                if (dragged.current) return;
                tapAt(event.clientX, event.clientY);
              }}
            />

            <motion.button
              type="button"
              aria-label="Previous look"
              onClick={() => move(-1)}
              whileTap={{ scale: 0.92 }}
              className="absolute left-1.5 top-[calc(50%-24px)] z-20 grid h-12 w-12 place-items-center border-[1.5px] border-ink bg-paper text-ink transition-colors hover:bg-forest hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent md:left-3.5 md:top-[calc(50%-26px)] md:h-[52px] md:w-[52px]"
            >
              <span aria-hidden="true" className="text-[22px] leading-none">
                ‹
              </span>
            </motion.button>
            <motion.button
              type="button"
              aria-label="Next look"
              onClick={() => move(1)}
              whileTap={{ scale: 0.92 }}
              className="absolute right-1.5 top-[calc(50%-24px)] z-20 grid h-12 w-12 place-items-center border-[1.5px] border-ink bg-paper text-ink transition-colors hover:bg-forest hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent md:right-3.5 md:top-[calc(50%-26px)] md:h-[52px] md:w-[52px]"
            >
              <span aria-hidden="true" className="text-[22px] leading-none">
                ›
              </span>
            </motion.button>
          </div>
          <div aria-hidden="true" className="h-5 border-t border-ink bg-paper" />
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <p
            aria-live="polite"
            className="text-[11px] uppercase tracking-[0.18em] tabular-nums text-ink"
          >
            {lookNumber(current)} / {String(COUNT).padStart(2, "0")}
          </p>
          <p className="text-[11px] text-ink-muted">
            Drag the rail, tap a hanger, or use the arrow keys
          </p>
        </div>

        <div className="mt-10 md:mt-12">
          <AnimatePresence mode="wait" initial={false}>
            <LookDetails key={currentLook.name} look={currentLook} index={current} />
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
