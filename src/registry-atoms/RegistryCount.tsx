import React from "react";
import { cx } from "../utils";
export type RegistryCountProps = React.HTMLAttributes<HTMLElement>;
export function RegistryCount({ className, ...props }: RegistryCountProps) { return <div data-registry-region="registrycount" className={cx("m-registry-atom", "m-registry-registrycount", className)} {...props} />; }
