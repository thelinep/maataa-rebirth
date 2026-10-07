"use client";

import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";
import { Popover } from "@base-ui/react/popover";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

/** Plain {year, month (0-based), day} tuple -- the internal calendar-math
 * currency for this file. Never exposed publicly: the component's own
 * prop contract stays string-only (see `DatePickerProps.value` below), but
 * every arithmetic step (adding days, finding a month's first weekday,
 * clamping a `min`/`max` bound) is far less error-prone against a plain
 * tuple than against a `Date`, whose local-timezone getters/setters would
 * silently shift a date by a day for users west of UTC. All tuple math
 * below therefore goes through `Date.UTC` and the UTC getters only -- the
 * host's local timezone never enters the calculation. */
interface DateParts {
  year: number;
  month: number;
  day: number;
}

const ISO_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseISODate(value: string | undefined): DateParts | null {
  if (!value) return null;
  const match = ISO_PATTERN.exec(value);
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]) - 1, day: Number(match[3]) };
}

function toISODate(parts: DateParts): string {
  // Date.UTC normalizes an out-of-range month/day (e.g. day 0, month 12)
  // for us, which is exactly what the calendar-math helpers below rely on.
  return new Date(Date.UTC(parts.year, parts.month, parts.day)).toISOString().slice(0, 10);
}

function todayParts(): DateParts {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
}

function addDays(parts: DateParts, delta: number): DateParts {
  const d = new Date(Date.UTC(parts.year, parts.month, parts.day + delta));
  return { year: d.getUTCFullYear(), month: d.getUTCMonth(), day: d.getUTCDate() };
}

function addMonths(parts: DateParts, delta: number): DateParts {
  const d = new Date(Date.UTC(parts.year, parts.month + delta, parts.day));
  return { year: d.getUTCFullYear(), month: d.getUTCMonth(), day: d.getUTCDate() };
}

function weekdayOf(parts: DateParts): number {
  return new Date(Date.UTC(parts.year, parts.month, parts.day)).getUTCDay();
}

const HEADING_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const CELL_LABEL_FORMATTER = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const DISPLAY_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
// `timeZone: "UTC"` on every formatter above is load-bearing, not
// decorative -- these format `DateParts` built through `Date.UTC`, and
// without it `Intl.DateTimeFormat` would render each Date in the host's
// local timezone, which can print the wrong calendar day entirely for a
// host west of UTC (e.g. a UTC midnight instant reads as "yesterday,
// 7pm" at UTC-5).
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarCell extends DateParts {
  iso: string;
  inCurrentMonth: boolean;
}

/** Always 42 cells (6 full weeks) so the grid's height never changes as
 * the caller pages between a 4-week-looking February and a 6-week-looking
 * month -- avoids the popup visibly resizing/reflowing under the pointer
 * while arrow-key navigation is in flight. */
function buildMonthGrid(year: number, month: number): CalendarCell[] {
  const firstOfMonth: DateParts = { year, month, day: 1 };
  const leading = weekdayOf(firstOfMonth);
  const cells: CalendarCell[] = [];
  for (let i = leading; i > 0; i -= 1) {
    const parts = addDays(firstOfMonth, -i);
    cells.push({ ...parts, iso: toISODate(parts), inCurrentMonth: false });
  }
  let cursor = firstOfMonth;
  while (cursor.month === month) {
    cells.push({ ...cursor, iso: toISODate(cursor), inCurrentMonth: true });
    cursor = addDays(cursor, 1);
  }
  while (cells.length < 42) {
    cells.push({ ...cursor, iso: toISODate(cursor), inCurrentMonth: false });
    cursor = addDays(cursor, 1);
  }
  return cells;
}

function isOutOfRange(iso: string, min: string | undefined, max: string | undefined): boolean {
  if (min && iso < min) return true;
  if (max && iso > max) return true;
  return false;
}

export interface DatePickerProps {
  /** ISO date string ("YYYY-MM-DD"), matching `Select`'s string-based
   * contract -- no `Date` objects cross the public prop boundary. An
   * unset/empty value renders the field with no date shown. */
  value?: string;
  onChange(value: string): void;
  /** Also ISO strings; a day outside this (inclusive) range is rendered
   * with `aria-disabled` rather than removed from the grid or made
   * unfocusable, so the roving-tabindex sequence stays contiguous -- see
   * the grid's `onKeyDown` below for why a *native* `disabled` day button
   * would break that. */
  min?: string;
  max?: string;
  label?: string;
  placeholder?: string;
  id?: string;
  className?: string;
}

/**
 * A controlled date field: a read-only text `Input` that is itself the
 * Base UI `Popover.Trigger` (via its `render` prop -- Base UI has no
 * Calendar/DatePicker part as of the installed v1.8.0, so `Popover` supplies
 * positioning, focus-trap-on-open and focus-return-on-close/Escape, and the
 * month grid underneath is hand-rolled), opening a popup with a hand-rolled
 * month grid.
 *
 * The grid follows the same roving-tabindex keyboard pattern as
 * `NevoWizardStepper` (./wizard/NevoWizardParts.tsx): exactly one day
 * button is `tabIndex={0}` (the "focused" day) at any time, every other
 * day button is `tabIndex={-1}`, and Tab therefore moves through the grid
 * as a single stop rather than 42 of them -- arrow keys move the roving
 * focus, matching how a native <select> or a real calendar app behaves.
 */
export function DatePicker({ value, onChange, min, max, label, placeholder = "Select a date", id, className }: DatePickerProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const headingId = `${fieldId}-heading`;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<{ year: number; month: number }>(() => {
    const parsed = parseISODate(value) ?? todayParts();
    return { year: parsed.year, month: parsed.month };
  });
  /** ISO date of the roving-tabindex cell -- distinct from `value` (the
   * caller's actual selection): the two only coincide once a day has been
   * picked in the currently-open session. */
  const [focused, setFocused] = useState<string>(() => toISODate(parseISODate(value) ?? todayParts()));

  // The cell Base UI should move focus to when the popup opens. Written
  // synchronously from a cell's own ref callback during render/commit (see
  // `renderCell` below), so it is always populated *before* Base UI's own
  // "move focus into the popup" effect runs, with no extra effect or
  // timing race of our own needed.
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);
  const cellRefs = useRef(new Map<string, HTMLButtonElement>());

  /** Re-derives `view`/`focused` from the current `value` every time the
   * popup opens, so a `value` change made by the caller while the popup
   * was closed (e.g. reset from elsewhere in the app) is reflected the
   * next time it's opened, rather than reopening on a stale month. Both
   * updates are batched with `setOpen` (same event-handler call, not a
   * follow-up effect), so the popup's very first render already shows the
   * right month -- see `initialFocusRef` above. */
  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      const parsed = parseISODate(value) ?? todayParts();
      setView({ year: parsed.year, month: parsed.month });
      setFocused(toISODate(parsed));
    }
  }, [value]);

  const moveFocusTo = useCallback((iso: string) => {
    setFocused(iso);
    const parsed = parseISODate(iso);
    if (parsed && (parsed.month !== view.month || parsed.year !== view.year)) {
      setView({ year: parsed.year, month: parsed.month });
    }
    // The target cell may not exist in the DOM yet this tick (a month
    // change re-renders the grid with 42 different cells) -- deferring the
    // imperative .focus() to a microtask lets that render land first. This
    // mirrors NevoWizardStepper's synchronous `buttons[nextIndex]?.focus()`
    // for the common case (same day, no month change) while still working
    // across a month boundary, which the stepper's flat button list never
    // has to deal with.
    queueMicrotask(() => cellRefs.current.get(iso)?.focus());
  }, [view.month, view.year]);

  const goToMonth = useCallback((delta: number) => {
    const parsed = parseISODate(focused) ?? todayParts();
    const moved = addMonths(parsed, delta);
    moveFocusTo(toISODate(moved));
  }, [focused, moveFocusTo]);

  const onGridKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const current = parseISODate(focused);
    if (!current) return;
    let next: DateParts | undefined;
    switch (event.key) {
      case "ArrowLeft": next = addDays(current, -1); break;
      case "ArrowRight": next = addDays(current, 1); break;
      case "ArrowUp": next = addDays(current, -7); break;
      case "ArrowDown": next = addDays(current, 7); break;
      case "Home": next = addDays(current, -weekdayOf(current)); break;
      case "End": next = addDays(current, 6 - weekdayOf(current)); break;
      case "PageUp": next = event.shiftKey ? addMonths(current, -12) : addMonths(current, -1); break;
      case "PageDown": next = event.shiftKey ? addMonths(current, 12) : addMonths(current, 1); break;
      default: return;
    }
    // Enter/Space are deliberately NOT handled here: every cell is a real
    // <button>, so the browser already fires its onClick for both -- a
    // second, hand-rolled activation path here would risk double-firing
    // onChange. Escape is likewise left to Popover.Root's own dismiss
    // behavior (closes the popup and returns focus to the trigger input
    // via Popup's default `finalFocus`), rather than re-implemented here.
    event.preventDefault();
    moveFocusTo(toISODate(next));
  }, [focused, moveFocusTo]);

  const selectDate = useCallback((cell: CalendarCell) => {
    if (isOutOfRange(cell.iso, min, max)) return;
    onChange(cell.iso);
    setOpen(false);
  }, [onChange, min, max]);

  const grid = buildMonthGrid(view.year, view.month);
  const selectedParts = parseISODate(value);
  const displayValue = selectedParts ? DISPLAY_FORMATTER.format(new Date(Date.UTC(selectedParts.year, selectedParts.month, selectedParts.day))) : "";

  const field = (
    <Popover.Trigger
      nativeButton={false}
      render={
        <input
          id={fieldId}
          type="text"
          readOnly
          placeholder={placeholder}
          value={displayValue}
          className="maataa-ui__date-picker-input"
        />
      }
    />
  );

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <div className={classes("maataa-ui", "maataa-ui__date-picker", className)}>
        {label ? <label className="maataa-ui__date-picker-label">{label}{field}</label> : field}
        <Popover.Portal>
          <Popover.Positioner side="bottom" align="start" sideOffset={4}>
            <Popover.Popup className="maataa-ui__date-picker-popup" initialFocus={initialFocusRef}>
              <div className="maataa-ui__date-picker-nav">
                <button type="button" aria-label="Previous month" className="maataa-ui__date-picker-nav-button" onClick={() => goToMonth(-1)}>
                  ‹
                </button>
                {/* aria-live: a screen-reader user who just paged months
                 * with the nav buttons or PageUp/PageDown hears the new
                 * month/year announced without focus having to move --
                 * same pattern as NevoWizardHeader's step announcement. */}
                <p id={headingId} className="maataa-ui__date-picker-heading" aria-live="polite">
                  {HEADING_FORMATTER.format(new Date(Date.UTC(view.year, view.month, 1)))}
                </p>
                <button type="button" aria-label="Next month" className="maataa-ui__date-picker-nav-button" onClick={() => goToMonth(1)}>
                  ›
                </button>
              </div>
              <div className="maataa-ui__date-picker-grid" role="grid" aria-labelledby={headingId} onKeyDown={onGridKeyDown}>
                <div className="maataa-ui__date-picker-row" role="row">
                  {WEEKDAY_LABELS.map(day => (
                    <div key={day} role="columnheader" className="maataa-ui__date-picker-weekday" aria-label={day}>
                      {day.slice(0, 2)}
                    </div>
                  ))}
                </div>
                {Array.from({ length: 6 }, (_, week) => (
                  <div key={week} className="maataa-ui__date-picker-row" role="row">
                    {grid.slice(week * 7, week * 7 + 7).map(cell => {
                      const isFocused = cell.iso === focused;
                      const isSelected = cell.iso === value;
                      const disabled = isOutOfRange(cell.iso, min, max);
                      return (
                        <button
                          key={cell.iso}
                          type="button"
                          role="gridcell"
                          ref={node => {
                            if (node) {
                              cellRefs.current.set(cell.iso, node);
                              if (isFocused) initialFocusRef.current = node;
                            } else {
                              cellRefs.current.delete(cell.iso);
                            }
                          }}
                          // Roving tabindex: only the one cell tracked by
                          // `focused` is a tab stop, so Tab (and
                          // shift+Tab) moves past the whole grid in one
                          // step, same contract as NevoWizardStepper's
                          // step buttons.
                          tabIndex={isFocused ? 0 : -1}
                          aria-selected={isSelected}
                          aria-current={cell.iso === toISODate(todayParts()) ? "date" : undefined}
                          aria-disabled={disabled || undefined}
                          aria-label={CELL_LABEL_FORMATTER.format(new Date(Date.UTC(cell.year, cell.month, cell.day)))}
                          className={classes(
                            "maataa-ui__date-picker-day",
                            !cell.inCurrentMonth && "maataa-ui__date-picker-day--outside",
                            isSelected && "maataa-ui__date-picker-day--selected",
                            disabled && "maataa-ui__date-picker-day--disabled",
                          )}
                          onClick={() => selectDate(cell)}
                        >
                          {cell.day}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
}
