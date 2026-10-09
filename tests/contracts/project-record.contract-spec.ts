// Synthetic project, synthetic digests, synthetic model names.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  approveVersion,
  createProjectRecord,
  currentView,
  newProjectId,
  previewVersion,
  validateArtifactRef,
  validateProjectRecord,
  type ArtifactRef,
  type VersionProposal,
} from "../../apps/shared/contracts/project-record.ts";
import { checkOrdering } from "../../apps/shared/contracts/project-events.ts";

const sha = (c: string) => `sha256:${c.repeat(64)}`;
const idea: ArtifactRef = {
  artifactId: "idea-1", kind: "idea", storage: { app: "tlps", localKey: "tlps.planning.workspace.v1/idea" },
  sha256: sha("a"), bytes: 120, origin: { kind: "user-input", models: [] },
};
const scriptDraft: ArtifactRef = {
  artifactId: "script-1", kind: "script-draft", storage: { app: "brahmini", localKey: "drafts/script-1.md" },
  sha256: sha("b"), bytes: 4096,
  origin: { kind: "provider-draft", models: [{ modelId: "synthetic-chat-model", version: "1", digest: null, role: "chat", runtime: "ollama", qualification: "unqualified" }] },
};
const video: ArtifactRef = {
  artifactId: "video-1", kind: "video", storage: { app: "maataa-workstation", localKey: "jobs/ltx-0001" },
  sha256: sha("c"), bytes: 1_000_000,
  origin: { kind: "provider-draft", models: [
    { modelId: "synthetic-ltx-video", version: null, digest: null, role: "video-generator", runtime: "comfyui", qualification: "unqualified" },
    { modelId: "synthetic-gemma", version: null, digest: null, role: "text-encoder", runtime: "comfyui", qualification: "unqualified" },
  ] },
};

const fixedId = () => newProjectId(() => "11111111-2222-4333-8444-555555555555");
const propose = (base: number, artifacts: ArtifactRef[], projectId: string, summary = "Add idea"): VersionProposal =>
  ({ projectId, baseVersion: base, summary, artifacts, checks: [], proposedBy: "brahmini" });

test("project ID is stable, opaque and validated", () => {
  assert.equal(fixedId(), "prj:11111111-2222-4333-8444-555555555555");
  assert.match(newProjectId(), /^prj:[0-9a-f-]{36}$/);
  assert.throws(() => newProjectId(() => "not-a-uuid"));
  const r = createProjectRecord({ title: " Synthetic Monsoon ", domain: "film-production", ownerApp: "tlps", projectId: fixedId() });
  assert.equal(r.currentVersion, 0);
  assert.equal(r.title, "Synthetic Monsoon");
});

test("propose → preview → approve creates v1 then v2; all apps see the same ID and current version", async () => {
  let r = createProjectRecord({ title: "Synthetic Monsoon", domain: "film-production", ownerApp: "tlps", projectId: fixedId() });
  const p1 = await previewVersion(r, propose(0, [idea], r.projectId));
  assert.equal(p1.conflict, null);
  const a1 = await approveVersion(r, p1, { proposalDigest: p1.digest, decidedBy: "local-user" }, [], "maataa-desktop:project-record", () => 10);
  r = a1.record;
  const p2 = await previewVersion(r, propose(1, [idea, scriptDraft], r.projectId, "Add script draft"));
  const a2 = await approveVersion(r, p2, { proposalDigest: p2.digest, decidedBy: "local-user" }, a1.events, "maataa-desktop:project-record", () => 11);
  r = a2.record;
  assert.equal(r.currentVersion, 2);
  assert.deepEqual(validateProjectRecord(r), []);
  assert.deepEqual(checkOrdering(a2.events), []);
  assert.deepEqual(a2.events.map((e) => e.action), ["proposal-approved", "project-created", "proposal-approved", "project-updated"]);
  // Desktop, Brahmini and TLPS all render from the same record → identical view.
  const views = ["maataa-desktop", "brahmini", "tlps"].map(() => currentView(r));
  assert.deepEqual(new Set(views.map((v) => `${v.projectId}@v${v.currentVersion}`)).size, 1);
  assert.deepEqual(views[0].artifactKinds, ["idea", "script-draft"]);
});

test("a proposal from a stale copy is rejected as a conflict, never merged silently", async () => {
  let r = createProjectRecord({ title: "Synthetic", domain: "film-production", ownerApp: "tlps", projectId: fixedId() });
  const p1 = await previewVersion(r, propose(0, [idea], r.projectId));
  r = (await approveVersion(r, p1, { proposalDigest: p1.digest, decidedBy: "local-user" }, [], "test:record")).record;
  const stale = await previewVersion(r, propose(0, [scriptDraft], r.projectId, "From an old copy"));
  assert.match(stale.conflict!, /stale-base/);
  await assert.rejects(approveVersion(r, stale, { proposalDigest: stale.digest, decidedBy: "local-user" }, [], "test:record"), /Conflict/);
  assert.equal(r.currentVersion, 1);
});

test("approval must match the exact preview; record input is never mutated", async () => {
  const r = createProjectRecord({ title: "Synthetic", domain: "film-production", ownerApp: "tlps", projectId: fixedId() });
  const p = await previewVersion(r, propose(0, [idea], r.projectId));
  await assert.rejects(approveVersion(r, p, { proposalDigest: sha("f"), decidedBy: "local-user" }, [], "test:record"), /does not match/);
  const tampered = { ...p, proposal: { ...p.proposal, summary: "Something else" } };
  await assert.rejects(approveVersion(r, tampered, { proposalDigest: p.digest, decidedBy: "local-user" }, [], "test:record"), /changed after preview/);
  const before = JSON.stringify(r);
  await approveVersion(r, p, { proposalDigest: p.digest, decidedBy: "local-user" }, [], "test:record");
  assert.equal(JSON.stringify(r), before);
});

test("models are recorded by role; a model name is never a qualification claim", () => {
  assert.deepEqual(validateArtifactRef(video), []);
  const roles = video.origin.models.map((m) => m.role);
  assert.deepEqual(roles, ["video-generator", "text-encoder"]);
  const noRole = structuredClone(video); (noRole.origin.models[1] as { role: string }).role = "ai-model";
  assert.ok(validateArtifactRef(noRole).includes("model-role"));
  const fakeQualified = structuredClone(scriptDraft); (fakeQualified.origin.models[0] as { qualification: unknown }).qualification = "qualified";
  assert.ok(validateArtifactRef(fakeQualified).includes("model-qualification"));
  const draftWithoutModel = structuredClone(scriptDraft); draftWithoutModel.origin.models = [];
  assert.ok(validateArtifactRef(draftWithoutModel).includes("provider-draft-without-model"));
  const userInputWithModel = structuredClone(idea); userInputWithModel.origin.models = scriptDraft.origin.models;
  assert.ok(validateArtifactRef(userInputWithModel).includes("non-model-origin-lists-models"));
});

test("record holds references only: content fields and unsafe storage keys are rejected", () => {
  const withContent = { ...scriptDraft, content: "INT. LIGHTHOUSE - NIGHT" };
  assert.ok(validateArtifactRef(withContent).includes("artifact-unknown-field"));
  for (const localKey of ["../../etc/passwd", "drafts/../../secret", "/abs/path", "https://x", "file:///etc"]) {
    assert.ok(validateArtifactRef({ ...idea, storage: { app: "tlps", localKey } }).includes("artifact-storage"), localKey);
  }
  assert.ok(validateArtifactRef({ ...idea, sha256: "abc" }).includes("artifact-sha256"));
});

test("corrupted records fail validation (version gaps, wrong current version, bad time basis)", async () => {
  let r = createProjectRecord({ title: "Synthetic", domain: "film-production", ownerApp: "tlps", projectId: fixedId() });
  const p = await previewVersion(r, propose(0, [idea], r.projectId));
  r = (await approveVersion(r, p, { proposalDigest: p.digest, decidedBy: "local-user" }, [], "test:record")).record;
  assert.ok(validateProjectRecord({ ...r, currentVersion: 5 }).includes("current-version"));
  assert.ok(validateProjectRecord({ ...r, versions: [{ ...r.versions[0], version: 3 }] }).includes("version-0-number"));
  assert.ok(validateProjectRecord({ ...r, versions: [{ ...r.versions[0], timeBasis: "hemant-samwat" }] }).includes("version-0-time-basis"));
  assert.ok(validateProjectRecord({ ...r, projectId: "tlps:workspace" }).includes("project-id"));
});
