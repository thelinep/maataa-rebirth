/**
 * App-local, opt-in pointer context for the Brahmini Workbench.
 *
 * Guarantees (covered by tests/contracts/pointer-context.contract-spec.ts):
 * - Listens ONLY on the supplied root element (never window/document), so
 *   it cannot observe other MAATAA windows or other applications.
 * - Returns only `{ role, label }`; never coordinates, field values,
 *   selection, or keystrokes.
 * - Read-only: it never calls click/focus/dispatchEvent or sets values.
 * OS-wide observation would require macOS Accessibility permission and an
 * authoritative observation service; neither exists, and this does not try.
 */
export interface PointerContext {
  role: string;
  label: string;
}

export const OBSERVABLE_CONTROL_SELECTOR =
  'button, a[href], input, select, textarea, [role="button"], [role="menuitem"], [role="tab"]';

export function describeControl(target: EventTarget | null, root: Element): PointerContext | null {
  if (!target || typeof (target as Element).closest !== "function") return null;
  const control = (target as Element).closest<HTMLElement>(OBSERVABLE_CONTROL_SELECTOR);
  if (!control || !root.contains(control)) return null;

  const role = control.getAttribute("role") || control.tagName.toLowerCase();
  const tag = control.tagName.toLowerCase();
  const isField = tag === "input" || tag === "select" || tag === "textarea";
  const associatedLabels = isField
    ? Array.from((control as HTMLInputElement).labels || [])
        .map((label) => label.textContent?.trim() || "")
        .filter(Boolean)
        .join(" ")
    : "";
  const label = (
    control.getAttribute("aria-label") ||
    control.getAttribute("title") ||
    associatedLabels ||
    (control.matches("button, a[href]") ? control.textContent : "") ||
    role
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
  return { role, label };
}

/** Attaches the observer to `root`; returns a detach function. */
export function attachAppLocalPointerObserver(
  root: HTMLElement,
  onChange: (context: PointerContext) => void,
): () => void {
  let last: PointerContext | null = null;
  const handle = (event: Event) => {
    const next = describeControl(event.target, root);
    if (!next || (last?.role === next.role && last?.label === next.label)) return;
    last = next;
    onChange(next);
  };
  root.addEventListener("pointerover", handle);
  root.addEventListener("focusin", handle);
  return () => {
    root.removeEventListener("pointerover", handle);
    root.removeEventListener("focusin", handle);
  };
}
