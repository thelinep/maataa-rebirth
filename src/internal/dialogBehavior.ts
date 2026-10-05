import * as React from "react";
const dialogs: HTMLElement[]=[];
const background=new Map<HTMLElement,boolean>();
let previousOverflow="";
function restoreBackground(){for(const [element,inert] of background){if(inert)element.setAttribute("inert","");else element.removeAttribute("inert");}background.clear();}
function syncBackground(){
  const top=dialogs[dialogs.length-1];
  if(!top){restoreBackground();document.body.style.overflow=previousOverflow;return;}
  for(const child of Array.from(document.body.children)){
    if(!(child instanceof HTMLElement))continue;
    if(!background.has(child))background.set(child,child.hasAttribute("inert"));
    if(child.contains(top))child.removeAttribute("inert");else child.setAttribute("inert","");
  }
}
function focusables(dialog:HTMLElement){
  return Array.from(dialog.querySelectorAll<HTMLElement>('a[href],button,input,select,textarea,[tabindex]')).filter(element=>
    element.tabIndex>=0&&!element.matches(':disabled')&&!element.closest('[hidden],[inert]')&&
    getComputedStyle(element).display!=="none"&&getComputedStyle(element).visibility!=="hidden");
}
/** Portal dialogs only: contain focus, isolate background, restore state on close/unmount. */
export function useDialogBehavior(open:boolean,ref:React.RefObject<HTMLElement|null>,onClose:()=>void,returnFocusRef?:React.RefObject<HTMLElement|null>){
  const close=React.useRef(onClose);
  React.useEffect(()=>{close.current=onClose;},[onClose]);
  React.useEffect(()=>{
    const dialog=ref.current;
    if(!open||!dialog)return;
    const previous=returnFocusRef?.current??(document.activeElement instanceof HTMLElement?document.activeElement:undefined);
    if(!dialogs.length){previousOverflow=document.body.style.overflow;document.body.style.overflow="hidden";}
    dialogs.push(dialog);syncBackground();
    const observer=new MutationObserver(syncBackground);observer.observe(document.body,{childList:true});
    const isTop=()=>dialogs[dialogs.length-1]===dialog;
    const focusFirst=()=>{(focusables(dialog)[0]??dialog).focus();};
    focusFirst();
    const keydown=(event:KeyboardEvent)=>{
      if(!isTop())return;
      if(event.key==="Escape"){event.preventDefault();event.stopPropagation();close.current();}
      if(event.key!=="Tab")return;
      const targets=focusables(dialog),first=targets[0],last=targets[targets.length-1];
      if(!first){event.preventDefault();dialog.focus();}
      else if(event.shiftKey&&(document.activeElement===first||document.activeElement===dialog)){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&(document.activeElement===last||document.activeElement===dialog)){event.preventDefault();first.focus();}
    };
    const focusin=(event:FocusEvent)=>{if(isTop()&&!dialog.contains(event.target as Node))focusFirst();};
    document.addEventListener("keydown",keydown);document.addEventListener("focusin",focusin);
    return()=>{
      observer.disconnect();document.removeEventListener("keydown",keydown);document.removeEventListener("focusin",focusin);
      const wasTop=isTop();const index=dialogs.indexOf(dialog);if(index>=0)dialogs.splice(index,1);
      syncBackground();if(wasTop&&previous?.isConnected&&!previous.closest('[inert]'))previous.focus();
    };
  },[open,ref,returnFocusRef]);
}
