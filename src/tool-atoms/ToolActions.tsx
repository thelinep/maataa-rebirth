import React from "react";
import { cx } from "../utils";

export type ToolActionsProps = React.HTMLAttributes<HTMLElement>;
export function ToolActions({ className, ...props }: ToolActionsProps) { return <section data-tool-region="toolactions" className={cx("m-tool-atom", "m-tool-toolactions", className)} {...props} />; }
