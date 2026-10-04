import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/ai-spaces/AIMoodboardStudio", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.AI-SPACES.AIMOODBOARDSTUDIO","name":"AIMoodboardStudio","meta":"ai-spaces","importPath":"@maataa/ui/ai-spaces/AIMoodboardStudio"} } };
