import { fireEvent, render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";
import { Fieldset, Form, Legend } from "../../src/forms/SemanticForm";

describe("semantic form primitives", () => {
  it("preserves native form submission and forwards the form ref", () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) =>
      event.preventDefault(),
    );
    const ref = { current: null as HTMLFormElement | null };
    render(
      <Form ref={ref} aria-label="Pilot details" onSubmit={onSubmit}>
        <button type="submit">Continue</button>
      </Form>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByRole("form", { name: "Pilot details" })).toBe(
      ref.current,
    );
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("keeps fieldset disabled and legend semantics native", () => {
    render(
      <Fieldset disabled>
        <Legend>Contact preferences</Legend>
        <input aria-label="Email" />
      </Fieldset>,
    );

    expect(
      screen.getByRole("group", { name: "Contact preferences" }),
    ).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeDisabled();
  });
});
