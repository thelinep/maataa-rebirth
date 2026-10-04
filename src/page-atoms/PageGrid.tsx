import React from "react";
import { cx } from "../utils";

export type PageGridProps = React.HTMLAttributes<HTMLElement>;

export function PageGrid({ className, ...props }: PageGridProps) {
  return <div data-page-region="pagegrid" className={cx("m-page-atom", "m-page-pagegrid", className)} {...props} />;
}
