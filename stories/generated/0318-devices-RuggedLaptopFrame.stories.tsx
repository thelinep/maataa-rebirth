import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/devices/RuggedLaptopFrame", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.DEVICES.RUGGEDLAPTOPFRAME","name":"RuggedLaptopFrame","meta":"devices","importPath":"@maataa/ui/devices/RuggedLaptopFrame"} } };
