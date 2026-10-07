const surfaces = {
  maataa: { frame: document.querySelector("#maataa-frame"), title: "Product workspace", button: document.querySelector('[data-surface="maataa"]') },
  support: { frame: document.querySelector("#support-frame"), title: "Help and product reference", button: document.querySelector('[data-surface="support"]') },
};
const status = document.querySelector("#desktop-status");

function selectSurface(name) {
  for (const [key, surface] of Object.entries(surfaces)) {
    const selected = key === name;
    surface.frame.hidden = !selected;
    surface.button.setAttribute("aria-pressed", String(selected));
  }
  status.textContent = surfaces[name].title;
}

for (const [name, surface] of Object.entries(surfaces)) {
  surface.button.addEventListener("click", () => selectSurface(name));
}
document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key === "1") { event.preventDefault(); selectSurface("maataa"); }
  if ((event.metaKey || event.ctrlKey) && event.key === "2") { event.preventDefault(); selectSurface("support"); }
});
