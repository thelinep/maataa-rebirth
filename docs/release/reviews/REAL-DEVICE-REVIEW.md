# Representative real-device review (gate 4)

**Prepared:** 2026-10-12 · **Candidate:** `5bc8c7b8` · **Status:** NOT_RUN. Automation covers emulated viewports only.

## Device set

| # | Class | Minimum | Status |
| --- | --- | --- | --- |
| 1 | Low-capability Android | ₹7,000–10,000 class, 3–4 GB RAM, entry chip, 720p, current Chrome | Not chosen |
| 2 | Mid-range Android | 6–8 GB RAM | Xiaomi `23090RA98I` (Dimensity 7200-Ultra, 8 GB, Android 15, Chrome 154) — partially measured (gate 5) |
| 3 | iPhone | Model still receiving iOS updates, Safari | Not chosen |
| 4 | Windows laptop | 8 GB RAM, Core i3 / Ryzen 3, Chrome and Edge | Not chosen |
| 5 | macOS laptop | Developer MacBook (upper bound only) | Available |
| 6 | Tablet (optional) | Entry Android tablet or base iPad | Not chosen |

## Checks per device (all eight public routes)

1. Layout at default and at 200% text size: no clipped or overlapping text, no horizontal scroll.
2. Touch targets at least 24×24 CSS px and comfortably tappable; no accidental activation.
3. Portrait and landscape: content reflows; dialogs and drawers stay usable.
4. On-screen keyboard does not hide the focused input.
5. Laptops: full keyboard use, visible focus, theme toggle and dialogs work.
6. Performance sample with measure mode (`?measure=1#/playground`, see gate 5): 5 cold and 5 warm loads.

## Record

```
Device / chip / RAM:        OS:        Browser + version:        Reviewer:        Date:        Commit:
Findings (severity, route, what happened, screenshot):
Disposition: PASS / PASS WITH ISSUES / FAIL
```
