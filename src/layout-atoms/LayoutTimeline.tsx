import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutTimeline({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <section data-layout-region="timeline" className={atomClass("timeline", className, inset, scroll, sticky)} {...props} />;
}
