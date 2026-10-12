import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/workspaces/CreativeStudioWorkspace", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.WORKSPACES.CREATIVESTUDIOWORKSPACE","name":"CreativeStudioWorkspace","meta":"workspaces","importPath":"@maataa/ui/workspaces/CreativeStudioWorkspace"} } };
