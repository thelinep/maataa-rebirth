import { canDispatch } from "@maataa/governance";
import { evaluateSafety } from "./safety.mjs";
import { createCommand, transition } from "./state-machine.mjs";
export async function executeGovernedCommand({input,policyDecision,approvals,lease,interlocks=[],hardwareSafety="ready",adapter,verify}) {
  let command=createCommand(input);
  command=transition(command,"validated");
  if(!canDispatch({policyDecision,approvals})) return {command:transition(command,"denied",undefined,{reason:"POLICY_OR_APPROVAL"}),receipt:null};
  const safety=evaluateSafety({interlocks,hardwareSafety,lease,command});
  if(!safety.allow) return {command:transition(command,"denied",undefined,{reason:safety.reason}),receipt:null};
  command=transition(command,"authorized"); command=transition(command,"queued"); command=transition(command,"dispatched");
  const ack=await adapter.dispatch(command);
  if(!ack.ack) return {command:transition(command,"nack",undefined,{reason:ack.reason}),receipt:{commandId:command.commandId,acknowledged:false,verified:false,terminalState:"nack",evidenceIds:[]}};
  command=transition(command,"acknowledged"); command=transition(command,"completed");
  const observed=await adapter.readState();
  const verified=Boolean(await verify({command,observedState:observed}));
  command=transition(command,verified?"verified":"verification_failed");
  return {command,observedState:observed,receipt:{commandId:command.commandId,acknowledged:true,verified,terminalState:command.status,evidenceIds:[`evidence:${command.commandId}`],observedAt:new Date().toISOString()}};
}
