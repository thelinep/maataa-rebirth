import * as React from "react";
export function Tooltip({children,...props}:React.HTMLAttributes<HTMLElement>){return React.createElement("div",{...props,"data-maataa-component":"Tooltip"},children);}
