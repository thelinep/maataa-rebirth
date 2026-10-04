import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/layout-atoms/LayoutSidebar", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.LAYOUT-ATOMS.LAYOUTSIDEBAR","name":"LayoutSidebar","meta":"layout-atoms","importPath":"@maataa/ui/layout-atoms/LayoutSidebar"} } };
