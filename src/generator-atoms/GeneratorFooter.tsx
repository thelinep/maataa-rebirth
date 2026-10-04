import React from "react";
import { cx } from "../utils";

export type GeneratorFooterProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorFooter({ className, ...props }: GeneratorFooterProps) { return <section data-generator-region="generatorfooter" className={cx("m-generator-atom", "m-generator-generatorfooter", className)} {...props} />; }
