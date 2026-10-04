import React from "react";
import { cx } from "../utils";
export type RegistryGroupProps = React.HTMLAttributes<HTMLElement>;
export function RegistryGroup({ className, ...props }: RegistryGroupProps) { return <div data-registry-region="registrygroup" className={cx("m-registry-atom", "m-registry-registrygroup", className)} {...props} />; }
