import { describe, expect, it } from "vitest";
import { WORKSPACE_TYPES } from "@maataa/ui/registries/workspaceRegistry";
import { TLPS_WORKSPACE_TYPES } from "../apps/tlps/src/registries/workspaceRegistry";
import { ARTWORK_FRAMES, ARTWORK_WORLDS, WORKSPACE_ARTWORK_FRAMES, SUPPORT_ARTWORK_FRAMES, artworkFilename } from "../examples/support-center/artworkModel";

describe("Arcade Quest artwork coverage", () => {
  it("covers every current MAATAA and TLPS workspace and all twelve help frames", () => {
    expect(WORKSPACE_ARTWORK_FRAMES).toHaveLength(WORKSPACE_TYPES.length + TLPS_WORKSPACE_TYPES.length);
    expect(SUPPORT_ARTWORK_FRAMES).toHaveLength(12);
    expect(new Set(ARTWORK_FRAMES.map((frame) => frame.id)).size).toBe(ARTWORK_FRAMES.length);
    for (const workspace of [...WORKSPACE_TYPES, ...TLPS_WORKSPACE_TYPES]) expect(WORKSPACE_ARTWORK_FRAMES.some((frame) => frame.id === workspace.id), workspace.id).toBe(true);
    expect(new Set(ARTWORK_FRAMES.map(artworkFilename)).size).toBe(ARTWORK_FRAMES.length);
    for (const frame of ARTWORK_FRAMES) {
      expect(ARTWORK_WORLDS).toContain(frame.world);
      expect(frame.samples).toHaveLength(3);
      expect(frame.boundary).toBeTruthy();
    }
  });
});
