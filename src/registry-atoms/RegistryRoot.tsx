import React from "react";
import { cx } from "../utils";
export type RegistryRootProps = React.HTMLAttributes<HTMLElement>;
export function RegistryRoot({ className, ...props }: RegistryRootProps) { return <div data-registry-region="registryroot" className={cx("m-registry-atom", "m-registry-registryroot", className)} {...props} />; }
