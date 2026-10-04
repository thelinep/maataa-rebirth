import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/generators/VisualRegressionGenerator", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.GENERATORS.VISUALREGRESSIONGENERATOR","name":"VisualRegressionGenerator","meta":"generators","importPath":"@maataa/ui/generators/VisualRegressionGenerator"} } };
