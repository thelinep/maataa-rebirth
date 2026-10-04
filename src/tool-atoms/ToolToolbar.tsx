import React from "react";
import { cx } from "../utils";

export type ToolToolbarProps = React.HTMLAttributes<HTMLElement>;
export function ToolToolbar({ className, ...props }: ToolToolbarProps) { return <section data-tool-region="tooltoolbar" className={cx("m-tool-atom", "m-tool-tooltoolbar", className)} {...props} />; }
