import React from "react";
import { cx } from "../utils";

export type AISpaceEvaluationProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceEvaluation({ className, ...props }: AISpaceEvaluationProps) { return <section data-ai-space-region="aispaceevaluation" className={cx("m-ai-space-atom", "m-ai-space-aispaceevaluation", className)} {...props} />; }
