import React from "react";
import { cx } from "../utils";

export type ToolInputProps = React.HTMLAttributes<HTMLElement>;
export function ToolInput({ className, ...props }: ToolInputProps) { return <section data-tool-region="toolinput" className={cx("m-tool-atom", "m-tool-toolinput", className)} {...props} />; }
