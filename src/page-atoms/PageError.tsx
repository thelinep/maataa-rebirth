import React from "react";
import { cx } from "../utils";

export type PageErrorProps = React.HTMLAttributes<HTMLElement>;

export function PageError({ className, ...props }: PageErrorProps) {
  return <div data-page-region="pageerror" className={cx("m-page-atom", "m-page-pageerror", className)} {...props} />;
}
