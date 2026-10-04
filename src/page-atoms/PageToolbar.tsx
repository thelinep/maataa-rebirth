import React from "react";
import { cx } from "../utils";

export type PageToolbarProps = React.HTMLAttributes<HTMLElement>;

export function PageToolbar({ className, ...props }: PageToolbarProps) {
  return <div data-page-region="pagetoolbar" className={cx("m-page-atom", "m-page-pagetoolbar", className)} {...props} />;
}
