import type { DemoNotification, DemoActivity } from "../types/demo";
export const DEMO_NOTIFICATIONS: readonly DemoNotification[] = [
{id:"notice-01",title:"Device simulation active",body:"Smartphone frame is using the demo viewport profile.",severity:"info",read:false,createdAt:"2026-10-04T08:20:00+05:30"},
{id:"notice-02",title:"Registry validation passed",body:"All demo references resolve to canonical registries.",severity:"success",read:false,createdAt:"2026-10-04T08:15:00+05:30"},
{id:"notice-03",title:"4 approvals pending",body:"Finance and vendor approvals need review.",severity:"warning",read:false,createdAt:"2026-10-04T08:10:00+05:30"},
{id:"notice-04",title:"Demo data only",body:"No live provider or backend is connected in this package.",severity:"info",read:true,createdAt:"2026-10-04T08:00:00+05:30"}
] as const;
export const DEMO_ACTIVITY: readonly DemoActivity[] = [
{id:"activity-01",actorId:"user-parvati",action:"updated","object":"Layout registry",createdAt:"2026-10-04T08:24:00+05:30"},
{id:"activity-02",actorId:"user-gautama",action:"evaluated","object":"Evidence Guardian",createdAt:"2026-10-04T08:18:00+05:30"},
{id:"activity-03",actorId:"user-kashyapa",action:"approved","object":"AV booking",createdAt:"2026-10-04T08:12:00+05:30"},
{id:"activity-04",actorId:"user-brahmini",action:"reviewed","object":"MAATAA UI package",createdAt:"2026-10-04T08:05:00+05:30"}
] as const;
