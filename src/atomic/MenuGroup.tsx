import React from "react";
export function MenuGroup({label,children,...p}:React.HTMLAttributes<HTMLDivElement>&{label?:React.ReactNode}){return <div role="group" aria-label={typeof label==="string"?label:undefined} {...p}>{label&&typeof label!=="string"?label:null}{children}</div>;}
