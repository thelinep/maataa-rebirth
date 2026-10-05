import React, { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "../utils";
import { useDialogBehavior } from "../internal/dialogBehavior";
import { Button } from "../actions";
export function Surface(p:React.HTMLAttributes<HTMLDivElement>){return <div {...p} className={cx("m-surface m-ui",p.className)}/>}
export function Card({header,footer,children,className,...p}:React.HTMLAttributes<HTMLDivElement>&{header?:React.ReactNode;footer?:React.ReactNode}){return <article {...p} className={cx("m-card m-ui",className)}>{header&&<header style={{marginBlockEnd:12}}>{header}</header>}{children}{footer&&<footer style={{marginBlockStart:12}}>{footer}</footer>}</article>}
export function Panel(p:React.HTMLAttributes<HTMLDivElement>){return <div {...p} className={cx("m-panel m-ui",p.className)} style={{padding:16,...p.style}}/>}
export function Modal({open,isOpen,onClose,title,description,children,footer,closeLabel="Close"}:{open?:boolean;isOpen?:boolean;onClose:()=>void;title?:React.ReactNode;description?:React.ReactNode;children?:React.ReactNode;footer?:React.ReactNode;closeLabel?:string}) {
 const visible=open??isOpen??false,titleId=useId(),descId=useId(),dialog=useRef<HTMLDivElement>(null);
 useDialogBehavior(visible,dialog,onClose);
 if(!visible||typeof document==="undefined")return null;
 return createPortal(<div className="maataa-root m-modal-backdrop" onMouseDown={event=>{if(event.currentTarget===event.target)onClose();}}>
  <div ref={dialog} tabIndex={-1} data-maataa-modal className="m-dialog" role="dialog" aria-modal="true" aria-label={!title?"Dialog":undefined} aria-labelledby={title?titleId:undefined} aria-describedby={description?descId:undefined}>
   <div style={{display:"flex",justifyContent:"space-between",gap:12}}><div>{title&&<h2 id={titleId}>{title}</h2>}{description&&<p id={descId} className="m-field-description">{description}</p>}</div><Button variant="ghost" aria-label={closeLabel} onClick={onClose}>×</Button></div>
   <div>{children}</div>{footer&&<footer>{footer}</footer>}
  </div>
 </div>,document.body);
}
export const Dialog=Modal;
export function AlertDialog({open,onClose,title,description,onConfirm,confirmLabel="Confirm",cancelLabel="Cancel"}:{open:boolean;onClose:()=>void;title:string;description?:string;onConfirm:()=>void;confirmLabel?:string;cancelLabel?:string}){return <Modal open={open} onClose={onClose} title={title} description={description} footer={<><Button variant="secondary" onClick={onClose}>{cancelLabel}</Button><Button variant="destructive" onClick={()=>{onConfirm();onClose()}}>{confirmLabel}</Button></>}/>}
export function Drawer({open,onClose,side="right",title,children}:{open:boolean;onClose:()=>void;side?:"left"|"right"|"bottom";title?:React.ReactNode;children?:React.ReactNode}) {
 const dialog=useRef<HTMLElement>(null),titleId=useId();useDialogBehavior(open,dialog,onClose);
 if(!open||typeof document==="undefined")return null;
 return createPortal(<div className="maataa-root m-modal-backdrop" onMouseDown={event=>{if(event.currentTarget===event.target)onClose();}}>
  <aside ref={dialog} tabIndex={-1} className="m-drawer" data-side={side} role="dialog" aria-modal="true" aria-label={!title?"Drawer":undefined} aria-labelledby={title?titleId:undefined}>
   <div style={{padding:16,display:"flex",justifyContent:"space-between"}}>{title&&<strong id={titleId}>{title}</strong>}<Button variant="ghost" aria-label="Close drawer" onClick={onClose}>×</Button></div><div style={{padding:16}}>{children}</div>
  </aside>
 </div>,document.body);
}
export const Sheet=Drawer;
export function Popover({trigger,children,open:controlled,onOpenChange}:{trigger:React.ReactElement;children:React.ReactNode;open?:boolean;onOpenChange?:(v:boolean)=>void}) {
 const[inner,setInner]=useState(false),open=controlled??inner,ref=useRef<HTMLSpanElement>(null),panel=useRef<HTMLDivElement>(null),id=useId();
 const setOpen=useCallback((value:boolean)=>{if(controlled===undefined)setInner(value);onOpenChange?.(value);},[controlled,onOpenChange]);
 useEffect(()=>{if(!open)return;panel.current?.querySelector<HTMLElement>('button,input,a[href],[tabindex="0"]')?.focus();const outside=(event:MouseEvent)=>{if(!ref.current?.contains(event.target as Node))setOpen(false);};document.addEventListener("mousedown",outside);return()=>document.removeEventListener("mousedown",outside);},[open,setOpen]);
 const original=trigger.props as {onClick?:(event:React.MouseEvent)=>void};
 return <span ref={ref} style={{position:"relative",display:"inline-block"}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setOpen(false);}} onKeyDown={event=>{if(event.key==="Escape"&&open){event.preventDefault();setOpen(false);ref.current?.querySelector<HTMLElement>('[data-popover-trigger]')?.focus();}}}>
 {React.cloneElement(trigger as React.ReactElement<React.HTMLAttributes<HTMLElement>>,{onClick:event=>{original.onClick?.(event);if(!event.defaultPrevented)setOpen(!open);},"aria-expanded":open,"aria-controls":open?id:undefined,...{"data-popover-trigger":true}})}
 {open&&<div id={id} ref={panel} className="m-popover">{children}</div>}</span>;
}
export function Tooltip({content,children}:{content:React.ReactNode;children:React.ReactElement}) {
 const[open,setOpen]=useState(false),id=useId();const describedBy=(children.props as {"aria-describedby"?:string})["aria-describedby"];
 return <span style={{position:"relative",display:"inline-flex"}} onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} onFocus={()=>setOpen(true)} onBlur={()=>setOpen(false)} onKeyDown={event=>{if(event.key==="Escape")setOpen(false);}}>
 {React.cloneElement(children as React.ReactElement<{"aria-describedby"?:string}>,{"aria-describedby":[describedBy,open?id:undefined].filter(Boolean).join(" ")||undefined})}
 {open&&<span id={id} role="tooltip" className="m-popover" style={{insetBlockEnd:"calc(100% + 6px)",insetInlineStart:"50%",translate:"-50% 0",whiteSpace:"nowrap"}}>{content}</span>}</span>;
}
export const HoverCard=Tooltip;
export function Collapsible({open,onOpenChange,trigger,children}:{open:boolean;onOpenChange:(v:boolean)=>void;trigger:React.ReactNode;children:React.ReactNode}){return <div><button className="m-button" data-variant="ghost" aria-expanded={open} onClick={()=>onOpenChange(!open)}>{trigger}</button>{open&&<div>{children}</div>}</div>}
export function Accordion({items,multiple=false}:{items:Array<{id:string;title:React.ReactNode;content:React.ReactNode}>;multiple?:boolean}){const[open,setOpen]=useState<string[]>([]);return <div>{items.map(i=>{const active=open.includes(i.id);return <section key={i.id} style={{borderBlockEnd:"1px solid var(--m-border)"}}><button className="m-button" data-variant="ghost" style={{width:"100%",justifyContent:"space-between"}} aria-expanded={active} onClick={()=>setOpen(active?open.filter(x=>x!==i.id):multiple?[...open,i.id]:[i.id])}>{i.title}<span aria-hidden="true">{active?"−":"+"}</span></button>{active&&<div style={{padding:12}}>{i.content}</div>}</section>})}</div>}
type ToastItem={id:string;message:React.ReactNode;tone?:"info"|"success"|"warning"|"danger"};type ToastCtx={toasts:ToastItem[];toast:(t:Omit<ToastItem,"id">)=>string;dismiss:(id:string)=>void};const ToastContext=createContext<ToastCtx|null>(null);
export function ToastProvider({children}:{children:React.ReactNode}){const[toasts,setToasts]=useState<ToastItem[]>([]),dismiss=useCallback((id:string)=>setToasts(t=>t.filter(x=>x.id!==id)),[]),toast=useCallback((t:Omit<ToastItem,"id">)=>{const id=`toast-${Date.now()}-${Math.random()}`;setToasts(v=>[...v,{id,...t}]);return id},[]);return <ToastContext.Provider value={{toasts,toast,dismiss}}>{children}<Toaster/></ToastContext.Provider>}
export function useToast(){const c=useContext(ToastContext);if(!c)throw new Error("useToast must be used inside ToastProvider");return c}
export function Toast({item,onClose}:{item:ToastItem;onClose:()=>void}){return <div className="m-toast" role={item.tone==="danger"?"alert":"status"} data-tone={item.tone}><div style={{display:"flex",justifyContent:"space-between",gap:12}}><span>{item.message}</span><button onClick={onClose} aria-label="Dismiss notification" style={{border:0,background:"transparent",color:"inherit"}}>×</button></div></div>}
export function Toaster(){const c=useContext(ToastContext);if(!c)return null;return <div className="m-toast-region" aria-live="polite">{c.toasts.map(t=><Toast key={t.id} item={t} onClose={()=>c.dismiss(t.id)}/>)}</div>}
