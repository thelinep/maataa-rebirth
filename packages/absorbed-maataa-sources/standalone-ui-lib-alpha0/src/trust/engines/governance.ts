/**
 * Data Governance and Quality Management Engines
 */

import type {
  DataClassification,
  DataGovernancePolicy,
  DataQualityMetrics,
  DataQualityIssue,
} from "../types";

/**
 * Data Governance Engine
 * Manages data classification and governance policies
 */
export class DataGovernanceEngine {
  private policies: Map<string, DataGovernancePolicy> = new Map();
  private classifications: Map<number, DataClassification> = new Map();

  constructor() {
    // Initialize standard classification levels
    this.initializeClassifications();
  }

  /**
   * Initialize standard data classification levels
   */
  private initializeClassifications(): void {
    const classifications: DataClassification[] = [
      {
        level: 0,
        label: "public",
        description: "Public information, no restrictions",
        handlingRequirements: ["No special handling"],
        retentionDays: 2555, // 7 years default
        encryptionRequired: false,
        accessApprovalRequired: false,
      },
      {
        level: 1,
        label: "internal",
        description: "Internal use only, not for external distribution",
        handlingRequirements: ["Limit distribution", "Track access"],
        retentionDays: 2555,
        encryptionRequired: false,
        accessApprovalRequired: false,
      },
      {
        level: 2,
        label: "confidential",
        description: "Confidential business information",
        handlingRequirements: ["Encryption at rest", "Limit access", "Audit access"],
        retentionDays: 1825, // 5 years
        encryptionRequired: true,
        accessApprovalRequired: true,
      },
      {
        level: 3,
        label: "restricted",
        description: "Restricted access, high confidentiality",
        handlingRequirements: [
          "Encryption at rest & in transit",
          "MFA required",
          "Detailed audit logging",
        ],
        retentionDays: 1095, // 3 years
        encryptionRequired: true,
        accessApprovalRequired: true,
      },
      {
        level: 4,
        label: "pii",
        description: "Personally Identifiable Information",
        handlingRequirements: [
          "Encryption at rest & in transit",
          "MFA required",
          "PII-specific handling",
          "Audit every access",
        ],
        retentionDays: 365, // 1 year
        encryptionRequired: true,
        accessApprovalRequired: true,
      },
      {
        level: 5,
        label: "pii_sensitive",
        description: "Sensitive PII (SSN, payment info, biometrics)",
        handlingRequirements: [
          "Maximum encryption",
          "MFA required",
          "Tokenization/masking",
          "Real-time audit logging",
          "Access only on-demand",
        ],
        retentionDays: 90, // 90 days
        encryptionRequired: true,
        accessApprovalRequired: true,
      },
    ];

    classifications.forEach((c) => this.classifications.set(c.level, c));
  }

  /**
   * Get classification for level
   */
  getClassification(level: number): DataClassification | undefined {
    return this.classifications.get(level);
  }

  /**
   * Create or update governance policy
   */
  createPolicy(policy: DataGovernancePolicy): void {
    if (!policy.id || !policy.name) {
      throw new Error("Policy must have id and name");
    }
    this.policies.set(policy.id, policy);
  }

  /**
   * Get policy
   */
  getPolicy(policyId: string): DataGovernancePolicy | undefined {
    return this.policies.get(policyId);
  }

  /**
   * Classify data based on characteristics
   */
  classifyData(
    dataType: string,
    containsSensitiveInfo: boolean,
    containsPII: boolean,
    containsPaymentInfo: boolean
  ): DataClassification {
    if (containsPaymentInfo) {
      return this.classifications.get(5)!; // PII Sensitive
    }

    if (containsPII) {
      return this.classifications.get(4)!; // PII
    }

    if (containsSensitiveInfo) {
      return this.classifications.get(3)!; // Restricted
    }

    if (dataType === "internal") {
      return this.classifications.get(1)!; // Internal
    }

    return this.classifications.get(0)!; // Public
  }

  /**
   * List all policies
   */
  listPolicies(): DataGovernancePolicy[] {
    return Array.from(this.policies.values());
  }

  /**
   * Delete policy
   */
  deletePolicy(policyId: string): boolean {
    return this.policies.delete(policyId);
  }
}

/**
 * Data Quality Manager
 * Monitors and reports on data quality metrics
 */
export class DataQualityManager {
  private metrics: DataQualityMetrics[] = [];
  private issues: Map<string, DataQualityIssue> = new Map();

  /**
   * Record data quality metrics
   */
  recordMetrics(
    completeness: number,
    accuracy: number,
    consistency: number,
    timeliness: number,
    uniqueness: number
  ): DataQualityMetrics {
    const overall = (completeness + accuracy + consistency + timeliness + uniqueness) / 5;

    const metrics: DataQualityMetrics = {
      timestamp: new Date(),
      completeness,
      accuracy,
      consistency,
      timeliness,
      uniqueness,
      overall,
      issues: [],
    };

    this.metrics.push(metrics);
    return metrics;
  }

  /**
   * Report data quality issue
   */
  reportIssue(
    type: "missing_data" | "invalid_format" | "duplicate" | "inconsistency" | "stale_data",
    severity: "low" | "medium" | "high" | "critical",
    affectedRecords: number,
    description: string
  ): DataQualityIssue {
    const issue: DataQualityIssue = {
      id: `issue_${Date.now()}`,
      type,
      severity,
      affectedRecords,
      description,
      detectedAt: new Date(),
      resolved: false,
    };

    this.issues.set(issue.id, issue);
    return issue;
  }

  /**
   * Resolve quality issue
   */
  resolveIssue(issueId: string): void {
    const issue = this.issues.get(issueId);
    if (issue) {
      issue.resolved = true;
      this.issues.set(issueId, issue);
    }
  }

  /**
   * Get current metrics
   */
  getCurrentMetrics(): DataQualityMetrics | undefined {
    return this.metrics[this.metrics.length - 1];
  }

  /**
   * Get metrics for time range
   */
  getMetricsForRange(startDate: Date, endDate: Date): DataQualityMetrics[] {
    return this.metrics.filter((m) => m.timestamp >= startDate && m.timestamp <= endDate);
  }

  /**
   * Get unresolved issues
   */
  getUnresolvedIssues(): DataQualityIssue[] {
    return Array.from(this.issues.values()).filter((i) => !i.resolved);
  }

  /**
   * Get quality score trend (simplified)
   */
  getQualityTrend(dayCount: number = 30): number[] {
    const cutoffDate = new Date(Date.now() - dayCount * 24 * 60 * 60 * 1000);
    return this.metrics
      .filter((m) => m.timestamp >= cutoffDate)
      .map((m) => m.overall)
      .sort((a, b) => a - b);
  }

  /**
   * Calculate data quality score
   */
  calculateQualityScore(): { score: number; status: string } {
    const latestMetrics = this.getCurrentMetrics();
    if (!latestMetrics) {
      return { score: 0, status: "No data" };
    }

    const score = Math.round(latestMetrics.overall);
    const status =
      score >= 90
        ? "Excellent"
        : score >= 80
          ? "Good"
          : score >= 70
            ? "Fair"
            : score >= 60
              ? "Poor"
              : "Critical";

    return { score, status };
  }
}
