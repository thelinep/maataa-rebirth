import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/atomic/AccordionTrigger", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.ATOMIC.ACCORDIONTRIGGER","name":"AccordionTrigger","meta":"atomic","importPath":"@maataa/ui/atomic/AccordionTrigger"} } };
