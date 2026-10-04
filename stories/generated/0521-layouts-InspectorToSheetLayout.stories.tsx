import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/layouts/InspectorToSheetLayout", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.LAYOUTS.INSPECTORTOSHEETLAYOUT","name":"InspectorToSheetLayout","meta":"layouts","importPath":"@maataa/ui/layouts/InspectorToSheetLayout"} } };
