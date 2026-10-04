import React from "react";
import { cx } from "../utils";

export type PageDetailsProps = React.HTMLAttributes<HTMLElement>;

export function PageDetails({ className, ...props }: PageDetailsProps) {
  return <div data-page-region="pagedetails" className={cx("m-page-atom", "m-page-pagedetails", className)} {...props} />;
}
