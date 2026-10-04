import React from "react";
import { cx } from "../utils";

export type PageSearchProps = React.HTMLAttributes<HTMLElement>;

export function PageSearch({ className, ...props }: PageSearchProps) {
  return <div data-page-region="pagesearch" className={cx("m-page-atom", "m-page-pagesearch", className)} {...props} />;
}
