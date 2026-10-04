import type { DemoProject } from "../types/demo";
const c="2026-10-01T10:00:00+05:30", u="2026-10-04T08:30:00+05:30";
export const DEMO_PROJECTS: readonly DemoProject[] = [
{id:"project-ui",name:"MAATAA UI",code:"MUI",organisationId:"org-maataa",ownerId:"user-shiv",status:"active",progress:76,budget:1800000,createdAt:c,updatedAt:u},
{id:"project-nevo",name:"NEVO Event OS Pilot",code:"NEVO-PILOT",organisationId:"org-nevo",ownerId:"user-parvati",status:"active",progress:68,budget:4200000,createdAt:c,updatedAt:u},
{id:"project-film",name:"Feature Film Production",code:"TLPS-001",organisationId:"org-tlps",ownerId:"user-jamadagni",status:"planning",progress:34,budget:40000000,createdAt:c,updatedAt:u},
{id:"project-siddham",name:"Siddham Edge DevKit",code:"SEDGE",organisationId:"org-siddham",ownerId:"user-bharadvaja",status:"review",progress:55,budget:12000000,createdAt:c,updatedAt:u},
{id:"project-ai",name:"MAATAA Evidence AI",code:"MAI-EVID",organisationId:"org-maataa",ownerId:"user-gautama",status:"active",progress:61,budget:2400000,createdAt:c,updatedAt:u},
{id:"project-design",name:"Atomic Design Certification",code:"MUI-CERT",organisationId:"org-maataa",ownerId:"user-parvati",status:"planning",progress:22,budget:900000,createdAt:c,updatedAt:u}
] as const;
