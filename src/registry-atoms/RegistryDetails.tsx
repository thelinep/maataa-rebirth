import React from "react";
import { cx } from "../utils";
export type RegistryDetailsProps = React.HTMLAttributes<HTMLElement>;
export function RegistryDetails({ className, ...props }: RegistryDetailsProps) { return <div data-registry-region="registrydetails" className={cx("m-registry-atom", "m-registry-registrydetails", className)} {...props} />; }
