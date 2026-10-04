import React from "react";
import { cx } from "../utils";

export type GeneratorContextProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorContext({ className, ...props }: GeneratorContextProps) { return <section data-generator-region="generatorcontext" className={cx("m-generator-atom", "m-generator-generatorcontext", className)} {...props} />; }
