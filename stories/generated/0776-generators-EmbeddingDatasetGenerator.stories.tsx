import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/generators/EmbeddingDatasetGenerator", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.GENERATORS.EMBEDDINGDATASETGENERATOR","name":"EmbeddingDatasetGenerator","meta":"generators","importPath":"@maataa/ui/generators/EmbeddingDatasetGenerator"} } };
