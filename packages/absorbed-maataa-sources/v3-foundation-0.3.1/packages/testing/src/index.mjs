import { createCameraSimulatorAdapter } from "@maataa/adapter-sdk";
export function approvedPolicy(approvalId="approval:1"){return {id:"policy:1",outcome:"allow_with_approval",reasonCodes:["HUMAN_APPROVAL"],requiredApprovalIds:[approvalId]};}
export function approvedApproval(id="approval:1"){return {id,status:"approved",approverRef:"operator:test",decidedAt:new Date().toISOString()};}
export async function connectedCameraSimulator(initial){const adapter=createCameraSimulatorAdapter(initial);await adapter.connect();return adapter;}
export function assertTerminal(command,expected){if(command.status!==expected)throw new Error(`EXPECTED_${expected}_GOT_${command.status}`);return true;}
