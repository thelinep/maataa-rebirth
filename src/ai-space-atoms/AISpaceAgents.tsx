import React from "react";
import { cx } from "../utils";

export type AISpaceAgentsProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceAgents({ className, ...props }: AISpaceAgentsProps) { return <section data-ai-space-region="aispaceagents" className={cx("m-ai-space-atom", "m-ai-space-aispaceagents", className)} {...props} />; }
