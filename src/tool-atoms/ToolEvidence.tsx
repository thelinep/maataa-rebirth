import React from "react";
import { cx } from "../utils";

export type ToolEvidenceProps = React.HTMLAttributes<HTMLElement>;
export function ToolEvidence({ className, ...props }: ToolEvidenceProps) { return <section data-tool-region="toolevidence" className={cx("m-tool-atom", "m-tool-toolevidence", className)} {...props} />; }
