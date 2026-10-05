import React, { useEffect, useId, useRef, useState } from "react";
import { cx } from "../utils";
import { createPortal } from "react-dom";
import { useDialogBehavior } from "../internal/dialogBehavior";
import { Button } from "../actions";
export type NavItemData={id:string;label:React.ReactNode;href?:string;icon?:React.ReactNode;disabled?:boolean};
export function NavItem({item,active,onSelect}:{item:NavItemData;active?:boolean;onSelect?:(item:NavItemData)=>void}){return <a className="m-nav-item" href={item.href??"#"} aria-current={active?"page":undefined} aria-disabled={item.disabled||undefined} onClick={e=>{if(item.disabled||!item.href)e.preventDefault();if(!item.disabled)onSelect?.(item)}}>{item.icon}<span>{item.label}</span></a>}
export function NavGroup({label,items,activeId,onSelect}:{label?:React.ReactNode;items:NavItemData[];activeId?:string;onSelect?:(i:NavItemData)=>void}){return <div>{label&&<div className="m-field-description" style={{padding:"8px 10px"}}>{label}</div>}<nav>{items.map(i=><NavItem key={i.id} item={i} active={i.id===activeId} onSelect={onSelect}/>)}</nav></div>}
export function Sidebar({items,activeId,onSelect,header,footer,className}:{items:NavItemData[];activeId?:string;onSelect?:(i:NavItemData)=>void;header?:React.ReactNode;footer?:React.ReactNode;className?:string}){return <aside className={cx("m-sidebar m-ui",className)}>{header}<NavGroup items={items} activeId={activeId} onSelect={onSelect}/>{footer&&<div style={{marginBlockStart:"auto",padding:10}}>{footer}</div>}</aside>}
export function TopNav({brand,actions,className}:{brand?:React.ReactNode;actions?:React.ReactNode;className?:string}){return <header className={cx("m-topnav m-ui",className)}>{<div>{brand}</div>}<div style={{display:"flex",alignItems:"center",gap:8}}>{actions}</div></header>}
export function Toolbar(p:React.HTMLAttributes<HTMLDivElement>){return <div role="toolbar" {...p} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderBlockEnd:"1px solid var(--m-border)",...p.style}}/>}
export function AppShell({topNav,sidebar,toolbar,footer,children,className}:{topNav?:React.ReactNode;sidebar?:React.ReactNode;toolbar?:React.ReactNode;footer?:React.ReactNode;children:React.ReactNode;className?:string}){return <div className={cx("m-shell maataa-root",className)}><a href="#maataa-main" className="m-sr-only">Skip to content</a>{topNav}<div className="m-shell-body">{sidebar}<div style={{minWidth:0}}>{toolbar}<main id="maataa-main">{children}</main></div></div>{footer&&<footer style={{padding:12,borderBlockStart:"1px solid var(--m-border)"}}>{footer}</footer>}</div>}
export function Breadcrumb({items,label="Breadcrumbs"}:{items:Array<{label:React.ReactNode;href?:string}>;label?:string}){return <nav aria-label={label}><ol style={{display:"flex",gap:8,listStyle:"none",padding:0,margin:0,flexWrap:"wrap"}}>{items.map((i,n)=><li key={n}>{i.href?<a href={i.href}>{i.label}</a>:<span aria-current={n===items.length-1?"page":undefined}>{i.label}</span>}{n<items.length-1&&<span aria-hidden="true" style={{marginInlineStart:8}}>›</span>}</li>)}</ol></nav>}
export function Tabs({tabs,value,onValueChange}:{tabs:Array<{id:string;label:React.ReactNode;content?:React.ReactNode;disabled?:boolean}>;value:string;onValueChange:(id:string)=>void}) {
 const prefix=useId(),ref=useRef<HTMLDivElement>(null);const enabled=tabs.filter(tab=>!tab.disabled);
 const active=tabs.find(tab=>tab.id===value);const focusId=enabled.some(tab=>tab.id===value)?value:enabled[0]?.id;
 const tabId=(id:string)=>`${prefix}-tab-${tabs.findIndex(tab=>tab.id===id)}`;
 const panelId=(id:string)=>`${prefix}-panel-${tabs.findIndex(tab=>tab.id===id)}`;
 return <div><div ref={ref} role="tablist" className="m-tabs-list" onKeyDown={event=>{
   if(!["ArrowRight","ArrowLeft","Home","End"].includes(event.key)||!enabled.length)return;
   event.preventDefault();const current=enabled.findIndex(tab=>tabId(tab.id)===(event.target as HTMLElement).id);
   const index=event.key==="Home"?0:event.key==="End"?enabled.length-1:(Math.max(0,current)+(event.key==="ArrowRight"?1:-1)+enabled.length)%enabled.length;
   const next=enabled[index];onValueChange(next.id);document.getElementById(tabId(next.id))?.focus();
 }}>{tabs.map(tab=><button type="button" key={tab.id} role="tab" id={tabId(tab.id)} aria-controls={tab.content!==undefined?panelId(tab.id):undefined} aria-selected={tab.id===value} tabIndex={tab.id===focusId?0:-1} disabled={tab.disabled} className="m-tab" onClick={()=>onValueChange(tab.id)}>{tab.label}</button>)}</div>
 {active?.content!==undefined&&<div role="tabpanel" id={panelId(active.id)} aria-labelledby={tabId(active.id)} tabIndex={0} style={{paddingBlock:12}}>{active.content}</div>}</div>;
}
export function Pagination({page,totalPages,onPageChange,label="Pagination"}:{page:number;totalPages:number;onPageChange:(p:number)=>void;label?:string}){return <nav aria-label={label} style={{display:"flex",alignItems:"center",gap:8}}><Button variant="secondary" disabled={page<=1} onClick={()=>onPageChange(page-1)}>Previous</Button><span aria-live="polite">{page} / {Math.max(1,totalPages)}</span><Button variant="secondary" disabled={page>=totalPages} onClick={()=>onPageChange(page+1)}>Next</Button></nav>}
export function Stepper({steps,current}:{steps:Array<{id:string;label:string}>;current:number}){return <ol style={{display:"flex",listStyle:"none",padding:0,gap:8,flexWrap:"wrap"}}>{steps.map((s,i)=><li key={s.id} aria-current={i===current?"step":undefined} className="m-badge" style={{opacity:i>current?.55:1}}>{i+1}. {s.label}</li>)}</ol>}
export function Menu({items,label="Menu"}:{items:Array<{label:React.ReactNode;onSelect?:()=>void;disabled?:boolean}>;label?:string}) {
 const ref=useRef<HTMLDivElement>(null),first=items.findIndex(item=>!item.disabled);
 const [focused,setFocused]=useState(first);
 return <div ref={ref} role="menu" aria-label={label} style={{display:"grid",gap:2}} onKeyDown={event=>{
  const enabled=Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')??[]);
  if(!enabled.length)return;
  const index=enabled.indexOf(document.activeElement as HTMLButtonElement);
  if(["ArrowDown","ArrowUp","Home","End"].includes(event.key)){
   event.preventDefault();const next=event.key==="Home"?0:event.key==="End"?enabled.length-1:(Math.max(0,index)+(event.key==="ArrowDown"?1:-1)+enabled.length)%enabled.length;enabled[next].focus();
  }
 }}>{items.map((item,index)=><button type="button" key={index} role="menuitem" tabIndex={index===focused?0:-1} className="m-button" data-variant="ghost" disabled={item.disabled} style={{justifyContent:"flex-start",width:"100%"}} onFocus={()=>setFocused(index)} onClick={item.onSelect}>{item.label}</button>)}</div>;
}
export function DropdownMenu({trigger,items}:{trigger:React.ReactNode;items:Array<{label:React.ReactNode;onSelect?:()=>void;disabled?:boolean}>}) {
 const[open,setOpen]=useState(false),[last,setLast]=useState(false),ref=useRef<HTMLDivElement>(null),id=useId();
 const focusTrigger=()=>ref.current?.querySelector<HTMLElement>('[data-menu-trigger]')?.focus();
 useEffect(()=>{
  if(!open)return;
  const options=ref.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)');options?.[last?options.length-1:0]?.focus();
  const outside=(event:MouseEvent)=>{if(!ref.current?.contains(event.target as Node))setOpen(false);};
  document.addEventListener("mousedown",outside);return()=>document.removeEventListener("mousedown",outside);
 },[open,last]);
 const triggerProps={"data-menu-trigger":true,"aria-haspopup":"menu" as const,"aria-expanded":open,"aria-controls":open?id:undefined,
  onClick:(event:React.MouseEvent<HTMLElement>)=>{if(React.isValidElement(trigger))(trigger.props as {onClick?:(event:React.MouseEvent<HTMLElement>)=>void}).onClick?.(event);if(!event.defaultPrevented){setLast(false);setOpen(!open);}},
  onKeyDown:(event:React.KeyboardEvent<HTMLElement>)=>{if(event.key==="ArrowDown"||event.key==="ArrowUp"){event.preventDefault();setLast(event.key==="ArrowUp");setOpen(true);}},
 };
 return <div ref={ref} style={{position:"relative",display:"inline-block"}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setOpen(false);}} onKeyDown={event=>{if(event.key==="Escape"&&open){event.preventDefault();setOpen(false);focusTrigger();}}}>
 {React.isValidElement(trigger)?React.cloneElement(trigger as React.ReactElement<React.HTMLAttributes<HTMLElement>>,triggerProps):<button type="button" {...triggerProps}>{trigger}</button>}
 {open&&<div id={id} className="m-popover" style={{insetBlockStart:"calc(100% + 4px)",insetInlineEnd:0}}><Menu items={items.map(item=>({...item,onSelect:()=>{item.onSelect?.();setOpen(false);focusTrigger();}}))}/></div>}
 </div>;
}
export const ContextMenu=DropdownMenu;
export function CommandMenu({open,onOpenChange,items,placeholder="Type a command…"}:{open:boolean;onOpenChange:(v:boolean)=>void;items:Array<{label:string;onSelect:()=>void}>;placeholder?:string}) {
 const[q,setQ]=useState("");const dialog=useRef<HTMLDivElement>(null);useDialogBehavior(open,dialog,()=>onOpenChange(false));
 if(!open||typeof document==="undefined")return null;
 return createPortal(<div className="maataa-root m-modal-backdrop" onMouseDown={event=>{if(event.currentTarget===event.target)onOpenChange(false);}}><div ref={dialog} tabIndex={-1} className="m-dialog" role="dialog" aria-modal="true" aria-label="Command menu"><input className="m-input" aria-label="Search commands" placeholder={placeholder} value={q} onChange={event=>setQ(event.target.value)}/><Menu items={items.filter(item=>item.label.toLowerCase().includes(q.toLowerCase())).map(item=>({label:item.label,onSelect:()=>{item.onSelect();onOpenChange(false);}}))}/></div></div>,document.body);
}
export function BottomNavigation({items,activeId,onSelect}:{items:NavItemData[];activeId?:string;onSelect?:(i:NavItemData)=>void}){return <nav className="m-mobile-bottom" aria-label="Bottom navigation">{items.map(i=><NavItem key={i.id} item={i} active={activeId===i.id} onSelect={onSelect}/>)}</nav>}
export const MobileNavigation=BottomNavigation;
