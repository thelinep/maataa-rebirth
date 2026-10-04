import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/tools/FineTuningDatasetViewer", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.TOOLS.FINETUNINGDATASETVIEWER","name":"FineTuningDatasetViewer","meta":"tools","importPath":"@maataa/ui/tools/FineTuningDatasetViewer"} } };
