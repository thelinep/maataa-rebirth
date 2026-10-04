import React from "react";
import { cx } from "../utils";

export type WorkspaceTabsProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceTabs({ className, ...props }: WorkspaceTabsProps) {
  return <div data-workspace-region="workspacetabs" className={cx("m-workspace-atom", "m-workspace-workspacetabs", className)} {...props} />;
}
