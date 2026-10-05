import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { VisualComposer } from "../src/composer/VisualComposer";
import { DEFAULT_COMPOSER_SCENE } from "../src/composer/defaults";
import type { ComposerScene } from "../src/composer/types";

afterEach(cleanup);

describe("canonical composer workflow", () => {
  it.each([
    ["verified", {}],
    ["unverified", {pageTypeId:"PAGE.EVENTS.EVENT_DASHBOARD",layoutTypeId:"LAYOUT.OPERATIONAL.COMMANDCENTER"}],
    ["invalid", {pageTypeId:"PAGE.INVENTED"}],
  ])("shows %s without replacing the selected tuple", (status, patch) => {
    const onSceneChange = vi.fn();
    const scene = {...DEFAULT_COMPOSER_SCENE,...patch} as ComposerScene;
    render(<VisualComposer scene={scene} onSceneChange={onSceneChange}/>);
    expect(screen.getByRole("status", {name:"Composition status"})).toHaveTextContent(status as string);
    expect(onSceneChange).not.toHaveBeenCalled();
    if(status === "unverified") expect(screen.getByText(/exact combination has no evidence/)).toBeInTheDocument();
    if(status === "invalid") expect(screen.getByText(/Unknown page/)).toBeInTheDocument();
  });
});
