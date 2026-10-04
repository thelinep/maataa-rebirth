import React from "react";
import { cx } from "../utils";

export type ToolFooterProps = React.HTMLAttributes<HTMLElement>;
export function ToolFooter({ className, ...props }: ToolFooterProps) { return <section data-tool-region="toolfooter" className={cx("m-tool-atom", "m-tool-toolfooter", className)} {...props} />; }
