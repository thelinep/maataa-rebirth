const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("maataaDesktop", {
  minimize: () => ipcRenderer.send("maataa:minimize-window"),
  toggleMaximize: () => ipcRenderer.send("maataa:toggle-maximize"),
  toggleFullScreen: () => ipcRenderer.send("maataa:toggle-full-screen"),
  launchBrowser: () => ipcRenderer.invoke("maataa:launch-browser"),
  onWindowState: callback => {
    if (typeof callback !== "function") return () => {};
    const listener = (_event, state) => callback(state);
    ipcRenderer.on("maataa:window-state", listener);
    return () => ipcRenderer.removeListener("maataa:window-state", listener);
  },
});
