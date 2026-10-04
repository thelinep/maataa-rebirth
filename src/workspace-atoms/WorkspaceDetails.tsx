import React from "react";
import { cx } from "../utils";

export type WorkspaceDetailsProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceDetails({ className, ...props }: WorkspaceDetailsProps) {
  return <div data-workspace-region="workspacedetails" className={cx("m-workspace-atom", "m-workspace-workspacedetails", className)} {...props} />;
}
