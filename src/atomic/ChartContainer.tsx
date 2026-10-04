import React from "react";
export function ChartContainer({label,...p}:React.HTMLAttributes<HTMLDivElement>&{label?:string}){return <div role="img" aria-label={label} {...p}/>;}
