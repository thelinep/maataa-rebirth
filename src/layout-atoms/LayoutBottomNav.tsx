import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutBottomNav({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <nav data-layout-region="bottom-nav" className={atomClass("bottom-nav", className, inset, scroll, sticky)} {...props} />;
}
