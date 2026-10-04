# MAATAA UI alpha8.5.1 — A11Y Runtime-Order Hotfix

## Why this revision exists
The first alpha8.5 overlay produced the same five route failures. That strongly indicates the patch was not active at Axe analysis time (or was not imported into the built demo). alpha8.5.1 makes activation verifiable and moves semantic patching into synchronous mutation callbacks.

## Changes
- Forces `import "./a11y-hotfix";` to the first line of `examples/redux-demo/main.tsx`.
- Installs CSS immediately, before React bootstrap body execution.
- Applies semantic patches immediately, in a microtask, on every relevant DOM mutation, on load/navigation, and in four short post-render retries.
- Adds runtime marker: `document.documentElement.dataset.maataaA11yHotfix = "alpha8.5.1"`.
- Adds bundle preflight: verification aborts if the marker is not present in `demo-dist/assets`.
- `/surface`: converts the incomplete `tablist` claim to an accessible labeled `group` of buttons; raises muted text contrast.
- `/playground`: labels orphan `m-input`, normalizes explicit dark preview colors, raises badge contrast.
- `/surface`, `/playground`, `/demos`: makes actually scrollable `pre` and `.table-scroll` regions keyboard focusable with labels and focus-visible outline.

## Apply
```bash
cd ~/Downloads/maataa-ui-full-alpha7
unzip -o ../maataa-ui-alpha8.5.1-a11y-runtime-hotfix-flat.zip
node apply-alpha8.5.1-a11y-hotfix.mjs
./VERIFY-ALPHA8.5.1.sh
```

Expected accessibility target: `16 passed, 0 failed`.

## Diagnostic proof
Before the test, the script must print `Hotfix marker found in demo bundle.` If that line does not appear, do not interpret Axe failures—the hotfix is not active.

## Rollback
```bash
node rollback-alpha8.5.1-a11y-hotfix.mjs
```
