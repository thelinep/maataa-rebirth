import React from "react";
import { cx } from "../utils";

export type GeneratorPromptProps = React.HTMLAttributes<HTMLElement>;
export function GeneratorPrompt({ className, ...props }: GeneratorPromptProps) { return <section data-generator-region="generatorprompt" className={cx("m-generator-atom", "m-generator-generatorprompt", className)} {...props} />; }
