import React from "react";
export function ButtonSpinner({label="Loading",...p}:React.HTMLAttributes<HTMLSpanElement>&{label?:string}){return <span role="status" aria-label={label} {...p}/>;}
