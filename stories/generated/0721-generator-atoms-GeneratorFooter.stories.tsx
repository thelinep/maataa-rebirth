import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/generator-atoms/GeneratorFooter", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.GENERATOR-ATOMS.GENERATORFOOTER","name":"GeneratorFooter","meta":"generator-atoms","importPath":"@maataa/ui/generator-atoms/GeneratorFooter"} } };
