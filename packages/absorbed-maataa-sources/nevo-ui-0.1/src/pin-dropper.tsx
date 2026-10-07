"use client";

import type { CSSProperties } from "react";
import { Map, type MapMarker } from "./map.js";

export interface PinDropperProps {
  center: { lng: number; lat: number };
  zoom: number;
  /** Controlled-only single point, or `null` before anything's been
   * placed -- same contract as every other stateful field here. */
  value: { lng: number; lat: number } | null;
  onValueChange(value: { lng: number; lat: number } | null): void;
  /** Accessible label applied to the placed pin's marker button. */
  label?: string;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

/**
 * The click-to-place coordinate input `Map` (map.tsx) never had on its
 * own -- `Map` only ever displayed markers the caller already had
 * coordinates for. This is a thin composition, not a fork: it renders
 * `Map` with `onMapClick` wired to replace `value`, and clicking the
 * placed marker itself removes it (the map's own `onMarkerClick`), so a
 * single click anywhere places or moves the pin and a click on the pin
 * clears it. For placing more than one point, see `MultiPinDropper`
 * below -- kept as a separate component rather than a `multiple` prop
 * on this one, since a single point vs. an array is a real difference
 * in `value`'s type, not just a rendering variant.
 */
export function PinDropper({ center, zoom, value, onValueChange, label = "Selected location", className, style, ariaLabel = "Click to place a pin" }: PinDropperProps) {
  const markers: MapMarker[] = value ? [{ id: "pin", lng: value.lng, lat: value.lat, label }] : [];
  return (
    <Map
      center={value ?? center}
      zoom={zoom}
      markers={markers}
      onMapClick={point => onValueChange(point)}
      onMarkerClick={() => onValueChange(null)}
      className={className}
      style={style}
      ariaLabel={ariaLabel}
    />
  );
}

export interface MultiPinDropperProps {
  center: { lng: number; lat: number };
  zoom: number;
  /** Controlled-only array of placed points, each carrying its own
   * stable `id` so callers can label, reorder, or remove a specific one
   * without relying on array position. */
  value: readonly MapMarker[];
  onValueChange(value: MapMarker[]): void;
  /** Generates the next marker's accessible label from its 1-based
   * placement order. @default (n) => `Point ${n}` */
  labelForIndex?(index: number): string;
  /** Caps how many points can be placed; further clicks are ignored once
   * reached. Omit for no limit. */
  maxPoints?: number;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

/**
 * The many-points sibling of `PinDropper` above: each click adds a new
 * marker (up to `maxPoints`, when set) instead of replacing the one
 * value, and clicking any existing marker removes just that one. Ids are
 * generated here (`point-{timestamp}-{index}`) since `Map`'s `MapMarker`
 * requires a stable id the caller doesn't otherwise have a reason to
 * invent for a freshly-clicked point.
 */
export function MultiPinDropper({ center, zoom, value, onValueChange, labelForIndex = index => `Point ${index}`, maxPoints, className, style, ariaLabel = "Click to add points" }: MultiPinDropperProps) {
  const markers: MapMarker[] = value.map((marker, index) => ({ ...marker, label: marker.label ?? labelForIndex(index + 1) }));
  return (
    <Map
      center={center}
      zoom={zoom}
      markers={markers}
      onMapClick={point => {
        if (maxPoints !== undefined && value.length >= maxPoints) return;
        const id = `point-${Date.now()}-${value.length}`;
        onValueChange([...value, { id, lng: point.lng, lat: point.lat, label: labelForIndex(value.length + 1) }]);
      }}
      onMarkerClick={markerId => onValueChange(value.filter(marker => marker.id !== markerId))}
      className={className}
      style={style}
      ariaLabel={ariaLabel}
    />
  );
}
