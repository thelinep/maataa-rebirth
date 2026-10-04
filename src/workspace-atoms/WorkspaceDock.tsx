import React from "react";
import { cx } from "../utils";

export type WorkspaceDockProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceDock({ className, ...props }: WorkspaceDockProps) {
  return <div data-workspace-region="workspacedock" className={cx("m-workspace-atom", "m-workspace-workspacedock", className)} {...props} />;
}
