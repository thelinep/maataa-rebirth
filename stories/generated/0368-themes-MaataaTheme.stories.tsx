import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/themes/MaataaTheme", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.THEMES.MAATAATHEME","name":"MaataaTheme","meta":"themes","importPath":"@maataa/ui/themes/MaataaTheme"} } };
