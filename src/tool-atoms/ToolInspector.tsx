import React from "react";
import { cx } from "../utils";

export type ToolInspectorProps = React.HTMLAttributes<HTMLElement>;
export function ToolInspector({ className, ...props }: ToolInspectorProps) { return <section data-tool-region="toolinspector" className={cx("m-tool-atom", "m-tool-toolinspector", className)} {...props} />; }
