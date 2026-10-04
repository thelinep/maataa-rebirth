import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/ai-spaces/AIDebugWorkspace", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.AI-SPACES.AIDEBUGWORKSPACE","name":"AIDebugWorkspace","meta":"ai-spaces","importPath":"@maataa/ui/ai-spaces/AIDebugWorkspace"} } };
