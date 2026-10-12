import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/devices/AutomotiveHUDFrame", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.DEVICES.AUTOMOTIVEHUDFRAME","name":"AutomotiveHUDFrame","meta":"devices","importPath":"@maataa/ui/devices/AutomotiveHUDFrame"} } };
