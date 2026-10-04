import React from "react";
export function ComboboxInput({expanded,...p}:React.InputHTMLAttributes<HTMLInputElement>&{expanded?:boolean}){return <input role="combobox" aria-expanded={expanded} {...p}/>;}
