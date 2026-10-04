import React from "react";
export function NavList(p:React.HTMLAttributes<HTMLUListElement>){return <ul {...p} style={{listStyle:"none",padding:0,margin:0,...p.style}}/>;}
