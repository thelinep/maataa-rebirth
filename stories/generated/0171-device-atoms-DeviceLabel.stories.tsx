import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/device-atoms/DeviceLabel", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.DEVICE-ATOMS.DEVICELABEL","name":"DeviceLabel","meta":"device-atoms","importPath":"@maataa/ui/device-atoms/DeviceLabel"} } };
