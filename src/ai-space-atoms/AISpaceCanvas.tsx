import React from "react";
import { cx } from "../utils";

export type AISpaceCanvasProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceCanvas({ className, ...props }: AISpaceCanvasProps) { return <section data-ai-space-region="aispacecanvas" className={cx("m-ai-space-atom", "m-ai-space-aispacecanvas", className)} {...props} />; }
