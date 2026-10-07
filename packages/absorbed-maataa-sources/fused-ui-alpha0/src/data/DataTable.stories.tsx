import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";

const meta = {
  title: "Data/DataTable",
  component: DataTable,
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  { key: "name", header: "Account", sortable: true },
  { key: "plan", header: "Plan" },
  { key: "revenue", header: "Revenue", align: "right" as const, sortable: true },
];

const data = [
  { name: "Acme Co.", plan: "Enterprise", revenue: 128400 },
  { name: "Globex", plan: "Pro", revenue: 8600 },
  { name: "Initech", plan: "Starter", revenue: 1200 },
];

export const Default: Story = {
  args: { columns, data },
};

export const Empty: Story = {
  args: { columns, data: [] },
};
