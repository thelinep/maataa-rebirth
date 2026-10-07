/**
 * @maataa/ui/trust
 * Security, authentication, authorization, and compliance component library
 */

// Components
export {
  RoleManagementPanel,
  MFASetupPanel,
  AuditLogViewer,
  ComplianceStatusDashboard,
  PrivacyRequestManager,
  SessionManager,
} from "./components";

// Engines
export { RBACEngine, ABACEngine, ScopeBasedAccessControl } from "./engines/rbac";
export { AdvancedAuthEngine, PasswordlessAuthHandler } from "./engines/auth";
export { AuditSystem, DataRetentionManager } from "./engines/audit";
export { DataGovernanceEngine, DataQualityManager } from "./engines/governance";

// Types
export type {
  AuditEvent,
  AuditReport,
  AnomalyReport,
  Anomaly,
  DataPrivacyRequest,
  DataClassification,
  DataGovernancePolicy,
  DataQualityMetrics,
  DataQualityIssue,
  MFAMethod,
  AuthSession,
  Role,
  Permission,
  AccessControl,
  SecurityEvent,
  ComplianceStatus,
  ComplianceFinding,
  RoleAssignment,
  RoleHierarchy,
  SessionInfo,
  Scope,
  ScopeGrant,
  RetentionPolicy,
  RetentionException,
  DataRetention,
} from "./types";
