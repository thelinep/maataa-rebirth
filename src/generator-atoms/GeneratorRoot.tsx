import React from "react";
import { cx } from "../utils";

export type GeneratorRootProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorRoot({ className, ...props }: GeneratorRootProps) { return <section data-generator-region="generatorroot" className={cx("m-generator-atom", "m-generator-generatorroot", className)} {...props} />; }
