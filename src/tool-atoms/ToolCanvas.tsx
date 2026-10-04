import React from "react";
import { cx } from "../utils";

export type ToolCanvasProps = React.HTMLAttributes<HTMLElement>;
export function ToolCanvas({ className, ...props }: ToolCanvasProps) { return <section data-tool-region="toolcanvas" className={cx("m-tool-atom", "m-tool-toolcanvas", className)} {...props} />; }
