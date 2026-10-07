/**
 * @maataa/ui/maps/mapUtils
 * Small internal helpers shared by VenueFloorPlan and GeoMap. Not part of
 * the public API.
 */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export interface GeoBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export const WORLD_BOUNDS: GeoBounds = { minLat: -90, maxLat: 90, minLng: -180, maxLng: 180 };

/**
 * Projects a lat/lng pair onto a `width`x`height` canvas using a simple
 * equirectangular (plate carrée) projection over the given bounds — no
 * external mapping/tile service required. Values outside `bounds` are
 * clamped onto the canvas edge rather than dropped.
 */
export function projectLatLng(
  lat: number,
  lng: number,
  bounds: GeoBounds,
  width: number,
  height: number
): { x: number; y: number } {
  const latSpan = bounds.maxLat - bounds.minLat || 1;
  const lngSpan = bounds.maxLng - bounds.minLng || 1;
  const x = clamp(((lng - bounds.minLng) / lngSpan) * width, 0, width);
  const y = clamp(((bounds.maxLat - lat) / latSpan) * height, 0, height);
  return { x, y };
}

/** Latitude/longitude graticule lines at a fixed step, for a background-free GeoMap. */
export function graticuleLines(bounds: GeoBounds, step = 30): { lats: number[]; lngs: number[] } {
  const lats: number[] = [];
  for (let lat = Math.ceil(bounds.minLat / step) * step; lat <= bounds.maxLat; lat += step) {
    lats.push(lat);
  }
  const lngs: number[] = [];
  for (let lng = Math.ceil(bounds.minLng / step) * step; lng <= bounds.maxLng; lng += step) {
    lngs.push(lng);
  }
  return { lats, lngs };
}
