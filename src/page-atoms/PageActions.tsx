import React from "react";
import { cx } from "../utils";

export type PageActionsProps = React.HTMLAttributes<HTMLElement>;

export function PageActions({ className, ...props }: PageActionsProps) {
  return <div data-page-region="pageactions" className={cx("m-page-atom", "m-page-pageactions", className)} {...props} />;
}
