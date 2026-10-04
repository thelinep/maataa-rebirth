import React from "react";
import { cx } from "../utils";

export type WorkspaceFooterProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceFooter({ className, ...props }: WorkspaceFooterProps) {
  return <div data-workspace-region="workspacefooter" className={cx("m-workspace-atom", "m-workspace-workspacefooter", className)} {...props} />;
}
