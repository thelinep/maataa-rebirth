import React from "react";
// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a tooltip trigger must be focusable so keyboard users can reveal the tooltip
export function TooltipTrigger(p:React.HTMLAttributes<HTMLSpanElement>){return <span tabIndex={0} {...p}/>;}
