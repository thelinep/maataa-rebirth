import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/layouts/ResponsiveThreePaneLayout", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.LAYOUTS.RESPONSIVETHREEPANELAYOUT","name":"ResponsiveThreePaneLayout","meta":"layouts","importPath":"@maataa/ui/layouts/ResponsiveThreePaneLayout"} } };
