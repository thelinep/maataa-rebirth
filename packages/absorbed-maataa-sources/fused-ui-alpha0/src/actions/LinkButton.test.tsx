import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { LinkButton } from "./LinkButton";

describe("LinkButton", () => {
  it("renders an anchor element", () => {
    render(<LinkButton href="/settings">View settings</LinkButton>);
    const link = screen.getByRole("link", { name: "View settings" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/settings");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <LinkButton href="/settings" onClick={onClick}>
        View settings
      </LinkButton>
    );
    await user.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("marks aria-disabled and blocks pointer events when disabled", () => {
    render(
      <LinkButton href="/settings" disabled>
        View settings
      </LinkButton>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveStyle({ pointerEvents: "none" });
  });

  it("prevents the default click handler from firing when a click is forced through", () => {
    const onClick = vi.fn();
    render(
      <LinkButton href="/settings" onClick={onClick} disabled>
        View settings
      </LinkButton>
    );
    screen.getByRole("link").click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies the primary color by default", () => {
    render(<LinkButton href="/settings">View settings</LinkButton>);
    expect(screen.getByRole("link")).toHaveStyle({ color: "#8B6F47" });
  });

  it("applies the danger color", () => {
    render(
      <LinkButton href="/logout" variant="danger">
        Sign out
      </LinkButton>
    );
    expect(screen.getByRole("link")).toHaveStyle({ color: "#8B3A2B" });
  });

  it("shows no underline by default until hovered", () => {
    render(<LinkButton href="/settings">View settings</LinkButton>);
    expect(screen.getByRole("link")).toHaveStyle({ textDecoration: "none" });
  });

  it("always shows underline when underline is 'always'", () => {
    render(
      <LinkButton href="/settings" underline="always">
        View settings
      </LinkButton>
    );
    expect(screen.getByRole("link")).toHaveStyle({ textDecoration: "underline" });
  });

  it("forwards ref to the underlying anchor", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <LinkButton href="/settings" ref={ref}>
        View settings
      </LinkButton>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("sets displayName", () => {
    expect(LinkButton.displayName).toBe("LinkButton");
  });
});
