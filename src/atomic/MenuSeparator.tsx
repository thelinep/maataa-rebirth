import React from "react";
// eslint-disable-next-line jsx-a11y/no-redundant-roles -- explicit role kept: the support-center desktop shell CSS selects [role="separator"]
export function MenuSeparator(p:React.HTMLAttributes<HTMLHRElement>){return <hr role="separator" {...p}/>;}
