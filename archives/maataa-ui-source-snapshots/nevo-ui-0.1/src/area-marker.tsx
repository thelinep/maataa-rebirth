"use client";

import type { CSSProperties } from "react";
import { Map } from "./map.js";
import { Button } from "./components.js";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export interface AreaMarkerProps {
  center: { lng: number; lat: number };
  zoom: number;
  /** Controlled-only ordered list of vertex points. Fewer than 3 points
   * draws an open in-progress line (see `Map`'s own `polygon` prop doc
   * comment, map.tsx); 3 or more draws a closed, filled area. */
  value: readonly { lng: number; lat: number }[];
  onValueChange(value: { lng: number; lat: number }[]): void;
  /** Minimum vertices before the area is considered complete/valid --
   * purely informational here (rendered as a status line), since this
   * component has no submit step of its own to block on it. @default 3 */
  minPoints?: number;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

/**
 * A click-to-draw region input, composed the same way `PinDropper`/
 * `MultiPinDropper` (pin-dropper.tsx) are: it renders `Map` and drives
 * its `onMapClick`/`polygon` props rather than touching maplibre-gl
 * directly. Each click appends a vertex; there's no click-to-close
 * gesture on the map itself (closing on a click near the first point is
 * a common source of accidental-close mis-clicks on a touch device), so
 * closing is implicit once 3+ points exist and explicit control is
 * instead given via the "Undo last point"/"Clear area" buttons below the
 * map -- both real, focusable, keyboard-operable controls, unlike a
 * click-precision-dependent map gesture.
 */
export function AreaMarker({ center, zoom, value, onValueChange, minPoints = 3, className, style, ariaLabel = "Click to add area points" }: AreaMarkerProps) {
  const complete = value.length >= minPoints;
  return (
    <div className={classes("maataa-ui", "maataa-ui__area-marker", className)}>
      <Map
        center={center}
        zoom={zoom}
        polygon={{ points: value }}
        onMapClick={point => onValueChange([...value, point])}
        style={style}
        ariaLabel={ariaLabel}
      />
      <div className="maataa-ui__area-marker-controls">
        <span role="status" className="maataa-ui__area-marker-status">
          {value.length} point{value.length === 1 ? "" : "s"} {complete ? "— area complete" : `— at least ${minPoints} needed`}
        </span>
        <Button type="button" variant="quiet" disabled={value.length === 0} onClick={() => onValueChange(value.slice(0, -1))}>
          Undo last point
        </Button>
        <Button type="button" variant="quiet" disabled={value.length === 0} onClick={() => onValueChange([])}>
          Clear area
        </Button>
      </div>
    </div>
  );
}
