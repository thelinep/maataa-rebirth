import React from "react";
import { cx } from "../utils";

export type GeneratorInputsProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorInputs({ className, ...props }: GeneratorInputsProps) { return <section data-generator-region="generatorinputs" className={cx("m-generator-atom", "m-generator-generatorinputs", className)} {...props} />; }
