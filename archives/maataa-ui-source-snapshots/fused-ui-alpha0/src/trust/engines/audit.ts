/**
 * Audit System and Data Retention Manager
 * Tracks all system events and manages data lifecycle
 */

import type {
  AuditEvent,
  AuditReport,
  AnomalyReport,
  Anomaly,
  DataRetention,
  RetentionPolicy,
  RetentionException,
} from "../types";

/**
 * Audit System
 * Logs all events and detects anomalies
 */
export class AuditSystem {
  private events: AuditEvent[] = [];
  private anomalyThresholds: Map<string, number> = new Map();

  /**
   * Log an audit event
   */
  logEvent(event: Omit<AuditEvent, "id">): AuditEvent {
    const auditEvent: AuditEvent = {
      ...event,
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    this.events.push(auditEvent);
    return auditEvent;
  }

  /**
   * Query events with filters
   */
  queryEvents(
    filters: {
      userId?: string;
      action?: string;
      resource?: string;
      startDate?: Date;
      endDate?: Date;
      status?: "success" | "failure";
    },
    limit: number = 100
  ): AuditEvent[] {
    let results = this.events;

    if (filters.userId) {
      results = results.filter((e) => e.userId === filters.userId);
    }
    if (filters.action) {
      results = results.filter((e) => e.action === filters.action);
    }
    if (filters.resource) {
      results = results.filter((e) => e.resource === filters.resource);
    }
    if (filters.startDate) {
      results = results.filter((e) => e.timestamp >= filters.startDate!);
    }
    if (filters.endDate) {
      results = results.filter((e) => e.timestamp <= filters.endDate!);
    }
    if (filters.status) {
      results = results.filter((e) => e.status === filters.status);
    }

    return results.slice(-limit);
  }

  /**
   * Generate audit report for date range
   */
  generateReport(startDate: Date, endDate: Date): AuditReport {
    const events = this.queryEvents({ startDate, endDate });

    const successCount = events.filter((e) => e.status === "success").length;
    const failureCount = events.filter((e) => e.status === "failure").length;

    // Calculate top actions
    const actionCounts = new Map<string, number>();
    events.forEach((e) => {
      actionCounts.set(e.action, (actionCounts.get(e.action) || 0) + 1);
    });

    // Calculate top resources
    const resourceCounts = new Map<string, number>();
    events.forEach((e) => {
      resourceCounts.set(e.resource, (resourceCounts.get(e.resource) || 0) + 1);
    });

    // Calculate top users
    const userCounts = new Map<string, number>();
    events.forEach((e) => {
      userCounts.set(e.userId, (userCounts.get(e.userId) || 0) + 1);
    });

    return {
      id: `audit_${Date.now()}`,
      startDate,
      endDate,
      eventCount: events.length,
      events,
      summary: {
        successCount,
        failureCount,
        topActions: Array.from(actionCounts.entries())
          .map(([action, count]) => ({ action, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
        topResources: Array.from(resourceCounts.entries())
          .map(([resource, count]) => ({ resource, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
        topUsers: Array.from(userCounts.entries())
          .map(([userId, count]) => ({ userId, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
      },
      generatedAt: new Date(),
      generatedBy: "system",
    };
  }

  /**
   * Detect anomalies in audit events
   */
  detectAnomalies(timeWindowMinutes: number = 60): AnomalyReport {
    const cutoffTime = new Date(Date.now() - timeWindowMinutes * 60 * 1000);
    const recentEvents = this.events.filter((e) => e.timestamp >= cutoffTime);

    const anomalies: Anomaly[] = [];

    // Detect failed authentication attempts
    const failedAuths = recentEvents.filter(
      (e) => e.action === "authenticate" && e.status === "failure"
    );
    if (failedAuths.length > 5) {
      anomalies.push({
        id: `anom_${Date.now()}`,
        type: "failed_attempts",
        severity: failedAuths.length > 10 ? "high" : "medium",
        description: `${failedAuths.length} failed authentication attempts in last ${timeWindowMinutes} minutes`,
        detectedAt: new Date(),
        affectedResource: "authentication",
        evidenceCount: failedAuths.length,
      });
    }

    // Detect unusual access patterns (TODO: implement statistical analysis)

    const riskLevel =
      anomalies.length === 0
        ? "low"
        : anomalies.some((a) => a.severity === "high")
          ? "high"
          : "medium";

    return {
      id: `report_${Date.now()}`,
      timestamp: new Date(),
      anomalies,
      riskLevel,
      recommendations: anomalies.map((a) => `Review ${a.type}: ${a.description}`),
    };
  }
}

/**
 * Data Retention Manager
 * Manages data lifecycle, archival, and deletion
 */
export class DataRetentionManager {
  private retentionPolicies: Map<string, RetentionPolicy> = new Map();
  private dataRetentionRecords: Map<string, DataRetention> = new Map();
  private retentionPolicyIds: Map<string, string> = new Map();
  private exceptions: RetentionException[] = [];

  /**
   * Create or update retention policy
   */
  setRetentionPolicy(policy: RetentionPolicy): void {
    if (!policy.id) {
      throw new Error("Policy must have an id");
    }
    this.retentionPolicies.set(policy.id, policy);
  }

  /**
   * Track data for retention
   */
  trackData(dataId: string, dataType: string, policyId: string): DataRetention | null {
    const policy = this.retentionPolicies.get(policyId);
    if (!policy) {
      return null;
    }

    const retention: DataRetention = {
      dataId,
      dataType,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + policy.deleteAfterDays * 24 * 60 * 60 * 1000),
      archived: false,
      deleted: false,
    };

    this.dataRetentionRecords.set(dataId, retention);
    this.retentionPolicyIds.set(dataId, policyId);
    return retention;
  }

  /**
   * Archive data
   */
  archiveData(dataId: string): void {
    const retention = this.dataRetentionRecords.get(dataId);
    if (retention) {
      retention.archived = true;
      retention.archivedAt = new Date();
      this.dataRetentionRecords.set(dataId, retention);
    }
  }

  /**
   * Delete data
   */
  deleteData(dataId: string): void {
    const retention = this.dataRetentionRecords.get(dataId);
    if (retention) {
      retention.deleted = true;
      retention.deletedAt = new Date();
      this.dataRetentionRecords.set(dataId, retention);
    }
  }

  /**
   * Check if data should be archived or deleted
   */
  checkRetentionStatus(): { toArchive: string[]; toDelete: string[] } {
    const now = new Date();
    const toArchive: string[] = [];
    const toDelete: string[] = [];

    this.dataRetentionRecords.forEach((retention, dataId) => {
      if (retention.deleted) return;

      if (this.hasException(dataId)) return;

      const policyId = this.retentionPolicyIds.get(dataId);
      if (!policyId) return;
      const policy = this.retentionPolicies.get(policyId);
      if (!policy) return;

      // Check if should be archived
      if (
        !retention.archived &&
        policy.archiveAfterDays &&
        now.getTime() - retention.createdAt.getTime() >
          policy.archiveAfterDays * 24 * 60 * 60 * 1000
      ) {
        toArchive.push(dataId);
      }

      // Check if should be deleted
      if (!retention.deleted && now > retention.expiresAt) {
        toDelete.push(dataId);
      }
    });

    return { toArchive, toDelete };
  }

  /**
   * Create retention exception
   */
  createException(
    reason: string,
    expiresAt: Date,
    approvedBy: string,
    dataId?: string
  ): RetentionException {
    const exception: RetentionException = {
      id: `exc_${Date.now()}`,
      dataId,
      reason,
      expiresAt,
      approvedBy,
      approvedAt: new Date(),
    };

    this.exceptions.push(exception);
    return exception;
  }

  /**
   * Check if data has active exception
   */
  hasException(dataId: string): boolean {
    const now = new Date();
    return this.exceptions.some((e) => e.dataId === dataId && e.expiresAt > now);
  }
}
