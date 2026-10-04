import type { DemoTransaction } from "../types/demo";
const c="2026-10-03T10:00:00+05:30",u="2026-10-04T08:30:00+05:30";
export const DEMO_TRANSACTIONS: readonly DemoTransaction[] = [
{id:"txn-001",name:"Client advance",account:"Event Receipts",direction:"credit",amount:350000,currency:"INR",status:"posted",reference:"NEVO-001-ADV",createdAt:c,updatedAt:u},
{id:"txn-002",name:"Wellness booking",account:"Vendor Payables",direction:"debit",amount:50000,currency:"INR",status:"posted",reference:"BOOK-01-A",createdAt:c,updatedAt:u},
{id:"txn-003",name:"Floral advance",account:"Vendor Payables",direction:"debit",amount:35000,currency:"INR",status:"posted",reference:"BOOK-02-A",createdAt:c,updatedAt:u},
{id:"txn-004",name:"AV reserve",account:"Committed Costs",direction:"debit",amount:45000,currency:"INR",status:"pending",reference:"BOOK-03-R",createdAt:c,updatedAt:u},
{id:"txn-005",name:"Sponsor receipt",account:"Sponsorship",direction:"credit",amount:175000,currency:"INR",status:"pending",reference:"SP-01",createdAt:c,updatedAt:u}
] as const;
export const DEMO_FINANCE_KPIS = { cashAvailable: 395000, committedCost: 260000, eventBudget: 850000, forecastMargin: 0.18, invoicesOpen: 3, approvalsPending: 4 } as const;
