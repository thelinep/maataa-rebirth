import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutSidebar({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <aside data-layout-region="sidebar" className={atomClass("sidebar", className, inset, scroll, sticky)} {...props} />;
}
