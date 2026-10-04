import React from "react";
import { cx } from "../utils";

export type AISpaceSidebarProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceSidebar({ className, ...props }: AISpaceSidebarProps) { return <section data-ai-space-region="aispacesidebar" className={cx("m-ai-space-atom", "m-ai-space-aispacesidebar", className)} {...props} />; }
