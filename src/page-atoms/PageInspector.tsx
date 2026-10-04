import React from "react";
import { cx } from "../utils";

export type PageInspectorProps = React.HTMLAttributes<HTMLElement>;

export function PageInspector({ className, ...props }: PageInspectorProps) {
  return <div data-page-region="pageinspector" className={cx("m-page-atom", "m-page-pageinspector", className)} {...props} />;
}
