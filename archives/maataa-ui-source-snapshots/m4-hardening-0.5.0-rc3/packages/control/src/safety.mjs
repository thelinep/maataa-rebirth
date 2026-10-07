export function evaluateSafety({interlocks=[],hardwareSafety="ready",lease=null,command}) {
  if(hardwareSafety!=="ready") return {allow:false,reason:"HARDWARE_SAFETY_NOT_READY"};
  if(interlocks.some(i=>i.active)) return {allow:false,reason:"INTERLOCK_ACTIVE"};
  if(!lease || lease.status!=="active") return {allow:false,reason:"CONTROL_LEASE_REQUIRED"};
  if(!lease.expiresAt || !Number.isFinite(Date.parse(lease.expiresAt)) || Date.parse(lease.expiresAt)<=Date.now()) return {allow:false,reason:"CONTROL_LEASE_EXPIRED"};
  if(lease.resourceId!==command.deviceId) return {allow:false,reason:"LEASE_RESOURCE_MISMATCH"};
  return {allow:true,reason:"SAFETY_PRECHECK_CLEAR"};
}
export function controlledStopRequest(deviceId, actorRef, idempotencyKey) {
  return {commandId:`stop:${deviceId}:${idempotencyKey}`,deviceId,capability:"control.stop",payload:{kind:"controlled_stop"},idempotencyKey,actorRef,issuedAt:new Date().toISOString()};
}
