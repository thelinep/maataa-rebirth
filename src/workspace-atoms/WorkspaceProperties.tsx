import React from "react";
import { cx } from "../utils";

export type WorkspacePropertiesProps = React.HTMLAttributes<HTMLElement>;

export function WorkspaceProperties({ className, ...props }: WorkspacePropertiesProps) {
  return <div data-workspace-region="workspaceproperties" className={cx("m-workspace-atom", "m-workspace-workspaceproperties", className)} {...props} />;
}
