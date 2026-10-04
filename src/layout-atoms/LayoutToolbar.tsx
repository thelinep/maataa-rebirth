import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutToolbar({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLDivElement>) {
  return <div data-layout-region="toolbar" className={atomClass("toolbar", className, inset, scroll, sticky)} {...props} />;
}
