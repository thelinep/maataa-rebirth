import React from "react";
import { cx } from "../utils";

export type PageEmptyProps = React.HTMLAttributes<HTMLElement>;

export function PageEmpty({ className, ...props }: PageEmptyProps) {
  return <div data-page-region="pageempty" className={cx("m-page-atom", "m-page-pageempty", className)} {...props} />;
}
