import { test } from "node:test";
import assert from "node:assert/strict";
import { startFromIdea, normalizeIdea, scriptDraftMessages, SCRIPT_SYSTEM_PROMPT } from "../../apps/shared/contracts/idea-to-script.ts";
import { approveVersion } from "../../apps/shared/contracts/project-record.ts";
import {
  IDEA_TO_SCRIPT_STORE_SCHEMA,
  parseIdeaToScriptStore,
  serializeIdeaToScriptStore,
  type IdeaToScriptStore,
} from "../../apps/shared/contracts/idea-to-script-store.ts";

async function stored(): Promise<IdeaToScriptStore> {
  const idea = "  A keeper   records monsoon sounds ";
  const { record, preview } = await startFromIdea("Synthetic", idea, "prj:aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee");
  const approved = await approveVersion(record, preview, { proposalDigest: preview.digest, decidedBy: "local-user" }, [], "tlps:idea-to-script", () => 5);
  return { schema: IDEA_TO_SCRIPT_STORE_SCHEMA, record: approved.record, events: approved.events, contents: { [approved.record.versions[0].artifacts[0].sha256]: normalizeIdea(idea) } };
}

test("store round-trips and verifies content hashes", async () => {
  const store = await stored();
  const { store: loaded, error } = await parseIdeaToScriptStore(serializeIdeaToScriptStore(store));
  assert.equal(error, null);
  assert.equal(loaded?.record.projectId, store.record.projectId);
  assert.deepEqual(await parseIdeaToScriptStore(null), { store: null, error: null });
});

test("store fails closed on tampered content, missing content, bad events or unknown format", async () => {
  const store = await stored();
  const hash = Object.keys(store.contents)[0];
  for (const [label, broken] of [
    ["tampered content", { ...store, contents: { [hash]: "edited later" } }],
    ["missing content", { ...store, contents: {} }],
    ["bad events", { ...store, events: [store.events[1], store.events[0]] }],
    ["unknown format", { ...store, schema: "other" }],
    ["invalid record", { ...store, record: { ...store.record, currentVersion: 9 } }],
  ] as const) {
    const result = await parseIdeaToScriptStore(JSON.stringify(broken));
    assert.equal(result.store, null, label);
    assert.ok(result.error, label);
  }
  assert.ok((await parseIdeaToScriptStore("{not json")).error);
});

test("the Brahmini script prompt is fixed, bounded and asks for screenplay format only", () => {
  assert.match(SCRIPT_SYSTEM_PROMPT, /INT\. or EXT\./);
  assert.match(SCRIPT_SYSTEM_PROMPT, /Do not claim the script is final/);
  const messages = scriptDraftMessages(" Title ", "x".repeat(3000));
  assert.equal(messages.length, 1);
  assert.ok(messages[0].content.length < 2200);
  assert.throws(() => scriptDraftMessages("", "idea"));
});
