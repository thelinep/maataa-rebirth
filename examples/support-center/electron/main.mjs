import { app, BrowserWindow, dialog } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createDesktopServer } from "./static-server.mjs";

const appRoot = app.isPackaged
  ? app.getAppPath()
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const desktopServer = createDesktopServer(appRoot);
const port = 4179;
const ownsAppLock = app.requestSingleInstanceLock();

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
    },
  });

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
    const window = BrowserWindow.getAllWindows()[0];
    if (window) {
      if (window.isMinimized()) window.restore();
      window.show();
      window.focus();
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
    if (process.platform !== "darwin") app.quit();
  });

  app.on("before-quit", () => desktopServer.close());
}
