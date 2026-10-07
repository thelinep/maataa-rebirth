import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AppShell } from "./AppShell";
import { Sidebar } from "./Sidebar";

describe("AppShell", () => {
  it("renders its main content", () => {
    render(
      <AppShell>
        <p>Page content</p>
      </AppShell>
    );
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("renders content inside a main landmark", () => {
    render(
      <AppShell>
        <p>Page content</p>
      </AppShell>
    );
    expect(screen.getByRole("main")).toHaveTextContent("Page content");
  });

  it("renders topNav content above the content area", () => {
    render(
      <AppShell topNav={<div>Top bar</div>}>
        <p>Page content</p>
      </AppShell>
    );
    expect(screen.getByText("Top bar")).toBeInTheDocument();
  });

  it("renders sidebar content alongside the main content", () => {
    render(
      <AppShell sidebar={<div>Side nav</div>}>
        <p>Page content</p>
      </AppShell>
    );
    expect(screen.getByText("Side nav")).toBeInTheDocument();
  });

  it("fills the viewport height by default", () => {
    const { container } = render(
      <AppShell>
        <p>Page content</p>
      </AppShell>
    );
    expect((container.firstChild as HTMLElement).style.height).toBe("100vh");
  });

  it("fills only 100% height when fullHeight is false", () => {
    const { container } = render(
      <AppShell fullHeight={false}>
        <p>Page content</p>
      </AppShell>
    );
    expect(container.firstChild).toHaveStyle({ height: "100%" });
  });

  it("sets displayName", () => {
    expect(AppShell.displayName).toBe("AppShell");
  });

  it("renders a labelled skip link and responsive navigation controls", () => {
    const { container } = render(
      <AppShell sidebar={<Sidebar items={[{ id: "home", label: "Home" }]} />}>
        <p>Workspace content</p>
      </AppShell>
    );

    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      expect.stringMatching(/^#maataa-main-/)
    );
    const mobileToggle = container.querySelector(".maataa-app-shell__mobile-toggle");
    expect(mobileToggle).toHaveAttribute("aria-label", "Open navigation");
    expect(mobileToggle).toHaveAttribute("aria-controls");
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Primary navigation" })).toBeInTheDocument();
  });

  it("uses a horizontal menu when navigation is placed at the top", () => {
    const { container } = render(
      <AppShell
        navigationPosition="top"
        sidebar={<Sidebar items={[{ id: "home", label: "Home" }]} />}
      >
        <p>Workspace content</p>
      </AppShell>
    );

    expect(container.querySelector(".maataa-app-shell__frame")).toHaveAttribute(
      "data-position",
      "top"
    );
    expect(container.querySelector("nav ul")).toHaveStyle({ flexDirection: "row" });
  });

  it("orders the toolbar and footer around the main region", () => {
    const { container } = render(
      <AppShell
        toolbar={<div>Page tools</div>}
        toolbarPosition="below"
        footer={<div>Workspace status</div>}
        footerPosition="above"
      >
        <p>Workspace content</p>
      </AppShell>
    );
    const main = screen.getByRole("main");
    const toolbar = screen.getByText("Page tools");
    const footer = screen.getByText("Workspace status");

    expect(footer.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(main.compareDocumentPosition(toolbar) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelectorAll("main")).toHaveLength(1);
  });

  it("opens navigation from the mobile control and closes on Escape", () => {
    const { container } = render(
      <AppShell sidebar={<Sidebar items={[{ id: "home", label: "Home" }]} />}>
        <p>Workspace content</p>
      </AppShell>
    );
    const openButton = container.querySelector(".maataa-app-shell__mobile-toggle");
    expect(openButton).toHaveAttribute("aria-label", "Open navigation");
    fireEvent.click(openButton);

    expect(openButton).toHaveAttribute("aria-label", "Close navigation");
    expect(openButton).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(openButton).toHaveAttribute("aria-label", "Open navigation");
    expect(openButton).toHaveAttribute("aria-expanded", "false");
  });
});
