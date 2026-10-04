import React from "react";
import { cx } from "../utils";

export type ToolHeaderProps = React.HTMLAttributes<HTMLElement>;
export function ToolHeader({ className, ...props }: ToolHeaderProps) { return <section data-tool-region="toolheader" className={cx("m-tool-atom", "m-tool-toolheader", className)} {...props} />; }
