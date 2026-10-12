import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/workspaces/GovernanceWorkspace", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.WORKSPACES.GOVERNANCEWORKSPACE","name":"GovernanceWorkspace","meta":"workspaces","importPath":"@maataa/ui/workspaces/GovernanceWorkspace"} } };
