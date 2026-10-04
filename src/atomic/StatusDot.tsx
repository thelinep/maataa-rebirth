import React from "react";
export function StatusDot({tone="neutral",label,...p}:React.HTMLAttributes<HTMLSpanElement>&{tone?:"neutral"|"success"|"warning"|"danger"|"info";label?:string}){return <span aria-label={label} {...p} style={{display:"inline-block",inlineSize:8,blockSize:8,borderRadius:"50%",background:`var(--m-${tone}, currentColor)`,...p.style}}/>;}
