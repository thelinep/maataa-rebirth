import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/page-atoms/PageGrid", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.PAGE-ATOMS.PAGEGRID","name":"PageGrid","meta":"page-atoms","importPath":"@maataa/ui/page-atoms/PageGrid"} } };
