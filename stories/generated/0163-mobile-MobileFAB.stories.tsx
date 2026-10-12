import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/mobile/MobileFAB", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.MOBILE.MOBILEFAB","name":"MobileFAB","meta":"mobile","importPath":"@maataa/ui/mobile/MobileFAB"} } };
