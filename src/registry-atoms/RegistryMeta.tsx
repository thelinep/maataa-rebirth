import React from "react";
import { cx } from "../utils";
export type RegistryMetaProps = React.HTMLAttributes<HTMLElement>;
export function RegistryMeta({ className, ...props }: RegistryMetaProps) { return <div data-registry-region="registrymeta" className={cx("m-registry-atom", "m-registry-registrymeta", className)} {...props} />; }
