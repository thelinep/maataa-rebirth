import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutProperties({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <aside data-layout-region="properties" className={atomClass("properties", className, inset, scroll, sticky)} {...props} />;
}
