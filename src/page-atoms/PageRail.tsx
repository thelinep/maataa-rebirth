import React from "react";
import { cx } from "../utils";

export type PageRailProps = React.HTMLAttributes<HTMLElement>;

export function PageRail({ className, ...props }: PageRailProps) {
  return <div data-page-region="pagerail" className={cx("m-page-atom", "m-page-pagerail", className)} {...props} />;
}
