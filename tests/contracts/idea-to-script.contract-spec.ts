// Synthetic idea, synthetic screenplay text, synthetic model rows.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  approveScriptStep,
  checkScreenplayFormat,
  proposeScriptDraft,
  startFromIdea,
  SCRIPT_DRAFT_LABEL,
} from "../../apps/shared/contracts/idea-to-script.ts";
import { approveVersion, currentView, validateProjectRecord } from "../../apps/shared/contracts/project-record.ts";
import {
  artifactFromLtxJob,
  LTX_TEXT_ENCODER_ID,
  modelUseFromWorkstationModel,
} from "../../apps/shared/contracts/workstation-mapping.ts";
import { checkOrdering } from "../../apps/shared/contracts/project-events.ts";

const PID = "prj:aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";
const ollamaRow = { id: "synthetic-chat:latest", runtime: "ollama", digest: "1".repeat(64), codePlanningQualification: { digest: "1".repeat(64), qualified: [], blocked: ["single-file"] } };
const goodScript = `FADE IN:

INT. LIGHTHOUSE - NIGHT

Rain hammers the glass. ASHA (60s) adjusts a tape recorder.

ASHA
Every storm sounds different.

EXT. CLIFF - DAWN

The sea is quiet.
`;

async function v1() {
  const { record, preview } = await startFromIdea("Synthetic Lighthouse", "A keeper records monsoon sounds", PID);
  return approveVersion(record, preview, { proposalDigest: preview.digest, decidedBy: "local-user" }, [], "tlps:idea-to-script", () => 1);
}

test("deterministic screenplay check: shape only, model-free", () => {
  assert.equal(checkScreenplayFormat(goodScript).passed, true);
  assert.deepEqual(checkScreenplayFormat("Just a paragraph about a film.").notes, ["no-scene-heading", "no-character-cue"]);
  assert.ok(checkScreenplayFormat(goodScript + "\n[INSERT SCENE]\n").notes.includes("placeholder-or-assistant-text"));
  assert.ok(checkScreenplayFormat("As an AI, here is your script.\nINT. ROOM - DAY\n\nBOB\nHi.").notes.includes("placeholder-or-assistant-text"));
  assert.equal(checkScreenplayFormat("   ").passed, false);
});

test("Idea → Script end to end on one project ID: v1 idea, v2 idea + checked draft", async () => {
  const first = await v1();
  assert.equal(first.record.currentVersion, 1);
  const model = modelUseFromWorkstationModel(ollamaRow, "chat");
  assert.equal(model.qualification, "unqualified");
  const { preview, label, format } = await proposeScriptDraft(first.record, { text: goodScript, storageKey: "drafts/synthetic-lighthouse-v1.fountain", model });
  assert.equal(label, SCRIPT_DRAFT_LABEL);
  assert.equal(format.passed, true);
  assert.match(preview.proposal.summary, /model unqualified for scripts/);
  const second = await approveScriptStep(first.record, preview, { proposalDigest: preview.digest, decidedBy: "local-user" }, { "script-draft": goodScript }, first.events, () => 2);
  assert.equal(second.record.projectId, PID);
  assert.equal(second.record.currentVersion, 2);
  assert.deepEqual(validateProjectRecord(second.record), []);
  assert.deepEqual(currentView(second.record).artifactKinds, ["idea", "script-draft"]);
  assert.deepEqual(checkOrdering(second.events), []);
  // Content never enters the record.
  assert.doesNotMatch(JSON.stringify(second.record), /LIGHTHOUSE - NIGHT|monsoon sounds/);
});

test("a draft failing the independent check cannot be approved", async () => {
  const first = await v1();
  const bad = "Here is a lovely story about a lighthouse.";
  const { preview } = await proposeScriptDraft(first.record, { text: bad, storageKey: "drafts/bad.txt", model: modelUseFromWorkstationModel(ollamaRow, "chat") });
  await assert.rejects(approveScriptStep(first.record, preview, { proposalDigest: preview.digest, decidedBy: "local-user" }, { "script-draft": bad }, first.events), /did not pass/);
});

test("forged 'passed' checks and swapped stored text are caught by re-running the check", async () => {
  const first = await v1();
  const bad = "No screenplay here.";
  const { preview } = await proposeScriptDraft(first.record, { text: bad, storageKey: "drafts/bad.txt", model: modelUseFromWorkstationModel(ollamaRow, "chat") });
  const forged = { ...preview, proposal: { ...preview.proposal, checks: preview.proposal.checks.map((c) => ({ ...c, passed: true })) } };
  await assert.rejects(approveScriptStep(first.record, forged, { proposalDigest: forged.digest, decidedBy: "local-user" }, { "script-draft": bad }, []), /independent re-run/);
  const ok = await proposeScriptDraft(first.record, { text: goodScript, storageKey: "drafts/good.fountain", model: modelUseFromWorkstationModel(ollamaRow, "chat") });
  await assert.rejects(approveScriptStep(first.record, ok.preview, { proposalDigest: ok.preview.digest, decidedBy: "local-user" }, { "script-draft": goodScript + " edited" }, []), /does not match the reviewed draft/);
});

test("script drafts require an idea first and a chat/planner model role", async () => {
  const { record } = await startFromIdea("Synthetic", "An idea", PID);
  await assert.rejects(proposeScriptDraft(record, { text: goodScript, storageKey: "d/x", model: modelUseFromWorkstationModel(ollamaRow, "chat") }), /idea first/);
  const first = await v1();
  await assert.rejects(proposeScriptDraft(first.record, { text: goodScript, storageKey: "d/x", model: { ...modelUseFromWorkstationModel(ollamaRow, "chat"), role: "text-encoder" } }), /chat or planner/);
});

test("Workstation mapping: seed fixtures refused, digests required, code qualification honoured only when real", () => {
  for (const id of ["m_qwen", "m_llama", "m_remote"]) assert.throws(() => modelUseFromWorkstationModel({ id, runtime: "llama.cpp" }, "code"), /seed-fixture/);
  assert.throws(() => modelUseFromWorkstationModel({ id: "x:latest", runtime: "ollama" }, "chat"), /digest/);
  assert.equal(modelUseFromWorkstationModel(ollamaRow, "code").qualification, "unqualified");
  const qualified = { ...ollamaRow, codePlanningQualification: { digest: "1".repeat(64), qualified: ["single-file"] } };
  assert.deepEqual(modelUseFromWorkstationModel(qualified, "code").qualification, { evaluationId: "ws-code-planning-111111111111", passed: true });
  assert.equal(modelUseFromWorkstationModel(qualified, "chat").qualification, "unqualified");
  const stale = { ...ollamaRow, codePlanningQualification: { digest: "2".repeat(64), qualified: ["single-file"] } };
  assert.equal(modelUseFromWorkstationModel(stale, "code").qualification, "unqualified");
});

test("Workstation mapping: successful LTX job → video artifact with generator + Gemma text-encoder roles; failures refused", () => {
  const job = { id: "job_SYNTH01", type: "video-ltx", status: "done", mediaIds: ["m1"], settings: { engine: "ltx-2-mlx", model: "dgrauet/ltx-2.3-mlx-q4" } };
  const media = { sha256: `sha256:${"c".repeat(64)}`, bytes: 1234 };
  const artifact = artifactFromLtxJob(job, media);
  assert.deepEqual(artifact.origin.models.map((m) => [m.modelId, m.role]), [["dgrauet/ltx-2.3-mlx-q4", "video-generator"], [LTX_TEXT_ENCODER_ID, "text-encoder"]]);
  assert.equal(artifact.storage.app, "maataa-workstation");
  assert.throws(() => artifactFromLtxJob({ ...job, status: "failed" }, media), /not-successful/);
  assert.throws(() => artifactFromLtxJob({ ...job, mediaIds: [] }, media), /single-output/);
  assert.throws(() => artifactFromLtxJob(job, { sha256: "nope", bytes: 1 }), /digest/);
  assert.throws(() => artifactFromLtxJob({ ...job, type: "image-generation" }, media), /not-an-ltx/);
});
