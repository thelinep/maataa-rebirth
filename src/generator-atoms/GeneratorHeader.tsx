import React from "react";
import { cx } from "../utils";

export type GeneratorHeaderProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorHeader({ className, ...props }: GeneratorHeaderProps) { return <section data-generator-region="generatorheader" className={cx("m-generator-atom", "m-generator-generatorheader", className)} {...props} />; }
