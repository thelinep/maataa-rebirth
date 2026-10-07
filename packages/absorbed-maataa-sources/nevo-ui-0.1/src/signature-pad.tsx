"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Button } from "./components.js";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export interface SignaturePadProps {
  label: string;
  /** Controlled-only: a `data:image/png;base64,...` data URL, or `""`
   * when nothing has been drawn -- same "caller owns the committed
   * value" contract as every other field here. Updated on pointer-up
   * (stroke end), not on every pointermove, so the caller isn't handed a
   * re-render per pixel of movement. */
  value: string;
  onValueChange(value: string): void;
  /** Pixel size of the drawing surface. @default { width: 480, height: 160 } */
  width?: number;
  height?: number;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

/**
 * No Base UI primitive covers freehand drawing -- this is a plain
 * `<canvas>` with pointer-event capture, matching `SpatialPreview`'s own
 * precedent in this package (spatial-preview.tsx) for "canvas is the
 * right primitive when Base UI has none." Two things a canvas-only
 * signature pad usually gets wrong, both addressed here: (1) a canvas
 * has no meaningful accessible content for a screen-reader user to
 * inspect, so the canvas itself is `aria-hidden` and paired with a real
 * `role="img"` region plus a "Clear" button whose own label states
 * whether a signature has been captured; (2) drawing requires fine
 * motor control some users can't provide at all -- there is no
 * accessible substitute *within this component* (a signature is
 * inherently a drawn artifact), so the caller is expected to offer a
 * typed-name fallback field alongside this one where that matters, the
 * same way a real paper form pairs a signature line with a printed name.
 */
export function SignaturePad({ label, value, onValueChange, width = 480, height = 160, disabled, required, className }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const [hasStroke, setHasStroke] = useState(value.length > 0);

  const context = () => canvasRef.current?.getContext("2d") ?? null;

  const point = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const ctx = context();
    if (!ctx) return;
    drawingRef.current = true;
    canvasRef.current?.setPointerCapture(event.pointerId);
    const { x, y } = point(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const ctx = context();
    if (!ctx) return;
    const { x, y } = point(event);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "currentColor";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHasStroke(true);
    onValueChange(canvas.toDataURL("image/png"));
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = context();
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasStroke(false);
    onValueChange("");
  };

  return (
    <div className={classes("maataa-ui", "maataa-ui__signature-pad", className)}>
      <span className="maataa-ui__signature-pad-label">
        {label}
        {required ? " *" : ""}
      </span>
      <div className="maataa-ui__signature-pad-surface" role="img" aria-label={hasStroke ? `${label}: signature captured` : `${label}: no signature yet`}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          aria-hidden="true"
          className="maataa-ui__signature-pad-canvas"
          data-disabled={disabled ? "" : undefined}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>
      <Button type="button" variant="quiet" disabled={disabled || !hasStroke} onClick={handleClear}>
        Clear signature
      </Button>
    </div>
  );
}
