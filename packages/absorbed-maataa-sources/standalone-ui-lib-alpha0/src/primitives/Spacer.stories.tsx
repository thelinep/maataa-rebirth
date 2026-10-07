import type { Meta, StoryObj } from "@storybook/react";
import { Spacer } from "./Spacer";
import { Flex } from "./Flex";
import { Box } from "./Box";

const meta = {
  title: "Primitives/Spacer",
  component: Spacer,
  tags: ["autodocs"],
  argTypes: {
    axis: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GrowingSpacer: Story = {
  render: () => (
    <Flex style={{ width: "320px" }}>
      <Box padding="sm" background="tertiary" radius="md">
        Left
      </Box>
      <Spacer />
      <Box padding="sm" background="tertiary" radius="md">
        Right
      </Box>
    </Flex>
  ),
};

export const FixedVerticalGap: Story = {
  render: () => (
    <Flex direction="column">
      <Box padding="sm" background="tertiary" radius="md">
        Above the gap
      </Box>
      <Spacer size="xl" />
      <Box padding="sm" background="tertiary" radius="md">
        Below the gap
      </Box>
    </Flex>
  ),
};

export const FixedHorizontalGap: Story = {
  render: () => (
    <Flex direction="row">
      <Box padding="sm" background="tertiary" radius="md">
        Left
      </Box>
      <Spacer size="xl" axis="horizontal" />
      <Box padding="sm" background="tertiary" radius="md">
        Right
      </Box>
    </Flex>
  ),
};
