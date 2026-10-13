import React from "react";
// eslint-disable-next-line jsx-a11y/heading-has-content -- heading text arrives as children through the spread props
export function DialogTitle(p:React.HTMLAttributes<HTMLHeadingElement>){return <h2 {...p}/>;}
