import React from "react";
import { cx } from "../utils";

export type LayoutAtomProps<T extends HTMLElement = HTMLDivElement> = React.HTMLAttributes<T> & {
  inset?: boolean;
  scroll?: boolean;
  sticky?: boolean;
};

export function atomClass(region: string, className?: string, inset?: boolean, scroll?: boolean, sticky?: boolean) {
  return cx("m-layout-atom", `m-layout-${region}`, inset && "m-layout-inset", scroll && "m-layout-scroll", sticky && "m-layout-sticky", className);
}
