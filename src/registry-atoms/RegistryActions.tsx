import React from "react";
import { cx } from "../utils";
export type RegistryActionsProps = React.HTMLAttributes<HTMLElement>;
export function RegistryActions({ className, ...props }: RegistryActionsProps) { return <div data-registry-region="registryactions" className={cx("m-registry-atom", "m-registry-registryactions", className)} {...props} />; }
