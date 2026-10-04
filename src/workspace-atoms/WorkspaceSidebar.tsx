import React from "react";
import { cx } from "../utils";

export type WorkspaceSidebarProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceSidebar({ className, ...props }: WorkspaceSidebarProps) {
  return <div data-workspace-region="workspacesidebar" className={cx("m-workspace-atom", "m-workspace-workspacesidebar", className)} {...props} />;
}
