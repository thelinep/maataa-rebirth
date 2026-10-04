import type { DemoOrganisation } from "../types/demo";
const now = "2026-10-04T08:30:00+05:30";
export const DEMO_ORGANISATIONS: readonly DemoOrganisation[] = [
  {id:"org-maataa",name:"MAATAA Labs",slug:"maataa",industry:"Platform & AI",status:"demo",createdAt:now,updatedAt:now},
  {id:"org-nevo",name:"NEVO Events",slug:"nevo",industry:"Events",status:"pilot",createdAt:now,updatedAt:now},
  {id:"org-tlps",name:"The Line Producers Platform",slug:"tlps",industry:"Film Production",status:"active",createdAt:now,updatedAt:now},
  {id:"org-siddham",name:"Siddham Semiconductor",slug:"siddham",industry:"Semiconductor",status:"demo",createdAt:now,updatedAt:now}
] as const;
