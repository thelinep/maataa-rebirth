import React from "react";
import { cx } from "../utils";
export type RegistryEmptyProps = React.HTMLAttributes<HTMLElement>;
export function RegistryEmpty({ className, ...props }: RegistryEmptyProps) { return <div data-registry-region="registryempty" className={cx("m-registry-atom", "m-registry-registryempty", className)} {...props} />; }
