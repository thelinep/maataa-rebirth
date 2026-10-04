import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutContent({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLDivElement>) {
  return <div data-layout-region="content" className={atomClass("content", className, inset, scroll, sticky)} {...props} />;
}
