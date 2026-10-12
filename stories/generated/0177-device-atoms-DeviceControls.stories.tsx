import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/device-atoms/DeviceControls", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.DEVICE-ATOMS.DEVICECONTROLS","name":"DeviceControls","meta":"device-atoms","importPath":"@maataa/ui/device-atoms/DeviceControls"} } };
