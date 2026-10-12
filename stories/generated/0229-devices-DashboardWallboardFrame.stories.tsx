import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/devices/DashboardWallboardFrame", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.DEVICES.DASHBOARDWALLBOARDFRAME","name":"DashboardWallboardFrame","meta":"devices","importPath":"@maataa/ui/devices/DashboardWallboardFrame"} } };
