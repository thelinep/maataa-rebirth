import * as React from "react";
export function Card({children,...props}:React.HTMLAttributes<HTMLElement>){return React.createElement("div",{...props,"data-maataa-component":"Card"},children);}
