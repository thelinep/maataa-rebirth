import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutPalette({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <aside data-layout-region="palette" className={atomClass("palette", className, inset, scroll, sticky)} {...props} />;
}
