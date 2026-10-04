import React from "react";
import { cx } from "../utils";

export type PageMetaProps = React.HTMLAttributes<HTMLElement>;

export function PageMeta({ className, ...props }: PageMetaProps) {
  return <div data-page-region="pagemeta" className={cx("m-page-atom", "m-page-pagemeta", className)} {...props} />;
}
