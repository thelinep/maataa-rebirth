import React from "react";
import { cx } from "../utils";

export type PageSectionProps = React.HTMLAttributes<HTMLElement>;

export function PageSection({ className, ...props }: PageSectionProps) {
  return <div data-page-region="pagesection" className={cx("m-page-atom", "m-page-pagesection", className)} {...props} />;
}
