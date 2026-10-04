import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutFooter({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <footer data-layout-region="footer" className={atomClass("footer", className, inset, scroll, sticky)} {...props} />;
}
