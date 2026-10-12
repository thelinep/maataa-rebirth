import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/identity/IdentityBadge", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.IDENTITY.IDENTITYBADGE","name":"IdentityBadge","meta":"identity","importPath":"@maataa/ui/identity/IdentityBadge"} } };
