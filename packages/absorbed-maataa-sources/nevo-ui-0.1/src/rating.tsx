"use client";

import { useState } from "react";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { VisuallyHidden } from "./components.js";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export interface RatingProps {
  label: string;
  /** Number of stars. @default 5 */
  max?: number;
  /** Controlled-only integer 0..max (0 = nothing selected yet), same
   * contract as `RadioGroup` (radio.tsx) -- a rating is a radio group of
   * discrete steps, not a continuous value, which is why this composes
   * `RadioGroup`/`Radio` rather than Base UI's `Slider`: a slider reads
   * as "drag to a point on a continuum" to a screen reader, a rating
   * reads as "choose one of N stars," and `RadioGroup` already gives
   * that the correct `role="radiogroup"`/roving-tabindex semantics. */
  value: number;
  onValueChange(value: number): void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  className?: string;
}

/**
 * A star-rating input composed from the same Base UI `RadioGroup`/`Radio`
 * primitives as `RadioGroup` (radio.tsx), with a `star-N` value per
 * option and glyph-only visible labels -- each star's real accessible
 * name comes from a visually-hidden "N star(s)" string, not the glyph
 * itself, so a screen reader announces "3 stars, radio button" rather
 * than "star, star, star, radio button." Hover preview is local
 * component-only UI state (not part of the controlled `value`, the same
 * boundary `Tooltip`'s open state draws around itself -- see tooltip.tsx)
 * so the caller never has to distinguish "committed" from "previewing."
 */
export function Rating({ label, max = 5, value, onValueChange, disabled, required, name, className }: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value;
  return (
    <fieldset className={classes("maataa-ui", "maataa-ui__rating", className)} disabled={disabled}>
      <legend className="maataa-ui__rating-label">
        {label}
        {required ? " *" : ""}
      </legend>
      <BaseRadioGroup
        value={value > 0 ? `star-${value}` : ""}
        onValueChange={next => onValueChange(Number(String(next).replace("star-", "")))}
        name={name}
        required={required}
        disabled={disabled}
        className="maataa-ui__rating-stars"
        onMouseLeave={() => setHovered(null)}
      >
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          return (
            <label
              key={starValue}
              className={classes("maataa-ui__rating-star", starValue <= display && "maataa-ui__rating-star--filled")}
              onMouseEnter={() => setHovered(starValue)}
            >
              <BaseRadio.Root value={`star-${starValue}`} className="maataa-ui__rating-radio">
                <BaseRadio.Indicator className="maataa-ui__rating-indicator" keepMounted />
              </BaseRadio.Root>
              <span aria-hidden="true">★</span>
              <VisuallyHidden>
                {starValue} star{starValue === 1 ? "" : "s"}
              </VisuallyHidden>
            </label>
          );
        })}
      </BaseRadioGroup>
    </fieldset>
  );
}
