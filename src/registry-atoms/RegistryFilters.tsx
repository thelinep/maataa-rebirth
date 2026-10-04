import React from "react";
import { cx } from "../utils";
export type RegistryFiltersProps = React.HTMLAttributes<HTMLElement>;
export function RegistryFilters({ className, ...props }: RegistryFiltersProps) { return <div data-registry-region="registryfilters" className={cx("m-registry-atom", "m-registry-registryfilters", className)} {...props} />; }
