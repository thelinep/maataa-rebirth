import type { BaseEntity, Severity } from "./common";
import type { DemoIdentityId } from "../identity/types";
import type { PageTypeId, WorkspaceTypeId, LayoutTypeId, DeviceTypeId, GeneratorId, ToolId, AISpaceId, PermissionId, RoleId } from "./identifiers";
export interface DemoUser extends BaseEntity { email: string; roleIds: readonly RoleId[]; permissionIds: readonly PermissionId[]; avatar?: string; identityId: DemoIdentityId; organisationId: string; }
export interface DemoOrganisation extends BaseEntity { slug: string; industry: string; status: "active" | "pilot" | "demo"; }
export interface DemoProject extends BaseEntity { code: string; organisationId: string; ownerId: string; status: "planning" | "active" | "review" | "complete"; progress: number; budget: number; }
export interface DemoEvent extends BaseEntity { projectId: string; city: string; venue: string; startAt: string; endAt: string; status: "draft" | "proposal" | "approved" | "planning" | "ready" | "live" | "completed" | "settled"; guests: number; budget: number; }
export interface DemoVendor extends BaseEntity { category: string; city: string; rating: number; priceBand: "₹"|"₹₹"|"₹₹₹"|"₹₹₹₹"; status: "available"|"busy"|"preferred"; }
export interface DemoBooking extends BaseEntity { eventId: string; vendorId: string; service: string; amount: number; status: "draft"|"quoted"|"approved"|"booked"|"completed"|"cancelled"; }
export interface DemoTransaction extends BaseEntity { account: string; direction: "credit"|"debit"; amount: number; currency: "INR"; status: "posted"|"pending"; reference: string; }
export interface DemoTask extends BaseEntity { assigneeId: string; projectId?: string; dueAt: string; status: "todo"|"doing"|"review"|"done"; priority: "low"|"medium"|"high"|"urgent"; }
export interface DemoNotification { id: string; title: string; body: string; severity: Severity; read: boolean; createdAt: string; actionLabel?: string; }
export interface DemoActivity { id: string; actorId: string; action: string; object: string; createdAt: string; }
export interface DemoScenario { id: string; name: string; description: string; workspaceTypeId: WorkspaceTypeId; pageTypeId: PageTypeId; layoutTypeId: LayoutTypeId; deviceTypeId: DeviceTypeId; aiSpaceId?: AISpaceId; generatorId?: GeneratorId; toolId?: ToolId; }
