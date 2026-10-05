import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
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

import { fireEvent } from "@testing-library/react";
import { WORKSPACE_TYPES } from "../src/registries/workspaceRegistry";
import { PAGE_TYPES } from "../src/registries/pageRegistry";
import { DEVICE_REGISTRY } from "../src/registries/deviceRegistry";
import { LAYOUT_TYPES } from "../src/registries/layoutRegistry";

describe("complete canonical discovery", () => {
  it.each([
    ["Workspace", "workspaceTypeId", WORKSPACE_TYPES], ["Page", "pageTypeId", PAGE_TYPES],
    ["Layout", "layoutTypeId", LAYOUT_TYPES], ["Device", "deviceId", DEVICE_REGISTRY],
  ] as const)("finds and selects the last %s record with keyboard", (label,key,records) => {
    const change=vi.fn();
    render(<VisualComposer scene={DEFAULT_COMPOSER_SCENE} onSceneChange={change}/>);
    const input=screen.getByRole("combobox",{name:label});
    fireEvent.focus(input);
    expect(within(screen.getByRole("listbox",{name:`${label} results`})).getAllByRole("option")).toHaveLength(records.length);
    const tail=records[records.length-1];
    fireEvent.change(input,{target:{value:tail.id}});
    expect(within(screen.getByRole("listbox",{name:`${label} results`})).getAllByRole("option")).toHaveLength(1);
    fireEvent.keyDown(input,{key:"Enter"});
    expect(change).toHaveBeenCalledWith(expect.objectContaining({[key]:tail.id}));
    expect(input).toHaveAttribute("aria-expanded","false");
  });
});
