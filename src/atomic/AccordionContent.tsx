import React from "react";
export function AccordionContent({hidden,...p}:React.HTMLAttributes<HTMLDivElement>){return <div hidden={hidden} {...p}/>;}
