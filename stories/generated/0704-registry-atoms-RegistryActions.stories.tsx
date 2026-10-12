import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/registry-atoms/RegistryActions", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.REGISTRY-ATOMS.REGISTRYACTIONS","name":"RegistryActions","meta":"registry-atoms","importPath":"@maataa/ui/registry-atoms/RegistryActions"} } };
