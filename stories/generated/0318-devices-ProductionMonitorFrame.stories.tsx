import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/devices/ProductionMonitorFrame", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.DEVICES.PRODUCTIONMONITORFRAME","name":"ProductionMonitorFrame","meta":"devices","importPath":"@maataa/ui/devices/ProductionMonitorFrame"} } };
