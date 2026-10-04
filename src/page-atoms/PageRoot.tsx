import React from "react";
import { cx } from "../utils";

export type PageRootProps = React.HTMLAttributes<HTMLElement>;

export function PageRoot({ className, ...props }: PageRootProps) {
  return <div data-page-region="pageroot" className={cx("m-page-atom", "m-page-pageroot", className)} {...props} />;
}
