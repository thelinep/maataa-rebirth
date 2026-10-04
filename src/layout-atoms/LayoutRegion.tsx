import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutRegion({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <section data-layout-region="region" className={atomClass("region", className, inset, scroll, sticky)} {...props} />;
}
