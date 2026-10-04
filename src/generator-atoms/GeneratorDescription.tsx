import React from "react";
import { cx } from "../utils";

export type GeneratorDescriptionProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorDescription({ className, ...props }: GeneratorDescriptionProps) { return <section data-generator-region="generatordescription" className={cx("m-generator-atom", "m-generator-generatordescription", className)} {...props} />; }
