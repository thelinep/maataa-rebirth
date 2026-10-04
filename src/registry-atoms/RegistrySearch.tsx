import React from "react";
import { cx } from "../utils";
export type RegistrySearchProps = React.HTMLAttributes<HTMLElement>;
export function RegistrySearch({ className, ...props }: RegistrySearchProps) { return <div data-registry-region="registrysearch" className={cx("m-registry-atom", "m-registry-registrysearch", className)} {...props} />; }
