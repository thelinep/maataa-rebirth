# Guided workplace flow

The workplace interface now uses its existing action and step icon bars as the main controls. It shows one task panel at a time:

- Prepare: add/edit planning records, load examples, then continue to review.
- Review/Rehearse: name the plan owner and check the current step with a note. Future steps remain locked.
- Handover: inspect completion and download the local handover. Incomplete exports stay explicitly marked as drafts.

Technical scope/context is in expandable help. Existing action labels remain stable. New record and Review plan open and focus their relevant panel; steps navigate without advancing checks. Record edits still reset review, and completed reviews can restart without deleting records. Browser storage, schema and export authority remain unchanged. No server migration, booking, hiring or financial operation is implied.

Verification: TypeScript demo typecheck, production build and focused Chromium walkthrough passed. Walkthrough covers all four review gates, action/step counts, locked future steps, panel visibility, new-record navigation and desktop/mobile overflow. Captures are private under .local/tlps-api/captures/guided-workplace-*.png. No global visual system changes were made; existing theme tokens, Button, SVG icons and RecordRegister are reused.
