import React from "react";
import { cx } from "../utils";

export type PageBreadcrumbsProps = React.HTMLAttributes<HTMLElement>;

export function PageBreadcrumbs({ className, ...props }: PageBreadcrumbsProps) {
  return <div data-page-region="pagebreadcrumbs" className={cx("m-page-atom", "m-page-pagebreadcrumbs", className)} {...props} />;
}
