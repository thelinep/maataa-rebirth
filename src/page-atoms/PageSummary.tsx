import React from "react";
import { cx } from "../utils";

export type PageSummaryProps = React.HTMLAttributes<HTMLElement>;

export function PageSummary({ className, ...props }: PageSummaryProps) {
  return <div data-page-region="pagesummary" className={cx("m-page-atom", "m-page-pagesummary", className)} {...props} />;
}
