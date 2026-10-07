import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { VenueFloorPlan, type FloorPlanZone } from "./VenueFloorPlan";

const meta = {
  title: "Maps/VenueFloorPlan",
  component: VenueFloorPlan,
  tags: ["autodocs"],
} satisfies Meta<typeof VenueFloorPlan>;

export default meta;
type Story = StoryObj<typeof meta>;

const boothZones: FloorPlanZone[] = [
  { id: "a1", label: "A1", x: 2, y: 2, width: 5, height: 4, status: "available" },
  { id: "a2", label: "A2", x: 8, y: 2, width: 5, height: 4, status: "available" },
  { id: "a3", label: "A3", x: 14, y: 2, width: 5, height: 4, status: "reserved" },
  { id: "a4", label: "A4", x: 20, y: 2, width: 5, height: 4, status: "occupied" },
  { id: "b1", label: "B1", x: 2, y: 8, width: 5, height: 4, status: "available" },
  { id: "b2", label: "B2", x: 8, y: 8, width: 5, height: 4, status: "occupied" },
  { id: "b3", label: "B3", x: 14, y: 8, width: 5, height: 4, status: "available" },
  { id: "b4", label: "B4", x: 20, y: 8, width: 5, height: 4, status: "blocked" },
  {
    id: "stage",
    label: "Stage",
    x: 2,
    y: 15,
    width: 12,
    height: 5,
    shape: "rect",
    status: "blocked",
  },
  {
    id: "lounge",
    label: "Lounge",
    x: 20,
    y: 16,
    width: 6,
    height: 6,
    shape: "circle",
    status: "available",
  },
];

export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    return (
      <VenueFloorPlan
        planWidth={30}
        planHeight={24}
        zones={boothZones}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    );
  },
};

export const NonZoomable: Story = {
  render: () => (
    <VenueFloorPlan planWidth={30} planHeight={24} zones={boothZones} zoomable={false} />
  ),
};

export const LargeCanvas: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>("a3");
    return (
      <VenueFloorPlan
        planWidth={30}
        planHeight={24}
        width={720}
        height={480}
        zones={boothZones}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    );
  },
};

export const NoGrid: Story = {
  render: () => (
    <VenueFloorPlan planWidth={30} planHeight={24} zones={boothZones} showGrid={false} />
  ),
};
