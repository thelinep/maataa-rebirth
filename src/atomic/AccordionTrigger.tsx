import React from "react";
export function AccordionTrigger({expanded,...p}:React.ButtonHTMLAttributes<HTMLButtonElement>&{expanded?:boolean}){return <button type="button" aria-expanded={expanded} {...p}/>;}
