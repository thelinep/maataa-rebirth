# Connected Projects design review

Source review of the Connected Projects extension, 17 October 2026. This is a bounded review, not a replacement design system or a browser acceptance report. The extension preserves the incumbent MAATAA/TLPS visual world; no global token, PRODUCT.md, DESIGN.md or sidecar change is proposed.

## Evidence checked

- `apps/tlps/src/project/ConnectedProjects.tsx` and `connected-projects.css`.
- `apps/tlps/src/project/CONNECTED-PRODUCT.md`.
- `apps/tlps/src/project/ProjectStageIconBar.tsx` and `project-stage-icon-bar.css`.
- `examples/redux-demo/PRODUCT.md`, `tlps-surfaces.css`, and the connected-route shell in `App.tsx` / `TlpsSurfaces.tsx`.
- Shared controls in `src/actions/index.tsx`, `src/forms/index.tsx`, and baseline tokens in `src/styles.css`.

## Incumbent consistency

| Area | Observed implementation |
| --- | --- |
| Palette | Connected canvas, ink, panels and dividers use the existing `--ts-*` aliases, which resolve to `--m-*` theme tokens. Baseline paper (`#fbf8f1`), ink (`#221d16`), primary (`#7a5d2e`) and border (`#ded6c9`) are inherited defaults, not a new palette. |
| Typography | Body and headings inherit the MAATAA font settings. Baseline body is 16px / 1.5; heading defaults are 1.802rem, 1.488rem and 1.22rem. Record identifiers and audit text use 0.875rem; identifiers use the existing monospace token. The extension does not introduce a display face. |
| Controls | Actions reuse MAATAA Button, Input and Select. Shared controls keep theme colors, small-radius borders, density settings and native semantics. Stage navigation reuses ProjectStageIconBar with labelled MaataaIcon SVGs. |
| Layout | The connected workspace caps width at 1200px, forms at 720px and paragraphs at 72ch. A 200px collection rail sits beside flexible content with a 32px gap. Below 700px it stacks, navigation wraps, and padding drops from 24px to 16px. These are surface dimensions, not new global tokens. |
| Shape and depth | Record rows use border separators; navigation uses panels and a soft selected fill. Connected CSS adds no shadow vocabulary. Existing shared controls retain their own states. The connected-route shell keeps session controls in normal document flow. |

## Surface rules retained

- Theme colors and shared controls remain the visual authority. The `--ts-*` aliases adapt the existing theme rather than establish an independent identity.
- Stage navigation indicates the selected view; stage approval remains a separate review action. Visual selection is not evidence of completed work, payment or certification.
- Errors, offline state, empty collections, role restrictions and confirmation steps are expressed with explicit text. The connected surface supplies a visible focus outline and preserves native form controls.
- The historical browser-local PRODUCT.md and the connected extension record describe different bounded behavior. This review does not merge their claims or expand release acceptance.

## Limits and drift not canonized

This pass inspected source, not computed styles, screenshots or interaction across themes. It does not establish visual accessibility conformance, mobile acceptance or production readiness. The connected collection buttons reference `--m-radius` with an 8px fallback, while shared controls use `--m-radius-sm`; this is a local token inconsistency, not a new canonical radius. The connected focus rule uses a fixed 2px width instead of the shared width token, and collection-button hover has no local treatment; neither is promoted into system guidance. The public stylesheet's pre-existing small uppercase overline is outside this extension and is not canonized. Baseline system fonts, defaults and all unrelated drift remain unchanged because this ordinary extension does not authorize a system redesign.
