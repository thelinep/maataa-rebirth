import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/runtime/CompositionRuntime", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.RUNTIME.COMPOSITIONRUNTIME","name":"CompositionRuntime","meta":"runtime","importPath":"@maataa/ui/runtime/CompositionRuntime"} } };
