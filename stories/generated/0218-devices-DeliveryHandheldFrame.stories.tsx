import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/devices/DeliveryHandheldFrame", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.DEVICES.DELIVERYHANDHELDFRAME","name":"DeliveryHandheldFrame","meta":"devices","importPath":"@maataa/ui/devices/DeliveryHandheldFrame"} } };
