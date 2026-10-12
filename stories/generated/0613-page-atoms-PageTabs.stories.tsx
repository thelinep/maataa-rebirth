import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/page-atoms/PageTabs", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.PAGE-ATOMS.PAGETABS","name":"PageTabs","meta":"page-atoms","importPath":"@maataa/ui/page-atoms/PageTabs"} } };
