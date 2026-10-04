import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutList({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <section data-layout-region="list" className={atomClass("list", className, inset, scroll, sticky)} {...props} />;
}
