import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutRoot({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLDivElement>) {
  return <div data-layout-region="root" className={atomClass("root", className, inset, scroll, sticky)} {...props} />;
}
