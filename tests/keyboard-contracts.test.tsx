import React from "react";
import { afterEach,describe,expect,it,vi } from "vitest";
import { cleanup,fireEvent,render,screen,within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal,Drawer } from "../src/surfaces";
import { Tabs } from "../src/navigation";
import { Combobox } from "../src/forms";
afterEach(cleanup);
describe("dialog focus contracts",()=>{
 it.each(["modal","drawer"])("contains and restores %s focus and isolates background",async kind=>{
  const user=userEvent.setup();
  function App(){const[open,setOpen]=React.useState(false);return <><button onClick={()=>setOpen(true)}>Open</button>{kind==="modal"?<Modal open={open} title="Test modal" onClose={()=>setOpen(false)}><button>Last</button></Modal>:<Drawer open={open} title="Test drawer" onClose={()=>setOpen(false)}><button>Last</button></Drawer>}</>;}
  render(<App/>);const trigger=screen.getByRole("button",{name:"Open"});await user.click(trigger);
  const dialog=screen.getByRole("dialog",{name:`Test ${kind}`});const buttons=within(dialog).getAllByRole("button");
  expect(buttons[0]).toHaveFocus();expect(trigger.closest('body > div')).toHaveAttribute("inert");
  await user.tab({shift:true});expect(buttons[buttons.length-1]).toHaveFocus();
  await user.tab();expect(buttons[0]).toHaveFocus();
  await user.keyboard("{Escape}");expect(screen.queryByRole("dialog")).toBeNull();expect(trigger).toHaveFocus();
  expect(trigger.closest('body > div')).not.toHaveAttribute("inert");
 });
 it("Escape closes only the top dialog and restores its opener",async()=>{
  const user=userEvent.setup();function App(){const[inner,setInner]=React.useState(false);return <Modal open title="Outer" onClose={vi.fn()}><button onClick={()=>setInner(true)}>Nested</button><Modal open={inner} title="Inner" onClose={()=>setInner(false)}><button>Inner action</button></Modal></Modal>;}
  render(<App/>);await user.click(screen.getByRole("button",{name:"Nested"}));await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog",{name:"Inner"})).toBeNull();expect(screen.getByRole("button",{name:"Nested"})).toHaveFocus();
 });
});
describe("tabs keyboard contract",()=>{
 it("uses roving focus, arrows, Home/End and skips disabled tabs",async()=>{
  const user=userEvent.setup();function App(){const[value,set]=React.useState("a");return <Tabs value={value} onValueChange={set} tabs={[{id:"a",label:"A",content:"Alpha"},{id:"b",label:"B",disabled:true},{id:"c",label:"C",content:"Charlie"}]}/>;}
  render(<App/>);await user.tab();expect(screen.getByRole("tab",{name:"A"})).toHaveFocus();
  await user.keyboard("{ArrowRight}");expect(screen.getByRole("tab",{name:"C"})).toHaveFocus();expect(screen.getByRole("tab",{name:"A"})).toHaveAttribute("tabindex","-1");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Charlie");
  expect(screen.getByRole("tab",{name:"C"})).toHaveAttribute("aria-controls",screen.getByRole("tabpanel").id);
  await user.keyboard("{Home}");expect(screen.getByRole("tab",{name:"A"})).toHaveFocus();
  await user.keyboard("{End}");expect(screen.getByRole("tab",{name:"C"})).toHaveFocus();
  await user.keyboard("{ArrowLeft}");expect(screen.getByRole("tab",{name:"A"})).toHaveFocus();
 });
});
describe("combobox keyboard contract",()=>{
 it("uses unique IDs, active descendants, keyboard selection and Escape",async()=>{
  const user=userEvent.setup(),change=vi.fn(),options=[{value:"a",label:"Alpha"},{value:"b",label:"Beta"}];
  render(<><Combobox options={options} label="First" onValueChange={change}/><Combobox options={options} label="Second"/></>);
  const first=screen.getByRole("combobox",{name:"First"}),second=screen.getByRole("combobox",{name:"Second"});
  expect(first.id).not.toBe(second.id);await user.click(first);
  const firstList=first.getAttribute("aria-controls");expect(firstList).toBeTruthy();
  await user.keyboard("{ArrowDown}");const active=document.getElementById(first.getAttribute("aria-activedescendant")!);expect(active).toHaveTextContent("Beta");
  await user.keyboard("{Enter}");expect(change).toHaveBeenCalledWith("b");expect(first).toHaveAttribute("aria-expanded","false");
  await user.click(second);expect(second.getAttribute("aria-controls")).not.toBe(firstList);
  await user.keyboard("{ArrowUp}{Escape}");expect(second).toHaveAttribute("aria-expanded","false");expect(second).not.toHaveAttribute("aria-activedescendant");
 });
});

import { DropdownMenu,CommandMenu } from "../src/navigation";
import { Popover,Tooltip } from "../src/surfaces";
describe("broader interaction contracts",()=>{
 it("opens a menu by keyboard, navigates enabled items and restores trigger focus",async()=>{
  const user=userEvent.setup(),select=vi.fn();render(<DropdownMenu trigger={<button>Actions</button>} items={[{label:"First"},{label:"Disabled",disabled:true},{label:"Last",onSelect:select}]}/>);
  const trigger=screen.getByRole("button",{name:"Actions"});trigger.focus();await user.keyboard("{ArrowDown}{End}");expect(screen.getByRole("menuitem",{name:"Last"})).toHaveFocus();
  await user.keyboard("{Enter}");expect(select).toHaveBeenCalledOnce();expect(trigger).toHaveFocus();expect(screen.queryByRole("menu")).toBeNull();
  await user.keyboard("{ArrowUp}{Escape}");expect(trigger).toHaveFocus();
 });
 it("dismisses popovers and tooltips with Escape without replacing trigger behavior",async()=>{
  const user=userEvent.setup(),click=vi.fn();render(<><Popover trigger={<button onClick={click}>Popover</button>}><button>Inside</button></Popover><Tooltip content="Helpful"><button>Hint</button></Tooltip></>);
  const trigger=screen.getByRole("button",{name:"Popover"});await user.click(trigger);expect(click).toHaveBeenCalledOnce();expect(screen.getByRole("button",{name:"Inside"})).toHaveFocus();
  await user.keyboard("{Escape}");expect(trigger).toHaveFocus();expect(screen.queryByRole("button",{name:"Inside"})).toBeNull();
  await user.click(screen.getByRole("button",{name:"Hint"}));expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful");await user.keyboard("{Escape}");expect(screen.queryByRole("tooltip")).toBeNull();
 });
 it("contains command-menu focus and labels its search",async()=>{
  const user=userEvent.setup(),close=vi.fn();render(<CommandMenu open onOpenChange={close} items={[{label:"Create",onSelect:vi.fn()}]}/>);
  expect(screen.getByRole("textbox",{name:"Search commands"})).toHaveFocus();await user.keyboard("{Escape}");expect(close).toHaveBeenCalledWith(false);
 });
});

describe("explicit dialog return target",()=>{it.each(["modal","drawer"])("restores %s trigger even when pointer activation did not focus it",async kind=>{
 const user=userEvent.setup();
 function App(){const [open,setOpen]=React.useState(false);const trigger=React.useRef<HTMLButtonElement>(null);return <><button ref={trigger} onClick={()=>setOpen(true)}>Pointer trigger</button>{kind==="modal"?<Modal open={open} title="Explicit modal" returnFocusRef={trigger} onClose={()=>setOpen(false)}/>:<Drawer open={open} title="Explicit drawer" returnFocusRef={trigger} onClose={()=>setOpen(false)}/>}</>;}
 render(<App/>);const trigger=screen.getByRole("button",{name:"Pointer trigger"});expect(trigger).not.toHaveFocus();fireEvent.click(trigger);expect(screen.getByRole("dialog")).toBeVisible();await user.keyboard("{Escape}");expect(trigger).toHaveFocus();
});});
