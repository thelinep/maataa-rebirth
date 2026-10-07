export const controlComponents=Object.freeze([
  "CommandButton","CommandPreview","CommandStatus","CommandAck","CommandNack","CommandCancel","CommandTimeout","CommandRejection",
  "ControlHandover","AuthorityTransfer","ControlLease","LeaseRenew","LeaseRevoke","InterlockStatus","InterlockOverrideRequest",
  "SafetyResetRequest","EmergencyStopStatus","ControlledStopRequest","HardwareSafetyState","CommandAudit","CommandProvenance",
  "TelemetryValue","DesiredObservedState"
]);
export function controlComponent(name,props={}){if(!controlComponents.includes(name))throw new Error(`UNKNOWN_CONTROL_COMPONENT:${name}`);return Object.freeze({name,props});}

const controlComponentIds = new Set(controlComponents.map(name => `maataa.control.${name.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`));
export function createHeadlessComponent(componentId, props={}) {
  if (!controlComponentIds.has(componentId)) throw new Error(`UNKNOWN_CONTROL_COMPONENT_ID:${componentId}`);
  return Object.freeze({kind:"maataa.headless",componentId,props:Object.freeze({...props})});
}
