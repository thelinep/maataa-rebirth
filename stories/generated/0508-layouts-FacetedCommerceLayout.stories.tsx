import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/layouts/FacetedCommerceLayout", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.LAYOUTS.FACETEDCOMMERCELAYOUT","name":"FacetedCommerceLayout","meta":"layouts","importPath":"@maataa/ui/layouts/FacetedCommerceLayout"} } };
