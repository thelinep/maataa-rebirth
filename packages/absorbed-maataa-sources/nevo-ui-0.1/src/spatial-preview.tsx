"use client";

import { useEffect, useId, useRef } from "react";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export type SpatialPreviewTheme = "nocturne" | "sunset" | "gallery";
export type SpatialPreviewZone = "arrival" | "stage" | "dining";

interface Palette {
  readonly sky: readonly [string, string, string];
  readonly highlight: string;
}

const PALETTES: Record<SpatialPreviewTheme, Palette> = {
  nocturne: { sky: ["#07162c", "#183c67", "#050914"], highlight: "#c79a58" },
  sunset: { sky: ["#35111b", "#9b3d43", "#16080c"], highlight: "#ffd18a" },
  gallery: { sky: ["#15221c", "#4b715d", "#0b120e"], highlight: "#d9f3cb" },
};

const ZONE_STAGE_TINT: Record<SpatialPreviewZone, string> = {
  arrival: "#18375a",
  stage: "#1d2b50",
  dining: "#4a2f2a",
};

const DEFAULT_DISCLAIMERS: Record<SpatialPreviewZone, string> = {
  arrival: "Illustrative arrival study. It does not reflect a confirmed venue, guest count, event plan, or production run.",
  stage: "Illustrative stage study. Lighting, technical cues, and production readiness remain unverified until recorded in the protected workspace.",
  dining: "Illustrative hospitality study. Layout, menu, and provider availability are planning prompts, not confirmed service.",
};

export interface SpatialPreviewProps {
  /** Which color study to render. @default "nocturne" */
  theme?: SpatialPreviewTheme;
  /** Which of the three illustrative zones to render. @default "arrival" */
  zone?: SpatialPreviewZone;
  /** Whether the slow orbit animation runs. A caller composing its own
   * pause/resume control (this component renders none itself -- see this
   * file's header comment) owns and toggles this the same way `Modal`'s
   * caller owns `open`. Independently of this prop, the animation never
   * runs at all when the visitor's OS requests reduced motion -- that
   * override isn't caller-configurable, the same non-negotiable the
   * package-wide `@media (prefers-reduced-motion: reduce)` rule in
   * styles.css already enforces for CSS transitions.
   * @default true */
  orbiting?: boolean;
  className?: string;
  /** Accessible name for the canvas element. Defaults to a name derived
   * from `zone`/`theme` (e.g. "arrival configuration, nocturne study"). */
  ariaLabel?: string;
  /** Renders the honest illustrative-content disclaimer below the canvas.
   * On by default -- see this file's header comment for why there's no
   * option to change the wording without also acknowledging it's shown.
   * @default true */
  showDisclaimer?: boolean;
  /** Overrides the default per-zone disclaimer copy. Still only shown
   * when `showDisclaimer` is true. */
  disclaimerText?: string;
}

/**
 * A 2D Canvas illustration of an event space, ported from the `apps/vr`
 * prototype's `src/app.mjs` drawing code into a reusable, controlled
 * `@maataa/ui` component.
 *
 * Despite `apps/vr`'s own name ("NEVO Spatial Preview") and this
 * component's name, **this is not 3D or WebGL geometry** -- it is a
 * `<canvas>` 2D-context illustration: a gradient sky, rows of semi-
 * transparent rectangles simulating depth via a fake parallax, and a
 * slowly incrementing rotation for a subtle "orbit" feel. That is exactly
 * what the ported prototype drew (confirmed by reading `apps/vr/src/
 * app.mjs` in full before porting it), and moving it into `@maataa/ui`
 * doesn't change what it actually renders, only how it's packaged. If
 * genuine 3D/WebGL previz is what's needed for exhibition or venue
 * planning, this component is not that -- it's the same illustrative
 * color study the prototype always was, now reusable and embeddable
 * instead of a standalone static page. The built-in disclaimer
 * (`showDisclaimer`, on by default) exists specifically so that
 * distinction survives being embedded somewhere its origin as a quick
 * illustrative sketch might not otherwise be obvious.
 *
 * "use client": drives a `requestAnimationFrame` loop and reads
 * `window`/canvas sizing, same rule as every other stateful primitive in
 * this package.
 *
 * The animation loop's own running state (the rotation `angle`) is
 * transient rendering state with no reason for a caller to own it -- the
 * same reasoning `Tooltip`'s open/closed state is left uncontrolled (see
 * tooltip.tsx). What the caller *does* own -- `theme`, `zone`, and
 * `orbiting` -- is read fresh on every animation frame via a ref, so the
 * loop (started once, in a single mount-time effect with an empty
 * dependency array) always draws with the current prop values without
 * needing to be torn down and restarted -- and without resetting `angle`
 * and visibly jumping the animation -- on every prop change.
 */
export function SpatialPreview({
  theme = "nocturne",
  zone = "arrival",
  orbiting = true,
  className,
  ariaLabel,
  showDisclaimer = true,
  disclaimerText,
}: SpatialPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const liveRef = useRef({ theme, zone, orbiting, angle: 0 });
  const reactId = useId();
  liveRef.current.theme = theme;
  liveRef.current.zone = zone;
  liveRef.current.orbiting = orbiting;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    // jsdom -- this package's own test environment, see
    // tests/dom-setup.mjs -- has no <canvas> 2D context without the
    // optional `canvas` npm package, and real browsers without 2D canvas
    // support exist too. Either way, draw nothing rather than throw --
    // map.tsx's own tests sidestep a similar real-canvas dependency
    // (maplibre-gl) the same way, per dom-setup.mjs's header comment.
    if (!context) return undefined;

    const reduceMotion = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let disposed = false;

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      const width = canvas!.clientWidth || canvas!.parentElement?.clientWidth || 320;
      const height = canvas!.clientHeight || canvas!.parentElement?.clientHeight || 240;
      canvas!.width = width * ratio;
      canvas!.height = height * ratio;
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw() {
      if (disposed) return;
      const { theme: currentTheme, zone: currentZone, orbiting: currentOrbiting } = liveRef.current;
      const width = canvas!.clientWidth || 320;
      const height = canvas!.clientHeight || 240;
      const horizon = height * 0.48;
      const [top, middle, bottom] = PALETTES[currentTheme].sky;
      const highlight = PALETTES[currentTheme].highlight;

      const sky = context!.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, top);
      sky.addColorStop(0.55, middle);
      sky.addColorStop(1, bottom);
      context!.fillStyle = sky;
      context!.fillRect(0, 0, width, height);

      context!.save();
      context!.translate(width * 0.67, horizon);
      context!.rotate(Math.sin(liveRef.current.angle) * 0.08);
      for (let i = 0; i < 15; i++) {
        const depth = i / 14;
        const y = depth * height * 0.7;
        context!.fillStyle = `rgba(${22 + i * 2}, ${48 + i * 4}, ${80 + i * 7}, ${0.92 - depth * 0.55})`;
        context!.fillRect(-width, y, width * 2, 2);
      }
      context!.fillStyle = "#0b1425";
      context!.fillRect(-width, 0, width * 2, height * 0.19);
      for (let i = -5; i <= 5; i++) {
        const x = i * width * 0.11;
        context!.fillStyle = "rgba(185, 214, 255, .2)";
        context!.fillRect(x, -height * 0.1, width * 0.012, height * 0.65);
        context!.beginPath();
        context!.arc(x, height * 0.21, width * 0.035, 0, Math.PI * 2);
        context!.fillStyle = highlight;
        context!.fill();
      }
      context!.fillStyle = highlight;
      context!.fillRect(-width * 0.18, height * 0.15, width * 0.36, height * 0.18);
      context!.fillStyle = ZONE_STAGE_TINT[currentZone];
      context!.fillRect(-width * 0.12, height * 0.08, width * 0.24, height * 0.12);
      context!.restore();

      context!.fillStyle = "rgba(157, 205, 255, .75)";
      context!.font = "600 12px Inter, sans-serif";
      context!.fillText("SYNTHETIC VENUE STUDY", 24, height - 28);

      if (currentOrbiting && !reduceMotion) liveRef.current.angle += 0.008;
      frame = window.requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
    // Deliberately empty deps -- see this component's own doc comment on
    // why the loop reads current props via liveRef instead of restarting.
  }, []);

  const disclaimerId = `${reactId}-spatial-preview-disclaimer`;

  return (
    <div className={classes("maataa-ui", "maataa-ui__spatial-preview", className)}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={ariaLabel ?? `${zone} configuration, ${theme} study`}
        aria-describedby={showDisclaimer ? disclaimerId : undefined}
        className="maataa-ui__spatial-preview-canvas"
      />
      {showDisclaimer ? (
        <p id={disclaimerId} className="maataa-ui__spatial-preview-disclaimer">
          {disclaimerText ?? DEFAULT_DISCLAIMERS[zone]}
        </p>
      ) : null}
    </div>
  );
}
