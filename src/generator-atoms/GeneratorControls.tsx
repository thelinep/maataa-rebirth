import React from "react";
import { cx } from "../utils";

export type GeneratorControlsProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorControls({ className, ...props }: GeneratorControlsProps) { return <section data-generator-region="generatorcontrols" className={cx("m-generator-atom", "m-generator-generatorcontrols", className)} {...props} />; }
