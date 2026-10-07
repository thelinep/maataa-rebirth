/**
 * @maataa/ui/maps/VenueFloorPlan
 * A zoomable/pannable floor-plan canvas with placeable, selectable zones
 */

import React, { useRef, useState } from "react";
import { colorTokens, radiusTokens, spacingTokens, typographyTokens } from "../tokens";
import { clamp } from "./mapUtils";

export type FloorPlanZoneStatus = "available" | "reserved" | "occupied" | "blocked";

export interface FloorPlanZone {
  id: string;
  label: string;
  /** Position and size in the floor plan's own coordinate space (e.g. meters). */
  x: number;
  y: number;
  width: number;
  /** Ignored when `shape` is `"circle"` — `width` is used as the diameter. */
  height: number;
  shape?: "rect" | "circle";
  status?: FloorPlanZoneStatus;
  /** Overrides the status color entirely. */
  color?: string;
  disabled?: boolean;
}

export interface VenueFloorPlanProps {
  zones: FloorPlanZone[];

  /** The full extent of the floor plan, in the same units as each zone's `x`/`y`/`width`/`height`. */
  planWidth: number;
  planHeight: number;

  /** Rendered canvas size in pixels. */
  width?: number;
  height?: number;

  /** Optional floor-plan image (URL or data URI) shown beneath the zones, covering the full plan extent. */
  backgroundImage?: string;

  /** Shows a reference grid over the plan. @default true when there's no backgroundImage */
  showGrid?: boolean;

  /** Currently selected zone id (controlled). */
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;

  /** Enables wheel-to-zoom, drag-to-pan, and the zoom toolbar. @default true */
  zoomable?: boolean;
  minZoom?: number;
  maxZoom?: number;

  className?: string;
  style?: React.CSSProperties;
}

const STATUS_STYLES: Record<FloorPlanZoneStatus, { fill: string; stroke: string }> = {
  available: { fill: colorTokens.semantic.success.bg, stroke: colorTokens.interactive.success },
  reserved: { fill: colorTokens.semantic.warning.bg, stroke: colorTokens.interactive.warning },
  occupied: { fill: colorTokens.semantic.error.bg, stroke: colorTokens.interactive.error },
  blocked: { fill: colorTokens.background.tertiary, stroke: colorTokens.border.primary },
};

/**
 * VenueFloorPlan
 * An SVG floor plan for exhibitions and venues: place rectangular or
 * circular zones (booths, seats, rooms) at real plan coordinates, color
 * them by status, and let people click or keyboard-select one. Pan by
 * dragging the background, zoom with the wheel or the on-screen controls.
 *
 * @example
 * ```tsx
 * <VenueFloorPlan
 *   planWidth={40}
 *   planHeight={24}
 *   zones={[
 *     { id: "a1", label: "A1", x: 2, y: 2, width: 4, height: 3, status: "available" },
 *     { id: "a2", label: "A2", x: 7, y: 2, width: 4, height: 3, status: "reserved" },
 *   ]}
 * />
 * ```
 */
export const VenueFloorPlan = React.forwardRef<SVGSVGElement, VenueFloorPlanProps>(
  (
    {
      zones,
      planWidth,
      planHeight,
      width = 480,
      height = 320,
      backgroundImage,
      showGrid,
      selectedId = null,
      onSelect,
      zoomable = true,
      minZoom = 0.5,
      maxZoom = 4,
      className,
      style,
    },
    ref
  ) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
    const dragState = useRef<{
      startX: number;
      startY: number;
      viewX: number;
      viewY: number;
    } | null>(null);

    const shouldShowGrid = showGrid ?? !backgroundImage;

    const zoomBy = (factor: number) => {
      setView((prev) => ({ ...prev, scale: clamp(prev.scale * factor, minZoom, maxZoom) }));
    };

    const resetView = () => setView({ scale: 1, x: 0, y: 0 });

    const handleWheel: React.WheelEventHandler<SVGSVGElement> = (e) => {
      if (!zoomable) return;
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.1 : 1 / 1.1);
    };

    const handleBackgroundMouseDown: React.MouseEventHandler<SVGRectElement> = (e) => {
      if (!zoomable) return;
      dragState.current = { startX: e.clientX, startY: e.clientY, viewX: view.x, viewY: view.y };
    };

    const handleMouseMove: React.MouseEventHandler<SVGSVGElement> = (e) => {
      if (!dragState.current) return;
      const dx = (e.clientX - dragState.current.startX) / view.scale;
      const dy = (e.clientY - dragState.current.startY) / view.scale;
      setView((prev) => ({
        ...prev,
        x: dragState.current!.viewX + dx,
        y: dragState.current!.viewY + dy,
      }));
    };

    const stopDrag = () => {
      dragState.current = null;
    };

    const handleSelect = (zone: FloorPlanZone) => {
      if (zone.disabled || zone.status === "blocked") return;
      onSelect?.(zone.id === selectedId ? null : zone.id);
    };

    const handleKeyDown = (e: React.KeyboardEvent, zone: FloorPlanZone) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect(zone);
      }
    };

    return (
      <div className={className} style={{ position: "relative", width, height, ...style }}>
        <svg
          ref={ref}
          width={width}
          height={height}
          viewBox={`0 0 ${planWidth} ${planHeight}`}
          role="img"
          aria-label={`Venue floor plan with ${zones.length} zones`}
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          style={{ backgroundColor: colorTokens.background.secondary, touchAction: "none" }}
        >
          <g transform={`scale(${view.scale}) translate(${view.x} ${view.y})`}>
            {backgroundImage ? (
              <image
                href={backgroundImage}
                x={0}
                y={0}
                width={planWidth}
                height={planHeight}
                preserveAspectRatio="none"
              />
            ) : (
              <rect
                x={0}
                y={0}
                width={planWidth}
                height={planHeight}
                fill={colorTokens.background.primary}
              />
            )}

            {shouldShowGrid && <FloorPlanGrid planWidth={planWidth} planHeight={planHeight} />}

            {/* Pan surface — sits above the background/grid, below the zones */}
            <rect
              x={0}
              y={0}
              width={planWidth}
              height={planHeight}
              fill="transparent"
              onMouseDown={handleBackgroundMouseDown}
              style={{ cursor: zoomable ? "grab" : "default" }}
            />

            {zones.map((zone) => {
              const isSelected = zone.id === selectedId;
              const isHovered = zone.id === hoveredId;
              const isBlocked = zone.status === "blocked" || zone.disabled;
              const palette = zone.color
                ? { fill: zone.color, stroke: zone.color }
                : STATUS_STYLES[zone.status ?? "available"];
              const strokeWidth = isSelected ? 0.6 : isHovered && !isBlocked ? 0.4 : 0.15;
              const commonProps = {
                role: isBlocked ? undefined : "button",
                tabIndex: isBlocked ? undefined : 0,
                "aria-pressed": isBlocked ? undefined : isSelected,
                "aria-label": zone.label,
                "aria-disabled": isBlocked || undefined,
                onClick: () => handleSelect(zone),
                onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, zone),
                onMouseEnter: () => setHoveredId(zone.id),
                onMouseLeave: () => setHoveredId(null),
                fill: palette.fill,
                stroke: palette.stroke,
                strokeWidth,
                opacity: isBlocked ? 0.6 : 1,
                style: { cursor: isBlocked ? "not-allowed" : "pointer" },
              } as const;

              return (
                <g key={zone.id}>
                  {zone.shape === "circle" ? (
                    <circle
                      cx={zone.x + zone.width / 2}
                      cy={zone.y + zone.width / 2}
                      r={zone.width / 2}
                      {...commonProps}
                    />
                  ) : (
                    <rect
                      x={zone.x}
                      y={zone.y}
                      width={zone.width}
                      height={zone.height}
                      {...commonProps}
                    />
                  )}
                  <text
                    x={zone.x + zone.width / 2}
                    y={zone.y + (zone.shape === "circle" ? zone.width : zone.height) / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={Math.min(zone.width, zone.height) * 0.28}
                    fill={colorTokens.text.primary}
                    pointerEvents="none"
                  >
                    {zone.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {zoomable && (
          <div
            style={{
              position: "absolute",
              top: spacingTokens.sm,
              right: spacingTokens.sm,
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <ZoomButton label="Zoom in" onClick={() => zoomBy(1.25)}>
              +
            </ZoomButton>
            <ZoomButton label="Zoom out" onClick={() => zoomBy(1 / 1.25)}>
              −
            </ZoomButton>
            <ZoomButton label="Reset view" onClick={resetView}>
              ⟲
            </ZoomButton>
          </div>
        )}
      </div>
    );
  }
);

VenueFloorPlan.displayName = "VenueFloorPlan";

const FloorPlanGrid: React.FC<{ planWidth: number; planHeight: number }> = ({
  planWidth,
  planHeight,
}) => {
  const step = Math.max(1, Math.round(Math.max(planWidth, planHeight) / 20));
  const verticals = [];
  for (let x = 0; x <= planWidth; x += step) verticals.push(x);
  const horizontals = [];
  for (let y = 0; y <= planHeight; y += step) horizontals.push(y);

  return (
    <g aria-hidden="true">
      {verticals.map((x) => (
        <line
          key={`v${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={planHeight}
          stroke={colorTokens.border.secondary}
          strokeWidth={0.05}
        />
      ))}
      {horizontals.map((y) => (
        <line
          key={`h${y}`}
          x1={0}
          y1={y}
          x2={planWidth}
          y2={y}
          stroke={colorTokens.border.secondary}
          strokeWidth={0.05}
        />
      ))}
    </g>
  );
};

const ZoomButton: React.FC<{ label: string; onClick: () => void; children: React.ReactNode }> = ({
  label,
  onClick,
  children,
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    style={{
      width: "28px",
      height: "28px",
      border: `1px solid ${colorTokens.border.primary}`,
      borderRadius: radiusTokens.sm,
      backgroundColor: colorTokens.background.primary,
      color: colorTokens.text.primary,
      fontSize: typographyTokens.fontSize.md,
      cursor: "pointer",
      boxShadow: colorTokens.shadow.sm,
    }}
  >
    {children}
  </button>
);
