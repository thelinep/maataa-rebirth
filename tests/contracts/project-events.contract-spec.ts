// Synthetic records only.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  appendProjectEvent,
  checkOrdering,
  compareWithinScope,
  migrateTauriWorkspaceIndex,
  migrateTlpsActivity,
  PROJECT_EVENT_RETENTION_LIMIT,
  TAURI_REGISTRY_SCOPE,
  validateProjectEvent,
  type AppendInput,
  type ProjectEventEnvelope,
} from "../../apps/shared/contracts/project-events.ts";

const input: AppendInput = {
  project: { id: "tlps:workspace", product: "tlps" },
  source: { app: "tlps", component: "intake-flow" },
  actor: { kind: "local-user", id: "local-user" },
  action: "project-created",
  evidence: "synthetic-demo",
  payload: { title: "Synthetic Monsoon Short", projectType: "Short Film", status: "draft" },
};

test("append assigns per-scope sequence, unverified host time and validates", () => {
  let log: ProjectEventEnvelope[] = [];
  log = appendProjectEvent(log, "tlps:local", input, () => 42);
  log = appendProjectEvent(log, "tlps:local", { ...input, action: "project-updated" }, () => 41);
  assert.deepEqual(log.map((e) => [e.eventId, e.sequence]), [["tlps:local#1", 1], ["tlps:local#2", 2]]);
  assert.equal(log[0].time.basis, "host-unix-clock-unverified");
  // A later event with an EARLIER host clock is still ordered by sequence, not time.
  assert.equal(compareWithinScope(log[0], log[1])! < 0, true);
  assert.deepEqual(checkOrdering(log), []);
});

test("cross-scope comparison is refused rather than inferred from timestamps", () => {
  const a = appendProjectEvent([], "tlps:local", input, () => 1)[0];
  const b = appendProjectEvent([], "tlp-film:local", { ...input, project: { id: "tlp-film:workspace", product: "tlp-film" }, source: { app: "tlp-film", component: "workspace" } }, () => 2)[0];
  assert.equal(compareWithinScope(a, b), null);
  assert.throws(() => appendProjectEvent([a], "tlp-film:local", input));
});

test("retention keeps the newest events up to the limit", () => {
  let log: ProjectEventEnvelope[] = [];
  for (let i = 0; i < PROJECT_EVENT_RETENTION_LIMIT + 3; i += 1) log = appendProjectEvent(log, "tlps:local", input, () => i);
  assert.equal(log.length, PROJECT_EVENT_RETENTION_LIMIT);
  assert.equal(log[0].sequence, 4);
  assert.equal(log.at(-1)!.sequence, PROJECT_EVENT_RETENTION_LIMIT + 3);
});

test("payload refuses content fields: scripts, budgets, crew, personal data", () => {
  for (const key of ["script", "budget", "crew", "email", "phone", "notes"]) {
    assert.throws(() => appendProjectEvent([], "tlps:local", { ...input, payload: { [key]: "x" } as never }), new RegExp(key));
  }
  assert.throws(() => appendProjectEvent([], "tlps:local", { ...input, payload: { title: "x".repeat(121) } }));
  assert.throws(() => appendProjectEvent([], "tlps:local", { ...input, payload: { proposalDigest: "sha256:XYZ" } }));
});

test("malformed and over-claiming records are rejected", () => {
  const good = appendProjectEvent([], "tlps:local", input, () => 5)[0];
  const variants: [string, unknown][] = [
    ["not-an-object", "event"],
    ["unsupported-schema", { ...good, schema: "maataa.project-event/2.0.0" }],
    ["unverified-or-unknown-time-basis", { ...good, time: { recordedAt: 5, basis: "hemant-samwat" } }],
    ["unverified-or-unknown-time-basis", { ...good, time: { recordedAt: 5, basis: "k7-boot-clock" } }],
    ["invalid-sequence", { ...good, sequence: 0, eventId: "tlps:local#0" }],
    ["event-id-mismatch", { ...good, eventId: "tlps:local#9" }],
    ["invalid-project", { ...good, project: { id: "tlps:workspace", product: "nevo" } }],
    ["invalid-actor", { ...good, actor: { kind: "admin", id: "root" } }],
    ["unknown-top-level-field", { ...good, globalOrder: 1 }],
    ["invalid-recorded-at", { ...good, time: { recordedAt: -1, basis: "host-unix-clock-unverified" } }],
  ];
  for (const [error, value] of variants) {
    const result = validateProjectEvent(value);
    assert.equal(result.ok, false, error);
    if (!result.ok) assert.ok(result.errors.includes(error), `${error}: ${result.errors}`);
  }
  assert.equal(validateProjectEvent(good).ok, true);
});

test("checkOrdering detects duplicates and regressions per scope", () => {
  const log = appendProjectEvent(appendProjectEvent([], "tlps:local", input), "tlps:local", input);
  assert.deepEqual(checkOrdering([log[1], log[0]]), ["out-of-order:tlps:local#1"]);
  assert.deepEqual(checkOrdering([log[0], log[0]]), ["out-of-order:tlps:local#1"]);
});

test("Tauri v1 index migrates to zero events; v2 events map compatibly without source mutation", () => {
  assert.deepEqual(migrateTauriWorkspaceIndex({ version: 1, projects: [] }).events, []);
  const v2 = {
    version: 2,
    projects: [{ id: "tlps:workspace", product: "tlps", title: "Synthetic", projectType: "Short Film", status: "draft", updatedAt: 2, sample: false }],
    events: [
      { sequence: 1, projectId: "tlps:workspace", product: "tlps", action: "project-created", source: "maataa-desktop-local", recordedAtUnixMs: 10, timeBasis: "host-unix-clock-unverified" },
      { sequence: 2, projectId: "tlps:workspace", product: "tlps", action: "project-renamed-by-ai", source: "maataa-desktop-local", recordedAtUnixMs: 11, timeBasis: "host-unix-clock-unverified" },
      { sequence: 3, projectId: "tlps:workspace", product: "tlps", action: "project-updated", source: "elsewhere", recordedAtUnixMs: 12, timeBasis: "host-unix-clock-unverified" },
      { sequence: 4, projectId: "tlps:workspace", product: "tlps", action: "project-removed", source: "maataa-desktop-local", recordedAtUnixMs: 9, timeBasis: "host-unix-clock-unverified" },
    ],
  };
  const before = JSON.stringify(v2);
  const report = migrateTauriWorkspaceIndex(v2);
  assert.equal(JSON.stringify(v2), before);
  assert.deepEqual(report.events.map((e) => [e.sequence, e.action, e.actor.kind, e.provenance.migratedFrom]), [
    [1, "project-created", "unrecorded", "tauri-workspace-index-v2"],
    [4, "project-removed", "unrecorded", "tauri-workspace-index-v2"],
  ]);
  assert.equal(report.events[0].orderingScope, TAURI_REGISTRY_SCOPE);
  assert.deepEqual(report.rejected.map((r) => r.reason), ["unknown-v2-action", "unexpected-v2-source-or-time-basis"]);
});

test("Tauri migration fails closed on unsupported, oversized, or out-of-order indexes", () => {
  assert.throws(() => migrateTauriWorkspaceIndex({ version: 4, projects: [], events: [] }));
  assert.throws(() => migrateTauriWorkspaceIndex("{}"));
  const e = (sequence: number) => ({ sequence, projectId: "tlps:workspace", product: "tlps", action: "project-updated", source: "maataa-desktop-local", recordedAtUnixMs: 1, timeBasis: "host-unix-clock-unverified" });
  assert.throws(() => migrateTauriWorkspaceIndex({ version: 2, projects: [], events: [e(2), e(1)] }), /out of order/);
  assert.throws(() => migrateTauriWorkspaceIndex({ version: 2, projects: [], events: Array.from({ length: 501 }, (_, i) => e(i + 1)) }));
});

test("TLPS activity migrates as legacy-iso-unverified labels only", () => {
  const report = migrateTlpsActivity([
    { action: "Plan submitted for owner review", at: "2026-10-01T10:00:00.000Z" },
    { action: "Bad time", at: "not-a-date" },
    { nope: true },
  ]);
  assert.equal(report.events.length, 2);
  assert.equal(report.events[0].time.basis, "legacy-iso-unverified");
  assert.equal(report.events[1].time.recordedAt, null);
  assert.deepEqual(Object.keys(report.events[0].payload), ["legacyLabel"]);
  assert.deepEqual(report.rejected, [{ index: 2, reason: "malformed-tlps-activity" }]);
  for (const event of report.events) assert.equal(validateProjectEvent(event).ok, true);
});

test("Tauri v3 index: record-linked events keep their record version; bad versions are rejected", () => {
  const e = (sequence: number, extra: Record<string, unknown> = {}) => ({ sequence, projectId: "prj:11111111-2222-4333-8444-555555555555", product: "tlps", action: sequence === 1 ? "project-created" : "project-updated", source: "maataa-desktop-local", recordedAtUnixMs: sequence, timeBasis: "host-unix-clock-unverified", ...extra });
  const report = migrateTauriWorkspaceIndex({ version: 3, projects: [], events: [e(1, { recordVersion: 1 }), e(2, { recordVersion: 2 }), e(3, { recordVersion: 0 }), e(4)] });
  assert.deepEqual(report.events.map((x) => [x.sequence, x.project.id, x.payload.status]), [[1, "prj:11111111-2222-4333-8444-555555555555", "v1"], [2, "prj:11111111-2222-4333-8444-555555555555", "v2"], [4, "prj:11111111-2222-4333-8444-555555555555", undefined]]);
  assert.deepEqual(report.rejected, [{ index: 2, reason: "invalid-v3-record-version" }]);
});
