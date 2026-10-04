import React from "react";
import { cx } from "../utils";
export type RegistryStatusProps = React.HTMLAttributes<HTMLElement>;
export function RegistryStatus({ className, ...props }: RegistryStatusProps) { return <div data-registry-region="registrystatus" className={cx("m-registry-atom", "m-registry-registrystatus", className)} {...props} />; }
