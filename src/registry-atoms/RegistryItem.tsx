import React from "react";
import { cx } from "../utils";
export type RegistryItemProps = React.HTMLAttributes<HTMLElement>;
export function RegistryItem({ className, ...props }: RegistryItemProps) { return <div data-registry-region="registryitem" className={cx("m-registry-atom", "m-registry-registryitem", className)} {...props} />; }
