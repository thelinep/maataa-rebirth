import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/runtime/ResponsiveDeviceRuntime", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.RUNTIME.RESPONSIVEDEVICERUNTIME","name":"ResponsiveDeviceRuntime","meta":"runtime","importPath":"@maataa/ui/runtime/ResponsiveDeviceRuntime"} } };
