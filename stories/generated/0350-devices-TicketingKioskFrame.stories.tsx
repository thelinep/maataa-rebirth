import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/devices/TicketingKioskFrame", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.DEVICES.TICKETINGKIOSKFRAME","name":"TicketingKioskFrame","meta":"devices","importPath":"@maataa/ui/devices/TicketingKioskFrame"} } };
