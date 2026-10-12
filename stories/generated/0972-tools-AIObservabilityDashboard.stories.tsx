import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/tools/AIObservabilityDashboard", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.TOOLS.AIOBSERVABILITYDASHBOARD","name":"AIObservabilityDashboard","meta":"tools","importPath":"@maataa/ui/tools/AIObservabilityDashboard"} } };
