import React from "react";
import { cx } from "../utils";

export type PageBodyProps = React.HTMLAttributes<HTMLElement>;

export function PageBody({ className, ...props }: PageBodyProps) {
  return <div data-page-region="pagebody" className={cx("m-page-atom", "m-page-pagebody", className)} {...props} />;
}
