# Atomic Architecture

`@maataa/ui` keeps UI parts separately addressable.

## Rules

1. One public component/type per direct import file.
2. Category `index` files are convenience barrels, not ownership boundaries.
3. Compound controls expose their structural parts independently.
4. Atoms do not depend on application/domain state.
5. Molecules/organisms compose atoms through public package APIs.
6. Aliases remain compatibility exports only; canonical atoms retain their own files.

## Layers

- **atoms**: Button, Input, Label, Badge, Spinner, TableCell, DialogTitle, MenuItem, StatusDot.
- **molecules**: FormField, ControlGroup, Pagination, Breadcrumb, Card, Popover.
- **organisms**: DataTable, AppShell, MobileShell, CommandMenu.
- **templates**: intentionally outside this package unless fully generic.
