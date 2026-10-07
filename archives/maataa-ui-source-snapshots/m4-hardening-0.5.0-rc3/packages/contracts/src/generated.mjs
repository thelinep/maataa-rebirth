// GENERATED. DO NOT EDIT.
export const schemas = Object.freeze({
  "Recommendation": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/recommendation.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "Recommendation",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "id": {
        "type": "string",
        "description": "Stable recommendation ID"
      },
      "summary": {
        "type": "string",
        "description": "User-facing summary"
      },
      "rationaleSummary": {
        "type": "string",
        "description": "Auditable rationale summary"
      },
      "confidence": {
        "type": "number",
        "description": "0..1 confidence"
      },
      "evidenceIds": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Evidence ID"
        }
      },
      "proposedActionIds": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Action ID"
        }
      }
    },
    "required": [
      "id",
      "summary"
    ]
  },
  "PolicyDecision": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/policy-decision.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "PolicyDecision",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "id": {
        "type": "string",
        "description": "Decision ID"
      },
      "outcome": {
        "type": "string",
        "enum": [
          "allow",
          "deny",
          "allow_with_approval",
          "allow_with_constraints"
        ]
      },
      "reasonCodes": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Stable reason code"
        }
      },
      "requiredApprovalIds": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Approval ID"
        }
      }
    },
    "required": [
      "id",
      "outcome",
      "reasonCodes"
    ]
  },
  "Approval": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/approval.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "Approval",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "id": {
        "type": "string",
        "description": "Approval ID"
      },
      "status": {
        "type": "string",
        "enum": [
          "pending",
          "approved",
          "rejected",
          "returned",
          "revoked"
        ]
      },
      "approverRef": {
        "type": "string",
        "description": "Approver reference"
      },
      "decidedAt": {
        "type": "string",
        "description": "ISO time"
      },
      "comment": {
        "type": "string",
        "description": "Decision comment"
      }
    },
    "required": [
      "id",
      "status"
    ]
  },
  "Evidence": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/evidence.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "Evidence",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "id": {
        "type": "string",
        "description": "Evidence ID"
      },
      "kind": {
        "type": "string",
        "description": "Evidence kind"
      },
      "uri": {
        "type": "string",
        "description": "Optional URI"
      },
      "hash": {
        "type": "string",
        "description": "Content hash"
      },
      "observedAt": {
        "type": "string",
        "description": "Observation time"
      },
      "sourceRef": {
        "type": "string",
        "description": "Source reference"
      }
    },
    "required": [
      "id",
      "kind"
    ]
  },
  "AuditEvent": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/audit-event.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "AuditEvent",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "id": {
        "type": "string",
        "description": "Audit ID"
      },
      "actorRef": {
        "type": "string",
        "description": "Actor"
      },
      "action": {
        "type": "string",
        "description": "Action"
      },
      "entityRef": {
        "type": "string",
        "description": "Entity"
      },
      "authorityClass": {
        "type": "string",
        "enum": [
          "advisory",
          "proposal",
          "approval",
          "execution",
          "authoritative"
        ]
      },
      "occurredAt": {
        "type": "string",
        "description": "ISO time"
      },
      "evidenceIds": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Evidence ID"
        }
      }
    },
    "required": [
      "id",
      "actorRef",
      "action",
      "entityRef",
      "authorityClass",
      "occurredAt"
    ]
  },
  "ControlCommand": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/control-command.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "ControlCommand",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "commandId": {
        "type": "string",
        "description": "Command ID"
      },
      "deviceId": {
        "type": "string",
        "description": "Target device"
      },
      "capability": {
        "type": "string",
        "description": "Bounded capability"
      },
      "payload": {},
      "status": {
        "type": "string",
        "enum": [
          "requested",
          "validated",
          "authorized",
          "queued",
          "dispatched",
          "acknowledged",
          "completed",
          "verified",
          "denied",
          "nack",
          "cancelled",
          "timed_out",
          "failed",
          "verification_failed"
        ]
      },
      "idempotencyKey": {
        "type": "string",
        "description": "Replay protection key"
      },
      "issuedAt": {
        "type": "string",
        "description": "ISO time"
      },
      "expiresAt": {
        "type": "string",
        "description": "ISO time"
      },
      "approvalIds": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Approval ID"
        }
      }
    },
    "required": [
      "commandId",
      "deviceId",
      "capability",
      "status",
      "idempotencyKey",
      "issuedAt"
    ]
  },
  "ControlReceipt": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/control-receipt.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "ControlReceipt",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "commandId": {
        "type": "string",
        "description": "Command ID"
      },
      "acknowledged": {
        "type": "boolean",
        "description": "Device/gateway acknowledgement"
      },
      "verified": {
        "type": "boolean",
        "description": "Observed-state verification"
      },
      "terminalState": {
        "type": "string",
        "enum": [
          "verified",
          "denied",
          "nack",
          "cancelled",
          "timed_out",
          "failed",
          "verification_failed"
        ]
      },
      "evidenceIds": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Evidence ID"
        }
      },
      "observedAt": {
        "type": "string",
        "description": "ISO time"
      }
    },
    "required": [
      "commandId",
      "acknowledged",
      "verified",
      "terminalState"
    ]
  },
  "ControlLease": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/control-lease.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "ControlLease",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "leaseId": {
        "type": "string",
        "description": "Lease ID"
      },
      "resourceId": {
        "type": "string",
        "description": "Controlled resource"
      },
      "holderRef": {
        "type": "string",
        "description": "Controller"
      },
      "mode": {
        "type": "string",
        "enum": [
          "exclusive",
          "shared",
          "observer"
        ]
      },
      "status": {
        "type": "string",
        "enum": [
          "active",
          "expired",
          "revoked",
          "released"
        ]
      },
      "expiresAt": {
        "type": "string",
        "description": "ISO time"
      }
    },
    "required": [
      "leaseId",
      "resourceId",
      "holderRef",
      "mode",
      "status"
    ]
  },
  "TelemetrySample": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/telemetry-sample.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "TelemetrySample",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "deviceId": {
        "type": "string",
        "description": "Device ID"
      },
      "metric": {
        "type": "string",
        "description": "Metric name"
      },
      "value": {},
      "unit": {
        "type": "string",
        "description": "Canonical unit"
      },
      "observedAt": {
        "type": "string",
        "description": "ISO time"
      },
      "quality": {
        "type": "string",
        "enum": [
          "good",
          "uncertain",
          "bad",
          "stale"
        ]
      },
      "sourceRef": {
        "type": "string",
        "description": "Source"
      }
    },
    "required": [
      "deviceId",
      "metric",
      "value",
      "observedAt",
      "quality"
    ]
  },
  "DigitalTwin": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/digital-twin.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "DigitalTwin",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "twinId": {
        "type": "string",
        "description": "Twin ID"
      },
      "physicalEntityRef": {
        "type": "string",
        "description": "Physical entity"
      },
      "kind": {
        "type": "string",
        "description": "Twin kind"
      },
      "observedState": {
        "type": "object"
      },
      "desiredState": {
        "type": "object"
      },
      "capabilities": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Capability"
        }
      },
      "constraints": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Constraint"
        }
      },
      "updatedAt": {
        "type": "string",
        "description": "ISO time"
      }
    },
    "required": [
      "twinId",
      "physicalEntityRef",
      "kind",
      "observedState",
      "capabilities",
      "updatedAt"
    ]
  },
  "Device": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/device.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "Device",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "deviceId": {
        "type": "string",
        "description": "Device ID"
      },
      "kind": {
        "type": "string",
        "description": "Device kind"
      },
      "manufacturer": {
        "type": "string",
        "description": "Manufacturer"
      },
      "model": {
        "type": "string",
        "description": "Model"
      },
      "trustState": {
        "type": "string",
        "enum": [
          "trusted",
          "untrusted",
          "revoked",
          "unknown"
        ]
      },
      "connectionState": {
        "type": "string",
        "enum": [
          "online",
          "degraded",
          "offline",
          "unknown"
        ]
      },
      "capabilities": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Capability"
        }
      }
    },
    "required": [
      "deviceId",
      "kind",
      "trustState",
      "connectionState",
      "capabilities"
    ]
  },
  "AdapterDescriptor": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/adapter.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "AdapterDescriptor",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "adapterId": {
        "type": "string",
        "description": "Adapter ID"
      },
      "version": {
        "type": "string",
        "description": "Adapter version"
      },
      "protocol": {
        "type": "string",
        "description": "Protocol"
      },
      "capabilities": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Capability"
        }
      },
      "discovery": {
        "type": "boolean",
        "description": "Discovery support"
      },
      "command": {
        "type": "boolean",
        "description": "Command support"
      },
      "telemetry": {
        "type": "boolean",
        "description": "Telemetry support"
      }
    },
    "required": [
      "adapterId",
      "version",
      "protocol",
      "capabilities"
    ]
  },
  "AutomationRule": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/automation-rule.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "AutomationRule",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "ruleId": {
        "type": "string",
        "description": "Rule ID"
      },
      "enabled": {
        "type": "boolean",
        "description": "Enabled"
      },
      "trigger": {
        "type": "string",
        "description": "Deterministic trigger"
      },
      "condition": {
        "type": "string",
        "description": "Deterministic condition"
      },
      "actionType": {
        "type": "string",
        "description": "Bounded action"
      },
      "requiresApproval": {
        "type": "boolean",
        "description": "Approval requirement"
      }
    },
    "required": [
      "ruleId",
      "enabled",
      "trigger",
      "actionType",
      "requiresApproval"
    ]
  },
  "SpatialState": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/spatial-state.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "SpatialState",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "entityRef": {
        "type": "string",
        "description": "Entity"
      },
      "coordinateSystem": {
        "type": "string",
        "description": "Coordinate system"
      },
      "x": {
        "type": "number",
        "description": "X"
      },
      "y": {
        "type": "number",
        "description": "Y"
      },
      "z": {
        "type": "number",
        "description": "Z"
      },
      "confidence": {
        "type": "string",
        "enum": [
          "verified",
          "measured",
          "estimated",
          "unknown"
        ]
      },
      "observedAt": {
        "type": "string",
        "description": "ISO time"
      }
    },
    "required": [
      "entityRef",
      "coordinateSystem",
      "x",
      "y",
      "confidence"
    ]
  },
  "Mission": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/mission.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "Mission",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "missionId": {
        "type": "string",
        "description": "Mission ID"
      },
      "resourceId": {
        "type": "string",
        "description": "Robot/vehicle"
      },
      "status": {
        "type": "string",
        "enum": [
          "draft",
          "validated",
          "authorized",
          "running",
          "paused",
          "completed",
          "failed",
          "cancelled"
        ]
      },
      "waypointIds": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Waypoint"
        }
      },
      "requiresApproval": {
        "type": "boolean",
        "description": "Approval"
      }
    },
    "required": [
      "missionId",
      "resourceId",
      "status",
      "waypointIds"
    ]
  },
  "Theme": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/theme.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "Theme",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "themeId": {
        "type": "string",
        "description": "Theme ID"
      },
      "version": {
        "type": "string",
        "description": "Theme version"
      },
      "tokens": {
        "type": "object"
      },
      "highContrast": {
        "type": "boolean",
        "description": "High contrast support"
      }
    },
    "required": [
      "themeId",
      "version",
      "tokens"
    ]
  },
  "Workspace": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/workspace.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "Workspace",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "workspaceId": {
        "type": "string",
        "description": "Workspace ID"
      },
      "organizationId": {
        "type": "string",
        "description": "Organization ID"
      },
      "name": {
        "type": "string",
        "description": "Name"
      },
      "policyRefs": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Policy ref"
        }
      }
    },
    "required": [
      "workspaceId",
      "organizationId",
      "name"
    ]
  },
  "RegistryEntry": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/registry-entry.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "RegistryEntry",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "componentId": {
        "type": "string",
        "description": "Stable component ID"
      },
      "version": {
        "type": "string",
        "description": "Semantic version"
      },
      "package": {
        "type": "string",
        "description": "Owning package"
      },
      "category": {
        "type": "string",
        "description": "Category"
      },
      "authorityClass": {
        "type": "string",
        "enum": [
          "advisory",
          "proposal",
          "approval",
          "execution",
          "authoritative"
        ]
      },
      "states": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "State"
        }
      },
      "schemaRef": {
        "type": "string",
        "description": "Optional schema ref"
      },
      "headless": {
        "type": "boolean",
        "description": "Explicitly headless registry entry"
      },
      "renderAdapter": {
        "type": "string",
        "description": "Optional render adapter identifier"
      }
    },
    "required": [
      "componentId",
      "version",
      "package",
      "category",
      "authorityClass",
      "states",
      "headless"
    ]
  },
  "CameraState": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/camera-state.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "CameraState",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "deviceId": {
        "type": "string",
        "description": "Camera"
      },
      "streamState": {
        "type": "string",
        "enum": [
          "streaming",
          "stopped",
          "degraded",
          "offline"
        ]
      },
      "pan": {
        "type": "number",
        "description": "Degrees"
      },
      "tilt": {
        "type": "number",
        "description": "Degrees"
      },
      "zoom": {
        "type": "number",
        "description": "Zoom factor"
      },
      "preset": {
        "type": "string",
        "description": "Preset"
      },
      "tracking": {
        "type": "boolean",
        "description": "Tracking state"
      },
      "observedAt": {
        "type": "string",
        "description": "ISO time"
      }
    },
    "required": [
      "deviceId",
      "streamState",
      "pan",
      "tilt",
      "zoom",
      "tracking",
      "observedAt"
    ]
  },
  "Incident": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/incident.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "Incident",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "incidentId": {
        "type": "string",
        "description": "Incident ID"
      },
      "severity": {
        "type": "string",
        "enum": [
          "info",
          "warning",
          "critical"
        ]
      },
      "status": {
        "type": "string",
        "enum": [
          "open",
          "acknowledged",
          "resolved"
        ]
      },
      "entityRef": {
        "type": "string",
        "description": "Affected entity"
      },
      "summary": {
        "type": "string",
        "description": "Summary"
      },
      "openedAt": {
        "type": "string",
        "description": "ISO time"
      }
    },
    "required": [
      "incidentId",
      "severity",
      "status",
      "entityRef",
      "summary",
      "openedAt"
    ]
  },
  "DomainRecord": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://schemas.maataa.ui/v1/domain-record.schema.json",
    "x-maataa-contract-version": "1.0.0",
    "title": "DomainRecord",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "id": {
        "type": "string",
        "description": "Record ID"
      },
      "domain": {
        "type": "string",
        "enum": [
          "event",
          "commerce",
          "creator",
          "production",
          "finance",
          "knowledge",
          "robotics",
          "iot",
          "building",
          "industrial",
          "mobility",
          "energy",
          "show-control"
        ]
      },
      "kind": {
        "type": "string",
        "description": "Record kind"
      },
      "status": {
        "type": "string",
        "description": "Domain status"
      },
      "refs": {
        "type": "array",
        "items": {
          "type": "string",
          "description": "Related ID"
        }
      }
    },
    "required": [
      "id",
      "domain",
      "kind",
      "status"
    ]
  }
});

function typeOk(schema,value){if(schema.enum)return schema.enum.includes(value);if(!schema.type)return true;if(schema.type==="string")return typeof value==="string";if(schema.type==="number"||schema.type==="integer")return typeof value==="number"&&Number.isFinite(value);if(schema.type==="boolean")return typeof value==="boolean";if(schema.type==="array")return Array.isArray(value)&&value.every(v=>typeOk(schema.items||{},v));if(schema.type==="object")return value!==null&&typeof value==="object"&&!Array.isArray(value);return true;}
export function validateContract(name,value){const s=schemas[name];if(!s)return {ok:false,errors:["UNKNOWN_CONTRACT"]};if(value===null||typeof value!=="object"||Array.isArray(value))return {ok:false,errors:["OBJECT_REQUIRED"]};const errors=[];for(const k of s.required||[])if(!(k in value))errors.push(`REQUIRED:${k}`);for(const [k,ps] of Object.entries(s.properties||{}))if(k in value&&!typeOk(ps,value[k]))errors.push(`TYPE:${k}`);if(s.additionalProperties===false)for(const k of Object.keys(value))if(!(k in (s.properties||{})))errors.push(`ADDITIONAL:${k}`);return {ok:errors.length===0,errors};}
export function assertContract(name,value){const r=validateContract(name,value);if(!r.ok)throw new Error(`CONTRACT_INVALID:${name}:${r.errors.join(",")}`);return value;}
