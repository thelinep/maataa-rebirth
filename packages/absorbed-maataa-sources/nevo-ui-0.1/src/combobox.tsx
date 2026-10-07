"use client";

import { useId } from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { type SelectOption } from "./components.js";

// Same tiny helper every other file in this package defines locally rather
// than sharing a utils module (see components.tsx / table.tsx) -- keeps
// each file importable on its own with zero internal cross-deps.
const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export interface ComboboxProps {
  /** Same option shape as `Select` (see components.tsx's `SelectOption`),
   * reused via a type-only import rather than redeclared here, so a
   * consumer migrating a `Select` to `Combobox` for search-as-you-type
   * passes the exact same `options` array unchanged. */
  options: readonly SelectOption[];
  /** Controlled selected value, matching `Select`'s contract exactly:
   * `Combobox` holds no state of its own for *which option is chosen* --
   * only Base UI's own internal state for the open popup, the typed query
   * and the keyboard highlight, none of which the caller needs to see. An
   * empty string means "nothing selected", same as `Select`. */
  value: string;
  onChange(value: string): void;
  label?: string;
  placeholder?: string;
  className?: string;
  id?: string;
}

/**
 * A searchable, single-select combobox: type to filter `options` by label,
 * Arrow Up/Down to move the highlight, Enter to choose the highlighted
 * option, Escape to close the popup without changing the selection. Prop
 * shape is deliberately identical to `Select` (`options` / `value` /
 * `onChange` / `label` / `placeholder`) so it's a drop-in swap wherever a
 * native `<select>` has grown too many options to scan by eye.
 *
 * Composed from `@base-ui/react/combobox` rather than hand-rolled: getting
 * the ARIA combobox pattern right (role="combobox" on the input,
 * aria-activedescendant-driven highlight, a listbox popup positioned off
 * the input, typeahead filtering that stays in sync with the keyboard
 * highlight) is exactly the kind of interaction Base UI exists to not
 * re-implement per-consumer, and is easy to get subtly wrong by hand.
 *
 * `items={options}` is handed straight to Base UI's own filtering instead
 * of filtering the array ourselves: because each option already has the
 * `{ value, label }` shape Base UI auto-detects, its default `Intl.Collator`
 * -based filter matches typed text against `option.label` with no further
 * config. Each `Combobox.Item` is given `value={option}` -- the WHOLE
 * option object, not just `option.value` -- because that same `{ value,
 * label }` auto-detection is also what makes Base UI display the item's
 * `label` (not its `value`) in the closed input after a selection; passing
 * only the plain string there (an earlier version of this file did)
 * silently loses that and the input shows the raw value instead (confirmed
 * by hand: Base UI's own doc comment on `itemToStringLabel` covers exactly
 * this case). `isItemEqualToValue` compares by `.value` rather than
 * relying on the default `Object.is`, so a caller that constructs a new
 * `options` array literal on every render (common, and not something this
 * component can require against) still resolves the correct selection.
 */
export function Combobox({ options, value, onChange, label, placeholder, className, id }: ComboboxProps) {
  // Base UI's own <Combobox.Label> only labels <Combobox.Trigger> (its
  // button), not <Combobox.Input> -- the actual form control a screen
  // reader user interacts with. Confirmed by Base UI's own runtime dev
  // warning ("<Combobox.Label> labels <Combobox.Trigger> only. When
  // <Combobox.Input> is the form control, use a native <label> or
  // <Field.Label> instead.") surfaced while writing this component's
  // tests. So the visible label is a plain <label>, wired to the input's
  // accessible name explicitly via aria-labelledby -- the Trigger button
  // keeps its own separate aria-label below ("Show <label> options"), so
  // it doesn't depend on this wiring either.
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = label ? `${inputId}-label` : undefined;
  // Base UI's own selected "value" is the whole SelectOption object (see
  // the doc comment above), so it's derived from -- and reconciled back
  // to -- this component's plain-string `value`/`onChange` contract right
  // here, the one place that translation happens.
  const selectedOption = options.find(option => option.value === value) ?? null;
  return (
    <BaseCombobox.Root
      id={id}
      items={options}
      value={selectedOption}
      onValueChange={next => onChange(next ? next.value : "")}
      isItemEqualToValue={(itemValue, val) => itemValue.value === val.value}
    >
      <div className={classes("maataa-ui", "maataa-ui__combobox", className)}>
        {label ? <label id={labelId} className="maataa-ui__combobox-label">{label}</label> : null}
        <BaseCombobox.InputGroup className="maataa-ui__combobox-input-group">
          <BaseCombobox.Input aria-labelledby={labelId} placeholder={placeholder} className="maataa-ui__combobox-input" />
          {/* A visible trigger, in addition to the input opening the popup
           * on click (Base UI's own `openOnInputClick` default), gives
           * mouse/touch users the same obvious "there's a list here"
           * affordance a native `<select>`'s own arrow gets them for free. */}
          <BaseCombobox.Trigger
            aria-label={label ? `Show ${label} options` : "Show options"}
            className="maataa-ui__combobox-trigger"
          >
            <BaseCombobox.Icon aria-hidden="true" className="maataa-ui__combobox-icon">▾</BaseCombobox.Icon>
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner className="maataa-ui__combobox-positioner" sideOffset={4}>
            <BaseCombobox.Popup className="maataa-ui__combobox-popup">
              {/* Only meaningful because Root was given `items` above --
               * that's what lets Empty distinguish "filtered down to zero
               * matches" from "nothing typed yet". */}
              <BaseCombobox.Empty className="maataa-ui__combobox-empty">No matches found.</BaseCombobox.Empty>
              <BaseCombobox.List className="maataa-ui__combobox-list">
                {(option: SelectOption) => (
                  <BaseCombobox.Item
                    key={option.value}
                    value={option}
                    disabled={option.disabled}
                    className="maataa-ui__combobox-item"
                  >
                    {option.label}
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </div>
    </BaseCombobox.Root>
  );
}
