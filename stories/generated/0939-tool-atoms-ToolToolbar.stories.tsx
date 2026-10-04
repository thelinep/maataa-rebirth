import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/tool-atoms/ToolToolbar", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.TOOL-ATOMS.TOOLTOOLBAR","name":"ToolToolbar","meta":"tool-atoms","importPath":"@maataa/ui/tool-atoms/ToolToolbar"} } };
