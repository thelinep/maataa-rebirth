import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";
import { Box } from "./Box";

const cell = (label: string) => (
  <Box padding="md" background="tertiary" radius="md" key={label}>
    {label}
  </Box>
);

const meta = {
  title: "Primitives/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "stretch", "space-between"],
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: "md",
    children: [1, 2, 3, 4, 5, 6].map((n) => cell(`Cell ${n}`)),
  },
};

export const CustomTemplate: Story = {
  args: {
    columns: "1fr 2fr 1fr",
    gap: "sm",
    children: [cell("Sidebar"), cell("Main content"), cell("Aside")],
  },
};

export const IndependentGaps: Story = {
  args: {
    columns: 2,
    rowGap: "xs",
    columnGap: "2xl",
    children: [1, 2, 3, 4].map((n) => cell(`Cell ${n}`)),
  },
};
