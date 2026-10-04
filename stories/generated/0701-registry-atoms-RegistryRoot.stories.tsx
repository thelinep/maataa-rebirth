import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/registry-atoms/RegistryRoot", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.REGISTRY-ATOMS.REGISTRYROOT","name":"RegistryRoot","meta":"registry-atoms","importPath":"@maataa/ui/registry-atoms/RegistryRoot"} } };
