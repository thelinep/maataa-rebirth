import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/tool-atoms/ToolInput", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.TOOL-ATOMS.TOOLINPUT","name":"ToolInput","meta":"tool-atoms","importPath":"@maataa/ui/tool-atoms/ToolInput"} } };
