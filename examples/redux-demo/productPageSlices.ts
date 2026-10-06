import type { PageSpecimenRecord } from "./pageSpecimens";

export type ProductPageContext = "generic" | "tlps" | "nevo";
type ProductKey = Exclude<ProductPageContext, "generic">;
type ProductDomain = "production" | "schedule" | "budget" | "locations" | "evidence" | "handover" | "project" | "events" | "commercial" | "customers" | "venues" | "runOfShow" | "guests" | "operations" | "communication" | "catalog";
type FixtureRow = { label: string; value: string; note: string };
type DomainFixture = { title: string; summary: string; rows: readonly FixtureRow[] };

export const PRODUCT_PAGE_GROUPS: Readonly<Record<ProductKey, Readonly<Record<string, ProductDomain>>>> = {
  tlps: {
    PRODUCTION_LOGISTICS: "production",
    PRODUCTIVITY_PLANNING: "schedule",
    PROJECTS_PROGRAMS: "project",
    SPATIAL_3D: "locations",
    DOCUMENTS_FILES: "handover",
    COMMERCIAL_FINANCE_INVESTMENT: "budget",
    EVIDENCE_APPROVAL: "evidence",
    DASHBOARD_OVERVIEW: "production",
    ENTITY_CRUD: "production",
  },
  nevo: {
    MARKETING_CORPORATE: "events",
    CONTENT_EDITORIAL: "events",
    DASHBOARD_OVERVIEW: "operations",
    ENTITY_CRUD: "events",
    SEARCH_DISCOVERY: "catalog",
    CRM_SALES: "customers",
    COMMUNICATION: "communication",
    PRODUCTIVITY_PLANNING: "runOfShow",
    DOCUMENTS_FILES: "handover",
    SPATIAL_3D: "venues",
    MARKETPLACE_COMMERCE: "catalog",
    BOOKING: "commercial",
    COMMERCIAL_FINANCE_INVESTMENT: "commercial",
    EVENTS: "events",
    PRODUCTION_LOGISTICS: "runOfShow",
    TRANSACTION_STATES: "commercial",
    PRESENTATION_MODES: "guests",
    EVIDENCE_APPROVAL: "handover",
  },
};

function resolveProductDomain(page: PageSpecimenRecord, context: ProductKey): ProductDomain | undefined {
  const pageKey = `${page.id} ${page.name}`.toUpperCase();
  if (context === "tlps" && page.groupKey === "PRODUCTION_LOGISTICS") {
    if (/CALL.?SHEET|SCHEDULE|REHEARSAL|DAY_OUT_OF_DAYS|TIMELINE/.test(pageKey)) return "schedule";
    if (/LOCATION|VENUE|SCOUT|SPATIAL/.test(pageKey)) return "locations";
    if (/BUDGET|COST|EXPENSE|FINANCE/.test(pageKey)) return "budget";
  }
  return PRODUCT_PAGE_GROUPS[context][page.groupKey];
}

const FIXTURES: Readonly<Record<ProductKey, Readonly<Record<ProductDomain, DomainFixture>>>> = {
  tlps: {
    production: { title: "Production plan", summary: "Planning record only; no production completion is asserted.", rows: [
      { label: "Production", value: "Feature Film Demo", note: "Synthetic planning fixture" },
      { label: "Stage", value: "Pre-production review", note: "Local preview state" },
      { label: "Owner", value: "Sample producer", note: "No authenticated identity" },
    ] },
    schedule: { title: "Call-sheet and rehearsal plan", summary: "Illustrative timing; no crew notification or shoot confirmation.", rows: [
      { label: "08:00", value: "Crew arrival fixture", note: "Sample schedule item" },
      { label: "09:30", value: "Scene 12A · exterior", note: "Location permission unverified" },
      { label: "11:15", value: "Scene 18 · interior", note: "Sample schedule item" },
    ] },
    budget: { title: "Budget estimate", summary: "Planning estimates only; no payment, quote, or commitment.", rows: [
      { label: "Production", value: "₹12,00,000", note: "Synthetic estimate" },
      { label: "Camera and lighting", value: "₹2,40,000", note: "Synthetic estimate" },
      { label: "Locations", value: "₹1,10,000", note: "Synthetic estimate" },
    ] },
    locations: { title: "Location research", summary: "Research notes only; access, permission, and availability are unverified.", rows: [
      { label: "Mountain Road", value: "Exterior · sample location", note: "No survey or access approval" },
      { label: "Village House", value: "Interior · sample location", note: "No survey or access approval" },
      { label: "Review status", value: "Needs owner review", note: "Illustrative workflow state" },
    ] },
    evidence: { title: "Evidence index", summary: "Metadata-only fixtures; no evidence file is attached or retained.", rows: [
      { label: "Planning brief", value: "Sample reference TLPS-E01", note: "No file attached" },
      { label: "Rehearsal checklist", value: "Sample reference TLPS-E02", note: "No file attached" },
      { label: "Audit", value: "Local preview events", note: "Not authoritative" },
    ] },
    handover: { title: "Handover pack", summary: "Export outline only; this fixture is not a production archive.", rows: [
      { label: "Call sheet", value: "Included as a sample section", note: "No dispatch" },
      { label: "Checklist", value: "Three sample work items", note: "No completion asserted" },
      { label: "Evidence index", value: "Metadata outline", note: "No file payloads" },
    ] },
    project: { title: "Production project", summary: "Related project fixture for the local TLPS planning slice.", rows: [
      { label: "Project", value: "Feature Film Production", note: "Synthetic demo record" },
      { label: "Code", value: "TLPS-001", note: "Demo identifier" },
      { label: "Progress", value: "Planning preview", note: "Not an operational status" },
    ] },
    events: { title: "Event planning", summary: "No TLPS event-specific fixture is available for this page family.", rows: [] },
    commercial: { title: "Commercial records", summary: "No TLPS commercial transaction fixture is included.", rows: [] },
    customers: { title: "Customer records", summary: "No TLPS customer fixture is included.", rows: [] },
    venues: { title: "Venue records", summary: "Location research only; access, permission, and availability remain unverified.", rows: [
      { label: "Sample location", value: "Mountain Road", note: "No booking or access confirmation" },
    ] },
    runOfShow: { title: "Schedule", summary: "No NEVO event schedule fixture is available in this TLPS context.", rows: [] },
    guests: { title: "Guest records", summary: "Guest management is not included in this TLPS pilot data slice.", rows: [] },
    operations: { title: "Operations", summary: "Production planning records only; no live operations feed.", rows: [
      { label: "Current stage", value: "Pre-production review", note: "Synthetic fixture" },
    ] },
    communication: { title: "Communications", summary: "No messages are sent by this local specimen.", rows: [
      { label: "Review note", value: "Sample owner-preview note", note: "Not delivered" },
    ] },
    catalog: { title: "Discovery", summary: "No external search or live catalog is connected.", rows: [] },
  },
  nevo: {
    production: { title: "Event operations", summary: "Planning fixtures only; no event delivery or completion is asserted.", rows: [
      { label: "Event", value: "Technology Innovation Summit", note: "Synthetic event fixture" },
      { label: "Stage", value: "Planning preview", note: "Not a live status" },
      { label: "Operations lead", value: "Sample organizer", note: "No authenticated identity" },
    ] },
    schedule: { title: "Run of show", summary: "Illustrative schedule; no participant or vendor notifications are sent.", rows: [
      { label: "09:00", value: "Registration fixture", note: "Sample agenda item" },
      { label: "10:30", value: "Opening session fixture", note: "Sample agenda item" },
      { label: "12:00", value: "Networking break fixture", note: "Sample agenda item" },
    ] },
    budget: { title: "Budget estimate", summary: "Planning estimates only; no payment, quote, or commitment.", rows: [
      { label: "Venue and production", value: "₹24,00,000", note: "Synthetic estimate" },
      { label: "Guest services", value: "₹6,20,000", note: "Synthetic estimate" },
      { label: "Reserve", value: "₹2,40,000", note: "Synthetic estimate" },
    ] },
    locations: { title: "Venue planning", summary: "Venue research only; availability, permissions, and holds are unverified.", rows: [
      { label: "Convention Centre", value: "Bengaluru · sample venue", note: "No availability check" },
      { label: "Capacity fixture", value: "420 sample guests", note: "Not a venue-approved limit" },
      { label: "Hold state", value: "Not requested", note: "No booking created" },
    ] },
    evidence: { title: "Event evidence index", summary: "Metadata outline only; no contracts or evidence files are attached.", rows: [
      { label: "Event brief", value: "Sample reference NEVO-E01", note: "No file attached" },
      { label: "Closeout checklist", value: "Sample reference NEVO-E02", note: "No file attached" },
      { label: "Audit", value: "Local preview events", note: "Not authoritative" },
    ] },
    handover: { title: "Event handover", summary: "Handover outline only; no contract acceptance or closeout is asserted.", rows: [
      { label: "Run of show", value: "Included as sample section", note: "Not dispatched" },
      { label: "Commercial snapshot", value: "Illustrative draft", note: "Not accepted" },
      { label: "Evidence index", value: "Metadata outline", note: "No file payloads" },
    ] },
    project: { title: "Event project", summary: "NEVO pilot vocabulary is event-centred; this project page uses event fixtures.", rows: [
      { label: "Project", value: "NEVO Event OS Pilot", note: "Synthetic demo record" },
      { label: "Code", value: "NEVO-PILOT", note: "Demo identifier" },
      { label: "Progress", value: "Planning preview", note: "Not an operational status" },
    ] },
    events: { title: "Event records", summary: "Synthetic event fixtures; no customer commitment or event completion is asserted.", rows: [
      { label: "Technology Innovation Summit", value: "Bengaluru · 12 Nov 2026", note: "Planning fixture · 420 sample guests" },
      { label: "Art & Collectors Evening", value: "Mumbai · 26 Nov 2026", note: "Planning fixture · 80 sample guests" },
      { label: "Heritage Cultural Evening", value: "Jaipur · 9 Jan 2027", note: "Planning fixture · 160 sample guests" },
    ] },
    commercial: { title: "Quote and booking review", summary: "Illustrative offer state only; no hold, contract, signature, or payment exists.", rows: [
      { label: "Quote", value: "Draft estimate · sample event", note: "Not sent or accepted" },
      { label: "Booking", value: "Not created", note: "No venue or vendor hold" },
      { label: "Payment", value: "Not connected", note: "No transaction" },
    ] },
    customers: { title: "Customer records", summary: "Pseudonymous customer fixtures; no contact details or real tenant records.", rows: [
      { label: "Customer", value: "Sample Organizer 001", note: "Synthetic identity" },
      { label: "Event", value: "Technology Innovation Summit", note: "Sample association" },
      { label: "Offer access", value: "Not configured", note: "No customer link" },
    ] },
    venues: { title: "Venue and supplier catalog", summary: "Directory examples only; listing does not establish availability or endorsement.", rows: [
      { label: "Venue", value: "Convention Centre", note: "Sample listing · availability unknown" },
      { label: "Supplier", value: "Sample AV Partner", note: "Synthetic vendor" },
      { label: "Review", value: "Not verified", note: "No diligence evidence" },
    ] },
    runOfShow: { title: "Run of show", summary: "Agenda fixture for one sample event; no assignment or dispatch is performed.", rows: [
      { label: "09:00", value: "Registration fixture", note: "Sample task" },
      { label: "10:30", value: "Opening session fixture", note: "Sample task" },
      { label: "18:00", value: "Closeout review fixture", note: "Sample task" },
    ] },
    guests: { title: "Guest experience", summary: "Pseudonymous guest fixtures; no invitations, tickets, or check-ins are issued.", rows: [
      { label: "Guest 001", value: "Invitation draft", note: "Not sent" },
      { label: "Guest 002", value: "Registration draft", note: "Not confirmed" },
      { label: "Guest 003", value: "Check-in fixture", note: "No attendance recorded" },
    ] },
    operations: { title: "Event operations overview", summary: "Synthetic operations board; statuses are not live application records.", rows: [
      { label: "Planning tasks", value: "3 sample work items", note: "Local fixture" },
      { label: "Review queue", value: "2 sample decisions", note: "No approval recorded" },
      { label: "Event day", value: "Not started", note: "No execution implied" },
    ] },
    communication: { title: "Event communications", summary: "Message drafts only; no email, SMS, or push notification is delivered.", rows: [
      { label: "Organizer note", value: "Draft event update", note: "Not sent" },
      { label: "Vendor note", value: "Draft logistics question", note: "Not sent" },
      { label: "Guest update", value: "Draft schedule reminder", note: "Not sent" },
    ] },
    catalog: { title: "Event discovery and listings", summary: "Searchable fixture list only; no live listing or availability query.", rows: [
      { label: "Event", value: "Technology Innovation Summit", note: "Sample record" },
      { label: "Venue", value: "Convention Centre", note: "Sample listing" },
      { label: "Supplier", value: "Sample AV Partner", note: "Synthetic listing" },
    ] },
  },
};

export function createProductPageSlice(page: PageSpecimenRecord, context: ProductPageContext) {
  if (context === "generic") return null;
  const domain = resolveProductDomain(page, context);
  if (!domain) return {
    product: context.toUpperCase(),
    mapped: false as const,
    reference: `${context.toUpperCase()}-${page.groupId}-${String(page.ordinal).padStart(3, "0")}`,
    title: "No product data slice mapped",
    summary: `This page family is outside the current ${context.toUpperCase()} pilot data map. The generic page specimen remains available.`,
    rows: [] as readonly FixtureRow[],
  };
  const fixture = FIXTURES[context][domain];
  return {
    product: context.toUpperCase(),
    mapped: true as const,
    domain,
    reference: `${context.toUpperCase()}-${page.groupId}-${String(page.ordinal).padStart(3, "0")}`,
    title: fixture.title,
    summary: fixture.summary,
    rows: fixture.rows,
  };
}
