import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/ai-spaces/AIReviewWorkspace", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.AI-SPACES.AIREVIEWWORKSPACE","name":"AIReviewWorkspace","meta":"ai-spaces","importPath":"@maataa/ui/ai-spaces/AIReviewWorkspace"} } };
