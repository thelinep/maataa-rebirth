// Contract tests for the exports proposed as Beta-stable (acceptance packet, gate 7).
// Each test pins only what the packet says is frozen. Behaviour still awaiting an
// owner decision (Button loading mechanism, UiProvider theme updates after mount,
// CompositionRuntime `validation`, CanonicalCompositionRuntime `context`, generated
// code text) is deliberately not asserted here.
import React from "react";
import fs from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../src/actions/Button";
import { Input } from "../src/forms/Input";
import { Card } from "../src/surfaces/Card";
import { UiProvider } from "../src/foundation";
import { ThemeToggle } from "../src/themes";
import {
  VisualComposer,
  DEFAULT_COMPOSER_SCENE,
  generateComposerJsx,
  validateCompositionSpec,
  type ComposerScene,
} from "../src/composer";
import { CompositionRuntime, CanonicalCompositionRuntime } from "../src/runtime";

const STABLE: ReadonlyArray<readonly [string, string]> = [
  ["./actions/Button", "Button"],
  ["./forms/Input", "Input"],
  ["./surfaces/Card", "Card"],
  ["./foundation", "UiProvider"],
  ["./themes", "ThemeToggle"],
  ["./composer", "VisualComposer"],
  ["./composer", "DEFAULT_COMPOSER_SCENE"],
  ["./composer", "generateComposerJsx"],
  ["./composer", "validateCompositionSpec"],
  ["./composer", "ComposerScene"],
  ["./runtime", "CompositionRuntime"],
  ["./runtime", "CanonicalCompositionRuntime"],
];

describe("stable import paths", () => {
  const manifest = JSON.parse(fs.readFileSync("manifests/PUBLIC_API.json", "utf8")) as { exports: { subpath: string; name: string }[] };
  const exportsMap = JSON.parse(fs.readFileSync("package.json", "utf8")).exports as Record<string, unknown>;
  it.each(STABLE)("%s exports %s and the path is in the package export map", (subpath, name) => {
    expect(manifest.exports.some((e) => e.subpath === subpath && e.name === name)).toBe(true);
    const wildcard = subpath.replace(/\/[^/]+$/, "/*");
    expect(subpath in exportsMap || wildcard in exportsMap).toBe(true);
  });
  it("ships the stylesheet entry", () => {
    expect("./styles.css" in exportsMap).toBe(true);
  });
});

describe("Button", () => {
  it("defaults to type=button and the primary variant", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-variant", "primary");
  });
  it.each(["primary", "secondary", "ghost", "destructive"] as const)("accepts variant %s", (variant) => {
    render(<Button variant={variant}>Go</Button>);
    expect(screen.getByRole("button", { name: "Go" })).toHaveAttribute("data-variant", variant);
  });
  it("passes native attributes, merges className and forwards the ref", () => {
    const ref = React.createRef<HTMLButtonElement>();
    const onClick = vi.fn();
    render(<Button ref={ref} type="submit" className="extra" aria-describedby="hint" onClick={onClick}>Send</Button>);
    const button = screen.getByRole("button", { name: "Send" });
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("aria-describedby", "hint");
    expect(button.className).toContain("extra");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
  it("loading shows loadingLabel, marks aria-busy and does not fire onClick", () => {
    const onClick = vi.fn();
    render(<Button loading loadingLabel="Saving" onClick={onClick}>Save</Button>);
    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByText("Save")).toBeNull();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
  it("loadingLabel defaults to Loading", () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole("button", { name: "Loading" })).toBeInTheDocument();
  });
});

describe("Input", () => {
  it("passes native attributes, merges className and forwards the ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Email" type="email" placeholder="you@example.com" aria-invalid="true" className="extra" />);
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "you@example.com");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.className).toContain("extra");
  });
});

describe("Card", () => {
  it("renders an article with header, body and footer and forwards the ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Card ref={ref} aria-label="Summary" className="extra" header="Head" footer="Foot">Body</Card>);
    const card = screen.getByRole("article", { name: "Summary" });
    expect(ref.current).toBe(card);
    expect(card.tagName).toBe("ARTICLE");
    expect(card.className).toContain("extra");
    expect(card).toHaveTextContent("Head");
    expect(card).toHaveTextContent("Body");
    expect(card).toHaveTextContent("Foot");
  });
  it("omits header and footer when not given", () => {
    render(<Card aria-label="Plain">Body</Card>);
    const card = screen.getByRole("article", { name: "Plain" });
    expect(card.querySelector("header")).toBeNull();
    expect(card.querySelector("footer")).toBeNull();
  });
});

describe("UiProvider", () => {
  it("wraps children in .maataa-root with dir and className", () => {
    render(<UiProvider dir="rtl" className="host"><span>child</span></UiProvider>);
    const root = screen.getByText("child").closest(".maataa-root");
    expect(root).not.toBeNull();
    expect(root).toHaveAttribute("dir", "rtl");
    expect(root!.className).toContain("host");
  });
  it("defaults to ltr", () => {
    render(<UiProvider><span>child</span></UiProvider>);
    expect(screen.getByText("child").closest(".maataa-root")).toHaveAttribute("dir", "ltr");
  });
  it("applies the initial theme", () => {
    render(<UiProvider theme="dark"><span>child</span></UiProvider>);
    expect(document.documentElement.dataset.maataaTheme).toBe("dark");
  });
});

describe("ThemeToggle", () => {
  it("accessible name contains the visible text (WCAG 2.5.3)", () => {
    render(<UiProvider theme="light"><ThemeToggle /></UiProvider>);
    const button = screen.getByRole("button");
    expect(button).not.toHaveAttribute("aria-label");
    expect(button).toHaveAccessibleName(button.textContent ?? "");
    expect(button).toHaveTextContent("Toggle theme: light");
  });
  it("uses a custom label", () => {
    render(<UiProvider theme="light"><ThemeToggle label="Theme" /></UiProvider>);
    expect(screen.getByRole("button", { name: "Theme: light" })).toBeInTheDocument();
  });
  it("cycles light, dark, high-contrast, oled, system, light", () => {
    render(<UiProvider theme="light"><ThemeToggle label="Theme" /></UiProvider>);
    const button = screen.getByRole("button");
    for (const expected of ["dark", "high-contrast", "oled", "system", "light"]) {
      fireEvent.click(button);
      expect(button).toHaveTextContent(`Theme: ${expected}`);
    }
  });
});

describe("composition contract", () => {
  it("DEFAULT_COMPOSER_SCENE is a valid CompositionSpec v1", () => {
    const result = validateCompositionSpec(DEFAULT_COMPOSER_SCENE);
    expect(result.accepted).toBe(true);
    expect(result.errors).toEqual([]);
    if (result.accepted) expect(result.spec.schemaVersion).toBe("1");
  });
  it("validateCompositionSpec rejects malformed input and other schema versions", () => {
    for (const input of [null, {}, { ...DEFAULT_COMPOSER_SCENE, schemaVersion: "2" }, { ...DEFAULT_COMPOSER_SCENE, regions: undefined }]) {
      const result = validateCompositionSpec(input);
      expect(result.accepted).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });
  it("generateComposerJsx returns source with an exported component for a valid scene and throws for an invalid one", () => {
    const source = generateComposerJsx(DEFAULT_COMPOSER_SCENE);
    expect(typeof source).toBe("string");
    expect(source).toMatch(/export function \w+\(\)/);
    expect(() => generateComposerJsx({ ...DEFAULT_COMPOSER_SCENE, layoutTypeId: "LAYOUT.INVENTED" } as unknown as ComposerScene)).toThrow();
  });
  it("ComposerScene carries the documented fields", () => {
    const scene: ComposerScene = DEFAULT_COMPOSER_SCENE;
    for (const key of ["id", "name", "workspaceTypeId", "pageTypeId", "layoutTypeId", "deviceId", "theme", "density", "stateMode", "blocks", "updatedAt"]) {
      expect(scene).toHaveProperty(key);
    }
  });
});

describe("VisualComposer", () => {
  it("renders with the required props and reports edits as v1 scenes", () => {
    const onSceneChange = vi.fn();
    render(<VisualComposer scene={DEFAULT_COMPOSER_SCENE} onSceneChange={onSceneChange} />);
    fireEvent.click(screen.getByRole("button", { name: "+ Heading" }));
    expect(onSceneChange).toHaveBeenCalledOnce();
    const next = onSceneChange.mock.calls[0][0] as ComposerScene;
    expect(next.schemaVersion).toBe("1");
    expect(next.blocks.length).toBe(DEFAULT_COMPOSER_SCENE.blocks.length + 1);
  });
});

describe("CompositionRuntime", () => {
  it("renders a valid scene with host-supplied slots", async () => {
    render(<CompositionRuntime scene={DEFAULT_COMPOSER_SCENE} header={<span>Host header</span>} />);
    expect(screen.queryByRole("alert")).toBeNull();
    // The selected layout is lazy-loaded, so wait for the host slot to appear.
    expect(await screen.findByText("Host header")).toBeInTheDocument();
  });
  it("refuses to render an invalid scene", () => {
    render(<CompositionRuntime scene={{ ...DEFAULT_COMPOSER_SCENE, pageTypeId: "PAGE.INVENTED" } as unknown as ComposerScene} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});

describe("CanonicalCompositionRuntime", () => {
  it("renders a valid scene without a context", async () => {
    render(<CanonicalCompositionRuntime scene={DEFAULT_COMPOSER_SCENE} header={<span>Host header</span>} />);
    expect(screen.queryByRole("alert")).toBeNull();
    // The selected layout is lazy-loaded, so wait for the host slot to appear.
    expect(await screen.findByText("Host header")).toBeInTheDocument();
  });
  it("refuses to render an invalid scene", () => {
    render(<CanonicalCompositionRuntime scene={{ ...DEFAULT_COMPOSER_SCENE, pageTypeId: "PAGE.INVENTED" } as unknown as ComposerScene} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
