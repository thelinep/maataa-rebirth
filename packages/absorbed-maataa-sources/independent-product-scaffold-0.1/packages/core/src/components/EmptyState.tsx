import * as React from "react";
export function EmptyState({children,...props}:React.HTMLAttributes<HTMLElement>){return React.createElement("div",{...props,"data-maataa-component":"EmptyState"},children);}
