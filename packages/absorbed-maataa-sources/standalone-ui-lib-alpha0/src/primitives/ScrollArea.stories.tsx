import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./ScrollArea";
import { Box } from "./Box";

const meta = {
  title: "Primitives/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["vertical", "horizontal", "both"],
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalScroll: Story = {
  args: {
    maxHeight: "200px",
    children: (
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <Box key={i} padding="sm" style={{ borderBottom: "1px solid #EDD8CF" }}>
            Row {i + 1}
          </Box>
        ))}
      </div>
    ),
  },
};

export const HorizontalScroll: Story = {
  args: {
    direction: "horizontal",
    maxWidth: "400px",
    children: (
      <div style={{ display: "flex", gap: "8px" }}>
        {Array.from({ length: 10 }, (_, i) => (
          <Box
            key={i}
            padding="md"
            background="tertiary"
            radius="md"
            style={{ minWidth: "120px", flexShrink: 0 }}
          >
            Card {i + 1}
          </Box>
        ))}
      </div>
    ),
  },
};

export const BothAxes: Story = {
  args: {
    direction: "both",
    maxHeight: "200px",
    maxWidth: "300px",
    children: (
      <div style={{ width: "600px" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <Box key={i} padding="sm" style={{ borderBottom: "1px solid #EDD8CF" }}>
            Wide row {i + 1}
          </Box>
        ))}
      </div>
    ),
  },
};
