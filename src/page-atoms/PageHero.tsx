import React from "react";
import { cx } from "../utils";

export type PageHeroProps = React.HTMLAttributes<HTMLElement>;

export function PageHero({ className, ...props }: PageHeroProps) {
  return <div data-page-region="pagehero" className={cx("m-page-atom", "m-page-pagehero", className)} {...props} />;
}
