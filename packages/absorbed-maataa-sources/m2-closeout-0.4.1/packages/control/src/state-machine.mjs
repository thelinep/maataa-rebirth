const transitions=Object.freeze({
  requested:["validated","denied","cancelled"],
  validated:["authorized","denied","cancelled"],
  authorized:["queued","cancelled"],
  queued:["dispatched","cancelled","timed_out"],
  dispatched:["acknowledged","nack","timed_out","failed"],
  acknowledged:["completed","failed","timed_out"],
  completed:["verified","verification_failed"],
  verified:[], denied:[], nack:[], cancelled:[], timed_out:[], failed:[], verification_failed:[]
});
export const terminalStates=Object.freeze(["verified","denied","nack","cancelled","timed_out","failed","verification_failed"]);
export function createCommand(input){
  if(!input?.commandId||!input?.deviceId||!input?.capability||!input?.idempotencyKey) throw new Error("INVALID_COMMAND");
  return Object.freeze({...input,status:"requested",history:[{state:"requested",at:input.issuedAt ?? new Date().toISOString()}]});
}
export function transition(command,next,at=new Date().toISOString(),meta={}){
  if(!transitions[command.status]?.includes(next)) throw new Error(`INVALID_TRANSITION:${command.status}->${next}`);
  return Object.freeze({...command,status:next,history:[...command.history,{state:next,at,meta}]});
}
export function isTerminal(command){return terminalStates.includes(command.status);}
