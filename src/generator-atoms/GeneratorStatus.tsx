import React from "react";
import { cx } from "../utils";

export type GeneratorStatusProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorStatus({ className, ...props }: GeneratorStatusProps) { return <section data-generator-region="generatorstatus" className={cx("m-generator-atom", "m-generator-generatorstatus", className)} {...props} />; }
