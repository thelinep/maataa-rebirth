/**
 * @maataa/ui/trust/components
 * Security, authentication, and compliance UI components
 */

import React from "react";

// =============================================================================
// Component Props Types
// =============================================================================

export interface RoleManagementPanelProps {
  userId: string;
  currentRoles: string[];
  onRolesChange?: (roles: string[]) => void;
}

export interface MFASetupPanelProps {
  userId: string;
  onComplete?: () => void;
}

export interface AuditLogViewerProps {
  events: Array<{ id: string; timestamp: Date; action: string; status: string }>;
  isLoading?: boolean;
  error?: string;
}

export interface ComplianceStatusDashboardProps {
  frameworks?: string[];
  compact?: boolean;
}

export interface PrivacyRequestManagerProps {
  userId: string;
  onRequestSubmit?: (type: string) => void;
}

export interface SessionManagerProps {
  sessions: Array<{ id: string; createdAt: Date; browser: string }>;
  onRevoke?: (sessionId: string) => void;
}

// =============================================================================
// Components
// =============================================================================

/**
 * RoleManagementPanel
 * Manage user roles and permissions
 */
export const RoleManagementPanel: React.FC<RoleManagementPanelProps> = ({
  userId,
  currentRoles,
  onRolesChange,
}) => {
  return (
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Role Management</h3>
      <p>User: {userId}</p>
      <div>
        <strong>Current Roles:</strong>
        <ul>
          {currentRoles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      </div>
      <p style={{ fontSize: "12px", color: "#999" }}>TODO: Implement role assignment UI</p>
    </div>
  );
};

/**
 * MFASetupPanel
 * Configure multi-factor authentication
 */
export const MFASetupPanel: React.FC<MFASetupPanelProps> = ({ userId, onComplete }) => {
  return (
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>MFA Setup</h3>
      <p>User: {userId}</p>
      <p>Select authentication method:</p>
      <ul>
        <li>TOTP (Google Authenticator)</li>
        <li>SMS</li>
        <li>Email</li>
        <li>Hardware Key</li>
      </ul>
      <p style={{ fontSize: "12px", color: "#999" }}>TODO: Implement MFA setup flow</p>
    </div>
  );
};

/**
 * AuditLogViewer
 * Display and filter audit events
 */
export const AuditLogViewer: React.FC<AuditLogViewerProps> = ({ events, isLoading, error }) => {
  if (isLoading) {
    return <div style={{ padding: "16px" }}>Loading events...</div>;
  }

  if (error) {
    return (
      <div
        style={{
          padding: "16px",
          backgroundColor: "#fee",
          border: "1px solid #f99",
          borderRadius: "4px",
        }}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Audit Log</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: "8px", textAlign: "left" }}>Timestamp</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Action</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {events.slice(0, 10).map((event) => (
            <tr key={event.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px" }}>{event.timestamp.toLocaleString()}</td>
              <td style={{ padding: "8px" }}>{event.action}</td>
              <td
                style={{
                  padding: "8px",
                  color: event.status === "success" ? "#0a0" : "#f00",
                }}
              >
                {event.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>
        Showing 10 of {events.length} events
      </p>
    </div>
  );
};

/**
 * ComplianceStatusDashboard
 * Display compliance status across frameworks
 */
export const ComplianceStatusDashboard: React.FC<ComplianceStatusDashboardProps> = ({
  frameworks = ["GDPR", "HIPAA", "SOC2"],
  compact,
}) => {
  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h3>Compliance Status</h3>
      {frameworks.map((framework) => (
        <div
          key={framework}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "8px",
            marginBottom: "8px",
            borderBottom: "1px solid #eee",
          }}
        >
          <span>{framework}</span>
          <div
            style={{
              width: "60px",
              height: "6px",
              backgroundColor: "#ddd",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "85%",
                height: "100%",
                backgroundColor: "#0a0",
              }}
            />
          </div>
          <span style={{ fontSize: "12px", minWidth: "40px", textAlign: "right" }}>85%</span>
        </div>
      ))}
      <p style={{ fontSize: "12px", color: "#999" }}>TODO: Connect to real compliance data</p>
    </div>
  );
};

/**
 * PrivacyRequestManager
 * Handle GDPR and privacy requests
 */
export const PrivacyRequestManager: React.FC<PrivacyRequestManagerProps> = ({
  userId,
  onRequestSubmit,
}) => {
  return (
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Privacy Requests</h3>
      <p>User: {userId}</p>
      <p>Request types:</p>
      <ul>
        <li>
          <button onClick={() => onRequestSubmit?.("access")}>Access</button>
        </li>
        <li>
          <button onClick={() => onRequestSubmit?.("delete")}>Deletion</button>
        </li>
        <li>
          <button onClick={() => onRequestSubmit?.("portability")}>Portability</button>
        </li>
      </ul>
      <p style={{ fontSize: "12px", color: "#999" }}>TODO: Implement privacy request workflow</p>
    </div>
  );
};

/**
 * SessionManager
 * Manage user sessions and active logins
 */
export const SessionManager: React.FC<SessionManagerProps> = ({ sessions, onRevoke }) => {
  return (
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Active Sessions</h3>
      {sessions.length === 0 ? (
        <p>No active sessions</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "8px", textAlign: "left" }}>Started</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Browser</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{session.createdAt.toLocaleString()}</td>
                <td style={{ padding: "8px" }}>{session.browser}</td>
                <td style={{ padding: "8px" }}>
                  <button
                    onClick={() => onRevoke?.(session.id)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#f99",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
