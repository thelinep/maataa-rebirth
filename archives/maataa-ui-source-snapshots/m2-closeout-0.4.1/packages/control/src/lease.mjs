export function acquireLease({leaseId,resourceId,holderRef,ttlMs=300000,now=Date.now()}) {
  return Object.freeze({leaseId,resourceId,holderRef,mode:"exclusive",status:"active",expiresAt:new Date(now+ttlMs).toISOString()});
}
export function renewLease(lease,ttlMs=300000,now=Date.now()) {
  if(lease.status!=="active") throw new Error("LEASE_NOT_ACTIVE");
  return Object.freeze({...lease,expiresAt:new Date(now+ttlMs).toISOString()});
}
export function revokeLease(lease){return Object.freeze({...lease,status:"revoked"});}
export function releaseLease(lease){return Object.freeze({...lease,status:"released"});}
