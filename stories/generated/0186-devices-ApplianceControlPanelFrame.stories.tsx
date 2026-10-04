import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/devices/ApplianceControlPanelFrame", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.DEVICES.APPLIANCECONTROLPANELFRAME","name":"ApplianceControlPanelFrame","meta":"devices","importPath":"@maataa/ui/devices/ApplianceControlPanelFrame"} } };
