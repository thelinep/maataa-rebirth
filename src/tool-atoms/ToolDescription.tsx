import React from "react";
import { cx } from "../utils";

export type ToolDescriptionProps = React.HTMLAttributes<HTMLElement>;
export function ToolDescription({ className, ...props }: ToolDescriptionProps) { return <section data-tool-region="tooldescription" className={cx("m-tool-atom", "m-tool-tooldescription", className)} {...props} />; }
