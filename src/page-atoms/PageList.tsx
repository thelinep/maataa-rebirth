import React from "react";
import { cx } from "../utils";

export type PageListProps = React.HTMLAttributes<HTMLElement>;

export function PageList({ className, ...props }: PageListProps) {
  return <div data-page-region="pagelist" className={cx("m-page-atom", "m-page-pagelist", className)} {...props} />;
}
