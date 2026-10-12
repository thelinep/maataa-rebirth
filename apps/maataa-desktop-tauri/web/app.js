const invoke = window.__TAURI__?.core?.invoke;
const currentWindow = window.__TAURI__?.webviewWindow?.getCurrentWebviewWindow?.();
const windowLabel = currentWindow?.label ?? 'main';
const isBrowserWindow = windowLabel.startsWith('browser-');
const status = document.querySelector('#status');
const desktopStatus = document.querySelector('#desktop-status');
const address = document.querySelector('#nav-address');
const navForm = document.querySelector('#nav-form');

document.body.classList.toggle('browser-window', isBrowserWindow);
const clock = document.querySelector('#clock');
const hemantClock = document.querySelector('#hemant-clock');
let clockRequestSequence = 0;
async function updateClock() {
  if (!clock) return;
  const requestSequence = ++clockRequestSequence;
  let now;
  let unixNanos;
  if (invoke) {
    try {
      const snapshot = await invoke('read_host_clock_snapshot');
      if (requestSequence !== clockRequestSequence) return;
      if (
        snapshot?.schema !== 'maataa.clock-source/1'
        || snapshot?.trust !== 'unverified'
        || typeof snapshot?.unixNanos !== 'string'
        || !/^\d+$/.test(snapshot.unixNanos)
      ) {
        throw new Error('Host clock response did not match the unverified clock-source contract.');
      }
      unixNanos = BigInt(snapshot.unixNanos);
      now = new Date(Number(unixNanos / 1_000_000n));
      if (!Number.isFinite(now.getTime())) throw new Error('Host clock value is outside the display range.');
    } catch (error) {
      if (requestSequence !== clockRequestSequence) return;
      clock.textContent = 'Clock unavailable';
      clock.title = `Unverified host time unavailable: ${String(error)}`;
      if (hemantClock) hemantClock.textContent = 'Hemant · time unavailable';
      return;
    }
  } else {
    now = new Date();
    unixNanos = BigInt(now.getTime()) * 1_000_000n;
  }
  clock.textContent = new Intl.DateTimeFormat(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' }).format(now);
  clock.title = 'Host wall-clock observation · unverified · RTC and trusted-reference drift unavailable';
  if (hemantClock) {
    hemantClock.textContent = 'Hemant · withheld · source unverified';
  }
}
updateClock();
window.setInterval(updateClock, 30_000);

async function launchBrowser() {
  if (!invoke) {
    const message = 'Native preview only · open the installed MAATAA Desktop app to launch Browser windows.';
    if (status) status.textContent = message;
    if (desktopStatus) desktopStatus.textContent = message;
    return;
  }
  try { await invoke('open_browser_window'); }
  catch (error) { if (status) status.textContent = String(error); }
}

async function showDesktop() {
  if (!invoke) return;
  try { await invoke('focus_desktop_window'); }
  catch (error) { if (status) status.textContent = String(error); }
}

async function launchProduct(product) {
  if (!invoke) {
    const message = 'Native preview only · open the installed MAATAA Desktop app to launch product windows.';
    if (desktopStatus) desktopStatus.textContent = message;
    return;
  }
  try { await invoke('open_product_window', { product }); }
  catch (error) { if (desktopStatus) desktopStatus.textContent = String(error); }
}

const projectsNode = document.querySelector('#workspace-projects');
const eventsNode = document.querySelector('#workspace-events');
const projectText = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

function renderWorkspaceProjects(projects) {
  if (!projectsNode) return;
  if (!Array.isArray(projects) || projects.length === 0) {
    const nativeReady = Boolean(invoke);
    projectsNode.innerHTML = `<p class="workspace-empty"><strong>No saved projects yet</strong>${nativeReady ? 'Start in TLPS or TLP Film. Your project will appear here after you give it a name.' : 'Projects are shared here when the apps run inside the native MAATAA Desktop.'}<br/><button type="button" data-launch-product="tlps">Start a plan in TLPS →</button></p>`;
  } else {
    projectsNode.innerHTML = projects.map((project) => {
      const product = project.product === 'tlps' ? 'tlps' : 'tlp-film';
      const label = product === 'tlps' ? 'TLPS' : 'TLP Film';
      const state = project.sample ? 'Example' : 'Local draft';
      const record = project.record && typeof project.record.recordId === 'string' ? project.record : null;
      if (record) {
        return `<article class="workspace-project-row" data-record-id="${projectText(record.recordId)}">
        <div class="workspace-project-heading"><strong>${projectText(project.title)}</strong><span class="state-tag">Project record · v${Number(record.recordVersion)}</span></div>
        <div class="workspace-project-meta"><span>${label}</span><code>${projectText(record.recordId)}</code></div>
        <div class="workspace-project-actions">
          <button type="button" data-open-record="maataa-ui" data-record-id="${projectText(record.recordId)}" data-record-version="${Number(record.recordVersion)}" aria-label="Open ${projectText(record.recordId)} version ${Number(record.recordVersion)} in MAATAA UI and Brahmini">Open in MAATAA UI · Brahmini →</button>
          <button type="button" data-open-record="${product}" data-record-id="${projectText(record.recordId)}" data-record-version="${Number(record.recordVersion)}" aria-label="Open ${projectText(record.recordId)} version ${Number(record.recordVersion)} in ${label}">Open record in ${label} →</button>
        </div>
        <p class="workspace-project-note">Local prototype · saved on this Mac only · no sign-in or shared database.</p>
      </article>`;
      }
      const api = project.apiLink && typeof project.apiLink.projectId === 'string' ? project.apiLink : null;
      const apiMeta = api
        ? `<div class="workspace-project-meta"><span>MAATAA Auth API · v${Number(api.currentVersion)}</span><code>${projectText(api.projectId)}</code></div>
        <p class="workspace-project-note">Version from the API on this computer, as last seen by Desktop. The API is the authority.</p>`
        : '';
      return `<article class="workspace-project-row"${api ? ` data-api-project-id="${projectText(api.projectId)}"` : ''}>
        <div class="workspace-project-heading"><strong>${projectText(project.title)}</strong><span class="state-tag">${api ? `API · v${Number(api.currentVersion)}` : state}</span></div>
        <div class="workspace-project-meta"><span>${label}</span><span>${projectText(project.projectType || 'Project')}</span></div>
        ${apiMeta}
        <button type="button" data-open-project="${product}">Open in ${label} →</button>
      </article>`;
    }).join('');
  }
  projectsNode.querySelectorAll('[data-open-project]').forEach((button) => {
    button.addEventListener('click', () => openProjectWorkspace(button.dataset.openProject));
  });
  projectsNode.querySelectorAll('[data-open-record]').forEach((button) => {
    button.addEventListener('click', () => openProjectRecord(
      button.dataset.openRecord,
      button.dataset.recordId,
      Number(button.dataset.recordVersion),
    ));
  });
  projectsNode.querySelectorAll('[data-launch-product]').forEach((button) => {
    button.addEventListener('click', () => launchProduct(button.dataset.launchProduct));
  });
}

function renderWorkspaceEvents(events) {
  if (!eventsNode) return;
  if (!Array.isArray(events) || events.length === 0) {
    eventsNode.replaceChildren();
    const empty = document.createElement('li');
    empty.className = 'workspace-empty';
    empty.textContent = 'Activity appears when a project is created, updated, or removed.';
    eventsNode.append(empty);
    return;
  }
  eventsNode.replaceChildren(...events.slice(0, 40).map((event) => {
    const row = document.createElement('li');
    row.className = 'workspace-event';
    const action = document.createElement('strong');
    action.textContent = ({
      'project-created': 'Project created',
      'project-updated': 'Project updated',
      'project-removed': 'Project removed',
    })[event.action] ?? 'Project activity';
    const product = document.createElement('span');
    product.textContent = (event.product === 'tlps' ? 'TLPS' : event.product === 'tlp-film' ? 'TLP Film' : 'MAATAA app')
      + (Number.isInteger(event.recordVersion) ? ` · record v${event.recordVersion}` : '');
    const time = document.createElement('time');
    const date = new Date(Number(event.recordedAtUnixMs));
    time.textContent = Number.isNaN(date.getTime()) ? 'Time unavailable' : date.toLocaleString();
    row.append(action, product, time);
    return row;
  }));
}

async function openProjectRecord(product, recordId, recordVersion) {
  if (!invoke) return launchProduct(product);
  try { await invoke('open_product_window', { product, recordId, recordVersion }); }
  catch (error) {
    // Desktop refuses stale or unknown versions; show why and reload the list.
    if (desktopStatus) desktopStatus.textContent = String(error);
    void refreshWorkspaceProjects();
  }
}

async function openProjectWorkspace(product) {
  if (!invoke) return launchProduct(product);
  try { await invoke('open_product_window', { product, openWorkspace: true }); }
  catch (error) { if (desktopStatus) desktopStatus.textContent = String(error); }
}

async function refreshWorkspaceProjects() {
  if (!projectsNode) return;
  if (!invoke) {
    renderWorkspaceProjects([]);
    renderWorkspaceEvents([]);
    return;
  }
  projectsNode.innerHTML = '<p class="workspace-empty">Loading projects saved on this Mac…</p>';
  try {
    const [projects, events] = await Promise.all([
      invoke('list_workspace_projects'),
      invoke('list_workspace_events'),
    ]);
    renderWorkspaceProjects(projects);
    renderWorkspaceEvents(events);
  }
  catch (error) {
    projectsNode.innerHTML = `<p class="workspace-empty"><strong>Project list is unavailable</strong>${projectText(error)}<br/><button type="button" data-launch-product="tlps">Open TLPS →</button></p>`;
    renderWorkspaceEvents([]);
    projectsNode.querySelector('[data-launch-product]')?.addEventListener('click', () => launchProduct('tlps'));
  }
}

document.querySelector('#refresh-workspace')?.addEventListener('click', refreshWorkspaceProjects);
document.querySelectorAll('[data-launch-product]').forEach((button) => {
  button.addEventListener('click', () => launchProduct(button.dataset.launchProduct));
});
const listen = window.__TAURI__?.event?.listen;
if (listen) void listen('workspace-projects-updated', refreshWorkspaceProjects);
// Returning from a product window: re-read the registry so the current record version shows.
window.addEventListener('focus', () => { if (invoke) void refreshWorkspaceProjects(); });
if (!isBrowserWindow) void refreshWorkspaceProjects();

['#browser-app', '#dock-browser', '#new-browser', '#nav-new'].forEach((selector) => {
  document.querySelector(selector)?.addEventListener('click', launchBrowser);
});
document.querySelector('#maataa-app')?.addEventListener('click', () => launchProduct('maataa-ui'));
const hemantWorkspace = document.querySelector('#hemant-workspace');
const spacecraftWorkspace = document.querySelector('#spacecraft-workspace');
function showDesktopApp(app) {
  if (!hemantWorkspace || !spacecraftWorkspace) return;
  hemantWorkspace.hidden = app !== 'hemant';
  spacecraftWorkspace.hidden = app !== 'spacecraft';
  const showApp = Boolean(app);
  for (const selector of ['.desktop-meta', '.welcome', '.app-grid', '.workspace-hub', '.desktop-note', '.dock']) {
    document.querySelector(selector)?.toggleAttribute('hidden', showApp);
  }
  if (app === 'hemant') document.querySelector('#hemant-back')?.focus();
  else if (app === 'spacecraft') document.querySelector('#spacecraft-back')?.focus();
  else document.querySelector('#hemant-app')?.focus();
}
document.querySelector('#hemant-app')?.addEventListener('click', () => showDesktopApp('hemant'));
document.querySelector('#hemant-back')?.addEventListener('click', () => showDesktopApp(null));
document.querySelector('#spacecraft-app')?.addEventListener('click', () => showDesktopApp('spacecraft'));
document.querySelector('#spacecraft-back')?.addEventListener('click', () => showDesktopApp(null));
const hemantDate = document.querySelector('#hemant-date');
if (hemantDate) {
  const now = new Date();
  hemantDate.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  hemantDate.addEventListener('change', () => {
    const [year, month, day] = hemantDate.value.split('-').map(Number);
    if (!year || !month || !day) return;
    const weekday = new Date(year, month - 1, day).toLocaleDateString(undefined, { weekday: 'long' });
    const vara = document.querySelector('#panchang-vara');
    if (vara) vara.textContent = `${weekday} · calendar arithmetic only`;
  });
}
['#tlps-app', '#dock-tlps'].forEach((selector) => {
  document.querySelector(selector)?.addEventListener('click', () => launchProduct('tlps'));
});
['#film-app', '#dock-film'].forEach((selector) => {
  document.querySelector(selector)?.addEventListener('click', () => launchProduct('tlp-film'));
});
['#support-app', '#dock-support'].forEach((selector) => {
  document.querySelector(selector)?.addEventListener('click', () => launchProduct('support-center'));
});
['#dock-home', '#nav-home'].forEach((selector) => {
  document.querySelector(selector)?.addEventListener('click', showDesktop);
});

if (isBrowserWindow) {
  const browserNumber = windowLabel.slice('browser-'.length);
  document.title = `Browser ${browserNumber} · MAATAA Desktop`;
  document.querySelector('.brand small').textContent = 'BROWSER · WEBKIT';
  if (status) status.textContent = 'Independent browser window · no page open';
  const sample = document.querySelector('#browser-open-sample');
  sample?.addEventListener('click', () => {
    address.value = 'example.com';
    navForm.requestSubmit();
  });
}

navForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!invoke) {
    if (status) status.textContent = 'Open this window in the native MAATAA Desktop app to browse with WebKit.';
    return;
  }
  if (!isBrowserWindow) {
    if (status) status.textContent = 'Open the Browser app from the desktop to start a browsing window.';
    return;
  }
  if (status) status.textContent = 'Opening a page in this browser window…';
  try {
    const opened = await invoke('open_embedded_page', { windowLabel, address: address.value });
    address.value = opened;
    document.body.classList.add('page-open');
    if (status) status.textContent = `Open in this window: ${new URL(opened).host}`;
  } catch (error) {
    if (status) status.textContent = String(error);
  }
});

document.querySelectorAll('[data-control]').forEach((button) => button.addEventListener('click', async () => {
  if (!invoke || !isBrowserWindow) return;
  try { await invoke('browser_control', { windowLabel, action: button.dataset.control }); }
  catch (error) { if (status) status.textContent = String(error); }
}));

document.querySelector('#nav-close')?.addEventListener('click', async () => {
  if (!invoke || !isBrowserWindow) return;
  try {
    await invoke('close_embedded_page', { windowLabel });
    document.body.classList.remove('page-open');
    address.value = '';
    if (status) status.textContent = 'Page closed · this Browser window is ready for another site';
  } catch (error) { if (status) status.textContent = String(error); }
});
