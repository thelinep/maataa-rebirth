import React from "react";
import { cx } from "../utils";

export type PageTabsProps = React.HTMLAttributes<HTMLElement>;

export function PageTabs({ className, ...props }: PageTabsProps) {
  return <div data-page-region="pagetabs" className={cx("m-page-atom", "m-page-pagetabs", className)} {...props} />;
}
