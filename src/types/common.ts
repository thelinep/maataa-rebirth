import type { EntityId, ISODateTime } from "./identifiers";
export type AsyncStatus = "idle" | "loading" | "success" | "error";
export type LifecycleStatus = "draft" | "reviewed" | "canonical" | "deprecated";
export type VerificationStatus = "declared" | "simulated" | "tested" | "verified" | "certified" | "blocked";
export type Severity = "info" | "success" | "warning" | "error" | "critical";
export type Density = "compact" | "default" | "comfortable";
export type ThemeMode = "light" | "dark" | "system" | "high-contrast" | "oled";
export type SortDirection = "asc" | "desc";
export type KeyValue = Readonly<Record<string, unknown>>;
export interface BaseEntity { id: EntityId; name: string; createdAt: ISODateTime; updatedAt: ISODateTime; }
export interface AuditStamp { createdBy: EntityId; createdAt: ISODateTime; updatedBy?: EntityId; updatedAt?: ISODateTime; }
export interface SelectOption<T extends string = string> { value: T; label: string; disabled?: boolean; }
export interface PaginationState { page: number; pageSize: number; total: number; }
export interface SortState { key: string; direction: SortDirection; }
export interface FilterState { query: string; tags: readonly string[]; status?: string; }
