import React from "react";
import { cx } from "../utils";

export type PageSidebarProps = React.HTMLAttributes<HTMLElement>;

export function PageSidebar({ className, ...props }: PageSidebarProps) {
  return <div data-page-region="pagesidebar" className={cx("m-page-atom", "m-page-pagesidebar", className)} {...props} />;
}
