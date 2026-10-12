import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/page-atoms/PageBreadcrumbs", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.PAGE-ATOMS.PAGEBREADCRUMBS","name":"PageBreadcrumbs","meta":"page-atoms","importPath":"@maataa/ui/page-atoms/PageBreadcrumbs"} } };
