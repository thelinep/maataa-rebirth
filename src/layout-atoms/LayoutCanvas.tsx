import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutCanvas({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLDivElement>) {
  return <div data-layout-region="canvas" className={atomClass("canvas", className, inset, scroll, sticky)} {...props} />;
}
