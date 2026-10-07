"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

// Only the two stateful marketing primitives live here, behind their own
// "use client" boundary -- MarketingNav/Hero/Disclosure/ImageCard/Footer
// (./marketing.tsx) hold no state and stay import-safe from a Server
// Component, so importing @maataa/ui for those doesn't force a client
// boundary on every consumer of the package.

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

/* ---------- theme toggle ---------- */

export type ThemeMode = "light" | "dark";

/** Controlled: the host owns and persists `mode` (e.g. in localStorage or
 * a cookie). The package never reaches for storage itself, matching the
 * rest of @maataa/ui's "no undeclared side effects" contract. */
export function ThemeToggle({ mode, onChange, labels, className }: {
  mode: ThemeMode;
  onChange(mode: ThemeMode): void;
  labels?: { light?: ReactNode; dark?: ReactNode };
  className?: string;
}) {
  return (
    <div className={classes("maataa-ui", "maataa-ui__theme-toggle", className)} role="group" aria-label="Visual theme">
      <button type="button" aria-pressed={mode === "light"} onClick={() => onChange("light")}>{labels?.light ?? "Light"}</button>
      <button type="button" aria-pressed={mode === "dark"} onClick={() => onChange("dark")}>{labels?.dark ?? "Dark"}</button>
    </div>
  );
}

/* ---------- carousel ---------- */

export interface CarouselSlide { id: string; content: ReactNode; }

/** Self-contained autoplay (paused under prefers-reduced-motion) with a
 * dot rail and an optional pause/play control, matching the accessible
 * carousel pattern already hand-rolled in the public site before this
 * package existed to hold it. */
export function Carousel({ slides, autoPlayMs = 4200, pauseLabel = "Pause", playLabel = "Play", className }: {
  slides: readonly CarouselSlide[];
  autoPlayMs?: number;
  pauseLabel?: string;
  playLabel?: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing || slides.length < 2) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % slides.length), autoPlayMs);
    return () => window.clearInterval(timer);
  }, [playing, slides.length, autoPlayMs]);

  if (!slides.length) return null;

  return (
    <section className={classes("maataa-ui", "maataa-ui__carousel", className)} aria-roledescription="carousel">
      {slides.map((slide, position) => (
        <div
          aria-hidden={position !== index}
          className={classes("maataa-ui__carousel-slide", position === index && "maataa-ui__carousel-slide--active")}
          key={slide.id}
        >
          {slide.content}
        </div>
      ))}
      {slides.length > 1 && (
        <div
          className="maataa-ui__carousel-rail"
          ref={railRef}
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            const next = event.key === "ArrowRight" ? (index + 1) % slides.length : (index - 1 + slides.length) % slides.length;
            setIndex(next);
            railRef.current?.querySelectorAll<HTMLButtonElement>(".maataa-ui__carousel-dot")[next]?.focus();
          }}
        >
          {slides.map((slide, position) => (
            <button
              aria-label={`Show slide ${position + 1}`}
              className={classes("maataa-ui__carousel-dot", position === index && "maataa-ui__carousel-dot--active")}
              key={slide.id}
              onClick={() => setIndex(position)}
              type="button"
            />
          ))}
          <button className="maataa-ui__carousel-pause" onClick={() => setPlaying(value => !value)} type="button">
            {playing ? pauseLabel : playLabel}
          </button>
        </div>
      )}
    </section>
  );
}
