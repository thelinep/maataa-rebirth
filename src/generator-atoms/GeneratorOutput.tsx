import React from "react";
import { cx } from "../utils";

export type GeneratorOutputProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorOutput({ className, ...props }: GeneratorOutputProps) { return <section data-generator-region="generatoroutput" className={cx("m-generator-atom", "m-generator-generatoroutput", className)} {...props} />; }
