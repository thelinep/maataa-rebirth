import { test } from "node:test";
import assert from "node:assert/strict";
import { TLPS_PROJECT_TYPES, type TlpsDraft } from "../../apps/tlps/src/types.ts";
import { createSyntheticProposal } from "../../apps/shared/contracts/tlps-intake-flow.ts";
import {
  ALLOWLISTED_ACTIONS,
  createApprovedActionExecutor,
  planTlpsIntakeAction,
  type ActionProposal,
} from "../../apps/shared/contracts/brahmini-actions.ts";

const base: TlpsDraft = {
  schemaVersion: 1,
  project: { title: "", city: "", productionType: "Feature Film", shootDate: "", ceiling: 500000 },
  budget: [], crew: [], locations: [], schedule: [],
  status: "draft", approvalNote: "", tasks: { setup: false, rehearsal: false, wrap: false },
  evidence: [], activity: [],
};
const proposalFor = () => createSyntheticProposal("Documentary about a synthetic river festival", TLPS_PROJECT_TYPES);

test("allowlist contains only the digest-bound TLPS intake action", () => {
  assert.deepEqual([...ALLOWLISTED_ACTIONS], ["tlps.intake.create-record"]);
});

test("planning never commits and is marked non-executing", async () => {
  let commits = 0;
  createApprovedActionExecutor(async () => { commits += 1; });
  const plan = await planTlpsIntakeAction(proposalFor(), base, null);
  assert.equal(plan.executes, false);
  assert.equal(commits, 0);
});

test("execution requires matching approval, then commits exactly once", async () => {
  const committed: string[] = [];
  const execute = createApprovedActionExecutor(async ({ record }) => { committed.push(record.project.title); }, () => 3);
  const plan = await planTlpsIntakeAction(proposalFor(), base, null);
  await assert.rejects(execute(plan, null, []), /approval-required/);
  await assert.rejects(execute(plan, { actionId: plan.actionId, digest: "sha256:" + "1".repeat(64), decidedBy: "local-user" }, []), /approval-mismatch/);
  assert.deepEqual(committed, []);
  const result = await execute(plan, { actionId: plan.actionId, digest: plan.digest, decidedBy: "local-user" }, []);
  assert.deepEqual(result.events.map((e) => e.action), ["proposal-created", "proposal-approved", "record-created"]);
  assert.equal(committed.length, 1);
  await assert.rejects(execute(plan, { actionId: plan.actionId, digest: plan.digest, decidedBy: "local-user" }, []), /approval-already-used/);
  assert.equal(committed.length, 1);
});

test("non-allowlisted actions are refused even with an approval", async () => {
  let commits = 0;
  const execute = createApprovedActionExecutor(async () => { commits += 1; });
  const plan = await planTlpsIntakeAction(proposalFor(), base, null);
  for (const actionId of ["os.click", "os.type", "shell.exec", "fs.write", "browser.open", "brahmini.scaffold.create"]) {
    const forged: ActionProposal = { ...plan, actionId };
    await assert.rejects(execute(forged, { actionId, digest: plan.digest, decidedBy: "local-user" }, []), /action-not-allowlisted/);
  }
  assert.equal(commits, 0);
});

test("existing TLPS project blocks execution and nothing is committed", async () => {
  let commits = 0;
  const execute = createApprovedActionExecutor(async () => { commits += 1; });
  const existing: TlpsDraft = { ...base, project: { ...base.project, title: "Keep me" } };
  const plan = await planTlpsIntakeAction(proposalFor(), base, existing);
  await assert.rejects(execute(plan, { actionId: plan.actionId, digest: plan.digest, decidedBy: "local-user" }, []), /preserved/);
  assert.equal(commits, 0);
});

test("concurrent replay is refused; a failed host commit leaves the approval retryable", async () => {
  let attempts = 0;
  const execute = createApprovedActionExecutor(async () => {
    attempts += 1;
    if (attempts === 1) throw new Error("disk full (synthetic)");
  });
  const plan = await planTlpsIntakeAction(proposalFor(), base, null);
  const approval = { actionId: plan.actionId, digest: plan.digest, decidedBy: "local-user" as const };
  await assert.rejects(execute(plan, approval, []), /disk full/);
  const [first, second] = await Promise.allSettled([execute(plan, approval, []), execute(plan, approval, [])]);
  assert.equal(first.status, "fulfilled");
  assert.equal(second.status, "rejected");
  assert.match(String((second as PromiseRejectedResult).reason), /approval-already-used/);
  assert.equal(attempts, 2);
});
