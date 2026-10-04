import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/devices/SmartSpeakerDisplayFrame", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.DEVICES.SMARTSPEAKERDISPLAYFRAME","name":"SmartSpeakerDisplayFrame","meta":"devices","importPath":"@maataa/ui/devices/SmartSpeakerDisplayFrame"} } };
