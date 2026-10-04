import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutNav({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <nav data-layout-region="nav" className={atomClass("nav", className, inset, scroll, sticky)} {...props} />;
}
