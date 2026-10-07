/**
 * @maataa/ui/maps
 * Category: maps
 * Venue floor-plan and geographic map components
 */

export {
  VenueFloorPlan,
  type VenueFloorPlanProps,
  type FloorPlanZone,
  type FloorPlanZoneStatus,
} from "./VenueFloorPlan";
export { GeoMap, type GeoMapProps, type GeoMapPin, type GeoMapPinStatus } from "./GeoMap";

// Component metadata for Storybook and docs
export const mapsComponents = [
  {
    id: "venue-floor-plan",
    name: "VenueFloorPlan",
    component: "VenueFloorPlan",
    category: "Maps",
    description: "A zoomable/pannable floor-plan canvas with placeable, selectable zones",
  },
  {
    id: "geo-map",
    name: "GeoMap",
    component: "GeoMap",
    category: "Maps",
    description: "A lat/lng pin map with no external tile-service dependency",
  },
];
