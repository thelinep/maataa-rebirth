# Accessibility

MAATAA UI is built with WCAG 2.2 AA-oriented interaction patterns, but this source package is **not a formal accessibility certification**.

The implementation includes semantic controls, visible `:focus-visible` treatment, labels and descriptions for fields, keyboard-dismissable overlays, accessible dialog roles, tab semantics, alert/status live regions, reduced-motion handling, and logical CSS properties for RTL.

Host applications remain responsible for meaningful labels, heading structure, correct focus flow across routed pages, color choices when overriding tokens, content alternatives, and end-to-end accessibility testing.

Recommended release checks include automated axe/Storybook checks plus manual keyboard, screen-reader, zoom, contrast and mobile touch testing.
