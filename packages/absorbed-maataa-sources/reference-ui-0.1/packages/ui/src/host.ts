import type { MaataaSurfaceFrame, EvidenceState, Readiness } from "./contracts.js";
export interface MaataaClaim { id: string; text: string; state: EvidenceState; sources: readonly { label: string; url?: string }[] }
export interface MaataaAction { id: string; label: string; permission: string; effect: "read" | "write" | "external"; requiresApproval?: boolean }
export interface MaataaHostAdapter {
 readonly productId: string;
 getFrame(): Promise<MaataaSurfaceFrame>;
 listClaims?(frame: MaataaSurfaceFrame): Promise<readonly MaataaClaim[]>;
 listActions?(frame: MaataaSurfaceFrame): Promise<readonly MaataaAction[]>;
 invokeAction?(id: string, input: unknown, frame: MaataaSurfaceFrame): Promise<unknown>;
 getRuntimeStatus?(): Promise<{ readiness: Readiness; health?: string }>;
}
export function canInvoke(action: MaataaAction, frame: MaataaSurfaceFrame, approved = false): boolean {
 return frame.authority.permissions.includes(action.permission) && (!action.requiresApproval || approved);
}
export async function guardedInvoke(adapter: MaataaHostAdapter, action: MaataaAction, input: unknown, frame: MaataaSurfaceFrame, approved = false): Promise<unknown> {
 if (!canInvoke(action, frame, approved)) throw new Error("Action not authorized or approval missing");
 if (!adapter.invokeAction) throw new Error("Host has not configured action execution");
 return adapter.invokeAction(action.id, input, frame);
}
