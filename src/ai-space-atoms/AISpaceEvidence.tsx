import React from "react";
import { cx } from "../utils";

export type AISpaceEvidenceProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceEvidence({ className, ...props }: AISpaceEvidenceProps) { return <section data-ai-space-region="aispaceevidence" className={cx("m-ai-space-atom", "m-ai-space-aispaceevidence", className)} {...props} />; }
