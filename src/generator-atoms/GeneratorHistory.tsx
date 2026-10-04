import React from "react";
import { cx } from "../utils";

export type GeneratorHistoryProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorHistory({ className, ...props }: GeneratorHistoryProps) { return <section data-generator-region="generatorhistory" className={cx("m-generator-atom", "m-generator-generatorhistory", className)} {...props} />; }
