import React from "react";
import { cx } from "../utils";

export type AISpacePaletteProps = React.HTMLAttributes<HTMLElement>;
export function AISpacePalette({ className, ...props }: AISpacePaletteProps) { return <section data-ai-space-region="aispacepalette" className={cx("m-ai-space-atom", "m-ai-space-aispacepalette", className)} {...props} />; }
