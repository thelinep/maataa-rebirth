import React from "react";
import { render, screen } from "@testing-library/react";
import { Portal } from "./Portal";

describe("Portal", () => {
  it("renders children into the DOM", () => {
    render(
      <Portal>
        <div>Portaled content</div>
      </Portal>
    );
    expect(screen.getByText("Portaled content")).toBeInTheDocument();
  });

  it("renders into body by default", () => {
    render(
      <Portal>
        <div className="portal-child">Content</div>
      </Portal>
    );
    // Portal renders content into document.body, not the component container
    expect(document.body.querySelector(".portal-child")).toBeInTheDocument();
  });

  it("renders into specified target element", () => {
    const target = document.createElement("div");
    target.setAttribute("id", "portal-target");
    document.body.appendChild(target);

    render(
      <Portal target={target}>
        <div className="portal-content">Targeted content</div>
      </Portal>
    );

    expect(target.querySelector(".portal-content")).toBeInTheDocument();

    document.body.removeChild(target);
  });

  it("applies className to portal container", () => {
    render(
      <Portal className="custom-portal">
        <div>Content</div>
      </Portal>
    );
    const portalContainer = document.querySelector(".custom-portal");
    expect(portalContainer).toBeInTheDocument();
  });

  it("applies inline styles to portal container", () => {
    render(
      <Portal style={{ position: "fixed", zIndex: 1000 }}>
        <div className="styled-content">Content</div>
      </Portal>
    );
    const portalContainer = document.querySelector('[style*="position"]');
    expect(portalContainer).toHaveStyle("position: fixed");
    expect(portalContainer).toHaveStyle("zIndex: 1000");
  });

  it("renders multiple portals independently", () => {
    render(
      <>
        <Portal>
          <div className="portal-1">Portal 1</div>
        </Portal>
        <Portal>
          <div className="portal-2">Portal 2</div>
        </Portal>
      </>
    );
    expect(document.querySelector(".portal-1")).toBeInTheDocument();
    expect(document.querySelector(".portal-2")).toBeInTheDocument();
  });

  it("cleans up portal content on unmount", () => {
    const { unmount } = render(
      <Portal>
        <div className="cleanup-test">Cleanup content</div>
      </Portal>
    );
    expect(document.querySelector(".cleanup-test")).toBeInTheDocument();
    unmount();
    expect(document.querySelector(".cleanup-test")).not.toBeInTheDocument();
  });

  it("renders null children gracefully", () => {
    render(
      <Portal>
        {null}
        <div>Visible</div>
        {undefined}
      </Portal>
    );
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });
});
