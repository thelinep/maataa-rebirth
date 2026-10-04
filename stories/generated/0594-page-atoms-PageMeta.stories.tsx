import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/page-atoms/PageMeta", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.PAGE-ATOMS.PAGEMETA","name":"PageMeta","meta":"page-atoms","importPath":"@maataa/ui/page-atoms/PageMeta"} } };
