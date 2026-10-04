import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/tools/ConditionalBranchEditor", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.TOOLS.CONDITIONALBRANCHEDITOR","name":"ConditionalBranchEditor","meta":"tools","importPath":"@maataa/ui/tools/ConditionalBranchEditor"} } };
