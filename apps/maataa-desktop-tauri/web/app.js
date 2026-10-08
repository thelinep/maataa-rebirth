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
function updateClock() {
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date());
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

['#browser-app', '#dock-browser', '#new-browser', '#nav-new'].forEach((selector) => {
  document.querySelector(selector)?.addEventListener('click', launchBrowser);
});
document.querySelector('#maataa-app')?.addEventListener('click', () => launchProduct('maataa-ui'));
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
