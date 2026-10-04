import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutRail({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <aside data-layout-region="rail" className={atomClass("rail", className, inset, scroll, sticky)} {...props} />;
}
