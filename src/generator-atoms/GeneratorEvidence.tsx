import React from "react";
import { cx } from "../utils";

export type GeneratorEvidenceProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorEvidence({ className, ...props }: GeneratorEvidenceProps) { return <section data-generator-region="generatorevidence" className={cx("m-generator-atom", "m-generator-generatorevidence", className)} {...props} />; }
