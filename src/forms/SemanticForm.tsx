import React from "react";

/** Unstyled semantic form wrapper for host-owned validation and submission. */
export const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(function Form(props, ref) {
  return <form ref={ref} {...props} />;
});
Form.displayName = "Form";

/** Native fieldset wrapper. Native disabled and form semantics are preserved. */
export const Fieldset = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(function Fieldset(props, ref) {
  return <fieldset ref={ref} {...props} />;
});
Fieldset.displayName = "Fieldset";

/** Native legend wrapper for fieldset accessible names. */
export const Legend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement>
>(function Legend(props, ref) {
  return <legend ref={ref} {...props} />;
});
Legend.displayName = "Legend";
