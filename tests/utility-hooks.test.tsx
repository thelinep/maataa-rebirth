import React, { useRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  useClipboard,
  useAutoHideNavbar,
  useControllableState,
  useDebounce,
  useEscapeKey,
  useIntersectionObserver,
  useLocalStorage,
  useMediaQuery,
  useOnlineStatus,
  useOutsideClick,
  usePagination,
  usePrevious,
  useResizeObserver,
  useSessionStorage,
} from "../src/hooks";
import { TopNav } from "../src/navigation";

function OutsideHarness({ onOutside }: { onOutside: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onOutside);
  return <><div ref={ref} data-testid="inside">Inside</div><button>Outside</button></>;
}

function EscapeHarness({ onEscape }: { onEscape: () => void }) {
  useEscapeKey(onEscape, { preventDefault: true });
  return <div>Escape listener</div>;
}

function MediaHarness() {
  return <span>{useMediaQuery("(min-width: 700px)") ? "wide" : "narrow"}</span>;
}

function AutoHideHarness({ enabled = true }: { enabled?: boolean }) {
  const { isHidden, reveal } = useAutoHideNavbar({ threshold: 80, delta: 6, enabled });
  return <><output>{isHidden ? "hidden" : "visible"}</output><button onClick={reveal}>Reveal navigation</button></>;
}

function ResizeHarness() {
  const { ref, width, height } = useResizeObserver<HTMLDivElement>();
  return <div ref={ref} data-testid="resize">{width}x{height}</div>;
}

function IntersectionHarness() {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>();
  return <div ref={ref}>{isIntersecting ? "shown" : "hidden"}</div>;
}

function StorageHarness({ session = false }: { session?: boolean }) {
  const local = useLocalStorage("hooks.local", 0);
  const currentSession = useSessionStorage("hooks.session", 0);
  const storage = session ? currentSession : local;
  return <><output>{storage.value}</output><button onClick={() => storage.setValue((v) => v + 1)}>Increment</button><button onClick={storage.remove}>Reset</button>{storage.error && <span role="alert">Storage error</span>}</>;
}

function DebounceHarness({ value }: { value: string }) {
  return <output>{useDebounce(value, 100)}</output>;
}

function ClipboardHarness() {
  const { copy, isCopied, error } = useClipboard(1000);
  return <><button onClick={() => void copy("copied text")}>Copy</button><output>{isCopied ? "copied" : "idle"}</output>{error && <span role="alert">{error.message}</span>}</>;
}

function OnlineHarness() { return <output>{useOnlineStatus() ? "online" : "offline"}</output>; }

function PaginationHarness() {
  const page = usePagination(["a", "b", "c", "d", "e"], 2);
  return <><output>{`${page.page}/${page.pageCount}:${page.currentItems.join("")}`}</output><button onClick={page.previous} disabled={!page.canPrevious}>Previous</button><button onClick={page.next} disabled={!page.canNext}>Next</button></>;
}

function PreviousHarness({ value }: { value: string }) { return <output>{usePrevious(value) ?? "first"}</output>; }

function ControllableHarness({ value, onChange }: { value?: string; onChange: (value: string) => void }) {
  const [current, setCurrent, controlled] = useControllableState({ value, defaultValue: "initial", onChange });
  return <><output>{`${current}:${controlled ? "controlled" : "uncontrolled"}`}</output><button onClick={() => setCurrent((v) => `${v}!`)}>Change</button></>;
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  localStorage.clear();
  sessionStorage.clear();
});

describe("interaction hooks", () => {
  it("detects outside pointer presses and ignores presses inside", () => {
    const onOutside = vi.fn();
    render(<OutsideHarness onOutside={onOutside} />);
    fireEvent.pointerDown(screen.getByTestId("inside"));
    expect(onOutside).not.toHaveBeenCalled();
    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(onOutside).toHaveBeenCalledOnce();
  });

  it("responds to Escape and can prevent its default action", () => {
    const onEscape = vi.fn();
    render(<EscapeHarness onEscape={onEscape} />);
    const event = new KeyboardEvent("keydown", { key: "Escape", cancelable: true });
    act(() => window.dispatchEvent(event));
    expect(onEscape).toHaveBeenCalledOnce();
    expect(event.defaultPrevented).toBe(true);
  });
});

describe("browser observation hooks", () => {
  it("hides on downward scroll, reveals on upward scroll, and stays shown near the top", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    render(<AutoHideHarness />);
    expect(screen.getByRole("status").textContent).toBe("visible");
    Object.defineProperty(window, "scrollY", { configurable: true, value: 120 });
    fireEvent.scroll(window);
    expect(screen.getByRole("status").textContent).toBe("hidden");
    Object.defineProperty(window, "scrollY", { configurable: true, value: 100 });
    fireEvent.scroll(window);
    expect(screen.getByRole("status").textContent).toBe("visible");
    Object.defineProperty(window, "scrollY", { configurable: true, value: 40 });
    fireEvent.scroll(window);
    expect(screen.getByRole("status").textContent).toBe("visible");
  });

  it("keeps navigation visible when disabled or reduced motion is requested", () => {
    const { rerender } = render(<AutoHideHarness enabled={false} />);
    Object.defineProperty(window, "scrollY", { configurable: true, value: 300 });
    fireEvent.scroll(window);
    expect(screen.getByRole("status").textContent).toBe("visible");

    const media = {
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    };
    vi.stubGlobal("matchMedia", vi.fn(() => media));
    rerender(<AutoHideHarness />);
    Object.defineProperty(window, "scrollY", { configurable: true, value: 500 });
    fireEvent.scroll(window);
    expect(screen.getByRole("status").textContent).toBe("visible");
  });

  it("wires the behavior to TopNav only when autoHide is enabled", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    const { rerender, container } = render(<TopNav brand="MAATAA" autoHide/>);
    Object.defineProperty(window, "scrollY", { configurable: true, value: 150 });
    fireEvent.scroll(window);
    expect(container.querySelector(".m-topnav")).toHaveAttribute("data-hidden", "true");
    rerender(<TopNav brand="MAATAA"/>);
    expect(container.querySelector(".m-topnav")).not.toHaveAttribute("data-hidden");
  });

  it("updates a media query subscription", () => {
    let matches = false;
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    vi.stubGlobal("matchMedia", vi.fn(() => ({
      get matches() { return matches; },
      media: "(min-width: 700px)",
      addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
      removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    })));
    render(<MediaHarness />);
    expect(screen.getByText("narrow")).toBeTruthy();
    matches = true;
    act(() => listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent)));
    expect(screen.getByText("wide")).toBeTruthy();
  });

  it("reports ResizeObserver measurements and disconnects", () => {
    let notify!: ResizeObserverCallback;
    const disconnect = vi.fn();
    class MockResizeObserver {
      constructor(callback: ResizeObserverCallback) { notify = callback; }
      observe() {}
      unobserve() {}
      disconnect = disconnect;
    }
    vi.stubGlobal("ResizeObserver", MockResizeObserver);
    const { unmount } = render(<ResizeHarness />);
    act(() => notify([{ contentRect: { width: 240, height: 90 } } as ResizeObserverEntry], {} as ResizeObserver));
    expect(screen.getByTestId("resize")).toHaveTextContent("240x90");
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it("tracks intersection and disconnects", () => {
    let notify!: IntersectionObserverCallback;
    const disconnect = vi.fn();
    class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe() {}
      unobserve() {}
      disconnect = disconnect;
    }
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    const { unmount } = render(<IntersectionHarness />);
    expect(screen.getByText("hidden")).toBeTruthy();
    act(() => notify([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(screen.getByText("shown")).toBeTruthy();
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});

describe("state utility hooks", () => {
  it.each([[false, "hooks.local"], [true, "hooks.session"]] as const)("persists and resets browser state (session=%s)", (session, key) => {
    render(<StorageHarness session={session} />);
    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByRole("status").textContent).toBe("1");
    expect((session ? sessionStorage : localStorage).getItem(key)).toBe("1");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("status").textContent).toBe("0");
    expect((session ? sessionStorage : localStorage).getItem(key)).toBeNull();
  });

  it("debounces value changes and cancels the previous timer", () => {
    vi.useFakeTimers();
    const { rerender } = render(<DebounceHarness value="first" />);
    expect(screen.getByRole("status").textContent).toBe("first");
    rerender(<DebounceHarness value="second" />);
    act(() => vi.advanceTimersByTime(100));
    expect(screen.getByRole("status").textContent).toBe("second");
  });

  it("copies text and reports success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<ClipboardHarness />);
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Copy" })));
    expect(writeText).toHaveBeenCalledWith("copied text");
    expect(screen.getByRole("status").textContent).toBe("copied");
  });

  it("tracks online and offline browser events", () => {
    Object.defineProperty(navigator, "onLine", { configurable: true, value: true });
    render(<OnlineHarness />);
    expect(screen.getByRole("status").textContent).toBe("online");
    Object.defineProperty(navigator, "onLine", { configurable: true, value: false });
    act(() => window.dispatchEvent(new Event("offline")));
    expect(screen.getByRole("status").textContent).toBe("offline");
  });

  it("paginates, moves in either direction, and clamps at the end", () => {
    render(<PaginationHarness />);
    expect(screen.getByRole("status").textContent).toBe("1/3:ab");
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("status").textContent).toBe("2/3:cd");
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("status").textContent).toBe("3/3:e");
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(screen.getByRole("status").textContent).toBe("2/3:cd");
  });

  it("returns the previous committed value", () => {
    const { rerender } = render(<PreviousHarness value="one" />);
    expect(screen.getByRole("status").textContent).toBe("first");
    rerender(<PreviousHarness value="two" />);
    expect(screen.getByRole("status").textContent).toBe("one");
  });

  it("supports controlled and uncontrolled values", () => {
    const onChange = vi.fn();
    const { rerender } = render(<ControllableHarness onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Change" }));
    expect(screen.getByRole("status").textContent).toBe("initial!:uncontrolled");
    rerender(<ControllableHarness value="fixed" onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Change" }));
    expect(screen.getByRole("status").textContent).toBe("fixed:controlled");
    expect(onChange).toHaveBeenLastCalledWith("fixed!");
  });
});
