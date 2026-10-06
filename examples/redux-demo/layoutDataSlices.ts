import type { LayoutTypeRecord } from "../../src/registries/layoutRegistry";

type LayoutSliceProfile = {
  title: string;
  summary: string;
  columns: string;
  regions: readonly string[];
  records: readonly { label: string; value: string; note: string }[];
};

/** Every canonical layout family maps to an illustrative, data-bearing composition. */
export const LAYOUT_SLICE_PROFILES: Readonly<Record<string, LayoutSliceProfile>> = {
  APP_SHELLS: { title: "Application workspace", summary: "Navigation, working content, and contextual review fixture.", columns: "160px minmax(0, 1fr) 180px", regions: ["Navigation", "Primary workspace", "Inspector"], records: [
    { label: "Navigation", value: "Projects · Schedule · Files", note: "Sample workspace sections" },
    { label: "Current record", value: "Feature Film Demo", note: "Synthetic production fixture" },
    { label: "Review context", value: "Owner preview · draft", note: "No approval recorded" },
  ] },
  BASIC_CONTENT: { title: "Reading and content", summary: "An illustrative content composition with a reading path and related material.", columns: "minmax(0, 1fr)", regions: ["Page introduction", "Main reading column", "Related material"], records: [
    { label: "Story", value: "A sample production brief", note: "Illustrative editorial content" },
    { label: "Section", value: "Location planning notes", note: "Synthetic reference text" },
    { label: "Related", value: "Call-sheet checklist", note: "Sample link · no file attached" },
  ] },
  CANVAS_SPATIAL: { title: "Spatial planning canvas", summary: "A map and scene-planning fixture; locations, access, and measurements are unverified.", columns: "minmax(0, 1.8fr) minmax(180px, 1fr)", regions: ["Spatial canvas", "Scene inspector"], records: [
    { label: "Area", value: "Mountain Road · sample location", note: "No survey or access approval" },
    { label: "Scene", value: "Exterior · planning pin 04", note: "Illustrative placement" },
    { label: "Dimensions", value: "Not surveyed", note: "No verified measurement" },
  ] },
  COLUMN_SYSTEMS: { title: "Multi-column reading", summary: "A composed record with supporting context and an inspection panel.", columns: "minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, .8fr)", regions: ["Contents", "Selected record", "Context"], records: [
    { label: "Contents", value: "Overview · Schedule · Notes", note: "Sample navigation" },
    { label: "Selected", value: "Scene 12A · exterior", note: "Synthetic schedule item" },
    { label: "Context", value: "Access unverified", note: "Illustrative review note" },
  ] },
  COMMERCE: { title: "Commerce and booking", summary: "Catalog and draft offer records for review; no availability or transaction is connected.", columns: "repeat(3, minmax(0, 1fr))", regions: ["Selection", "Offer review", "Order context"], records: [
    { label: "Listing", value: "Sample AV Partner", note: "Synthetic catalog record" },
    { label: "Offer", value: "Draft estimate · not sent", note: "No customer acceptance" },
    { label: "Booking", value: "Not created", note: "No hold or payment" },
  ] },
  COMMUNICATION: { title: "Messages and customer context", summary: "A message-oriented workspace with draft conversation and contact examples.", columns: "190px minmax(0, 1fr) 190px", regions: ["Conversation list", "Message thread", "Contact context"], records: [
    { label: "Thread", value: "Location review · sample", note: "Illustrative conversation" },
    { label: "Message", value: "Can we review the access notes?", note: "Draft · not sent" },
    { label: "Contact", value: "Sample Organizer 001", note: "Synthetic identity" },
  ] },
  DATA_ANALYTICS: { title: "Data and analysis", summary: "Synthetic rows and summary values for exploration; no live dataset or telemetry is queried.", columns: "repeat(3, minmax(0, 1fr))", regions: ["Dataset", "Summary", "Quality notes"], records: [
    { label: "Rows", value: "24 sample records", note: "Deterministic fixture" },
    { label: "Review queue", value: "3 illustrative items", note: "Not a live metric" },
    { label: "Freshness", value: "Fixture only", note: "No source connection" },
  ] },
  DOCUMENTATION: { title: "Documentation and knowledge", summary: "A reference page and navigation fixture with metadata only.", columns: "minmax(0, 1fr) 220px", regions: ["Article", "Contents and references"], records: [
    { label: "Article", value: "Planning workflow guide", note: "Sample document metadata" },
    { label: "Section", value: "Evidence and handover", note: "Illustrative guidance" },
    { label: "Source", value: "No file attached", note: "Not externally verified" },
  ] },
  FORMS_PROCESS: { title: "Form and review flow", summary: "A structured intake and review path; submission or approval is never recorded.", columns: "minmax(0, 1fr) 240px", regions: ["Form or process", "Review summary", "Next steps"], records: [
    { label: "Request", value: "Location scout · sample", note: "Draft intake fixture" },
    { label: "Required review", value: "Access and budget", note: "Illustrative checklist" },
    { label: "Decision", value: "Awaiting sample review", note: "No approval recorded" },
  ] },
  GRID_SYSTEMS: { title: "Overview and card grid", summary: "A dashboard-style grouping of sample work, signals, and recent activity.", columns: "repeat(4, minmax(0, 1fr))", regions: ["Work summary", "Schedule", "Attention", "Recent activity"], records: [
    { label: "Work items", value: "4 sample records", note: "Local fixture" },
    { label: "Schedule", value: "3 planned entries", note: "Not dispatched" },
    { label: "Attention", value: "2 review notes", note: "No decision recorded" },
    { label: "Activity", value: "Updated in preview", note: "Not an audit event" },
  ] },
  MARKETING: { title: "Campaign and editorial", summary: "Draft public content and campaign context for preview; nothing is published.", columns: "minmax(0, 1.7fr) minmax(0, 1fr)", regions: ["Featured story", "Campaign context"], records: [
    { label: "Story", value: "Behind the production plan", note: "Sample editorial draft" },
    { label: "Audience", value: "Planning teams · illustrative", note: "No audience targeted" },
    { label: "Publication", value: "Draft · not published", note: "No public page changed" },
  ] },
  MEDIA: { title: "Media and presentation", summary: "Sample assets and edit notes; no media upload, export, or publication occurs.", columns: "repeat(3, minmax(0, 1fr))", regions: ["Asset library", "Preview or timeline", "Asset inspector"], records: [
    { label: "Asset", value: "Scene reference · sample", note: "No media file attached" },
    { label: "Timeline", value: "00:42 · illustrative segment", note: "No edit rendered" },
    { label: "Review", value: "Cut notes · draft", note: "Not an approval" },
  ] },
  OPERATIONAL: { title: "Operations board", summary: "A status-oriented arrangement of sample queues and environment notes.", columns: "repeat(4, minmax(0, 1fr))", regions: ["Queue", "In progress", "Needs review", "Environment"], records: [
    { label: "Queue", value: "4 sample tasks", note: "Not executed" },
    { label: "Current", value: "Planning preview", note: "Not a live status" },
    { label: "Review", value: "2 illustrative notes", note: "No decision recorded" },
    { label: "Environment", value: "Local fixture", note: "No deployment action" },
  ] },
  OVERLAY_TEMPORARY: { title: "Contextual record and details", summary: "A selected record with supporting detail for an overlay-style composition.", columns: "minmax(0, 1fr) minmax(0, 1fr)", regions: ["Selected content", "Supporting detail", "Related record"], records: [
    { label: "Selected", value: "Planning brief · sample", note: "Synthetic content" },
    { label: "Detail", value: "Three review points", note: "Illustrative only" },
    { label: "Related", value: "Evidence index · metadata", note: "No file attached" },
  ] },
  PLANNING: { title: "Schedule and planning board", summary: "Sample milestones and timed work items; dates and completion are not operational claims.", columns: "repeat(4, minmax(0, 1fr))", regions: ["Backlog", "This week", "Review", "Scheduled next"], records: [
    { label: "Work item", value: "Prepare location brief", note: "Synthetic planning task" },
    { label: "Milestone", value: "Call-sheet rehearsal", note: "Illustrative date" },
    { label: "Review", value: "Budget notes", note: "No approval recorded" },
    { label: "Next", value: "Crew arrival · 08:00", note: "No notification sent" },
  ] },
  RESPONSIVE_MOBILE: { title: "Mobile task surface", summary: "A compact touch-oriented flow with sample tasks and a clear next step.", columns: "repeat(3, minmax(0, 1fr))", regions: ["Today", "Current task", "Quick context"], records: [
    { label: "Today", value: "3 planned items", note: "Sample schedule" },
    { label: "Current", value: "Review access notes", note: "Illustrative task" },
    { label: "Context", value: "Offline state · not tested", note: "No sync claim" },
  ] },
  SPLIT_PANE: { title: "Master and detail", summary: "Related list, selected record, and inspection data in one composition.", columns: "minmax(0, .9fr) minmax(0, 1.2fr) minmax(0, .9fr)", regions: ["Record list", "Selected detail", "Inspector"], records: [
    { label: "Record list", value: "Scene 12A · sample", note: "Synthetic row" },
    { label: "Selected detail", value: "Exterior setup", note: "Planning note only" },
    { label: "Inspector", value: "Location access · unverified", note: "No permission evidence" },
  ] },
  WORKSPACE: { title: "Production workbench", summary: "A multi-panel production workspace with sample schedule and review content.", columns: "160px minmax(0, 1fr) 180px", regions: ["Workspace navigation", "Work surface", "Inspector"], records: [
    { label: "Workspace", value: "Feature Film Demo", note: "Synthetic production fixture" },
    { label: "Call sheet", value: "Two rehearsal entries", note: "No crew dispatch" },
    { label: "Inspector", value: "Owner review · preview", note: "No authenticated role" },
  ] },
};

function stableOffset(value: string, length: number): number {
  let hash = 2166136261;
  for (const character of value) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return (hash >>> 0) % length;
}

export function createLayoutDataSlice(layout: LayoutTypeRecord) {
  const profile = LAYOUT_SLICE_PROFILES[layout.groupKey];
  if (!profile) throw new Error(`No layout data slice is registered for ${layout.groupKey}`);
  const offset = stableOffset(layout.id, profile.records.length);
  const layoutLabel = layout.name.replace(/Layout$/, "");
  const regions = profile.regions.map((title, index) => {
    const record = profile.records[(offset + index) % profile.records.length]!;
    return {
      title,
      label: record.label,
      value: record.value,
      note: `${record.note} · ${layoutLabel} fixture`,
    };
  });
  return {
    layoutId: layout.id,
    domain: layout.groupKey.toLowerCase(),
    title: profile.title,
    summary: profile.summary,
    columns: profile.columns,
    regions,
    reference: `LY-${String(layout.ordinal).padStart(3, "0")}`,
    provenance: "Synthetic layout fixture" as const,
    boundary: "No live application state, booking, approval, transaction, provider call, or execution is represented.",
  };
}
