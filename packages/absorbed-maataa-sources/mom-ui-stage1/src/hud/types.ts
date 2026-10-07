import type { ReactNode } from "react";

export type RuntimeHUDMode = "healthy" | "warning" | "blocked";
export type RuntimeHUDWidgetState = "loading" | "empty" | RuntimeHUDMode;
export type RuntimeHUDRoleMode = "viewer" | "operator" | "producer" | "investor" | "developer";
export type RuntimeOperationalMode = RuntimeHUDRoleMode;
export type RuntimeApprovalState = "READY_FOR_REVIEW" | "WAITING_FOR_EVIDENCE" | "BLOCKED" | "DEFERRED";
export type RuntimeDeploymentState = "NOT_TESTED" | "DRILL_REQUIRED" | "READY_FOR_DRILL" | "DRILL_PASSED";
export type RuntimeActionId =
  | "PROMOTE_TLP"
  | "PROMOTE_VAIGYAANIQ"
  | "APPROVE"
  | "REJECT"
  | "DEFER"
  | "REQUEST_VALIDATION"
  | "REQUEST_ROLLBACK_DRILL";
export type RuntimeHUDPanelId =
  | "notifications"
  | "timeline"
  | "telemetry"
  | "topology"
  | "observatory"
  | "command"
  | "search"
  | "domains"
  | "tasks"
  | "approvals";

export type RuntimeHUDStatusValue = {
  readonly label: string;
  readonly mode: RuntimeHUDMode;
  readonly detail?: string;
  readonly evidenceRef?: string;
};

export type RuntimeHUDStatus = {
  readonly activeTheme?: string;
  readonly activeDomain?: string;
  readonly runtime?: RuntimeHUDStatusValue;
  readonly telemetry?: RuntimeHUDStatusValue;
  readonly topology?: RuntimeHUDStatusValue;
  readonly notificationsCount?: number;
};

export type RuntimeHUDRailItem = {
  readonly id: RuntimeHUDPanelId;
  readonly label: string;
  readonly mode?: RuntimeHUDMode;
  readonly count?: number;
  readonly roleModes?: readonly RuntimeHUDRoleMode[];
};

export type RuntimeHUDOverlayTab = {
  readonly id: RuntimeHUDPanelId;
  readonly label: string;
  readonly mode?: RuntimeHUDMode;
  readonly roleModes?: readonly RuntimeHUDRoleMode[];
  readonly content?: ReactNode;
  readonly emptyLabel?: string;
};

export type RuntimeHUDWidgetDatum = {
  readonly label: string;
  readonly value?: ReactNode;
  readonly detail?: ReactNode;
  readonly mode?: RuntimeHUDMode;
  readonly evidenceRef?: string;
};

export type RuntimeHUDWidgetProps = {
  readonly title: string;
  readonly state: RuntimeHUDWidgetState;
  readonly description?: ReactNode;
  readonly data?: readonly RuntimeHUDWidgetDatum[];
  readonly emptyLabel?: string;
  readonly evidenceRef?: string;
  readonly className?: string;
};

export type RuntimeHUDContextSection = {
  readonly id: string;
  readonly title: string;
  readonly actions: readonly {
    readonly id: string;
    readonly label: string;
    readonly href?: string;
    readonly onSelect?: () => void;
    readonly mode?: RuntimeHUDMode;
    readonly disabled?: boolean;
    readonly evidenceRef?: string;
  }[];
};

export type RuntimeHUDMobileItem = {
  readonly id: "home" | "domains" | "runtime" | "search" | "profile" | RuntimeHUDPanelId;
  readonly label: string;
  readonly href?: string;
  readonly panel?: RuntimeHUDPanelId;
  readonly roleModes?: readonly RuntimeHUDRoleMode[];
};

export type RuntimeHUDSignal = {
  readonly id: string;
  readonly label: string;
  readonly mode: RuntimeHUDMode;
  readonly detail?: string;
  readonly evidenceRef?: string;
};

export type RuntimeHUDNotification = {
  readonly id: string;
  readonly title: string;
  readonly body?: string;
  readonly mode: RuntimeHUDMode;
  readonly occurredAt?: string;
  readonly source?: string;
  readonly evidenceRef?: string;
};

export type RuntimeActionGate = {
  readonly action: RuntimeActionId;
  readonly label?: string;
  readonly allowed: boolean;
  readonly reason?: string;
  readonly missing?: readonly string[];
  readonly evidenceRefs?: readonly string[];
};
