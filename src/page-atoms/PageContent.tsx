import React from "react";
import { cx } from "../utils";

export type PageContentProps = React.HTMLAttributes<HTMLElement>;

export function PageContent({ className, ...props }: PageContentProps) {
  return <div data-page-region="pagecontent" className={cx("m-page-atom", "m-page-pagecontent", className)} {...props} />;
}
