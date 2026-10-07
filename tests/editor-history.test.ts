import { describe, expect, it } from "vitest";
import { createEditorHistory, parseEditorDocument, redoEditorHistory, serializeEditorDocument, undoEditorHistory, updateEditorHistory } from "../src/editor/history";

describe("shared editor document history", () => {
  it("supports bounded undo and redo while preserving undefined as a valid value", () => {
    let history = createEditorHistory<string | undefined>(undefined, 2);
    history = updateEditorHistory(history, "one");
    history = updateEditorHistory(history, "two");
    history = updateEditorHistory(history, "three");
    expect(history.past).toEqual(["one", "two"]);
    history = undoEditorHistory(history);
    expect(history.present).toBe("two");
    history = redoEditorHistory(history);
    expect(history.present).toBe("three");
    history = updateEditorHistory(history, "new branch");
    expect(history.future).toEqual([]);
  });

  it("serializes portable JSON and validates imports with a byte limit", () => {
    const source = serializeEditorDocument({ schema: "demo.v1", title: "Review draft" });
    expect(parseEditorDocument(source, (value): value is { schema: string; title: string } => Boolean(value && typeof value === "object" && "schema" in value && "title" in value))).toEqual({ schema: "demo.v1", title: "Review draft" });
    expect(() => parseEditorDocument("{", (_value): _value is unknown => true)).toThrow(/valid JSON/);
    expect(() => parseEditorDocument(source, (_value): _value is { schema: string } => true, 8)).toThrow(/import size/);
    expect(() => parseEditorDocument("null", (value): value is { schema: string } => Boolean(value && typeof value === "object" && "schema" in value))).toThrow(/expected schema/);
  });
});
