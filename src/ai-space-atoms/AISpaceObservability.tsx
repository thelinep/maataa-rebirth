import React from "react";
import { cx } from "../utils";

export type AISpaceObservabilityProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceObservability({ className, ...props }: AISpaceObservabilityProps) { return <section data-ai-space-region="aispaceobservability" className={cx("m-ai-space-atom", "m-ai-space-aispaceobservability", className)} {...props} />; }
