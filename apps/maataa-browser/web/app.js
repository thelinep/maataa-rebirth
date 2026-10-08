const invoke = window.__TAURI__?.core?.invoke;
const address = document.querySelector("#address");
const message = document.querySelector("#message");
const historyList = document.querySelector("#history-events");
const networkList = document.querySelector("#network-events");
const eventCount = document.querySelector("#event-count");
const panelHeading = document.querySelector("#panel-heading");
let activeView = "history";
const engine = document.querySelector("#engine");
const runtimeLabel = document.querySelector("#runtime-label");
const runtimeDescription = document.querySelector("#runtime-description");
if (invoke) {
  engine.textContent = /Mac/.test(navigator.userAgent) ? "Apple WebKit · native" : "Native engine · verify this OS";
} else {
  engine.textContent = "Preview only · native app disconnected";
  runtimeLabel.textContent = "STATIC PREVIEW · NATIVE RUNTIME NOT CONNECTED";
  runtimeDescription.textContent = "This file preview cannot open pages or observe browser traffic. Launch the MAATAA Browser desktop app to use its native WebKit window and development tools.";
  message.textContent = "Preview only. Run pnpm maataa:browser:dev from the repository to connect native WebKit.";
  for (const control of document.querySelectorAll("#navigate button, [data-action], #inspector, #clear-session")) control.disabled = true;
  document.body.classList.add("preview-only");
}

async function navigate(value) {
  if (!invoke) {
    message.textContent = "Open this page inside the MAATAA Browser desktop app.";
    return;
  }
  try {
    const finalUrl = await invoke("navigate_browser", { rawUrl: value });
    address.value = finalUrl;
    message.textContent = "Page opened in a separate, isolated native WebKit window.";
    await refreshEvents();
  } catch (error) {
    message.textContent = String(error);
  }
}

async function refreshEvents() {
  if (!invoke) return;
  try {
    const [events, historyEvents] = await Promise.all([invoke("browser_events"), invoke("browser_history")]);
    const history = historyEvents.slice().reverse();
    const network = events.filter(item => item.kind === "fetch" || item.kind === "xhr" || item.kind.startsWith("resource:")).slice().reverse();
    eventCount.textContent = String(activeView === "history" ? history.length : network.length);
    if (document.activeElement !== address && history.length) {
      const latestPage = history[0];
      if (latestPage) address.value = latestPage.url;
    }
    renderRows(historyList, history, "Pages you open will appear here.", item => {
      const row = document.createElement("li");
      row.className = "event-row";
      const page = document.createElement("button"); page.className = "history-open"; page.type = "button"; page.textContent = new URL(item.url).hostname; page.title = `Open ${item.url}`;
      page.addEventListener("click", () => void navigate(item.url));
      const url = document.createElement("span"); url.textContent = item.url; url.title = item.url;
      const at = document.createElement("time"); at.textContent = new Date(item.at * 1000).toLocaleTimeString();
      row.append(page, url, at); return row;
    });
    renderRows(networkList, network, "Open a page to observe its requests.", item => {
      const row = document.createElement("li"); row.className = "event-row";
      const kind = document.createElement("span"); kind.textContent = `${item.kind} · ${item.detail || "timing"}`;
      const url = document.createElement("span"); url.textContent = item.url; url.title = item.url;
      const at = document.createElement("time"); at.textContent = new Date(item.at * 1000).toLocaleTimeString();
      row.append(kind, url, at); return row;
    });
    eventCount.textContent = String(activeView === "history" ? history.length : network.length);
  } catch { /* the controller remains useful while the native process initializes */ }
}

function renderRows(list, rows, emptyText, makeRow) {
  list.replaceChildren();
  if (!rows.length) { const empty = document.createElement("li"); empty.className = "empty"; empty.textContent = emptyText; list.append(empty); return; }
  for (const item of rows.slice(0, 200)) list.append(makeRow(item));
}

for (const tab of document.querySelectorAll("[data-view]")) tab.addEventListener("click", () => {
  activeView = tab.dataset.view;
  const isHistory = activeView === "history";
  document.querySelector("#history-view").hidden = !isHistory;
  document.querySelector("#network-view").hidden = isHistory;
  for (const item of document.querySelectorAll("[data-view]")) item.setAttribute("aria-pressed", String(item === tab));
  panelHeading.textContent = isHistory ? "Browsing history" : "Network activity";
  void refreshEvents();
});

document.querySelector("#clear-session").addEventListener("click", async () => {
  try { await invoke("clear_browser_events"); await refreshEvents(); }
  catch (error) { message.textContent = String(error); }
});

document.querySelector("#navigate").addEventListener("submit", event => {
  event.preventDefault();
  void navigate(address.value);
});
for (const button of document.querySelectorAll("[data-action]")) {
  button.addEventListener("click", async () => {
    try { await invoke("browser_control", { action: button.dataset.action }); }
    catch (error) { message.textContent = String(error); }
  });
}
document.querySelector("#inspector").addEventListener("click", async () => {
  try { await invoke("open_browser_inspector"); }
  catch (error) { message.textContent = String(error); }
});
void refreshEvents();
window.setInterval(() => void refreshEvents(), 1500);
