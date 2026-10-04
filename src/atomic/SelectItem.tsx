import React from "react";
export function SelectItem({selected,...p}:React.ButtonHTMLAttributes<HTMLButtonElement>&{selected?:boolean}){return <button type="button" role="option" aria-selected={selected} {...p}/>;}
