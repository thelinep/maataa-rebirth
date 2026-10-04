import type { PageTypeId, RoutePath, WorkspaceTypeId } from "./identifiers";
export interface BreadcrumbItem { id: string; label: string; href?: RoutePath; }
export interface NavigationTab { id: string; label: string; pageTypeId?: PageTypeId; workspaceTypeId?: WorkspaceTypeId; route?: RoutePath; closable?: boolean; dirty?: boolean; }
export interface NavigationLocation { route: RoutePath; pageTypeId?: PageTypeId; workspaceTypeId?: WorkspaceTypeId; params: Readonly<Record<string,string>>; }
