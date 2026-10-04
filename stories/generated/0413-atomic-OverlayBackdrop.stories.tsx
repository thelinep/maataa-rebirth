import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/atomic/OverlayBackdrop", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.ATOMIC.OVERLAYBACKDROP","name":"OverlayBackdrop","meta":"atomic","importPath":"@maataa/ui/atomic/OverlayBackdrop"} } };
