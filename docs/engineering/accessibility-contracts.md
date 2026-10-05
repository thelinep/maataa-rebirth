# Behavioral accessibility contracts

Modal/Dialog, Drawer/Sheet and CommandMenu share portal focus management: initial focus, Tab/Shift+Tab wrapping, top-dialog-only Escape, background inert isolation, scroll locking and focus restoration on close/unmount. Nested dialog ordering is tested. Background state is restored rather than overwritten.

Tabs use per-instance IDs, a single enabled tab stop, arrows/Home/End navigation, disabled-tab skipping and tab/panel relationships. Combobox and canonical search share per-instance IDs, active descendants, keyboard navigation/selection, Escape and blur dismissal. Menus use roving focus and restore dropdown triggers after selection/Escape. Popovers preserve trigger callbacks and dismiss on Escape/outside/blur. Tooltips preserve existing descriptions and dismiss on Escape.

The Playground includes critical keyboard controls. Browser tests exercise dialogs, drawers, tabs and comboboxes in addition to route-level axe scanning. The test harness explicitly unmounts components after every test so focus managers and observers do not leak across cases.

D1–D5 development gates: 187 unit tests (eight focused keyboard contracts), TypeScript, package/demo builds, and 42 desktop/mobile Chromium checks passed. No dynamic/static collision warnings. Two bounded desktop/mobile visual passes resolved mobile composer clipping; document widths matched viewports (1440/390). These checks do not establish full WCAG conformance, manual screen-reader acceptance or physical-device qualification.
