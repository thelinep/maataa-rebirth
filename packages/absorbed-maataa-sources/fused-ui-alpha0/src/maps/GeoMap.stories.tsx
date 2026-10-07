import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { GeoMap, type GeoMapPin } from "./GeoMap";

const meta = {
  title: "Maps/GeoMap",
  component: GeoMap,
  tags: ["autodocs"],
} satisfies Meta<typeof GeoMap>;

export default meta;
type Story = StoryObj<typeof meta>;

const cityPins: GeoMapPin[] = [
  { id: "sf", label: "San Francisco", lat: 37.77, lng: -122.42, status: "active" },
  { id: "nyc", label: "New York", lat: 40.71, lng: -74.01 },
  { id: "lon", label: "London", lat: 51.51, lng: -0.13 },
  { id: "tok", label: "Tokyo", lat: 35.68, lng: 139.69 },
  { id: "syd", label: "Sydney", lat: -33.87, lng: 151.21, status: "alert" },
  { id: "sao", label: "São Paulo", lat: -23.55, lng: -46.63 },
];

export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    return <GeoMap pins={cityPins} selectedId={selectedId} onSelect={setSelectedId} />;
  },
};

export const RegionalBounds: Story = {
  render: () => {
    const usPins: GeoMapPin[] = [
      { id: "sf", label: "San Francisco", lat: 37.77, lng: -122.42, status: "active" },
      { id: "chi", label: "Chicago", lat: 41.88, lng: -87.63 },
      { id: "nyc", label: "New York", lat: 40.71, lng: -74.01 },
      { id: "aus", label: "Austin", lat: 30.27, lng: -97.74, status: "alert" },
    ];
    return (
      <GeoMap
        pins={usPins}
        bounds={{ minLat: 24, maxLat: 50, minLng: -125, maxLng: -66 }}
        width={520}
        height={320}
      />
    );
  },
};

export const WithStatusPins: Story = {
  render: () => (
    <GeoMap
      pins={[
        { id: "a", label: "Warehouse A", lat: 34.05, lng: -118.24, status: "active" },
        { id: "b", label: "Warehouse B", lat: 41.88, lng: -87.63 },
        { id: "c", label: "Delayed Shipment", lat: 29.76, lng: -95.37, status: "alert" },
      ]}
    />
  ),
};
