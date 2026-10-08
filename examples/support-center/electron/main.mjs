import { app, BrowserWindow, dialog, ipcMain } from "electron";
import path from "node:path";
import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createDesktopServer } from "./static-server.mjs";

const appRoot = app.isPackaged
  ? app.getAppPath()
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const desktopServer = createDesktopServer(appRoot);
const port = 4179;
const ownsAppLock = app.requestSingleInstanceLock();
let mainWindow;

function windowState(window) {
  return {
    isFullScreen: window.isFullScreen(),
    isMaximized: window.isMaximized(),
    isMinimized: window.isMinimized(),
  };
}

function trustedWindow(event) {
  const window = BrowserWindow.fromWebContents(event.sender);
  const senderUrl = event.senderFrame?.url ?? "";
  return window && senderUrl.startsWith(`http://127.0.0.1:${port}/`) ? window : null;
}

function publishWindowState(window) {
  if (!window.isDestroyed()) window.webContents.send("maataa:window-state", windowState(window));
}

ipcMain.on("maataa:minimize-window", event => trustedWindow(event)?.minimize());
ipcMain.on("maataa:toggle-maximize", event => {
  const window = trustedWindow(event);
  if (!window) return;
  if (window.isMaximized()) window.unmaximize();
  else window.maximize();
});
ipcMain.on("maataa:toggle-full-screen", event => {
  const window = trustedWindow(event);
  if (window) window.setFullScreen(!window.isFullScreen());
});
ipcMain.handle("maataa:launch-browser", async event => {
  if (!trustedWindow(event)) return { ok: false, message: "untrusted desktop request" };
  if (process.platform !== "darwin") return { ok: false, message: "Mac first; native WebKit build not configured for this operating system" };
  const browserBinary = app.isPackaged
    ? path.join(process.resourcesPath, "maataa-browser/maataa-browser")
    : path.join(appRoot, "apps/maataa-browser/src-tauri/target/debug/maataa-browser");
  try {
    await access(browserBinary);
    const child = spawn(browserBinary, [], { cwd: appRoot, detached: true, stdio: "ignore" });
    return await new Promise(resolve => {
      child.once("spawn", () => { child.unref(); resolve({ ok: true }); });
      child.once("error", () => resolve({ ok: false, message: "native browser process could not start" }));
    });
  } catch {
    return { ok: false, message: "build the Rust browser first with cargo build --manifest-path apps/maataa-browser/src-tauri/Cargo.toml --offline" };
  }
});

function createWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 360,
    minHeight: 560,
    show: false,
    title: "MAATAA Desktop",
    backgroundColor: "#111113",
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      preload: path.join(path.dirname(fileURLToPath(import.meta.url)), "preload.cjs"),
    },
  });
  mainWindow = window;
  for (const eventName of ["enter-full-screen", "leave-full-screen", "maximize", "unmaximize", "minimize", "restore"]) {
    window.on(eventName, () => publishWindowState(window));
  }

  window.once("ready-to-show", () => window.show());
  window.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  window.webContents.on("will-navigate", (event, targetUrl) => {
    if (!targetUrl.startsWith(`http://127.0.0.1:${port}/`)) event.preventDefault();
  });
  window.loadURL(`http://127.0.0.1:${port}/`);
}

if (!ownsAppLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    const activeWindow = BrowserWindow.getAllWindows()[0];
    if (activeWindow) {
      if (activeWindow.isMinimized()) activeWindow.restore();
      activeWindow.show();
      activeWindow.focus();
    }
  });
  app.whenReady().then(async () => {
    try {
      await new Promise((resolve, reject) => {
        desktopServer.once("error", reject);
        desktopServer.listen(port, "127.0.0.1", resolve);
      });
    } catch (error) {
      await dialog.showErrorBox("MAATAA Desktop could not start", `The local app port ${port} is unavailable. Close the other process using it and try again.\n\n${error.message}`);
      app.quit();
      return;
    }
    createWindow();
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on("window-all-closed", () => {
    mainWindow = undefined;
    if (process.platform !== "darwin") app.quit();
  });

  app.on("before-quit", () => desktopServer.close());
}
