import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/tools/ContextBudgetTool", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.TOOLS.CONTEXTBUDGETTOOL","name":"ContextBudgetTool","meta":"tools","importPath":"@maataa/ui/tools/ContextBudgetTool"} } };
