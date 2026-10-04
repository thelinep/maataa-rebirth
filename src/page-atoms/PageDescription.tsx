import React from "react";
import { cx } from "../utils";

export type PageDescriptionProps = React.HTMLAttributes<HTMLElement>;

export function PageDescription({ className, ...props }: PageDescriptionProps) {
  return <div data-page-region="pagedescription" className={cx("m-page-atom", "m-page-pagedescription", className)} {...props} />;
}
