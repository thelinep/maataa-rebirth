import React from "react";
import { cx } from "../utils";

export type AISpaceActivityProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceActivity({ className, ...props }: AISpaceActivityProps) { return <section data-ai-space-region="aispaceactivity" className={cx("m-ai-space-atom", "m-ai-space-aispaceactivity", className)} {...props} />; }
