import type { Meta, StoryObj } from "@storybook/react";
import { RegistryBrowser } from "../src/registry-ui";
import { PAGE_TYPES } from "../src/registries";
const meta={ title:"Registries/Page Registry", component:RegistryBrowser } satisfies Meta<typeof RegistryBrowser>; export default meta; type Story=StoryObj<typeof meta>; export const Pages:Story={ args:{ title:"Page Registry", items:PAGE_TYPES.map((p)=>({id:p.id,name:p.name,group:p.groupLabel})) } };
