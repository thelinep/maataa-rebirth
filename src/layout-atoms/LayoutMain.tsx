import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutMain({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <main data-layout-region="main" className={atomClass("main", className, inset, scroll, sticky)} {...props} />;
}
