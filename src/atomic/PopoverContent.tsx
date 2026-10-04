import React from "react";
export function PopoverContent(p:React.HTMLAttributes<HTMLDivElement>){return <div className={["m-popover",p.className].filter(Boolean).join(" ")} {...p}/>;}
