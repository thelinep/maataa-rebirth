// Synthetic idea + synthetic TLPS drafts only.
import { test } from "node:test";
import assert from "node:assert/strict";
import { TLPS_PROJECT_TYPES, type TlpsDraft } from "../../apps/tlps/src/types.ts";
import {
  createProviderDraftProposal,
  createSyntheticProposal,
  decideIntakeProposal,
  previewIntakeRecord,
  PROVIDER_DRAFT_LABEL,
  SYNTHETIC_PROPOSAL_LABEL,
} from "../../apps/shared/contracts/tlps-intake-flow.ts";
import { checkOrdering, validateProjectEvent } from "../../apps/shared/contracts/project-events.ts";

const base: TlpsDraft = {
  schemaVersion: 1,
  project: { title: "", city: "", productionType: "Feature Film", shootDate: "", ceiling: 500000 },
  budget: [], crew: [], locations: [], schedule: [],
  status: "draft", approvalNote: "", tasks: { setup: false, rehearsal: false, wrap: false },
  evidence: [], activity: [],
};
const existing: TlpsDraft = {
  ...base,
  project: { ...base.project, title: "Existing Synthetic Feature" },
  budget: [{ id: "b1", item: "Camera", quantity: 1, rate: 1000 }],
};
const idea = "A short film about a lighthouse keeper who records monsoon sounds";

test("end to end: idea → labelled synthetic proposal → preview → approve → record + ordered history", async () => {
  const proposal = createSyntheticProposal(idea, TLPS_PROJECT_TYPES);
  assert.equal(proposal.label, SYNTHETIC_PROPOSAL_LABEL);
  assert.equal(proposal.productionType, "Short Film");
  assert.doesNotMatch(proposal.label, /generated production script/i);
  const preview = await previewIntakeRecord(proposal, base, base);
  assert.equal(preview.conflict, null);
  assert.match(preview.proposalDigest, /^sha256:[a-f0-9]{64}$/);
  assert.deepEqual(preview.record.budget, []);
  const outcome = await decideIntakeProposal(preview, { decision: "approve", proposalDigest: preview.proposalDigest, decidedBy: "local-user" }, [], () => 7);
  assert.equal(outcome.record?.project.title, proposal.title);
  assert.equal(outcome.record?.project.idea, proposal.idea);
  assert.deepEqual(outcome.events.map((e) => e.action), ["proposal-created", "proposal-approved", "record-created"]);
  assert.deepEqual(outcome.events.map((e) => e.provenance.evidence), ["synthetic-demo", "synthetic-demo", "synthetic-demo"]);
  assert.deepEqual(checkOrdering(outcome.events), []);
  for (const event of outcome.events) assert.equal(validateProjectEvent(event).ok, true);
  // The returned record is a copy; mutating it cannot alter the approved preview.
  outcome.record!.project.title = "tampered";
  assert.equal(preview.record.project.title, proposal.title);
});

test("nothing is written without an approval for the exact previewed digest", async () => {
  const preview = await previewIntakeRecord(createSyntheticProposal(idea, TLPS_PROJECT_TYPES), base, null);
  await assert.rejects(decideIntakeProposal(preview, { decision: "approve", proposalDigest: "sha256:" + "0".repeat(64), decidedBy: "local-user" }, []), /different preview/);
  const tampered = { ...preview, record: { ...preview.record, budget: [{ id: "x", item: "Injected", quantity: 1, rate: 1 }] } };
  await assert.rejects(decideIntakeProposal(tampered, { decision: "approve", proposalDigest: preview.proposalDigest, decidedBy: "local-user" }, []), /changed after it was shown/);
});

test("existing TLPS project is preserved: approval fails closed", async () => {
  const preview = await previewIntakeRecord(createSyntheticProposal(idea, TLPS_PROJECT_TYPES), base, existing);
  assert.equal(preview.conflict, "existing-tlps-draft");
  await assert.rejects(decideIntakeProposal(preview, { decision: "approve", proposalDigest: preview.proposalDigest, decidedBy: "local-user" }, []), /preserved/);
  assert.equal(existing.project.title, "Existing Synthetic Feature");
  assert.equal(existing.budget.length, 1);
});

test("rejection records history but returns no record", async () => {
  const preview = await previewIntakeRecord(createSyntheticProposal(idea, TLPS_PROJECT_TYPES), base, existing);
  const outcome = await decideIntakeProposal(preview, { decision: "reject", proposalDigest: preview.proposalDigest, decidedBy: "local-user" }, []);
  assert.equal(outcome.record, null);
  assert.deepEqual(outcome.events.map((e) => e.action), ["proposal-created", "proposal-rejected"]);
});

test("provider drafts are labelled as drafts and bounded to TLPS vocabulary", async () => {
  const proposal = createProviderDraftProposal(idea, { title: "Monsoon Keeper", productionType: "Documentary", logline: "x".repeat(400) }, { provider: "ollama", model: "qwen2.5:7b" }, TLPS_PROJECT_TYPES);
  assert.equal(proposal.label, PROVIDER_DRAFT_LABEL);
  assert.equal(proposal.logline.length, 280);
  const preview = await previewIntakeRecord(proposal, base, null);
  const outcome = await decideIntakeProposal(preview, { decision: "approve", proposalDigest: preview.proposalDigest, decidedBy: "local-user" }, []);
  assert.equal(outcome.events[0].provenance.evidence, "provider-draft");
  assert.throws(() => createProviderDraftProposal(idea, { title: "T", productionType: "Space Opera", logline: "" }, { provider: "ollama", model: "m" }, TLPS_PROJECT_TYPES));
  assert.throws(() => createProviderDraftProposal(idea, { title: "T", productionType: "Documentary", logline: "" }, { provider: "Evil Provider", model: "m" }, TLPS_PROJECT_TYPES));
  assert.throws(() => createSyntheticProposal("  ", TLPS_PROJECT_TYPES));
});
