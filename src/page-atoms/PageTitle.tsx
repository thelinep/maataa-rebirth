import React from "react";
import { cx } from "../utils";

export type PageTitleProps = React.HTMLAttributes<HTMLElement>;

export function PageTitle({ className, ...props }: PageTitleProps) {
  return <h1 data-page-region="pagetitle" className={cx("m-page-atom", "m-page-pagetitle", className)} {...props} />;
}
