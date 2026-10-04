import React from "react";
import { cx } from "../utils";

export type WorkspaceMainProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceMain({ className, ...props }: WorkspaceMainProps) {
  return <div data-workspace-region="workspacemain" className={cx("m-workspace-atom", "m-workspace-workspacemain", className)} {...props} />;
}
