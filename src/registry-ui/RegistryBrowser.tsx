import React from "react";
import { RegistryRoot, RegistryHeader, RegistrySearch, RegistryGroup, RegistryItem, RegistryCount, RegistryEmpty } from "../registry-atoms";
export type RegistryBrowserItem = { id: string; name: string; group?: string };
export type RegistryBrowserProps = { title: string; items: readonly RegistryBrowserItem[]; query?: string; onQueryChange?: (value: string) => void };
export function RegistryBrowser({ title, items, query = "", onQueryChange }: RegistryBrowserProps) {
  const normalized=query.trim().toLowerCase(); const visible=normalized ? items.filter((item)=>`${item.name} ${item.id} ${item.group ?? ""}`.toLowerCase().includes(normalized)) : items;
  return <RegistryRoot><RegistryHeader><strong>{title}</strong> <RegistryCount>{visible.length}</RegistryCount></RegistryHeader>{onQueryChange && <RegistrySearch><input aria-label={`Search ${title}`} value={query} onChange={(event)=>onQueryChange(event.currentTarget.value)} /></RegistrySearch>}<RegistryGroup>{visible.length ? visible.map((item)=><RegistryItem key={item.id} data-registry-id={item.id}><strong>{item.name}</strong><small>{item.id}</small></RegistryItem>) : <RegistryEmpty>No matching registry entries.</RegistryEmpty>}</RegistryGroup></RegistryRoot>;
}
