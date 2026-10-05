# Code generation trust boundary

Scope: Phase A1, based on clean source commit `1bf0eb4`.

| Input | Output context | Required handling |
|---|---|---|
| Heading/text/button/badge strings, card title/body | JSX children | Expression containing serialized JavaScript string literal |
| Input label/value/placeholder, metric label/value/helper | JSX attribute | Expression containing serialized string literal |
| Workspace/page/layout IDs | JSX data attribute | Same attribute serializer; never executable source |
| Scene name | Function identifier | ASCII identifier, safe first character, uppercase component name, reserved-name protection, fallback |
| Heading level | Numeric expression | Integer range 1–6; fallback 2 |
| Button variant / badge tone | Typed enum attribute | Allowed package values; explicit fallback |
| Block kind | Import selector | Fixed typed vocabulary; no user-controlled import path |
| Demo table rows/columns | Fixed declarations | Source-owned data |

All strings escape angle brackets and JavaScript line separators as well as JSON special characters. The public emitter does not evaluate generated code. VisualComposer displays it as React text inside `code`.

Regression tests parse attack payloads, inspect the syntax tree for literal preservation and absence of injected calls, and typecheck generated TSX against actual package source exports. Inputs cover quotes, braces, template syntax, markup, backslashes, control characters, Unicode, emoji, empty and long content, and invalid identifiers.

This milestone does not yet make code generation layout-aware or qualify distribution. Those are subsequent gates.
