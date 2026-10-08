const apps = {
  maataa: { title: "MAATAA UI", frame: document.querySelector("#maataa-frame") },
  tlps: { title: "TLPS", frame: document.querySelector("#tlps-frame") },
  film: { title: "TLP Film", frame: document.querySelector("#film-frame") },
  nevo: { title: "NEVO", frame: document.querySelector("#nevo-frame") },
  support: { title: "Support Center", frame: document.querySelector("#support-frame") },
};
const content = document.querySelector("#desktop-content");
const layer = document.querySelector("#app-window-layer");
const dock = document.querySelector("#desktop-dock");
const frameParking = document.querySelector("#app-frames");
const status = document.querySelector("#desktop-status");
const windowMenu = document.querySelector("#window-context-menu");
const windows = new Map();
let frontOrder = 10;
let nativeWindowState = { isFullScreen: false, isMaximized: false };
let menuAppId = null;

function clampWindow(record, left, top) {
  const workspace = content.getBoundingClientRect();
  const rect = record.element.getBoundingClientRect();
  const maxLeft = Math.max(0, workspace.width - rect.width);
  const maxTop = Math.max(0, workspace.height - rect.height);
  record.element.style.transform = "none";
  record.element.style.left = `${Math.min(maxLeft, Math.max(0, left))}px`;
  record.element.style.top = `${Math.min(maxTop, Math.max(0, top))}px`;
}

function applyWindowLayout(record, layout) {
  const workspace = content.getBoundingClientRect();
  const width = workspace.width;
  const height = workspace.height;
  const halfWidth = width >= 700 ? width * 0.5 : width;
  const presets = {
    compact: { width: Math.min(760, width * 0.64), height: height * 0.7, x: 0.18, y: 0.15 },
    comfortable: { width: Math.min(1080, width * 0.84), height: height * 0.84, x: 0.08, y: 0.06 },
    large: { width: width * 0.96, height: height * 0.92, x: 0.02, y: 0.025 },
    center: { width: Math.min(1080, width * 0.84), height: height * 0.84, x: 0.08, y: 0.06 },
    left: { width: halfWidth, height: width >= 700 ? height : height * 0.5, x: 0, y: 0 },
    right: { width: halfWidth, height: width >= 700 ? height : height * 0.5, x: width >= 700 ? 0.5 : 0, y: width >= 700 ? 0 : 0.5 },
  };
  if (layout === "fullscreen") {
    toggleFullScreen(record);
    return;
  }
  if (nativeWindowState.isFullScreen || nativeWindowState.isMaximized) {
    record.restoreLayout = layout;
    if (nativeWindowState.isFullScreen) window.maataaDesktop?.toggleFullScreen?.();
    else window.maataaDesktop?.toggleMaximize?.();
    return;
  }
  record.element.classList.remove("is-maximized", "is-native-maximized", "is-native-fullscreen");
  const bounds = presets[layout] ?? presets.comfortable;
  record.element.style.resize = layout === "large" || layout === "center" || layout === "comfortable" || layout === "compact" ? "both" : "none";
  record.element.style.width = `${Math.min(width, Math.max(320, bounds.width))}px`;
  record.element.style.height = `${Math.min(height, Math.max(280, bounds.height))}px`;
  record.layout = layout;
  clampWindow(record, width * bounds.x, height * bounds.y);
}

function closeWindowMenu() {
  windowMenu.hidden = true;
  menuAppId = null;
}

function showWindowMenu(id, x, y) {
  menuAppId = id;
  windowMenu.replaceChildren();
  const addAction = (label, action) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("role", "menuitem");
    button.dataset.windowAction = action;
    button.textContent = label;
    windowMenu.append(button);
  };
  const addSeparator = () => {
    const separator = document.createElement("div");
    separator.setAttribute("role", "separator");
    windowMenu.append(separator);
  };
  addAction("Compact window", "compact");
  addAction("Comfortable window", "comfortable");
  addAction("Large window", "large");
  addSeparator();
  addAction("Center window", "center");
  addAction("Left half", "left");
  addAction("Right half", "right");
  addAction("Full screen", "fullscreen");
  addSeparator();
  addAction("Minimize window", "minimize");
  addAction("Close window", "close");
  windowMenu.hidden = false;
  const menuWidth = 190;
  const menuHeight = windowMenu.getBoundingClientRect().height || 360;
  windowMenu.style.left = `${Math.max(8, Math.min(x, innerWidth - menuWidth - 8))}px`;
  windowMenu.style.top = `${Math.max(8, Math.min(y, innerHeight - menuHeight - 8))}px`;
  windowMenu.querySelector("button")?.focus();
}

function focusWindow(record) {
  for (const item of windows.values()) item.element.classList.remove("is-active");
  record.element.classList.add("is-active");
  record.element.hidden = false;
  record.element.style.zIndex = String(++frontOrder);
  record.minimized = false;
  status.textContent = `${record.title} · Open`;
  renderDock();
}

function renderDock() {
  dock.replaceChildren();
  dock.hidden = windows.size === 0;
  for (const [id, app] of Object.entries(apps)) {
    const record = windows.get(id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dock-app";
    button.dataset.dockApp = id;
    const label = record?.minimized ? `Restore ${app.title}` : record ? `Switch to ${app.title}` : `Open ${app.title}`;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-haspopup", "menu");
    if (record && !record.minimized && record.element.classList.contains("is-active")) button.setAttribute("aria-current", "true");
    button.title = `${app.title} · right-click for window options`;
    const glyph = id === "maataa" ? "M" : id === "tlps" ? "▰" : id === "film" ? "◉" : id === "nevo" ? "N" : "?";
    button.innerHTML = `<span class="app-icon app-icon-${id}" aria-hidden="true"><b>${glyph}</b></span>`;
    button.addEventListener("click", () => record ? focusWindow(record) : openApp(id));
    button.addEventListener("contextmenu", event => {
      event.preventDefault();
      showWindowMenu(id, event.clientX, event.clientY);
    });
    dock.append(button);
  }
}

function updateNativeFullScreen(state) {
  if (!state || typeof state.isFullScreen !== "boolean") return;
  const wasExpanded = nativeWindowState.isFullScreen || nativeWindowState.isMaximized;
  nativeWindowState = state;
  document.documentElement.classList.toggle("native-fullscreen", state.isFullScreen);
  for (const record of windows.values()) {
    const active = record.element.classList.contains("is-active");
    record.element.classList.toggle("is-native-fullscreen", state.isFullScreen && active);
    record.element.classList.toggle("is-native-maximized", Boolean(state.isMaximized) && active && !state.isFullScreen);
    if (active && (state.isFullScreen || state.isMaximized)) {
      record.element.style.left = "";
      record.element.style.top = "";
      record.element.style.width = "";
      record.element.style.height = "";
      record.element.style.resize = "none";
    } else if (active && wasExpanded && record.restoreLayout) {
      const layout = record.restoreLayout;
      record.restoreLayout = null;
      applyWindowLayout(record, layout);
    }
    record.fullScreenButton.setAttribute("aria-label", `${active && state.isFullScreen ? "Exit" : "Enter"} full screen for ${record.title}`);
  }
}

function toggleFullScreen(record) {
  if (window.maataaDesktop?.toggleFullScreen) {
    if (!nativeWindowState.isFullScreen && !nativeWindowState.isMaximized) {
      record.restoreLayout = record.layout;
      record.element.style.left = "";
      record.element.style.top = "";
      record.element.style.width = "";
      record.element.style.height = "";
    }
    window.maataaDesktop.toggleFullScreen();
    return;
  }
  const expanded = record.element.classList.contains("is-maximized");
  if (expanded) {
    record.element.classList.remove("is-maximized");
    const layout = record.restoreLayout ?? "comfortable";
    record.restoreLayout = null;
    applyWindowLayout(record, layout);
  } else {
    record.restoreLayout = record.layout;
    record.element.style.left = "";
    record.element.style.top = "";
    record.element.style.width = "";
    record.element.style.height = "";
    record.element.classList.add("is-maximized");
  }
  const full = record.element.classList.contains("is-maximized");
  record.fullScreenButton.setAttribute("aria-label", `${full ? "Exit" : "Enter"} full screen for ${record.title}`);
}

function toggleWindowMaximize(record) {
  if (window.maataaDesktop?.toggleMaximize) {
    if (!nativeWindowState.isMaximized && !nativeWindowState.isFullScreen) {
      record.restoreLayout = record.layout;
      record.element.style.left = "";
      record.element.style.top = "";
      record.element.style.width = "";
      record.element.style.height = "";
    }
    window.maataaDesktop.toggleMaximize();
    return;
  }
  const expanded = record.element.classList.contains("is-maximized");
  if (expanded) {
    record.element.classList.remove("is-maximized");
    const layout = record.restoreLayout ?? "comfortable";
    record.restoreLayout = null;
    applyWindowLayout(record, layout);
  } else {
    record.restoreLayout = record.layout;
    record.element.style.left = "";
    record.element.style.top = "";
    record.element.style.width = "";
    record.element.style.height = "";
    record.element.classList.add("is-maximized");
  }
}

function minimizeWindow(record) {
  record.element.hidden = true;
  record.element.classList.remove("is-active");
  record.minimized = true;
  status.textContent = `${record.title} · Minimized`;
  renderDock();
}

function closeWindow(id) {
  const record = windows.get(id);
  if (!record) return;
  if (record.element.classList.contains("is-native-fullscreen") && window.maataaDesktop?.toggleFullScreen) window.maataaDesktop.toggleFullScreen();
  record.frame.hidden = true;
  frameParking.append(record.frame);
  record.element.remove();
  windows.delete(id);
  status.textContent = windows.size ? "Apps are open" : "Choose an app";
  renderDock();
}

function makeWindow(id) {
  const app = apps[id];
  const element = document.createElement("section");
  element.className = "app-window is-active";
  element.dataset.appWindow = id;
  element.setAttribute("aria-label", `${app.title} app window`);
  element.style.zIndex = String(++frontOrder);

  const titlebar = document.createElement("div");
  titlebar.className = "app-titlebar";
  const controls = document.createElement("div");
  controls.className = "window-controls";
  const close = document.createElement("button");
  close.type = "button";
  close.className = "window-control close-control";
  close.setAttribute("aria-label", `Close ${app.title}`);
  close.title = `Close ${app.title}`;
  close.addEventListener("click", () => closeWindow(id));
  const minimize = document.createElement("button");
  minimize.type = "button";
  minimize.className = "window-control minimize-control";
  minimize.setAttribute("aria-label", `Minimize ${app.title}`);
  minimize.title = `Minimize ${app.title}`;
  minimize.addEventListener("click", () => minimizeWindow(record));
  const fullScreen = document.createElement("button");
  fullScreen.type = "button";
  fullScreen.className = "window-control fullscreen-control";
  fullScreen.setAttribute("aria-label", `Enter full screen for ${app.title}`);
  fullScreen.title = `Full screen ${app.title}`;
  fullScreen.addEventListener("click", () => toggleFullScreen(record));
  controls.append(close, minimize, fullScreen);

  const title = document.createElement("strong");
  title.className = "app-window-title";
  title.textContent = app.title;
  const homeButton = document.createElement("button");
  homeButton.type = "button";
  homeButton.className = "window-home";
  homeButton.textContent = "Desktop";
  homeButton.setAttribute("aria-label", "Show desktop and minimize this app");
  homeButton.addEventListener("click", () => minimizeWindow(record));
  titlebar.append(controls, title, homeButton);
  titlebar.addEventListener("dblclick", event => {
    if (event.target instanceof Element && event.target.closest("button")) return;
    toggleWindowMaximize(record);
  });
  titlebar.addEventListener("pointerdown", event => {
    if (event.target instanceof Element && event.target.closest("button")) return;
    if (element.classList.contains("is-maximized") || element.classList.contains("is-native-fullscreen")) return;
    focusWindow(record);
    const rect = element.getBoundingClientRect();
    const workspace = content.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const left = rect.left - workspace.left;
    const top = rect.top - workspace.top;
    titlebar.setPointerCapture(event.pointerId);
    const move = moveEvent => {
      record.layout = "custom";
      clampWindow(record, left + moveEvent.clientX - startX, top + moveEvent.clientY - startY);
    };
    const finish = finishEvent => {
      if (finishEvent.pointerId !== event.pointerId) return;
      titlebar.removeEventListener("pointermove", move);
      titlebar.removeEventListener("pointerup", finish);
      titlebar.removeEventListener("pointercancel", finish);
    };
    titlebar.addEventListener("pointermove", move);
    titlebar.addEventListener("pointerup", finish);
    titlebar.addEventListener("pointercancel", finish);
  });

  const body = document.createElement("div");
  body.className = "app-window-body";
  app.frame.hidden = false;
  body.append(app.frame);
  element.append(titlebar, body);
  element.addEventListener("pointerdown", () => {
    const active = windows.get(id);
    if (active && !active.element.classList.contains("is-active")) focusWindow(active);
  });
  layer.append(element);

  const record = { id, title: app.title, frame: app.frame, element, minimized: false, fullScreenButton: fullScreen, layout: "comfortable", glyph: id === "maataa" ? "M" : id === "tlps" ? "▰" : id === "film" ? "◉" : id === "nevo" ? "N" : "?" };
  windows.set(id, record);
  applyWindowLayout(record, "comfortable");
  focusWindow(record);
  return record;
}

function openApp(id, { handoff = false } = {}) {
  if (id === "browser") {
    status.textContent = "Opening MAATAA Browser · native WebKit";
    window.maataaDesktop?.launchBrowser?.().then(result => {
      status.textContent = result?.ok ? "MAATAA Browser · Open" : `MAATAA Browser · ${result?.message ?? "could not start"}`;
    }).catch(() => { status.textContent = "MAATAA Browser · could not start"; });
    return;
  }
  if (!apps[id]) return;
  const existing = windows.get(id);
  if (handoff && id === "film") apps.film.frame.src = "/tlp/index.html?from=tlps";
  if (existing) {
    if (handoff && id === "film") existing.frame.src = "/tlp/index.html?from=tlps";
    focusWindow(existing);
    return;
  }
  makeWindow(id);
}

for (const button of document.querySelectorAll("[data-launch-app]")) {
  button.addEventListener("click", () => openApp(button.dataset.launchApp));
}
document.querySelector("#desktop-home-button").addEventListener("click", () => {
  for (const record of windows.values()) minimizeWindow(record);
  status.textContent = "Desktop · Choose an app";
});
window.addEventListener("message", event => {
  if (event.origin !== window.location.origin) return;
  if (event.source !== apps.tlps.frame.contentWindow) return;
  if (event.data?.type !== "maataa:desktop:open-tlps-film") return;
  openApp("film", { handoff: true });
});
window.maataaDesktop?.onWindowState?.(updateNativeFullScreen);
windowMenu.addEventListener("click", event => {
  const item = event.target instanceof Element ? event.target.closest("[data-window-action]") : null;
  if (!item || !menuAppId) return;
  const id = menuAppId;
  const action = item.dataset.windowAction;
  closeWindowMenu();
  let record = windows.get(id);
  if (action === "close") {
    if (record) closeWindow(id);
    return;
  }
  if (!record) record = makeWindow(id);
  else focusWindow(record);
  if (action === "minimize") minimizeWindow(record);
  else applyWindowLayout(record, action);
});
document.addEventListener("pointerdown", event => {
  if (windowMenu.hidden || windowMenu.contains(event.target) || event.target.closest?.(".dock-app")) return;
  closeWindowMenu();
});
window.addEventListener("resize", () => {
  if (nativeWindowState.isFullScreen || nativeWindowState.isMaximized) return;
  for (const record of windows.values()) {
    if (record.layout && record.layout !== "custom") applyWindowLayout(record, record.layout);
    else {
      const rect = record.element.getBoundingClientRect();
      const workspace = content.getBoundingClientRect();
      clampWindow(record, rect.left - workspace.left, rect.top - workspace.top);
    }
  }
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !windowMenu.hidden) {
    closeWindowMenu();
  } else if (event.key === "Escape") {
    const active = [...windows.values()].find(record => record.element.classList.contains("is-active"));
    if (active?.element.classList.contains("is-maximized")) active.element.classList.remove("is-maximized");
  }
});
