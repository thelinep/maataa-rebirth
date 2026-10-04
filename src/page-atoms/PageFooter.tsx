import React from "react";
import { cx } from "../utils";

export type PageFooterProps = React.HTMLAttributes<HTMLElement>;

export function PageFooter({ className, ...props }: PageFooterProps) {
  return <div data-page-region="pagefooter" className={cx("m-page-atom", "m-page-pagefooter", className)} {...props} />;
}
