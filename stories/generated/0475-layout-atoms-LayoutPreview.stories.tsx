import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/layout-atoms/LayoutPreview", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.LAYOUT-ATOMS.LAYOUTPREVIEW","name":"LayoutPreview","meta":"layout-atoms","importPath":"@maataa/ui/layout-atoms/LayoutPreview"} } };
