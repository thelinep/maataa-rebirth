import React from "react";
import { cx } from "../utils";

export type AISpaceInspectorProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceInspector({ className, ...props }: AISpaceInspectorProps) { return <section data-ai-space-region="aispaceinspector" className={cx("m-ai-space-atom", "m-ai-space-aispaceinspector", className)} {...props} />; }
