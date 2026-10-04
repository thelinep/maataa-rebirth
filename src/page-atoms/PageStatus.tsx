import React from "react";
import { cx } from "../utils";

export type PageStatusProps = React.HTMLAttributes<HTMLElement>;

export function PageStatus({ className, ...props }: PageStatusProps) {
  return <div data-page-region="pagestatus" className={cx("m-page-atom", "m-page-pagestatus", className)} {...props} />;
}
