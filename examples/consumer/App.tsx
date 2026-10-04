import React from "react";
import { UiProvider, AppShell, TopNav, Sidebar, Button, Card, DataTable } from "@maataa/ui";
import "@maataa/ui/styles.css";
export function App(){const nav=[{id:"home",label:"Home",href:"#"},{id:"data",label:"Data",href:"#data"}];return <UiProvider><AppShell topNav={<TopNav brand={<strong>MAATAA</strong>}/>} sidebar={<Sidebar items={nav} activeId="home"/>}><div style={{padding:24}}><Card header={<h1>Consumer fixture</h1>}><Button>Works</Button></Card><DataTable data={[{id:1,name:"Item"}]} columns={[{id:"name",header:"Name"}]}/></div></AppShell></UiProvider>}
