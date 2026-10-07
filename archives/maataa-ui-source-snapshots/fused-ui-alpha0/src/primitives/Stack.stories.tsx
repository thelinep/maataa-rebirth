import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";
import { Box } from "./Box";

const meta = {
  title: "Primitives/Stack",
  component: Stack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <Stack direction="vertical" spacing="md">
      <Box style={{ padding: "16px", backgroundColor: "#8B6F47", color: "#fff" }}>Item 1</Box>
      <Box style={{ padding: "16px", backgroundColor: "#D4AF9F", color: "#333" }}>Item 2</Box>
      <Box style={{ padding: "16px", backgroundColor: "#8B6F47", color: "#fff" }}>Item 3</Box>
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="horizontal" spacing="md">
      <Box style={{ padding: "16px", backgroundColor: "#8B6F47", color: "#fff" }}>Item 1</Box>
      <Box style={{ padding: "16px", backgroundColor: "#D4AF9F", color: "#333" }}>Item 2</Box>
      <Box style={{ padding: "16px", backgroundColor: "#8B6F47", color: "#fff" }}>Item 3</Box>
    </Stack>
  ),
};

export const WithAlignment: Story = {
  render: () => (
    <div style={{ height: "200px", border: "1px dashed #ccc" }}>
      <Stack direction="horizontal" spacing="md" align="center" justify="space-between">
        <Box style={{ padding: "16px", backgroundColor: "#8B6F47", color: "#fff" }}>Start</Box>
        <Box style={{ padding: "16px", backgroundColor: "#D4AF9F", color: "#333" }}>Center</Box>
        <Box style={{ padding: "16px", backgroundColor: "#8B6F47", color: "#fff" }}>End</Box>
      </Stack>
    </div>
  ),
};

export const VariousSpacings: Story = {
  render: () => (
    <Stack direction="vertical" spacing="lg">
      <div>
        <p>
          <strong>Spacing: xs</strong>
        </p>
        <Stack direction="horizontal" spacing="xs">
          <Box style={{ padding: "8px", backgroundColor: "#8B6F47", color: "#fff" }}>A</Box>
          <Box style={{ padding: "8px", backgroundColor: "#8B6F47", color: "#fff" }}>B</Box>
          <Box style={{ padding: "8px", backgroundColor: "#8B6F47", color: "#fff" }}>C</Box>
        </Stack>
      </div>
      <div>
        <p>
          <strong>Spacing: md</strong>
        </p>
        <Stack direction="horizontal" spacing="md">
          <Box style={{ padding: "8px", backgroundColor: "#8B6F47", color: "#fff" }}>A</Box>
          <Box style={{ padding: "8px", backgroundColor: "#8B6F47", color: "#fff" }}>B</Box>
          <Box style={{ padding: "8px", backgroundColor: "#8B6F47", color: "#fff" }}>C</Box>
        </Stack>
      </div>
      <div>
        <p>
          <strong>Spacing: xl</strong>
        </p>
        <Stack direction="horizontal" spacing="xl">
          <Box style={{ padding: "8px", backgroundColor: "#8B6F47", color: "#fff" }}>A</Box>
          <Box style={{ padding: "8px", backgroundColor: "#8B6F47", color: "#fff" }}>B</Box>
          <Box style={{ padding: "8px", backgroundColor: "#8B6F47", color: "#fff" }}>C</Box>
        </Stack>
      </div>
    </Stack>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Stack direction="horizontal" spacing="md" fullWidth justify="space-between">
      <Box style={{ padding: "16px", backgroundColor: "#8B6F47", color: "#fff", flex: 1 }}>
        Flex 1
      </Box>
      <Box style={{ padding: "16px", backgroundColor: "#D4AF9F", color: "#333", flex: 1 }}>
        Flex 1
      </Box>
      <Box style={{ padding: "16px", backgroundColor: "#8B6F47", color: "#fff", flex: 1 }}>
        Flex 1
      </Box>
    </Stack>
  ),
};
