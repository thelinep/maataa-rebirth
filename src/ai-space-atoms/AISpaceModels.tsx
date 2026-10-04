import React from "react";
import { cx } from "../utils";

export type AISpaceModelsProps = React.HTMLAttributes<HTMLElement>;
export function AISpaceModels({ className, ...props }: AISpaceModelsProps) { return <section data-ai-space-region="aispacemodels" className={cx("m-ai-space-atom", "m-ai-space-aispacemodels", className)} {...props} />; }
