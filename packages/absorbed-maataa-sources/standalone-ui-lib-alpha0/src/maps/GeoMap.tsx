/**
 * @maataa/ui/maps/GeoMap
 * A lat/lng pin map with no external tile-service dependency
 */

import React, { useState } from "react";
import { Portal } from "../primitives/Portal";
import { chartTokens, colorTokens, radiusTokens, spacingTokens, typographyTokens } from "../tokens";
import { type GeoBounds, WORLD_BOUNDS, graticuleLines, projectLatLng } from "./mapUtils";

export type GeoMapPinStatus = "default" | "active" | "alert";

export interface GeoMapPin {
  id: string;
  label: string;
  lat: number;
  lng: number;
  status?: GeoMapPinStatus;
  color?: string;
}

export interface GeoMapProps {
  pins: GeoMapPin[];

  width?: number;
  height?: number;

  /**
   * A pre-rendered map image (URL or data URI) covering `bounds` exactly,
   * shown beneath the pins. Without one, a plain surface with a lat/lng
   * graticule is drawn instead — this component projects coordinates, it
   * doesn't fetch map tiles.
   */
  backgroundImage?: string;

  /** The lat/lng extent the canvas covers. @default the whole world */
  bounds?: GeoBounds;

  selectedId?: string | null;
  onSelect?: (id: string | null) => void;

  className?: string;
  style?: React.CSSProperties;
}

const STATUS_COLOR: Record<GeoMapPinStatus, string> = {
  default: chartTokens.single,
  active: colorTokens.interactive.success,
  alert: colorTokens.interactive.error,
};

/**
 * GeoMap
 * Projects lat/lng pins onto a plain equirectangular canvas — supply your
 * own `backgroundImage` (an exported map/satellite image covering
 * `bounds`) for real geography, or omit it for a graticule-only canvas.
 * Click a pin or its label to select it.
 *
 * @example
 * ```tsx
 * <GeoMap
 *   pins={[
 *     { id: "sf", label: "San Francisco", lat: 37.77, lng: -122.42 },
 *     { id: "nyc", label: "New York", lat: 40.71, lng: -74.01, status: "active" },
 *   ]}
 * />
 * ```
 */
export const GeoMap = React.forwardRef<SVGSVGElement, GeoMapProps>(
  (
    {
      pins,
      width = 480,
      height = 280,
      backgroundImage,
      bounds = WORLD_BOUNDS,
      selectedId = null,
      onSelect,
      className,
      style,
    },
    ref
  ) => {
    const [hovered, setHovered] = useState<{ pin: GeoMapPin; x: number; y: number } | null>(null);
    const { lats, lngs } = graticuleLines(bounds);

    const handleSelect = (pin: GeoMapPin) => {
      onSelect?.(pin.id === selectedId ? null : pin.id);
    };

    const handleKeyDown = (e: React.KeyboardEvent, pin: GeoMapPin) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect(pin);
      }
    };

    return (
      <div className={className} style={{ position: "relative", width, height, ...style }}>
        <svg
          ref={ref}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Map with ${pins.length} locations`}
        >
          {backgroundImage ? (
            <image
              href={backgroundImage}
              x={0}
              y={0}
              width={width}
              height={height}
              preserveAspectRatio="none"
            />
          ) : (
            <>
              <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={colorTokens.background.secondary}
              />
              {lats.map((lat) => {
                const { y } = projectLatLng(lat, bounds.minLng, bounds, width, height);
                return (
                  <line
                    key={`lat${lat}`}
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke={chartTokens.grid}
                    strokeWidth={1}
                  />
                );
              })}
              {lngs.map((lng) => {
                const { x } = projectLatLng(bounds.maxLat, lng, bounds, width, height);
                return (
                  <line
                    key={`lng${lng}`}
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={height}
                    stroke={chartTokens.grid}
                    strokeWidth={1}
                  />
                );
              })}
            </>
          )}
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="none"
            stroke={colorTokens.border.primary}
            strokeWidth={1}
          />

          {pins.map((pin) => {
            const { x, y } = projectLatLng(pin.lat, pin.lng, bounds, width, height);
            const color = pin.color ?? STATUS_COLOR[pin.status ?? "default"];
            const isSelected = pin.id === selectedId;
            return (
              <g
                key={pin.id}
                role="button"
                tabIndex={0}
                aria-label={pin.label}
                aria-pressed={isSelected}
                onClick={() => handleSelect(pin)}
                onKeyDown={(e) => handleKeyDown(e, pin)}
                onMouseEnter={(e) => setHovered({ pin, x: e.clientX, y: e.clientY })}
                onMouseMove={(e) => setHovered({ pin, x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 8 : 6}
                  fill={colorTokens.background.primary}
                />
                <circle cx={x} cy={y} r={isSelected ? 6 : 4} fill={color} />
              </g>
            );
          })}
        </svg>

        {hovered && (
          <Portal>
            <div
              role="tooltip"
              style={{
                position: "fixed",
                left: `${hovered.x}px`,
                top: `${hovered.y - 12}px`,
                transform: "translate(-50%, -100%)",
                zIndex: 1000,
                pointerEvents: "none",
                padding: spacingTokens.sm,
                backgroundColor: colorTokens.background.inverse,
                color: colorTokens.text.inverse,
                borderRadius: radiusTokens.md,
                boxShadow: colorTokens.shadow.md,
                fontSize: typographyTokens.fontSize.xs,
                whiteSpace: "nowrap",
              }}
            >
              {hovered.pin.label}
            </div>
          </Portal>
        )}
      </div>
    );
  }
);

GeoMap.displayName = "GeoMap";
