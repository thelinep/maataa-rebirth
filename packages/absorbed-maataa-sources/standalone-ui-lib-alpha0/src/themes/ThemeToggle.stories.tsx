import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

const meta = {
  title: "Themes/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ThemeToggle />,
};

export const StartsInDark: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <Story />
      </ThemeProvider>
    ),
  ],
  render: () => <ThemeToggle />,
};

export const CustomLabel: Story = {
  render: () => <ThemeToggle aria-label="Toggle MAATAA appearance" />,
};
