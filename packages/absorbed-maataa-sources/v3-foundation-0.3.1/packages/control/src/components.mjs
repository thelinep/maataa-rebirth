export const controlComponents=Object.freeze([
  "CommandButton","CommandPreview","CommandStatus","CommandAck","CommandNack","CommandCancel","CommandTimeout","CommandRejection",
  "ControlHandover","AuthorityTransfer","ControlLease","LeaseRenew","LeaseRevoke","InterlockStatus","InterlockOverrideRequest",
  "SafetyResetRequest","EmergencyStopStatus","ControlledStopRequest","HardwareSafetyState","CommandAudit","CommandProvenance",
  "TelemetryValue","DesiredObservedState"
]);
export function controlComponent(name,props={}){if(!controlComponents.includes(name))throw new Error(`UNKNOWN_CONTROL_COMPONENT:${name}`);return Object.freeze({name,props});}
