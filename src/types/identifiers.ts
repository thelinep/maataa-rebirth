import { PAGE_TYPES } from "../registries/pageRegistry";
import { WORKSPACE_TYPES } from "../registries/workspaceRegistry";
import { LAYOUT_TYPES } from "../registries/layoutRegistry";
import { DEVICE_REGISTRY } from "../registries/deviceRegistry";
import { GENERATOR_REGISTRY } from "../registries/generatorRegistry";
import { TOOL_REGISTRY } from "../registries/toolRegistry";
import { AI_SPACE_REGISTRY } from "../registries/aiSpaceRegistry";
import { REGISTRY_REGISTRY } from "../registries/registryRegistry";

export type PageTypeId = (typeof PAGE_TYPES)[number]["id"];
export type WorkspaceTypeId = (typeof WORKSPACE_TYPES)[number]["id"];
export type LayoutTypeId = (typeof LAYOUT_TYPES)[number]["id"];
export type DeviceTypeId = (typeof DEVICE_REGISTRY)[number]["id"];
export type GeneratorId = (typeof GENERATOR_REGISTRY)[number]["id"];
export type ToolId = (typeof TOOL_REGISTRY)[number]["id"];
export type AISpaceId = (typeof AI_SPACE_REGISTRY)[number]["id"];
export type RegistryId = (typeof REGISTRY_REGISTRY)[number]["id"];

export type EntityId = string;
export type ISODateTime = string;
export type RoutePath = string;
export type PermissionId = string;
export type RoleId = string;
