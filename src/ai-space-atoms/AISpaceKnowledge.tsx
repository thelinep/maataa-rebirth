import React from "react";
import { cx } from "../utils";

export type AISpaceKnowledgeProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceKnowledge({ className, ...props }: AISpaceKnowledgeProps) { return <section data-ai-space-region="aispaceknowledge" className={cx("m-ai-space-atom", "m-ai-space-aispaceknowledge", className)} {...props} />; }
