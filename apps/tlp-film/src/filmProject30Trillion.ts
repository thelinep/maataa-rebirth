import type { FilmStageId } from "./filmTimeline";

export const thirtyTrillionIndiaPrompt =
  "Create a feature film titled 30 Trillion India: a speculative, human-scale ensemble drama about three generations navigating a profound economic transformation through choices about land, energy, work, and care. Keep the story fictional; do not present an economic milestone, policy, or forecast as fact.";

export interface SimulatedMetric {
  label: string;
  value: string;
  context: string;
}

export interface GeneratedArtifact {
  title: string;
  text: string;
}

export interface FilmStagePacket {
  artifacts: GeneratedArtifact[];
  simulation: SimulatedMetric[];
  boundary: string;
}

const packets: Record<FilmStageId, FilmStagePacket> = {
  ideation: {
    artifacts: [
      {
        title: "Logline",
        text: "As a fast-changing India reshapes the coast where they live, three generations of one family must decide what progress is worth keeping—and what it asks them to leave behind.",
      },
      {
        title: "Story treatment",
        text: "Asha, a port electrician; her father Dev, a small-farm cooperative organizer; and Asha’s daughter Mira, an apprentice sound recordist, face one disputed relocation proposal. Their plans collide during a week of power outages, a missed harvest window, and a community festival. They do not solve the economy; they choose how their community will negotiate change together.",
      },
      {
        title: "Audience hypothesis",
        text: "Primary: adults who enjoy family-led social drama. Secondary: younger viewers interested in work, climate adaptation, and changing cities. This is a creative hypothesis to test with readers, not market research.",
      },
    ],
    simulation: [
      { label: "Format", value: "Feature · ensemble drama", context: "Creative brief" },
      { label: "Story time", value: "Fictional near future", context: "Not a forecast" },
      { label: "Core characters", value: "3 generations", context: "Draft assumption" },
    ],
    boundary: "Fictional story world. The title is not a claim that India has reached or will reach a specific GDP value.",
  },
  script: {
    artifacts: [
      {
        title: "Three-act beat map",
        text: "Act I: a relocation notice arrives before the festival. Act II: each generation pursues a different kind of security; a blackout exposes their interdependence. Act III: they present a jointly authored alternative and accept that the decision remains contested.",
      },
      {
        title: "Character arcs",
        text: "Asha moves from solving every problem alone to sharing technical authority. Dev shifts from defending memory as a fixed place to carrying it into a new form. Mira stops recording from the sidelines and becomes responsible for whose voices the film preserves.",
      },
      {
        title: "Sample scene seed",
        text: "At a silent substation after rain, Mira records the hum returning to the village line. Dev recognizes the old transformer’s rhythm; Asha hears a fault in it. Their disagreement becomes the scene’s action, without a speech explaining the theme.",
      },
    ],
    simulation: [
      { label: "Draft target", value: "112 pages", context: "Illustrative planning target" },
      { label: "Beat cards", value: "48", context: "Synthetic breakdown count" },
      { label: "Open story questions", value: "7", context: "Review queue simulation" },
    ],
    boundary: "Generated story material is a starting draft. Originality, cultural context, authorship, and rights need human review.",
  },
  "pre-production": {
    artifacts: [
      {
        title: "Production breakdown",
        text: "Plan around three principal roles, two community settings, one substation set, a festival sequence, rain effects, and a night exterior. All people, places, access, safety, and equipment remain unconfirmed planning placeholders.",
      },
      {
        title: "Schedule scenario",
        text: "Draft 30 shoot days across 6 weeks: 12 day interiors, 8 day exteriors, 6 night units, and 4 weather / company-move buffers. Re-sequence only after a real location and safety review.",
      },
      {
        title: "Illustrative cost envelope",
        text: "₹6.5 crore scenario envelope: crew and cast 38%, locations and art 17%, camera / sound / lighting 14%, travel and lodging 11%, post 12%, contingency 8%. This is synthetic arithmetic for workflow testing—not a quote, budget recommendation, or funding commitment.",
      },
    ],
    simulation: [
      { label: "Shoot days", value: "30 planned", context: "Scenario only" },
      { label: "Contingency", value: "8%", context: "Synthetic assumption" },
      { label: "Dependencies", value: "6 unresolved", context: "Access, safety, rights, people, weather, finance" },
    ],
    boundary: "No crew, site, permission, insurance, vendor, finance, or booking has been contacted or confirmed.",
  },
  production: {
    artifacts: [
      {
        title: "Simulated day report · Day 12",
        text: "Planned scenes: 5 · completed: 4 · moved: 1 (rain continuity) · safety incidents: 0 in this synthetic record · next action: review the night exterior plan before call-sheet approval.",
      },
      {
        title: "Call-sheet draft",
        text: "Unit: Coastal Line · fictional location · call 06:30 · first setup 07:15 · weather hold 13:00 · emergency contact: not configured. This mock call sheet must never be used to assemble a real crew.",
      },
      {
        title: "Scenario decision",
        text: "A two-hour weather delay consumes half of the planned buffer. The simulation proposes moving the festival insert to the covered set and holding the night exterior for a qualified safety check.",
      },
    ],
    simulation: [
      { label: "Schedule", value: "18 / 30 days", context: "Synthetic run" },
      { label: "Scenes", value: "41 / 86", context: "Synthetic run" },
      { label: "Variance", value: "+2 hours", context: "Weather scenario" },
    ],
    boundary: "No shoot occurred. Crew, incident, schedule, and call-sheet values are fabricated test data.",
  },
  "post-production": {
    artifacts: [
      {
        title: "Editorial assembly note",
        text: "Keep the power-line motif as a sound bridge between the three homes. Test a quieter midpoint so Mira’s recording becomes an active choice rather than background texture.",
      },
      {
        title: "Finishing plan",
        text: "Picture lock review → color and effects turnover → dialogue edit → original score and licensed-material review → stereo / 5.1 mix checks → caption and subtitle review → checksum and playback QC.",
      },
      {
        title: "Synthetic QC report",
        text: "Mock review found 2 open picture notes, 1 subtitle timing issue, and 0 real delivery masters. The simulated gate stays blocked until a human owner resolves and records every required check.",
      },
    ],
    simulation: [
      { label: "Target runtime", value: "124 min", context: "Draft target" },
      { label: "Review notes", value: "3 open", context: "Synthetic QC" },
      { label: "Masters", value: "0 delivered", context: "No files generated" },
    ],
    boundary: "These are workflow examples only. No footage, sound mix, captions, or deliverables exist.",
  },
  release: {
    artifacts: [
      {
        title: "Release path scenario",
        text: "Option A: limited festival submissions → regional theatrical conversations → later streaming evaluation. Option B: community preview screenings → direct distributor discussions. Compare rights, territory, deliverables, and timing with qualified partners before choosing.",
      },
      {
        title: "Campaign generation",
        text: "Tagline draft: “The future has a family address.” Materials queue: 60-second tone teaser, character-led poster concepts, filmmaker note, accessibility checklist, and a press kit with all fictional details clearly labeled.",
      },
      {
        title: "Audience scenario",
        text: "Synthetic case: 12 preview screenings × 120 seats × 65% attendance = 936 illustrative admissions. This arithmetic is not a demand forecast, sales estimate, or booked screening schedule.",
      },
    ],
    simulation: [
      { label: "Release status", value: "Not released", context: "No distribution" },
      { label: "Confirmed partners", value: "0", context: "No outreach made" },
      { label: "Scenario attendance", value: "936", context: "Synthetic only" },
    ],
    boundary: "No rights clearance, certification, festival submission, distributor, screening, release date, revenue, or audience report is confirmed.",
  },
};

const alternateArtifacts: Partial<Record<FilmStageId, GeneratedArtifact>> = {
  ideation: {
    title: "Alternate story angle",
    text: "Asha’s family runs a small repair shop beside a new freight corridor. When its first major contract arrives, they must choose between rapid expansion and remaining a place where the neighborhood can still afford repairs.",
  },
  script: {
    title: "Alternate midpoint",
    text: "During a public demonstration, the prototype fails quietly rather than spectacularly. Mira’s unedited recording reveals that the most important disagreement happened before anyone took the stage.",
  },
  "pre-production": {
    title: "Alternate schedule scenario",
    text: "A 34-day schedule adds four protected weather / company-move days and separates festival crowd work from night exteriors. The longer plan needs a fresh cost review before it can be considered.",
  },
  production: {
    title: "Alternate day report · Day 12",
    text: "Planned scenes: 4 · completed: 4 · moved: 0 · delay: 0 · next action: confirm continuity photos and department notes in the mock handover.",
  },
  "post-production": {
    title: "Alternate edit note",
    text: "Open on the sound of three work shifts beginning at different hours. Delay the title card until the family has made its first shared decision.",
  },
  release: {
    title: "Alternate audience scenario",
    text: "Synthetic case: 8 preview screenings × 90 seats × 50% attendance = 360 illustrative admissions. Scenario arithmetic only; no bookings or demand evidence.",
  },
};

export function getFilmStagePacket(
  stage: FilmStageId,
  generationRevision: number,
): FilmStagePacket & { version: number } {
  const source = packets[stage];
  const version = Math.max(1, generationRevision);
  const alternate = alternateArtifacts[stage];
  return {
    ...source,
    version,
    artifacts:
      version % 2 === 0 && alternate
        ? [alternate, ...source.artifacts.slice(1)]
        : source.artifacts,
  };
}
