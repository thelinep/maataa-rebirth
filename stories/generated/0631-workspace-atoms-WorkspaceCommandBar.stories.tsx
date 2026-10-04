import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/workspace-atoms/WorkspaceCommandBar", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.WORKSPACE-ATOMS.WORKSPACECOMMANDBAR","name":"WorkspaceCommandBar","meta":"workspace-atoms","importPath":"@maataa/ui/workspace-atoms/WorkspaceCommandBar"} } };
