import React from "react";
export function Tab({selected,...p}:React.ButtonHTMLAttributes<HTMLButtonElement>&{selected?:boolean}){return <button type="button" role="tab" aria-selected={selected} {...p}/>;}
