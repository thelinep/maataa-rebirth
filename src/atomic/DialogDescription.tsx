import React from "react";
export function DialogDescription(p:React.HTMLAttributes<HTMLParagraphElement>){return <p {...p} className={["m-field-description",p.className].filter(Boolean).join(" ")}/>;}
