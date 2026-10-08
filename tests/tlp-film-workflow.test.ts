import { describe, expect, it } from "vitest";
import {
  blankFilmProject,
  filmStages,
  filmStorageKey,
  parseFilmProject,
} from "../apps/tlp-film/src/filmTimeline";
import {
  getFilmStagePacket,
  thirtyTrillionIndiaPrompt,
} from "../apps/tlp-film/src/filmProject30Trillion";

describe("TLP film timeline", () => {
  it("defines the six requested production stages with actionable topics", () => {
    expect(filmStages.map((stage) => stage.label)).toEqual([
      "Ideation",
      "Script",
      "Pre production",
      "Production",
      "Post production",
      "Release",
    ]);
    expect(
      filmStages.every(
        (stage) =>
          stage.topics.length > 0 &&
          stage.topics.every((topic) => topic.tasks.length > 0),
      ),
    ).toBe(true);
  });

  it("flags legal and policy topics for qualified verification", () => {
    const reviewTopics = filmStages
      .flatMap((stage) => stage.topics)
      .filter((topic) => topic.reviewRequired);
    expect(reviewTopics.some((topic) => topic.id === "policy-review")).toBe(
      true,
    );
    expect(reviewTopics.some((topic) => topic.id === "rights")).toBe(true);
  });

  it("uses a separate, bounded local state record and recovers malformed data", () => {
    expect(filmStorageKey).toBe("tlp.film.workspace.v1");
    expect(parseFilmProject("not-json")).toEqual(blankFilmProject);
    expect(
      parseFilmProject(
        JSON.stringify({
          projectName: "Film",
          activeStage: "unknown",
          completedTasks: [],
          completedStages: [],
        }),
    ).activeStage,
    ).toBe("ideation");
  });

  it("has a fictional prompt and generated simulation packet for every stage", () => {
    expect(thirtyTrillionIndiaPrompt).toContain(
      "do not present an economic milestone",
    );
    for (const stage of filmStages) {
      const packet = getFilmStagePacket(stage.id, 1);
      expect(packet.artifacts.length).toBeGreaterThanOrEqual(3);
      expect(packet.simulation).toHaveLength(3);
      expect(packet.boundary.length).toBeGreaterThan(20);
    }
    expect(getFilmStagePacket("release", 1).simulation[0].value).toBe(
      "Not released",
    );
    expect(getFilmStagePacket("ideation", 2).artifacts[0].title).toBe(
      "Alternate story angle",
    );
  });
});
