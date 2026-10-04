import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/tool-atoms/ToolStatus", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.TOOL-ATOMS.TOOLSTATUS","name":"ToolStatus","meta":"tool-atoms","importPath":"@maataa/ui/tool-atoms/ToolStatus"} } };
