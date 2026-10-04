import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/surfaces/Tooltip", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.SURFACES.TOOLTIP","name":"Tooltip","meta":"surfaces","importPath":"@maataa/ui/surfaces/Tooltip"} } };
