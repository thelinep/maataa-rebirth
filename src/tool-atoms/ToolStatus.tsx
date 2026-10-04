import React from "react";
import { cx } from "../utils";

export type ToolStatusProps = React.HTMLAttributes<HTMLElement>;
export function ToolStatus({ className, ...props }: ToolStatusProps) { return <section data-tool-region="toolstatus" className={cx("m-tool-atom", "m-tool-toolstatus", className)} {...props} />; }
