import * as React from "react";
export function Skeleton({children,...props}:React.HTMLAttributes<HTMLElement>){return React.createElement("div",{...props,"data-maataa-component":"Skeleton"},children);}
