# MAATAA Desktop options

The repository contains two separately launched desktop shells. They are alternatives a user can open and compare; they are not runtime themes that can be switched inside one running process.

## Open the Tauri trial

From the repository root, run:

```sh
pnpm maataa:desktop:tauri:dev
```

This builds the local product assets and starts the Tauri/WebKit desktop trial. Its home screen and native windows are the Tauri implementation.

## Open the Electron desktop

From the repository root, run:

```sh
pnpm maataa:desktop:electron:dev
```

This builds the Electron desktop's local product assets and starts its Electron shell. The older `pnpm maataa:desktop:dev` command remains available as a compatibility alias for this workflow.

## Compare them

Close or leave the first app open, run the other command in a separate terminal, and compare the two windows. Each shell owns its own process, window chrome, navigation, and capabilities. Shared visual assets or project data do not imply shared runtime state. No shell is designated as canonical by this guide.

These are local development workflows. They do not package, sign, notarize, deploy, or certify either desktop app. The Tauri trial documentation describes its native-window constraints; the Electron workflow currently uses the support-center Electron entry point.
