import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutInspector({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <aside data-layout-region="inspector" className={atomClass("inspector", className, inset, scroll, sticky)} {...props} />;
}
