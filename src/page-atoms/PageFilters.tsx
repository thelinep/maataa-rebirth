import React from "react";
import { cx } from "../utils";

export type PageFiltersProps = React.HTMLAttributes<HTMLElement>;

export function PageFilters({ className, ...props }: PageFiltersProps) {
  return <div data-page-region="pagefilters" className={cx("m-page-atom", "m-page-pagefilters", className)} {...props} />;
}
