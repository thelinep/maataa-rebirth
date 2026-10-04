import React from "react";
import { cx } from "../utils";
export type RegistryHeaderProps = React.HTMLAttributes<HTMLElement>;
export function RegistryHeader({ className, ...props }: RegistryHeaderProps) { return <div data-registry-region="registryheader" className={cx("m-registry-atom", "m-registry-registryheader", className)} {...props} />; }
