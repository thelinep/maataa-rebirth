import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { IdentityAvatar } from "../src/identity/IdentityAvatar";
import { MaataaIcon } from "../src/icons/MaataaIcon";
import { DEMO_IDENTITY_REGISTRY } from "../src/identity/identityRegistry";
import { DEMO_USERS } from "../src/static-data/demoUsers";

describe("identity and icon demo layer", () => {
  it("renders symbolic identity avatars accessibly", () => {
    render(<IdentityAvatar identity="IDENTITY.BRAHMINI" />);
    expect(screen.getByRole("img", { name: /Brahmini/i })).toBeInTheDocument();
  });
  it("renders titled icons accessibly", () => {
    render(<MaataaIcon name="workspace" title="Workspace" />);
    expect(screen.getByRole("img", { name: "Workspace" })).toBeInTheDocument();
  });
  it("covers every symbolic identity in demo users", () => {
    const userIds = new Set(DEMO_USERS.map((user) => user.identityId));
    expect(DEMO_IDENTITY_REGISTRY.every((identity) => userIds.has(identity.id))).toBe(true);
  });
});
