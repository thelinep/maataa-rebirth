import React from "react";
import { cleanup, render, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import * as pages from "../src/pages";
import * as workspaces from "../src/workspaces";

afterEach(cleanup);

function namedPresets(
  module: Record<string, unknown>,
  suffix: "Page" | "Workspace",
) {
  return Object.entries(module).filter(
    ([name, value]) =>
      name.endsWith(suffix) &&
      name !== `${suffix}Preset` &&
      typeof value === "function",
  );
}

describe("page and workspace preset compositions", () => {
  it("renders the intended composition slots for every page preset", () => {
    const presets = namedPresets(pages, "Page");
    expect(presets.length).toBeGreaterThanOrEqual(18);

    for (const [name, Component] of presets) {
      const content = (
        <p data-testid="consumer-content">{name} consumer content</p>
      );
      const { container, unmount } = render(
        React.createElement(
          Component as React.ComponentType<{
            body: React.ReactNode;
            header: React.ReactNode;
            sidebar: React.ReactNode;
          }>,
          {
            header: <span>Header {name}</span>,
            body: content,
            sidebar: <span>Sidebar {name}</span>,
          },
        ),
      );
      const root = container.querySelector<HTMLElement>("[data-page-type]");
      expect(root, `${name} must render a page root`).not.toBeNull();
      expect(within(root!).getByText(`Header ${name}`)).toBeTruthy();
      expect(within(root!).getByText(`${name} consumer content`)).toBeTruthy();
      expect(within(root!).getByText(`Sidebar ${name}`)).toBeTruthy();
      unmount();
    }
  });

  it("renders the intended composition slots for every workspace preset", () => {
    const presets = namedPresets(workspaces, "Workspace");
    expect(presets.length).toBeGreaterThanOrEqual(35);

    for (const [name, Component] of presets) {
      const { container, unmount } = render(
        React.createElement(
          Component as React.ComponentType<{
            main: React.ReactNode;
            header: React.ReactNode;
            sidebar: React.ReactNode;
          }>,
          {
            header: <span>Header {name}</span>,
            main: <p>{name} workspace content</p>,
            sidebar: <span>Sidebar {name}</span>,
          },
        ),
      );
      const root = container.querySelector<HTMLElement>(
        "[data-workspace-type]",
      );
      expect(root, `${name} must render a workspace root`).not.toBeNull();
      expect(within(root!).getByText(`Header ${name}`)).toBeTruthy();
      expect(within(root!).getByText(`${name} workspace content`)).toBeTruthy();
      expect(within(root!).getByText(`Sidebar ${name}`)).toBeTruthy();
      unmount();
    }
  });
});
