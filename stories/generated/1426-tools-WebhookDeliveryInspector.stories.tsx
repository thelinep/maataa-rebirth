import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/tools/WebhookDeliveryInspector", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.TOOLS.WEBHOOKDELIVERYINSPECTOR","name":"WebhookDeliveryInspector","meta":"tools","importPath":"@maataa/ui/tools/WebhookDeliveryInspector"} } };
