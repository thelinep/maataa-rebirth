import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { HolyGrailLayout } from "../src/layouts/HolyGrailLayout";
import { WorkbenchLayout } from "../src/layouts/WorkbenchLayout";
import { StudioLayout } from "../src/layouts/StudioLayout";
import { DashboardGridLayout } from "../src/layouts/DashboardGridLayout";

const Panel = ({ children }: { children: React.ReactNode }) => <div className="m-card">{children}</div>;
const meta = { title: "Layouts/Archetypes" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const HolyGrail: Story = { render: () => <HolyGrailLayout header={<Panel>Header</Panel>} sidebar={<Panel>Left</Panel>} rail={<Panel>Right</Panel>} footer={<Panel>Footer</Panel>} main={<Panel>Main</Panel>} /> };
export const Workbench: Story = { render: () => <WorkbenchLayout toolbar={<Panel>Toolbar</Panel>} palette={<Panel>Palette</Panel>} canvas={<Panel>Canvas</Panel>} inspector={<Panel>Inspector</Panel>} statusBar={<Panel>Status</Panel>} /> };
export const Studio: Story = { render: () => <StudioLayout toolbar={<Panel>Toolbar</Panel>} palette={<Panel>Assets</Panel>} canvas={<Panel>Stage</Panel>} inspector={<Panel>Properties</Panel>} timeline={<Panel>Timeline</Panel>} /> };
export const Dashboard: Story = { render: () => <DashboardGridLayout main={<div className="m-grid" style={{ gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12 }}><Panel>A</Panel><Panel>B</Panel><Panel>C</Panel></div>} /> };
