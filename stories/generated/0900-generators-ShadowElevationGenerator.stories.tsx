import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/generators/ShadowElevationGenerator", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.GENERATORS.SHADOWELEVATIONGENERATOR","name":"ShadowElevationGenerator","meta":"generators","importPath":"@maataa/ui/generators/ShadowElevationGenerator"} } };
