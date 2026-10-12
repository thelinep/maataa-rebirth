import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/composer/VisualComposer", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.COMPOSER.VISUALCOMPOSER","name":"VisualComposer","meta":"composer","importPath":"@maataa/ui/composer/VisualComposer"} } };
