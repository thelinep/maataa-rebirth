import type { ThemeMode, Density, AsyncStatus } from "./common";
import type { DeviceSimulationState } from "./device";
import type { NavigationLocation, NavigationTab, BreadcrumbItem } from "./navigation";
import type { PageTypeId, WorkspaceTypeId, LayoutTypeId, RegistryId, GeneratorId, ToolId, AISpaceId } from "./identifiers";
import type { AIMessage } from "./ai";
import type { DemoUser } from "./demo";
export interface SessionState { status: "anonymous"|"authenticated"; user: DemoUser | null; activeOrganisationId: string | null; activeRoleId: string | null; permissionIds: string[]; }
export interface UIState { theme: ThemeMode; density: Density; locale: string; sidebarOpen: boolean; inspectorOpen: boolean; commandPaletteOpen: boolean; reducedMotion: boolean; fullscreen: boolean; }
export interface NavigationState { location: NavigationLocation; breadcrumbs: BreadcrumbItem[]; tabs: NavigationTab[]; activeTabId: string | null; history: string[]; }
export interface WorkspaceState { activeWorkspaceTypeId: WorkspaceTypeId; openWorkspaceTypeIds: WorkspaceTypeId[]; favoriteWorkspaceTypeIds: WorkspaceTypeId[]; panelSizes: Record<string,number>; panelVisibility: Record<string,boolean>; }
export interface PageState { activePageTypeId: PageTypeId; recentPageTypeIds: PageTypeId[]; pageState: Record<string,Record<string,unknown>>; }
export interface LayoutState { activeLayoutTypeId: LayoutTypeId; regionVisibility: Record<string,boolean>; regionSizes: Record<string,number>; }
export interface RegistryState { activeRegistryId: RegistryId; query: string; group: string | null; lifecycle: string | null; selectedId: string | null; }
export interface DeviceState extends DeviceSimulationState { status: AsyncStatus; }
export interface GeneratorState { selectedGeneratorId: GeneratorId | null; drafts: Record<string,Record<string,unknown>>; runs: Array<{id:string; generatorId:GeneratorId; status:AsyncStatus; createdAt:string}>; }
export interface ToolState { selectedToolId: ToolId | null; favorites: ToolId[]; executions: Array<{id:string; toolId:ToolId; status:AsyncStatus; createdAt:string; result?:unknown}>; }
export interface AIState { activeSpaceId: AISpaceId | null; selectedAgentId: string | null; selectedModelId: string | null; messages: AIMessage[]; traceEnabled: boolean; }
export interface DemoCollectionState { query: string; facet: string | null; selectedId: string | null; selectedIds: string[]; view: "table" | "grid" | "list" | "board"; }
