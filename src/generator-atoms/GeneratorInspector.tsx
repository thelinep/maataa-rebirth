import React from "react";
import { cx } from "../utils";

export type GeneratorInspectorProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorInspector({ className, ...props }: GeneratorInspectorProps) { return <section data-generator-region="generatorinspector" className={cx("m-generator-atom", "m-generator-generatorinspector", className)} {...props} />; }
