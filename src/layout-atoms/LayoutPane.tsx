import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutPane({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <section data-layout-region="pane" className={atomClass("pane", className, inset, scroll, sticky)} {...props} />;
}
