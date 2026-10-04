import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/layouts/ApprovalWorkspaceLayout", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.LAYOUTS.APPROVALWORKSPACELAYOUT","name":"ApprovalWorkspaceLayout","meta":"layouts","importPath":"@maataa/ui/layouts/ApprovalWorkspaceLayout"} } };
