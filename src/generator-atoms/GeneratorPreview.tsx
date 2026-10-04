import React from "react";
import { cx } from "../utils";

export type GeneratorPreviewProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorPreview({ className, ...props }: GeneratorPreviewProps) { return <section data-generator-region="generatorpreview" className={cx("m-generator-atom", "m-generator-generatorpreview", className)} {...props} />; }
