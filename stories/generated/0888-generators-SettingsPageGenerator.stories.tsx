import type { Meta, StoryObj } from "@storybook/react";
import { ActualComponentPreview } from "../../examples/redux-demo/ActualComponentPreview";
const meta = { title: "Generated/generators/SettingsPageGenerator", component: ActualComponentPreview } satisfies Meta<typeof ActualComponentPreview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const RuntimePreview: Story = { args: { item: {"id":"GENERATED.GENERATORS.SETTINGSPAGEGENERATOR","name":"SettingsPageGenerator","meta":"generators","importPath":"@maataa/ui/generators/SettingsPageGenerator"} } };
