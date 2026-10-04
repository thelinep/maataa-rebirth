import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutScroll({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLDivElement>) {
  return <div data-layout-region="scroll" className={atomClass("scroll", className, inset, scroll, sticky)} {...props} />;
}
