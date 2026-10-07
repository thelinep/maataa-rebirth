import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs } from "./Tabs";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicTabs = [
  { id: "tab1", label: "Tab 1", content: "Content for tab 1" },
  { id: "tab2", label: "Tab 2", content: "Content for tab 2" },
  { id: "tab3", label: "Tab 3", content: "Content for tab 3" },
];

export const Line: Story = {
  render: () => {
    const [active, setActive] = useState("tab1");
    return <Tabs tabs={basicTabs} defaultTab="tab1" onChange={setActive} variant="line" />;
  },
};

export const Box: Story = {
  render: () => {
    const [active, setActive] = useState("tab1");
    return <Tabs tabs={basicTabs} defaultTab="tab1" onChange={setActive} variant="box" />;
  },
};

export const Pill: Story = {
  render: () => {
    const [active, setActive] = useState("tab1");
    return <Tabs tabs={basicTabs} defaultTab="tab1" onChange={setActive} variant="pill" />;
  },
};

export const WithDisabledTab: Story = {
  render: () => {
    const [active, setActive] = useState("tab1");
    return (
      <Tabs
        tabs={[
          { id: "tab1", label: "Tab 1", content: "Content for tab 1" },
          { id: "tab2", label: "Tab 2 (Disabled)", content: "Content for tab 2", disabled: true },
          { id: "tab3", label: "Tab 3", content: "Content for tab 3" },
        ]}
        defaultTab="tab1"
        onChange={setActive}
        variant="line"
      />
    );
  },
};

export const ManyTabs: Story = {
  render: () => {
    const [active, setActive] = useState("tab1");
    const tabs = Array.from({ length: 8 }, (_, i) => ({
      id: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
      content: `Content for tab ${i + 1}`,
    }));
    return <Tabs tabs={tabs} defaultTab="tab1" onChange={setActive} variant="pill" />;
  },
};

export const AllVariants: Story = {
  render: () => {
    const [lineActive, setLineActive] = useState("tab1");
    const [boxActive, setBoxActive] = useState("tab1");
    const [pillActive, setPillActive] = useState("tab1");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
          <p>
            <strong>Line Variant</strong>
          </p>
          <Tabs tabs={basicTabs} defaultTab="tab1" onChange={setLineActive} variant="line" />
        </div>
        <div>
          <p>
            <strong>Box Variant</strong>
          </p>
          <Tabs tabs={basicTabs} defaultTab="tab1" onChange={setBoxActive} variant="box" />
        </div>
        <div>
          <p>
            <strong>Pill Variant</strong>
          </p>
          <Tabs tabs={basicTabs} defaultTab="tab1" onChange={setPillActive} variant="pill" />
        </div>
      </div>
    );
  },
};
