import { test } from "node:test";
import assert from "node:assert/strict";
import {
  checkWriteBase,
  describeContextStatus,
  parseProjectContext,
  projectContextFromLocation,
  projectContextQuery,
  reconcileContext,
} from "../../apps/shared/contracts/project-context.ts";

const ID = "prj:0f0e0d0c-0b0a-4908-8706-050403020100";
const OTHER = "prj:11111111-2222-4333-8444-555555555555";

test("valid context carries only a prj ID and a version", () => {
  assert.deepEqual(parseProjectContext(`?project=${ID}&version=2`), { ok: true, context: { recordId: ID, recordVersion: 2 } });
  assert.equal(projectContextQuery({ recordId: ID, recordVersion: 2 }), `project=${encodeURIComponent(ID)}&version=2`);
  assert.deepEqual(parseProjectContext(projectContextQuery({ recordId: ID, recordVersion: 7 })), { ok: true, context: { recordId: ID, recordVersion: 7 } });
});

test("missing, invalid ID and invalid version are distinguished", () => {
  assert.deepEqual(parseProjectContext(""), { ok: false, reason: "missing" });
  assert.deepEqual(parseProjectContext("?surface=idea-to-script"), { ok: false, reason: "missing" });
  for (const id of ["tlps:workspace", "prj:NOT-A-UUID", `${ID.toUpperCase()}`, `${ID}&x=1`, ""]) {
    assert.deepEqual(parseProjectContext(new URLSearchParams({ project: id, version: "1" })), { ok: false, reason: "invalid-id" }, id);
  }
  for (const version of ["0", "-1", "1.5", "201", "01", "abc", ""]) {
    assert.deepEqual(parseProjectContext(new URLSearchParams({ project: ID, version })), { ok: false, reason: "invalid-version" }, version);
  }
  assert.deepEqual(parseProjectContext(`?project=${ID}`), { ok: false, reason: "invalid-version" });
  assert.deepEqual(parseProjectContext("?version=2"), { ok: false, reason: "invalid-id" });
  assert.throws(() => projectContextQuery({ recordId: "prj:bad", recordVersion: 1 }));
  assert.throws(() => projectContextQuery({ recordId: ID, recordVersion: 0 }));
});

test("context is read from the query or from a hash route", () => {
  assert.deepEqual(projectContextFromLocation({ search: "", hash: `#/brahmini?project=${ID}&version=3` }), { ok: true, context: { recordId: ID, recordVersion: 3 } });
  assert.deepEqual(projectContextFromLocation({ search: `?project=${ID}&version=1`, hash: "" }), { ok: true, context: { recordId: ID, recordVersion: 1 } });
  assert.deepEqual(projectContextFromLocation({ search: "", hash: "#/brahmini?from=%2F" }), { ok: false, reason: "missing" });
  assert.deepEqual(projectContextFromLocation({ search: "?project=bad&version=1", hash: `#/x?project=${ID}&version=1` }), { ok: false, reason: "invalid-id" });
});

test("reconcile against the authoritative local record", () => {
  const ctx = { recordId: ID, recordVersion: 2 };
  assert.deepEqual(reconcileContext(ctx, { projectId: ID, currentVersion: 2 }), { status: "current", version: 2 });
  const newer = reconcileContext(ctx, { projectId: ID, currentVersion: 3 });
  assert.deepEqual(newer, { status: "newer-available", contextVersion: 2, currentVersion: 3 });
  assert.match(describeContextStatus(newer), /refused/);
  assert.equal(reconcileContext(ctx, { projectId: ID, currentVersion: 1 }).status, "ahead-of-record");
  assert.equal(reconcileContext(ctx, { projectId: OTHER, currentVersion: 2 }).status, "different-record");
  assert.deepEqual(reconcileContext(ctx, null, "TLPS unavailable"), { status: "unavailable", reason: "TLPS unavailable" });
});

test("writes are refused unless the stored record is still the edited base", () => {
  assert.deepEqual(checkWriteBase(null, null), { ok: true });
  assert.equal(checkWriteBase(null, { projectId: ID, currentVersion: 1 }).ok, false);
  assert.deepEqual(checkWriteBase({ projectId: ID, currentVersion: 2 }, { projectId: ID, currentVersion: 2 }), { ok: true });
  const stale = checkWriteBase({ projectId: ID, currentVersion: 2 }, { projectId: ID, currentVersion: 3 });
  assert.equal(stale.ok, false);
  assert.match((stale as { reason: string }).reason, /another window/);
  assert.equal(checkWriteBase({ projectId: ID, currentVersion: 2 }, { projectId: OTHER, currentVersion: 2 }).ok, false);
  assert.equal(checkWriteBase({ projectId: ID, currentVersion: 2 }, null).ok, false);
});
