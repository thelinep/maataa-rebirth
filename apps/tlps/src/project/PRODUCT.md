# TLPS project stage icon bar

The user-specified stage sequence is Idea, Story, Board, Pre, Production, Post, Release, Shree. This component is controlled navigation; it calls the supplied selection callback. It does not mark earlier stages complete, enforce approvals, move a real project, send network requests, collect payments or release funds.

The initial Storybook preview selects Idea. All eight stages retain their icons and labels, with the selected stage indicated using aria-current=step and the active theme colors. Layout switches between horizontal and vertical; horizontal uses eight columns on large screens, four on intermediate screens and two on small screens. Native buttons support keyboard activation and visible focus. Motion respects reduced-motion preference.

Board is described as storyboard/visual planning in the preview. Shree is described as finance/settlement planning; these descriptions are navigation guidance, not implemented business services.

Existing MAATAA SVG icons and theme tokens are the visual authority. This extends the current workflow gallery without changing its 27 provisional reference-flow definitions or operational workplace step gates. It appears above the reference groups and as the focused Workflows/Step Bars → Project Stages story. Four themes are available: light, dark, high contrast and OLED. No new design identity or production approval is implied.

Sources: ProjectStageIconBar.tsx, project-stage-icon-bar.css, stories/WorkflowStepBars.stories.tsx. The gallery story and its reference assets predate this change and remain local uncommitted work; preserve their existing content.

## Local preview delivery

Build with `pnpm storybook:build`, then run `pnpm workflow:preview`. The loopback-only no-cache server uses port6007 by default and checks that the Project Stages story exists at startup. It prevents rebuilt indexes and preview HTML from being reused as stale cached responses. Use `http://127.0.0.1:6007/iframe.html?id=workflows-step-bars--project-stages&viewMode=story` for the focused bar, or replace its story ID with `workflows-step-bars--reference-inventory` for all reference bars plus the project bar. The previous port6006 page showed a story-not-found error in the in-app browser even though its server index included the story; the exact old browser-cache cause was not independently isolated. Both6007 pages were visibly verified in the user-facing browser.
