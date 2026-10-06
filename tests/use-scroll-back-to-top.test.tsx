import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useScrollBackToTop } from "../src/mobile/useScrollBackToTop";

function Harness({ threshold = 400, behavior = "smooth" }: { threshold?: number; behavior?: ScrollBehavior }) {
  const { isVisible, scrollToTop } = useScrollBackToTop({ threshold, behavior });
  return (
    <>
      <span data-testid="visibility">{isVisible ? "visible" : "hidden"}</span>
      <button onClick={scrollToTop}>Back to top</button>
    </>
  );
}

describe("useScrollBackToTop", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  it("shows the control after the configured threshold and hides it above the top", () => {
    render(<Harness threshold={120} />);
    expect(screen.getByTestId("visibility")).toHaveTextContent("hidden");

    Object.defineProperty(window, "scrollY", { configurable: true, value: 120 });
    fireEvent.scroll(window);
    expect(screen.getByTestId("visibility")).toHaveTextContent("visible");

    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    fireEvent.scroll(window);
    expect(screen.getByTestId("visibility")).toHaveTextContent("hidden");
  });

  it("uses smooth scrolling by default and accepts a custom behavior", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const { rerender } = render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: "Back to top" }));
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: "smooth" });

    rerender(<Harness threshold={250} behavior="auto" />);
    fireEvent.click(screen.getByRole("button", { name: "Back to top" }));
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: "auto" });
  });

  it("cleans up its scroll listener on unmount", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<Harness />);
    unmount();
    expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
