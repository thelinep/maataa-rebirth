import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GENERATOR_REGISTRY } from "../src/registries/generatorRegistry";
import * as generators from "../src/generators";

afterEach(cleanup);

describe("generator workbench", () => {
  it("renders an interactive, truthful local draft flow", () => {
    render(React.createElement(generators.FormGenerator));

    expect(screen.getByText("Ready · local preview only")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Create draft" }));
    expect(screen.getByRole("alert").textContent).toContain("Add a brief");

    fireEvent.change(screen.getByLabelText("Brief"), {
      target: { value: "Create a venue intake form" },
    });
    fireEvent.change(
      screen.getByRole("textbox", { name: "Context (optional)" }),
      { target: { value: "TLPS synthetic example" } },
    );
    fireEvent.click(screen.getByRole("button", { name: "Create draft" }));

    expect(screen.getByText("Draft ready for review.")).toBeTruthy();
    expect(screen.getByTestId("generator-draft-output").textContent).toContain(
      "Create a venue intake form",
    );
    expect(screen.getByTestId("generator-draft-output").textContent).toContain(
      "Preview only",
    );
  });

  it("passes normalized input to a consumer adapter and reports adapter failures", async () => {
    const onGenerate = vi
      .fn()
      .mockResolvedValue({ accepted: true, draftId: "draft-1" });
    const { rerender } = render(
      React.createElement(generators.FormGenerator, { onGenerate }),
    );
    fireEvent.change(screen.getByLabelText("Brief"), {
      target: { value: "  Build a call sheet  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create draft" }));

    await screen.findByText("Draft ready for review.");
    expect(onGenerate).toHaveBeenCalledWith({
      generatorId: "GENERATOR.FORM_GENERATOR",
      name: "Form Generator",
      brief: "Build a call sheet",
      context: "",
    });
    expect(screen.getByTestId("generator-draft-output").textContent).toContain(
      '"draftId": "draft-1"',
    );

    rerender(
      React.createElement(generators.FormGenerator, {
        onGenerate: vi
          .fn()
          .mockRejectedValue(new Error("Provider unavailable")),
      }),
    );
    fireEvent.change(screen.getByLabelText("Brief"), {
      target: { value: "Retry" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create draft" }));
    expect(await screen.findByRole("alert")).toHaveProperty(
      "textContent",
      "Provider unavailable",
    );
  });

  it("backs every catalogued generator wrapper with the functional workbench", () => {
    expect(GENERATOR_REGISTRY).toHaveLength(208);
    for (const record of GENERATOR_REGISTRY) {
      const Generator = generators[
        record.component as keyof typeof generators
      ] as React.ComponentType<Record<string, unknown>> | undefined;
      expect(
        Generator,
        `missing named wrapper export ${record.component}`,
      ).toBeTypeOf("function");
      const { container, unmount } = render(React.createElement(Generator!));
      const surface = container.querySelector<HTMLElement>(
        "[data-generator-id]",
      );
      expect(
        surface?.dataset.generatorId,
        `wrong generator id for ${record.component}`,
      ).toBe(record.id);
      expect(
        container.querySelector("textarea"),
        `missing brief field for ${record.component}`,
      ).not.toBeNull();
      expect(
        container.querySelector('button[type="submit"]'),
        `missing draft action for ${record.component}`,
      ).not.toBeNull();
      unmount();
    }
  });
});
