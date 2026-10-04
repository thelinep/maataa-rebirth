import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutHeader({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <header data-layout-region="header" className={atomClass("header", className, inset, scroll, sticky)} {...props} />;
}
