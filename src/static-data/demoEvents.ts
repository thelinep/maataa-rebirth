import type { DemoEvent } from "../types/demo";
const c="2026-10-01T10:00:00+05:30",u="2026-10-04T08:30:00+05:30";
export const DEMO_EVENTS: readonly DemoEvent[] = [
{id:"event-001",name:"Private Banking Wellness Salon",projectId:"project-nevo",city:"Delhi NCR",venue:"Demo Luxury Residence",startAt:"2026-10-18T17:00:00+05:30",endAt:"2026-10-18T20:00:00+05:30",status:"ready",guests:48,budget:850000,createdAt:c,updatedAt:u},
{id:"event-002",name:"Technology Innovation Summit",projectId:"project-nevo",city:"Bengaluru",venue:"Convention Centre",startAt:"2026-11-12T09:00:00+05:30",endAt:"2026-11-12T18:00:00+05:30",status:"planning",guests:420,budget:6200000,createdAt:c,updatedAt:u},
{id:"event-003",name:"Art & Collectors Evening",projectId:"project-nevo",city:"Mumbai",venue:"Gallery District",startAt:"2026-11-26T18:30:00+05:30",endAt:"2026-11-26T22:30:00+05:30",status:"approved",guests:80,budget:1700000,createdAt:c,updatedAt:u},
{id:"event-004",name:"Luxury Product Preview",projectId:"project-nevo",city:"Gurugram",venue:"Experience Centre",startAt:"2026-12-04T16:00:00+05:30",endAt:"2026-12-04T21:00:00+05:30",status:"proposal",guests:120,budget:2400000,createdAt:c,updatedAt:u},
{id:"event-005",name:"Heritage Cultural Evening",projectId:"project-nevo",city:"Jaipur",venue:"Heritage Haveli",startAt:"2027-01-09T17:30:00+05:30",endAt:"2027-01-09T22:00:00+05:30",status:"draft",guests:160,budget:3100000,createdAt:c,updatedAt:u},
{id:"event-006",name:"Investor Roundtable",projectId:"project-nevo",city:"New Delhi",venue:"Private Club",startAt:"2026-10-30T18:00:00+05:30",endAt:"2026-10-30T21:00:00+05:30",status:"completed",guests:36,budget:650000,createdAt:c,updatedAt:u}
] as const;
