import React from "react";
import { atomClass, type LayoutAtomProps } from "../internal/layoutAtom";

export function LayoutHero({ className, inset, scroll, sticky, ...props }: LayoutAtomProps<HTMLElement>) {
  return <section data-layout-region="hero" className={atomClass("hero", className, inset, scroll, sticky)} {...props} />;
}
