import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutSecondarySidebar({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <aside data-layout-region="secondary-sidebar" className={atomClass("secondary-sidebar", className, inset, scroll, sticky)} {...props} />;
}
