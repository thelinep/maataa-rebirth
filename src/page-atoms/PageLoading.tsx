import React from "react";
import { cx } from "../utils";

export type PageLoadingProps = React.HTMLAttributes<HTMLElement>;

export function PageLoading({ className, ...props }: PageLoadingProps) {
  return <div data-page-region="pageloading" className={cx("m-page-atom", "m-page-pageloading", className)} {...props} />;
}
