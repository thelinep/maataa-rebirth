import React from "react";
import { cx } from "../utils";

export type PageHeaderProps = React.HTMLAttributes<HTMLElement>;

export function PageHeader({ className, ...props }: PageHeaderProps) {
  return <div data-page-region="pageheader" className={cx("m-page-atom", "m-page-pageheader", className)} {...props} />;
}
