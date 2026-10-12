import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/ai-spaces/AIWallboard", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.AI-SPACES.AIWALLBOARD","name":"AIWallboard","meta":"ai-spaces","importPath":"@maataa/ui/ai-spaces/AIWallboard"} } };
