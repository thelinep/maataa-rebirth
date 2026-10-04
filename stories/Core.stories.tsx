import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { UiProvider, Button, Input, Card, Stack, Badge, Alert, DataTable, ThemeToggle, ToastProvider } from "../src";

function Gallery() {
  const [name, setName] = useState("");
  return <UiProvider><ToastProvider><Stack gap={16} style={{padding:24,maxWidth:900}}><div style={{display:"flex",justifyContent:"space-between"}}><h1>MAATAA UI</h1><ThemeToggle/></div><Card header={<strong>Actions and forms</strong>}><Stack><Input aria-label="Name" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/><div style={{display:"flex",gap:8}}><Button>Primary</Button><Button variant="secondary">Secondary</Button><Badge tone="success">Ready</Badge></div></Stack></Card><Alert tone="info" title="Generic UI boundary">Host applications own data, auth and routing.</Alert><DataTable data={[{id:"1",name:"Alpha"},{id:"2",name:"Beta"}]} columns={[{id:"name",header:"Name"}]}/></Stack></ToastProvider></UiProvider>;
}
const meta = { title: "Foundation/Core Gallery", component: Gallery } satisfies Meta<typeof Gallery>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Default: Story = {};
