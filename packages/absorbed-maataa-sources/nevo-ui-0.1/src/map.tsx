"use client";

// This file needs maplibre-gl's own stylesheet for the map's controls
// (zoom buttons, attribution) and marker/popup positioning to render
// correctly -- it is NOT bundled here (this package ships no CSS from
// .tsx files, matching every other advanced.css-backed component in this
// package). Add to packages/maataa-ui/src/advanced.css:
//   @import "maplibre-gl/dist/maplibre-gl.css";
// plus the .maataa-ui__map* rules below (see this component's PR/report
// for the exact block -- wired centrally, not from this file).

import { useEffect, useRef, type CSSProperties } from "react";
import maplibregl from "maplibre-gl";
import type { Map as MapLibreMap, Marker as MapLibreMarker } from "maplibre-gl";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

/**
 * OpenFreeMap's "liberty" style: free, keyless and explicitly documented
 * by OpenFreeMap as production-safe (unlike MapLibre's own demo style,
 * https://demotiles.maplibre.org/style.json, which its own docs say is
 * for demos only and carries no uptime/production guarantee). Not
 * user-configurable as a prop -- if this package ever needs to support a
 * different tile provider, that should be a deliberate new prop (e.g.
 * `styleUrl`), not a silent default swap.
 */
const OPENFREEMAP_LIBERTY_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export interface MapMarker {
  /** Stable identifier -- passed back verbatim to `onMarkerClick`. Not
   * rendered anywhere, so it never needs to be human-readable. */
  id: string;
  lng: number;
  lat: number;
  /** Accessible name for the marker's button and, when present, its
   * visible pin caption. Falls back to the coordinates so a marker is
   * never announced as an unlabeled control. */
  label?: string;
}

export interface MapProps {
  center: { lng: number; lat: number };
  zoom: number;
  markers?: readonly MapMarker[];
  onMarkerClick?(markerId: string): void;
  /** Fires with the clicked point's coordinates whenever the map itself
   * (not an existing marker -- `onMarkerClick` covers that case
   * separately) is clicked. Optional and additive: omitting it leaves
   * `Map`'s existing pan/click/marker behavior completely unchanged --
   * this is the hook `PinDropper`/`MultiPinDropper`/`AreaMarker`
   * (pin-dropper.tsx, area-marker.tsx) build their click-to-place
   * interactions on top of, rather than each duplicating their own
   * maplibre-gl `Map` instance and lifecycle. */
  onMapClick?(point: { lng: number; lat: number }): void;
  /** An in-progress or closed polygon to draw as a filled, outlined
   * overlay -- optional and additive, same as `onMapClick`: omitting it
   * leaves `Map` exactly as it was before this prop existed. Points are
   * rendered as given, open (not auto-closed) below 3 points so
   * `AreaMarker` (area-marker.tsx) can show a live line while a shape is
   * still being drawn, and as a closed filled polygon at 3+ points. */
  polygon?: { points: readonly { lng: number; lat: number }[] };
  className?: string;
  /**
   * maplibre-gl measures its container's rendered box on mount and does
   * not grow to fit content -- a container with no height (the default
   * for a plain `<div>`) renders a 0px-tall canvas with no visible error
   * or console warning. Giving the map a height is the host's
   * responsibility: pass it here (e.g. `style={{ height: 400 }}`) or via
   * a CSS rule targeting `className`. This component cannot enforce or
   * default it -- any default height it picked would be wrong for most
   * layouts (a sidebar map, a full-bleed hero map and an inline
   * thumbnail all want different heights).
   */
  style?: CSSProperties;
  /** Accessible name for the map's landmark region. Defaults to "Map";
   * override with something specific ("Venue location", "Delivery area")
   * when a page has more than one map or the generic default would be
   * ambiguous in a screen reader's landmark list. */
  ariaLabel?: string;
}

/**
 * A controlled wrapper around maplibre-gl's imperative `Map` class, in the
 * same spirit as marketing-client.tsx's `Carousel`: the library owns a
 * real, non-React-managed subsystem (here, a WebGL context and its tile
 * cache) inside a `useEffect`, and React only ever sees the `<div>`
 * container it mounts into -- maplibre-gl is never asked to co-render
 * with React's own reconciliation.
 *
 * Split into three effects rather than one, each with the narrowest
 * dependency list that keeps it correct:
 *  1. Mount/unmount only (`[]`) -- constructs exactly one `Map` per DOM
 *     container and guarantees `.remove()` runs on cleanup. This must
 *     NOT depend on `center`/`zoom`/`markers`, or every prop change would
 *     tear down and rebuild the whole WebGL context (expensive, and pans
 *     you back to the *initial* view, discarding any interactive
 *     pan/zoom the visitor had done in between).
 *  2. Syncs `center`/`zoom` onto an already-mounted map via `setCenter`/
 *     `setZoom` when the caller changes those controlled props.
 *  3. Rebuilds the marker set when `markers` (or `onMarkerClick`)
 *     changes, removing every marker it added on the way out -- correct
 *     under React StrictMode's dev-only double-invoke, since each mount
 *     tears down exactly what that same mount added, never a previous
 *     mount's markers.
 */
export function Map({ center, zoom, markers = [], onMarkerClick, onMapClick, polygon, className, style, ariaLabel = "Map" }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  // Kept current every render so the mount-only effect below (its `[]`
  // dependency list is deliberate -- see that effect's own doc comment)
  // can call the latest `onMapClick` without needing it as a dependency,
  // the same ref-for-a-callback pattern already used by `NevoWizard`'s
  // context (wizard/context.tsx) for its own long-lived callbacks.
  const onMapClickRef = useRef(onMapClick);
  onMapClickRef.current = onMapClick;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const map = new maplibregl.Map({
      container,
      style: OPENFREEMAP_LIBERTY_STYLE,
      center: [center.lng, center.lat],
      zoom,
    });
    mapRef.current = map;
    const handleClick = (event: maplibregl.MapMouseEvent) => {
      // maplibre-gl fires its own `click` for a click anywhere on the
      // map, including on a marker's DOM element -- markers already
      // call `onMarkerClick` via their own element listener (see the
      // marker effect below), so this only forwards clicks whose
      // target isn't inside a `.maataa-ui__map-marker` button, to avoid
      // firing both callbacks for the same physical click.
      const target = event.originalEvent.target;
      if (target instanceof Element && target.closest(".maataa-ui__map-marker")) return;
      onMapClickRef.current?.({ lng: event.lngLat.lng, lat: event.lngLat.lat });
    };
    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
      map.remove();
      mapRef.current = null;
    };
    // Intentionally mount/unmount only -- see the doc comment above for
    // why `center`/`zoom` must not be dependencies here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.setCenter([center.lng, center.lat]);
    map.setZoom(zoom);
  }, [center.lng, center.lat, zoom]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Plain DOM elements, not maplibre-gl's default teardrop pin --
    // gives every marker a real, keyboard-focusable <button> with its own
    // click listener, rather than depending on Marker's own click
    // surface (undocumented and not guaranteed stable across maplibre-gl
    // versions; a listener on the element itself is a stable public
    // contract of the DOM, not of this one library).
    const instances: MapLibreMarker[] = markers.map(marker => {
      const element = document.createElement("button");
      element.type = "button";
      element.className = "maataa-ui__map-marker";
      element.setAttribute("aria-label", marker.label ?? `Marker at ${marker.lat}, ${marker.lng}`);
      if (marker.label) {
        const caption = document.createElement("span");
        caption.className = "maataa-ui__map-marker-label";
        caption.textContent = marker.label;
        caption.setAttribute("aria-hidden", "true"); // the button's aria-label already carries this text -- avoid announcing it twice
        element.appendChild(caption);
      }
      element.addEventListener("click", () => onMarkerClick?.(marker.id));
      return new maplibregl.Marker({ element }).setLngLat([marker.lng, marker.lat]).addTo(map);
    });

    return () => {
      instances.forEach(instance => instance.remove());
    };
  }, [markers, onMarkerClick]);

  // Draws `polygon` as a GeoJSON source with a fill and an outline layer,
  // added once on mount (maplibre-gl requires the map's `load` event
  // before `addSource`/`addLayer` are safe to call) and thereafter only
  // *updated* in place via `source.setData` -- removing/re-adding the
  // source and layers on every `polygon` change would flash the overlay
  // and is unnecessary work maplibre-gl's own `setData` already avoids.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const SOURCE_ID = "maataa-ui-area-marker";
    // A minimal local Feature shape rather than depending on @types/geojson
    // (not installed in this package -- maplibre-gl's own GeoJSONSource
    // type accepts any object matching this shape structurally, so no
    // external type dependency is needed for it).
    type MinimalFeature = { type: "Feature"; properties: Record<string, never>; geometry: { type: "Polygon"; coordinates: number[][][] } | { type: "LineString"; coordinates: number[][] } };
    const toFeature = (points: readonly { lng: number; lat: number }[]): MinimalFeature => {
      const coordinates = points.map(point => [point.lng, point.lat]);
      if (points.length >= 3) {
        return { type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: [[...coordinates, coordinates[0]]] } };
      }
      return { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates } };
    };

    const applyData = () => {
      const source = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource | undefined;
      source?.setData(toFeature(polygon?.points ?? []));
    };

    const addLayers = () => {
      if (map.getSource(SOURCE_ID)) { applyData(); return; }
      map.addSource(SOURCE_ID, { type: "geojson", data: toFeature(polygon?.points ?? []) });
      map.addLayer({ id: `${SOURCE_ID}-fill`, type: "fill", source: SOURCE_ID, filter: ["==", ["geometry-type"], "Polygon"], paint: { "fill-color": "#1d4ed8", "fill-opacity": 0.2 } });
      map.addLayer({ id: `${SOURCE_ID}-line`, type: "line", source: SOURCE_ID, paint: { "line-color": "#1d4ed8", "line-width": 2 } });
    };

    if (map.loaded()) {
      addLayers();
    } else {
      map.once("load", addLayers);
    }
    if (map.getSource(SOURCE_ID)) applyData();

    return () => {
      if (!mapRef.current) return; // map already torn down by the mount effect's own cleanup
      if (map.getLayer(`${SOURCE_ID}-line`)) map.removeLayer(`${SOURCE_ID}-line`);
      if (map.getLayer(`${SOURCE_ID}-fill`)) map.removeLayer(`${SOURCE_ID}-fill`);
      if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
    };
  }, [polygon]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      className={classes("maataa-ui", "maataa-ui__map", className)}
      style={style}
    />
  );
}
