import * as React from "react";
import { Input } from "../forms/Input";

export interface SearchOption {
  value: string;
  label: string;
  description?: string;
  group?: string;
}
export interface ComboboxControlProps {
  options: readonly SearchOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
}
/** Shared keyboard/search behavior; no knowledge of canonical namespaces. */
export function ComboboxControl({options,value,onValueChange,placeholder="Search…",label="Options"}:ComboboxControlProps) {
  const id = React.useId();
  const listId = `${id}-list`;
  const [open,setOpen] = React.useState(false);
  const [query,setQuery] = React.useState("");
  const [active,setActive] = React.useState(0);
  const input = React.useRef<HTMLInputElement>(null);
  const selected = options.find(option=>option.value===value);
  const filtered = React.useMemo(()=>options.filter(option=>
    `${option.label} ${option.value} ${option.description??""} ${option.group??""}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())),[options,query]);
  const index = Math.min(active,Math.max(0,filtered.length-1));
  const choose = (option:SearchOption) => {onValueChange?.(option.value);input.current?.focus();setOpen(false);setQuery("");};
  React.useEffect(()=>{
    if(open) document.getElementById(`${id}-option-${index}`)?.scrollIntoView?.({block:"nearest"});
  },[open,index,id]);
  return <div className="m-search-combobox" onBlur={event=>{
    if(!event.currentTarget.contains(event.relatedTarget)){setOpen(false);setQuery("");}
  }}>
    <label htmlFor={`${id}-input`}>{label}</label>
    <Input ref={input} id={`${id}-input`} role="combobox" aria-autocomplete="list" aria-expanded={open}
      aria-controls={open?listId:undefined} aria-activedescendant={open&&filtered[index]?`${id}-option-${index}`:undefined}
      value={open?query:selected?.label??value??""} placeholder={placeholder}
      onFocus={()=>{setOpen(true);setQuery("");setActive(0);}}
      onChange={event=>{setQuery(event.target.value);setActive(0);setOpen(true);}}
      onKeyDown={event=>{
        if(event.key==="ArrowDown"||event.key==="ArrowUp"){
          event.preventDefault();setOpen(true);
          setActive(!open?0:filtered.length?((index+(event.key==="ArrowDown"?1:-1)+filtered.length)%filtered.length):0);
        } else if(event.key==="Enter"&&open){event.preventDefault();if(filtered[index])choose(filtered[index]);}
        else if(event.key==="Escape"){event.preventDefault();setOpen(false);setQuery("");}
        else if(open&&(event.key==="Home"||event.key==="End")){event.preventDefault();setActive(event.key==="Home"?0:filtered.length-1);}
      }}/>
    <small className="m-search-selection" title={value}>{value||"No selection"}</small>
    {open&&<div className="m-search-results">
      <div role="listbox" id={listId} aria-label={`${label} results`}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- options are chosen with arrow keys + Enter on the combobox input via aria-activedescendant (ARIA APG combobox); options are not focused themselves */}
        {filtered.map((option,i)=><div role="option" id={`${id}-option-${i}`} key={option.value}
          aria-selected={option.value===value} data-active={i===index||undefined}
          onMouseDown={event=>event.preventDefault()} onMouseMove={()=>setActive(i)} onClick={()=>choose(option)}>
          <strong>{option.label}</strong>{option.group&&<span>{option.group}</span>}
          <code>{option.description??option.value}</code>
        </div>)}
      </div>
      {filtered.length===0&&<p role="status">No matches. Try a name, group or canonical ID.</p>}
    </div>}
  </div>;
}
