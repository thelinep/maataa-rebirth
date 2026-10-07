/**
 * @maataa/ui/trust - Type Definitions
 * Comprehensive type system for security, audit, and governance components
 */

// ============================================================================
// Audit System Types
// ============================================================================

export interface AuditEvent {
  id: string;
  timestamp: Date;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  status: "success" | "failure";
  errorMessage?: string;
  metadata?: Record<string, unknown>;
}

export interface AuditReport {
  id: string;
  startDate: Date;
  endDate: Date;
  eventCount: number;
  events: AuditEvent[];
  summary: {
    successCount: number;
    failureCount: number;
    topActions: Array<{ action: string; count: number }>;
    topResources: Array<{ resource: string; count: number }>;
    topUsers: Array<{ userId: string; count: number }>;
  };
  generatedAt: Date;
  generatedBy: string;
}

export interface AnomalyReport {
  id: string;
  timestamp: Date;
  anomalies: Anomaly[];
  riskLevel: "low" | "medium" | "high" | "critical";
  recommendations: string[];
}

export interface Anomaly {
  id: string;
  type:
    | "unusual_access_pattern"
    | "failed_attempts"
    | "data_exfiltration"
    | "permission_escalation"
    | "unknown";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  detectedAt: Date;
  affectedResource: string;
  affectedUser?: string;
  evidenceCount: number;
}

// ============================================================================
// Data Privacy & Governance Types
// ============================================================================

export interface DataPrivacyRequest {
  id: string;
  requestType:
    "access" | "deletion" | "portability" | "rectification" | "restriction" | "objection";
  userId: string;
  requestedBy: string;
  submittedAt: Date;
  status: "pending" | "in_progress" | "completed" | "denied";
  dataCategories?: string[];
  reason?: string;
  completedAt?: Date;
  result?: {
    dataProvided?: unknown;
    deletionConfirmed?: boolean;
    portabilityFile?: string;
    notes?: string;
  };
}

export interface DataClassification {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  label: "public" | "internal" | "confidential" | "restricted" | "pii" | "pii_sensitive";
  description: string;
  handlingRequirements: string[];
  retentionDays?: number;
  encryptionRequired: boolean;
  accessApprovalRequired: boolean;
}

export interface DataGovernancePolicy {
  id: string;
  name: string;
  classification: DataClassification;
  ownerTeam: string;
  createdAt: Date;
  lastUpdated: Date;
  retentionPolicy?: {
    retentionDays: number;
    archiveAfterDays?: number;
    deleteAfterDays?: number;
  };
  accessControl?: {
    allowedRoles: string[];
    requiresApproval: boolean;
    auditLogging: boolean;
  };
}

export interface DataQualityMetrics {
  timestamp: Date;
  completeness: number; // 0-100
  accuracy: number; // 0-100
  consistency: number; // 0-100
  timeliness: number; // 0-100
  uniqueness: number; // 0-100
  overall: number; // 0-100
  issues: DataQualityIssue[];
}

export interface DataQualityIssue {
  id: string;
  type: "missing_data" | "invalid_format" | "duplicate" | "inconsistency" | "stale_data";
  severity: "low" | "medium" | "high" | "critical";
  affectedRecords: number;
  description: string;
  detectedAt: Date;
  resolved: boolean;
}

// ============================================================================
// Authentication & Authorization Types
// ============================================================================

export interface MFAMethod {
  id: string;
  type: "totp" | "sms" | "email" | "hardware_key" | "backup_code";
  label: string;
  verified: boolean;
  createdAt: Date;
  lastUsed?: Date;
  metadata?: Record<string, unknown>;
}

export interface AuthSession {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  refreshTokenHash?: string;
  mfaVerified: boolean;
  lastActivity: Date;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
  isSystem: boolean;
}

export interface Permission {
  id: string;
  resource: string;
  action: string;
  conditions?: Record<string, unknown>;
  grantedAt: Date;
  grantedBy: string;
}

export interface AccessControl {
  userId: string;
  roles: Role[];
  permissions: Permission[];
  attributes?: Record<string, string | number | boolean>;
  scopes?: string[];
}

// ============================================================================
// Security Event Types
// ============================================================================

export interface SecurityEvent {
  id: string;
  timestamp: Date;
  type:
    | "authentication"
    | "authorization"
    | "data_access"
    | "configuration_change"
    | "security_alert"
    | "compliance_event";
  severity: "info" | "warning" | "error" | "critical";
  userId?: string;
  description: string;
  source: string;
  metadata?: Record<string, unknown>;
}

export interface ComplianceStatus {
  frameworkId: string;
  frameworkName: string;
  lastAuditDate: Date;
  nextAuditDate: Date;
  compliancePercentage: number;
  status: "compliant" | "non_compliant" | "in_progress" | "not_applicable";
  findings: ComplianceFinding[];
}

export interface ComplianceFinding {
  id: string;
  requirement: string;
  status: "open" | "in_remediation" | "closed";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  detectedAt: Date;
  remediationDeadline?: Date;
  remediationNotes?: string;
}

// ============================================================================
// Role Management Types
// ============================================================================

export interface RoleAssignment {
  userId: string;
  roleId: string;
  assignedAt: Date;
  assignedBy: string;
  expiresAt?: Date;
  reason?: string;
}

export interface RoleHierarchy {
  roleId: string;
  parentRoleId?: string;
  childRoles: string[];
  inheritedPermissions: Permission[];
}

// ============================================================================
// Session Management Types
// ============================================================================

export interface SessionInfo {
  id: string;
  userId: string;
  startTime: Date;
  lastActivity: Date;
  ipAddress: string;
  browser: string;
  os: string;
  isCurrentSession: boolean;
  status: "active" | "expired" | "revoked";
}

// ============================================================================
// Scope-Based Access Control Types
// ============================================================================

export interface Scope {
  id: string;
  name: string;
  description: string;
  resources: string[];
  actions: string[];
}

export interface ScopeGrant {
  userId: string;
  scopeId: string;
  grantedAt: Date;
  grantedBy: string;
  expiresAt?: Date;
}

// ============================================================================
// Data Retention Types
// ============================================================================

export interface RetentionPolicy {
  id: string;
  dataType: string;
  retentionDays: number;
  archiveAfterDays?: number;
  deleteAfterDays: number;
  exceptions?: RetentionException[];
  appliedAt: Date;
  lastReviewed: Date;
}

export interface RetentionException {
  id: string;
  userId?: string;
  dataId?: string;
  reason: string;
  expiresAt: Date;
  approvedBy: string;
  approvedAt: Date;
}

export interface DataRetention {
  dataId: string;
  dataType: string;
  createdAt: Date;
  expiresAt: Date;
  archived: boolean;
  archivedAt?: Date;
  deleted: boolean;
  deletedAt?: Date;
}
