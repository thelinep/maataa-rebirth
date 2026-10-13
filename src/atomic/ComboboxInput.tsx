import React from "react";
// eslint-disable-next-line jsx-a11y/role-has-required-aria-props -- low-level primitive: the caller passes aria-controls (the listbox id) through props
export function ComboboxInput({expanded,...p}:React.InputHTMLAttributes<HTMLInputElement>&{expanded?:boolean}){return <input role="combobox" aria-expanded={expanded} {...p}/>;}
