import React from "react";
import { cx } from "../utils";

export type PageTitleProps = React.HTMLAttributes<HTMLElement>;

export function PageTitle({ className, ...props }: PageTitleProps) {
  // eslint-disable-next-line jsx-a11y/heading-has-content -- heading text arrives as children through the spread props
  return <h1 data-page-region="pagetitle" className={cx("m-page-atom", "m-page-pagetitle", className)} {...props} />;
}
