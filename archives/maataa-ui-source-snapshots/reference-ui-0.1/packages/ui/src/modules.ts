import type { Readiness } from "./contracts.js";
export type MaataaModuleId = "overview" | "assistant" | "guide" | "voice" | "agents" | "tools" | "context" | "memory" | "workflows" | "evidence" | "approvals" | "models" | "adapters" | "developer" | "analytics" | "settings" | "command";
export interface MaataaModule { id: MaataaModuleId; title: string; description: string; readiness: Readiness; capability?: string }
export const modules: readonly MaataaModule[] = [
 {id:"overview",title:"Overview",description:"Workspace, health and decisions",readiness:"ready"},
 {id:"assistant",title:"Assistant",description:"Conversation with cited outputs",readiness:"partial",capability:"assistant"},
 {id:"guide",title:"Guide",description:"Contextual product guidance",readiness:"partial",capability:"guide"},
 {id:"voice",title:"Voice",description:"Speech input and output controls",readiness:"blocked",capability:"voice"},
 {id:"agents",title:"Agents",description:"Delegated task visibility",readiness:"blocked",capability:"agents"},
 {id:"tools",title:"Tools",description:"Available actions and authorization",readiness:"partial",capability:"tools"},
 {id:"context",title:"Context",description:"Current product and workspace frame",readiness:"ready"},
 {id:"memory",title:"Memory",description:"Inspect and govern retained context",readiness:"blocked",capability:"memory"},
 {id:"workflows",title:"Workflows",description:"Steps, owners and outcomes",readiness:"partial",capability:"workflows"},
 {id:"evidence",title:"Evidence",description:"Claims, sources and review status",readiness:"ready"},
 {id:"approvals",title:"Approvals",description:"Human authority and decisions",readiness:"ready"},
 {id:"models",title:"Models & runtime",description:"Configured runtimes and health",readiness:"blocked",capability:"models"},
 {id:"adapters",title:"Host adapters",description:"Product integration boundary",readiness:"ready"},
 {id:"developer",title:"Developer & API",description:"Contracts and integration notes",readiness:"ready"},
 {id:"analytics",title:"Analytics",description:"Usage and outcome measures",readiness:"blocked",capability:"analytics"},
 {id:"settings",title:"Settings",description:"Locale, theme and preferences",readiness:"ready"},
 {id:"command",title:"Command palette",description:"Find a surface or action",readiness:"ready"}
] as const;
export function visibleModules(capabilities: ReadonlySet<string> = new Set()) { return modules.map(m => ({...m, available: !m.capability || capabilities.has(m.capability)})); }
