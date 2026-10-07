// GENERATED. DO NOT EDIT.
export interface Recommendation {
  "id": string;
  "summary": string;
  "rationaleSummary"?: string;
  "confidence"?: number;
  "evidenceIds"?: Array<string>;
  "proposedActionIds"?: Array<string>;
}

export interface PolicyDecision {
  "id": string;
  "outcome": "allow" | "deny" | "allow_with_approval" | "allow_with_constraints";
  "reasonCodes": Array<string>;
  "requiredApprovalIds"?: Array<string>;
}

export interface Approval {
  "id": string;
  "status": "pending" | "approved" | "rejected" | "returned" | "revoked";
  "approverRef"?: string;
  "decidedAt"?: string;
  "comment"?: string;
}

export interface Evidence {
  "id": string;
  "kind": string;
  "uri"?: string;
  "hash"?: string;
  "observedAt"?: string;
  "sourceRef"?: string;
}

export interface AuditEvent {
  "id": string;
  "actorRef": string;
  "action": string;
  "entityRef": string;
  "authorityClass": "advisory" | "proposal" | "approval" | "execution" | "authoritative";
  "occurredAt": string;
  "evidenceIds"?: Array<string>;
}

export interface ControlCommand {
  "commandId": string;
  "deviceId": string;
  "capability": string;
  "payload"?: unknown;
  "status": "requested" | "validated" | "authorized" | "queued" | "dispatched" | "acknowledged" | "completed" | "verified" | "denied" | "nack" | "cancelled" | "timed_out" | "failed" | "verification_failed";
  "idempotencyKey": string;
  "issuedAt": string;
  "expiresAt"?: string;
  "approvalIds"?: Array<string>;
}

export interface ControlReceipt {
  "commandId": string;
  "acknowledged": boolean;
  "verified": boolean;
  "terminalState": "verified" | "denied" | "nack" | "cancelled" | "timed_out" | "failed" | "verification_failed";
  "evidenceIds"?: Array<string>;
  "observedAt"?: string;
}

export interface ControlLease {
  "leaseId": string;
  "resourceId": string;
  "holderRef": string;
  "mode": "exclusive" | "shared" | "observer";
  "status": "active" | "expired" | "revoked" | "released";
  "expiresAt"?: string;
}

export interface TelemetrySample {
  "deviceId": string;
  "metric": string;
  "value": unknown;
  "unit"?: string;
  "observedAt": string;
  "quality": "good" | "uncertain" | "bad" | "stale";
  "sourceRef"?: string;
}

export interface DigitalTwin {
  "twinId": string;
  "physicalEntityRef": string;
  "kind": string;
  "observedState": Record<string, unknown>;
  "desiredState"?: Record<string, unknown>;
  "capabilities": Array<string>;
  "constraints"?: Array<string>;
  "updatedAt": string;
}

export interface Device {
  "deviceId": string;
  "kind": string;
  "manufacturer"?: string;
  "model"?: string;
  "trustState": "trusted" | "untrusted" | "revoked" | "unknown";
  "connectionState": "online" | "degraded" | "offline" | "unknown";
  "capabilities": Array<string>;
}

export interface AdapterDescriptor {
  "adapterId": string;
  "version": string;
  "protocol": string;
  "capabilities": Array<string>;
  "discovery"?: boolean;
  "command"?: boolean;
  "telemetry"?: boolean;
}

export interface AutomationRule {
  "ruleId": string;
  "enabled": boolean;
  "trigger": string;
  "condition"?: string;
  "actionType": string;
  "requiresApproval": boolean;
}

export interface SpatialState {
  "entityRef": string;
  "coordinateSystem": string;
  "x": number;
  "y": number;
  "z"?: number;
  "confidence": "verified" | "measured" | "estimated" | "unknown";
  "observedAt"?: string;
}

export interface Mission {
  "missionId": string;
  "resourceId": string;
  "status": "draft" | "validated" | "authorized" | "running" | "paused" | "completed" | "failed" | "cancelled";
  "waypointIds": Array<string>;
  "requiresApproval"?: boolean;
}

export interface Theme {
  "themeId": string;
  "version": string;
  "tokens": Record<string, unknown>;
  "highContrast"?: boolean;
}

export interface Workspace {
  "workspaceId": string;
  "organizationId": string;
  "name": string;
  "policyRefs"?: Array<string>;
}

export interface RegistryEntry {
  "componentId": string;
  "version": string;
  "package": string;
  "category": string;
  "authorityClass": "advisory" | "proposal" | "approval" | "execution" | "authoritative";
  "states": Array<string>;
  "schemaRef"?: string;
  "headless": boolean;
  "renderAdapter"?: string;
}

export interface CameraState {
  "deviceId": string;
  "streamState": "streaming" | "stopped" | "degraded" | "offline";
  "pan": number;
  "tilt": number;
  "zoom": number;
  "preset"?: string;
  "tracking": boolean;
  "observedAt": string;
}

export interface Incident {
  "incidentId": string;
  "severity": "info" | "warning" | "critical";
  "status": "open" | "acknowledged" | "resolved";
  "entityRef": string;
  "summary": string;
  "openedAt": string;
}

export interface DomainRecord {
  "id": string;
  "domain": "event" | "commerce" | "creator" | "production" | "finance" | "knowledge" | "robotics" | "iot" | "building" | "industrial" | "mobility" | "energy" | "show-control";
  "kind": string;
  "status": string;
  "refs"?: Array<string>;
}

