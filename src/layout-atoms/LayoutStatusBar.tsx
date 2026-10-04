import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutStatusBar({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <footer data-layout-region="statusbar" className={atomClass("statusbar", className, inset, scroll, sticky)} {...props} />;
}
