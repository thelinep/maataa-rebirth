import * as React from "react";
import { Badge } from "@maataa/ui/feedback/Badge";
import { Button } from "@maataa/ui/actions/Button";
import { Input } from "@maataa/ui/forms/Input";
import { Card } from "@maataa/ui/surfaces/Card";
import {
  COLOR_FIELDS,
  DEFAULT_STUDIO_THEME,
  FONT_STACKS,
  STUDIO_ACTIVE_KEY,
  STUDIO_STORAGE_KEY,
  applyThemeTokens,
  clearThemeTokens,
  contrastRatio,
  parseActiveTheme,
  parseSavedThemes,
  sanitizeFontStack,
  themeToCss,
  themeToCssVariables,
  type StudioTheme,
} from "./themeStudioModel";
import "./theme-studio.css";
import { BUILTIN_STUDIO_THEMES } from "./themeStudioPresets";
import { readStoredText, removeStoredValue, writeStoredValue } from "@maataa/ui/compounds";

type StudioPanel = "overview" | "typography" | "colors" | "surfaces" | "motion";
const PANELS: Array<{ id: StudioPanel; label: string; description: string }> = [
  { id: "overview", label: "Overview", description: "Name and apply this design system." },
  { id: "typography", label: "Typography", description: "Font roles, scale, rhythm and weight." },
  { id: "colors", label: "Colors", description: "Semantic palette with live contrast checks." },
  { id: "surfaces", label: "Styles & depth", description: "Shape, borders, density and shadows." },
  { id: "motion", label: "Motion & focus", description: "Animation timing, reduced motion and focus." },
];
const WARM_LIGHT_COLORS: StudioTheme["colors"] = {
  ...DEFAULT_STUDIO_THEME.colors, canvas: "#f6f4ef", surface: "#fffdfa", elevated: "#ffffff", text: "#24211b",
  muted: "#514d45", border: "#d7d1c5", primary: "#745a14", primaryText: "#ffffff", secondary: "#ede9df", focus: "#745a14",
};
const BRAND_THEME_HANDOFF_KEY = "maataa.branding-studio.theme-handoff.v1";

function readStorage(key: string): string | null {
  return readStoredText(key);
}

function readActiveTheme(): StudioTheme {
  if (typeof window === "undefined") return DEFAULT_STUDIO_THEME;
  return parseActiveTheme(readStorage(STUDIO_ACTIVE_KEY)) ?? DEFAULT_STUDIO_THEME;
}

function Slider({ label, value, min, max, step, suffix = "", onChange }: {
  label: string; value: number; min: number; max: number; step: number; suffix?: string; onChange: (value: number) => void;
}) {
  return <label className="studio-slider"><span>{label}<output>{value}{suffix}</output></span><input aria-label={label} type="range" value={value} min={min} max={max} step={step} onChange={(event) => onChange(Number(event.target.value))}/></label>;
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="studio-field"><span>{label}</span><Input aria-label={label} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)}/></label>;
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const valid = /^#[\da-f]{6}$/i.test(value);
  return <label className="studio-color-field">
    <span className="studio-color-swatch" style={{ background: valid ? value : "transparent" }}>
      <input type="color" aria-label={`${label} color`} value={valid ? value : "#000000"} onChange={(event) => onChange(event.target.value)}/>
    </span>
    <span className="studio-color-copy"><strong>{label}</strong><input aria-label={`${label} hex`} value={value} spellCheck={false} onChange={(event) => { const next = event.target.value; if (/^#[\da-f]{0,6}$/i.test(next)) onChange(next); }} onBlur={() => { if (!/^#[\da-f]{6}$/i.test(value)) onChange(DEFAULT_STUDIO_THEME.colors[COLOR_FIELDS.find((field) => field.label === label)?.key ?? "text"]); }}/></span>
  </label>;
}

function contrastStatus(ratio: number) {
  return ratio >= 4.5 ? { label: "AA pass", tone: "good" } : ratio >= 3 ? { label: "Large text only", tone: "warn" } : { label: "Needs contrast", tone: "bad" };
}

export function ThemeStudio({ navigate }: { navigate: (path: string) => void }) {
  const [draft, setDraft] = React.useState<StudioTheme>(readActiveTheme);
  const [panel, setPanel] = React.useState<StudioPanel>("overview");
  const [presets, setPresets] = React.useState<StudioTheme[]>(() => parseSavedThemes(readStorage(STUDIO_STORAGE_KEY)));
  const [notice, setNotice] = React.useState("");
  const [previewTab, setPreviewTab] = React.useState("Overview");
  const [previewValue, setPreviewValue] = React.useState("Design tokens at work");
  const cssVariables = React.useMemo(() => themeToCssVariables(draft) as React.CSSProperties, [draft]);

  React.useEffect(() => {
    const raw = readStorage(BRAND_THEME_HANDOFF_KEY);
    if (!raw) return;
    try {
      const handoff = JSON.parse(raw) as { schemaVersion?: string; theme?: unknown };
      const incoming = handoff.schemaVersion === "maataa.brand-theme-handoff.v1" ? parseActiveTheme(JSON.stringify(handoff.theme)) : null;
      if (incoming) {
        setDraft(incoming);
        setNotice("Brand candidate loaded for component preview. It remains unapproved.");
      }
    } catch { setNotice("Could not read the Branding Studio handoff; the current local theme is open."); }
    removeStoredValue(BRAND_THEME_HANDOFF_KEY);
  }, []);
  const textCanvasRatio = contrastRatio(draft.colors.text, draft.colors.canvas);
  const mutedSurfaceRatio = contrastRatio(draft.colors.muted, draft.colors.surface);
  const primaryRatio = contrastRatio(draft.colors.primaryText, draft.colors.primary);

  const edit = <K extends Exclude<keyof StudioTheme, "name">>(group: K, key: keyof StudioTheme[K] & string, value: StudioTheme[K][keyof StudioTheme[K]]) => {
    setDraft((current) => ({
      ...current,
      [group]: Object.assign({}, current[group], { [key]: value }),
    }));
    setNotice("Unsaved changes");
  };

  const savePresets = (next: StudioTheme[]) => {
    setPresets(next);
    setNotice(writeStoredValue(STUDIO_STORAGE_KEY, next) ? "Preset saved on this device" : "Browser storage is unavailable; export the theme to keep a copy");
  };

  const savePreset = () => {
    const name = draft.name.trim() || "Untitled theme";
    const next = [...presets.filter((preset) => preset.name !== name), { ...draft, name }];
    setDraft((current) => ({ ...current, name }));
    savePresets(next);
  };

  const applyGlobally = () => {
    const active = { ...draft, name: draft.name.trim() || "Untitled theme" };
    applyThemeTokens(document.documentElement, active);
    setNotice(writeStoredValue(STUDIO_ACTIVE_KEY, active) ? "Theme applied across MAATAA package components" : "Theme applied for this session; browser storage is unavailable");
  };

  const resetGlobal = () => {
    clearThemeTokens(document.documentElement);
    removeStoredValue(STUDIO_ACTIVE_KEY);
    setDraft(DEFAULT_STUDIO_THEME);
    setNotice("Built-in MAATAA tokens restored");
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `${draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "maataa-theme"}.json`;
    anchor.click(); URL.revokeObjectURL(url);
    setNotice("Theme JSON downloaded");
  };

  const copyCss = async () => {
    try { await navigator.clipboard.writeText(themeToCss(draft)); setNotice("CSS tokens copied"); }
    catch { setNotice("Clipboard access is unavailable; use Download JSON or select the CSS export below"); }
  };

  const choosePreset = (name: string) => {
    const preset = presets.find((item) => item.name === name) ?? BUILTIN_STUDIO_THEMES.find((item) => item.name === name);
    if (preset) { setDraft(preset); setNotice(`${preset.name} loaded`); }
  };

  const deletePreset = () => {
    if (!presets.length) return;
    const next = presets.filter((item) => item.name !== draft.name);
    savePresets(next);
    setNotice(next.length === presets.length ? "Choose a saved preset to delete" : "Saved preset removed");
  };

  return <section className="page-section theme-studio-page">
    <div className="theme-studio-heading">
      <div><p className="studio-eyebrow">DESIGN SYSTEM WORKSPACE <span>LOCAL</span></p><h1>Theme Studio</h1><p>Shape semantic tokens, inspect real MAATAA components, then save or export a theme draft.</p></div>
      <div className="studio-header-actions"><button className="ghost-button" onClick={() => navigate("/branding-studio")}>Branding Studio</button><button className="ghost-button" onClick={() => navigate("/playground")}>Preview components</button><button className="ghost-button" onClick={downloadJson}>Export JSON</button><button className="gold-button" onClick={applyGlobally}>Apply theme</button></div>
    </div>

    <section className="studio-preset-library" aria-label="Theme options">
      <h2>Theme options</h2>
      <p>Select an option to preview it. Use Apply theme when you want it across MAATAA and TLPS.</p>
      <div>{BUILTIN_STUDIO_THEMES.map((theme) => <button type="button" key={theme.name} aria-pressed={draft.name === theme.name} onClick={() => { setDraft(theme); setNotice(`${theme.name} loaded for preview`); }}>
        <span className="studio-preset-swatches" aria-hidden="true">{[theme.colors.canvas, theme.colors.surface, theme.colors.text, theme.colors.primary].map((color, index) => <i key={index} style={{ backgroundColor: color }} />)}</span>
        <strong>{theme.name.replace(/^(TLPS|MAATAA) · /, "")}</strong>
      </button>)}</div>
    </section>
    <div className="theme-studio-workspace">
      <aside className="studio-sidebar">
        <div className="studio-sidebar-title"><span>STUDIO</span><strong>Theme system</strong></div>
        <nav aria-label="Theme Studio sections">{PANELS.map((item) => <button key={item.id} className={panel === item.id ? "is-active" : ""} aria-current={panel === item.id ? "page" : undefined} onClick={() => setPanel(item.id)}><span className="studio-nav-marker"/>{item.label}<span className="studio-nav-arrow">↗</span></button>)}</nav>
        <div className="studio-sidebar-bottom"><span>Theme library & personal presets</span><select aria-label="Saved themes" value="" onChange={(event) => choosePreset(event.target.value)}><option value="">Load a theme</option><optgroup label="Built-in TLPS themes">{BUILTIN_STUDIO_THEMES.map((preset) => <option key={preset.name} value={preset.name}>{preset.name}</option>)}</optgroup><optgroup label="Saved on this device">{presets.map((preset) => <option key={preset.name} value={preset.name}>{preset.name}</option>)}</optgroup></select><button className="studio-quiet-button" disabled={!presets.some((preset) => preset.name === draft.name)} onClick={deletePreset}>Delete current preset</button></div>
      </aside>

      <div className="studio-editor" aria-live="polite">
        <div className="studio-panel-heading"><div><p className="studio-eyebrow">{panel === "overview" ? "CONFIGURATION" : panel.toUpperCase()}</p><h2>{PANELS.find((item) => item.id === panel)?.label}</h2><p>{PANELS.find((item) => item.id === panel)?.description}</p></div><span className="studio-live-dot">Live preview</span></div>

        {panel === "overview" && <div className="studio-section-grid">
          <div className="studio-control-card studio-span-two"><div className="studio-card-heading"><span>01</span><div><h3>Theme identity</h3><p>Name the system that your team will recognize.</p></div></div><TextField label="Theme name" value={draft.name} onChange={(value) => setDraft((current) => ({ ...current, name: value }))} placeholder="e.g. MAATAA Signature"/><div className="studio-inline-controls"><label className="studio-field"><span>Base appearance</span><select aria-label="Base appearance" value={draft.colors.canvas === DEFAULT_STUDIO_THEME.colors.canvas ? "dark" : draft.colors.canvas === WARM_LIGHT_COLORS.canvas ? "light" : "custom"} onChange={(event) => { if (event.target.value === "dark") setDraft((current) => ({ ...current, colors: { ...DEFAULT_STUDIO_THEME.colors } })); else if (event.target.value === "light") setDraft((current) => ({ ...current, colors: { ...WARM_LIGHT_COLORS } })); }}> <option value="dark">MAATAA dark</option><option value="light">Warm light</option><option value="custom">Custom palette</option></select></label><label className="studio-field"><span>Density</span><select aria-label="Density" value={draft.shape.density} onChange={(event) => edit("shape", "density", Number(event.target.value))}><option value="0.85">Compact</option><option value="1">Comfortable</option><option value="1.15">Relaxed</option></select></label></div></div>
          <div className="studio-control-card"><div className="studio-card-heading"><span>02</span><div><h3>Design health</h3><p>Live WCAG contrast checks for core text pairs.</p></div></div><div className="studio-contrast-list">{[{ label: "Text on canvas", ratio: textCanvasRatio }, { label: "Muted on surface", ratio: mutedSurfaceRatio }, { label: "Primary action", ratio: primaryRatio }].map((item) => { const status = contrastStatus(item.ratio); return <div key={item.label}><span>{item.label}</span><strong>{item.ratio.toFixed(2)}:1</strong><em data-status={status.tone}>{status.label}</em></div>; })}</div></div>
          <div className="studio-control-card"><div className="studio-card-heading"><span>03</span><div><h3>Version & handoff</h3><p>Keep a local preset or hand tokens to engineering.</p></div></div><div className="studio-action-stack"><button className="studio-secondary-action" onClick={savePreset}>Save this theme</button><button className="studio-secondary-action" onClick={copyCss}>Copy CSS variables</button><button className="studio-text-action" onClick={resetGlobal}>Reset applied theme</button></div></div>
        </div>}

        {panel === "typography" && <div className="studio-section-grid">
          <div className="studio-control-card studio-span-two"><div className="studio-card-heading"><span>01</span><div><h3>Type families</h3><p>Choose available system stacks or enter a family installed by your product.</p></div></div>
            <div className="studio-family-grid">{(["bodyFont", "headingFont", "monoFont"] as const).map((key) => <label className="studio-field" key={key}><span>{key === "bodyFont" ? "Body font" : key === "headingFont" ? "Heading font" : "Code font"}<select aria-label={key === "bodyFont" ? "Body font" : key === "headingFont" ? "Heading font" : "Code font"} value={Object.values(FONT_STACKS).includes(draft.typography[key] as never) ? draft.typography[key] : "custom"} onChange={(event) => { if (event.target.value !== "custom") edit("typography", key, event.target.value); }}><option value="custom">Custom stack</option>{Object.entries(FONT_STACKS).map(([label, stack]) => <option key={label} value={stack}>{label}</option>)}</select></span><input className="studio-font-stack-input" aria-label={`${key} CSS stack`} value={draft.typography[key]} onChange={(event) => edit("typography", key, sanitizeFontStack(event.target.value))}/></label>)}</div>
          </div>
          <div className="studio-control-card"><div className="studio-card-heading"><span>02</span><div><h3>Scale & rhythm</h3><p>Set a readable base and consistent type progression.</p></div></div><Slider label="Base size" value={draft.typography.baseSize} min={12} max={20} step={1} suffix=" px" onChange={(value) => edit("typography", "baseSize", value)}/><Slider label="Heading scale" value={draft.typography.scale} min={1.05} max={1.4} step={0.01} onChange={(value) => edit("typography", "scale", value)}/><Slider label="Line height" value={draft.typography.lineHeight} min={1.2} max={1.9} step={0.05} onChange={(value) => edit("typography", "lineHeight", value)}/></div>
          <div className="studio-control-card"><div className="studio-card-heading"><span>03</span><div><h3>Character</h3><p>Adjust heading weight and tracking.</p></div></div><Slider label="Heading weight" value={draft.typography.headingWeight} min={400} max={800} step={50} onChange={(value) => edit("typography", "headingWeight", value)}/><Slider label="Heading tracking" value={draft.typography.letterSpacing} min={-0.06} max={0.08} step={0.005} suffix=" em" onChange={(value) => edit("typography", "letterSpacing", value)}/><div className="studio-type-sample" style={{ fontFamily: draft.typography.headingFont }}><strong>Beautifully clear</strong><span style={{ fontFamily: draft.typography.bodyFont }}>Body copy keeps its own voice and rhythm.</span></div></div>
        </div>}

        {panel === "colors" && <div className="studio-control-card"><div className="studio-card-heading"><span>01</span><div><h3>Semantic palette</h3><p>Color roles stay meaningful across components and states.</p></div></div><div className="studio-color-grid">{COLOR_FIELDS.map((field) => <ColorField key={field.key} label={field.label} value={draft.colors[field.key]} onChange={(value) => edit("colors", field.key, value)}/>)}</div><div className="studio-contrast-callout"><strong>Contrast is checked live</strong><span>Text, muted text and primary-action pairs are measured against their current surfaces. Target 4.5:1 for normal text.</span><div>{[{ label: "Text / canvas", ratio: textCanvasRatio }, { label: "Muted / surface", ratio: mutedSurfaceRatio }, { label: "Action / primary", ratio: primaryRatio }].map((item) => { const status = contrastStatus(item.ratio); return <Badge key={item.label} tone={status.tone === "good" ? "success" : status.tone === "warn" ? "warning" : "danger"}>{item.label} · {item.ratio.toFixed(2)}:1</Badge>; })}</div></div></div>}

        {panel === "surfaces" && <div className="studio-section-grid">
          <div className="studio-control-card"><div className="studio-card-heading"><span>01</span><div><h3>Shape & density</h3><p>Give controls and containers a shared geometry.</p></div></div><label className="studio-field"><span>Surface treatment</span><select aria-label="Surface treatment" value={draft.shape.surfaceStyle} onChange={(event) => edit("shape", "surfaceStyle", event.target.value as StudioTheme["shape"]["surfaceStyle"])}><option value="solid">Solid</option><option value="soft">Soft elevation</option><option value="glass">Glass</option></select></label><Slider label="Corner radius" value={draft.shape.radius} min={0} max={28} step={1} suffix=" px" onChange={(value) => edit("shape", "radius", value)}/><Slider label="Border width" value={draft.shape.borderWidth} min={0} max={2} step={0.5} suffix=" px" onChange={(value) => edit("shape", "borderWidth", value)}/><Slider label="Spacing density" value={draft.shape.density} min={0.75} max={1.25} step={0.05} onChange={(value) => edit("shape", "density", value)}/></div>
          <div className="studio-control-card"><div className="studio-card-heading"><span>02</span><div><h3>Shadow system</h3><p>Balance elevation without losing surface clarity.</p></div></div><Slider label="Shadow blur" value={draft.shape.shadowBlur} min={0} max={48} step={1} suffix=" px" onChange={(value) => edit("shape", "shadowBlur", value)}/><Slider label="Shadow offset" value={draft.shape.shadowY} min={0} max={20} step={1} suffix=" px" onChange={(value) => edit("shape", "shadowY", value)}/><Slider label="Shadow opacity" value={draft.shape.shadowOpacity} min={0} max={0.5} step={0.01} onChange={(value) => edit("shape", "shadowOpacity", value)}/><div className="studio-depth-sample" style={{ boxShadow: `0 ${draft.shape.shadowY}px ${draft.shape.shadowBlur}px rgba(0,0,0,${draft.shape.shadowOpacity})` }}>Elevation preview</div></div>
        </div>}

        {panel === "motion" && <div className="studio-section-grid">
          <div className="studio-control-card"><div className="studio-card-heading"><span>01</span><div><h3>Interaction motion</h3><p>Make transitions responsive and intentional.</p></div></div><Slider label="Duration" value={draft.motion.duration} min={0} max={500} step={10} suffix=" ms" onChange={(value) => edit("motion", "duration", value)}/><label className="studio-field"><span>Easing curve</span><select aria-label="Easing curve" value={draft.motion.easing} onChange={(event) => edit("motion", "easing", event.target.value)}><option value="linear">Linear</option><option value="ease">Ease</option><option value="ease-out">Ease out</option><option value="cubic-bezier(0.2, 0.8, 0.2, 1)">Smooth spring</option></select></label><label className="studio-check"><input type="checkbox" checked={draft.motion.hoverLift} onChange={(event) => edit("motion", "hoverLift", event.target.checked)}/><span><strong>Lift interactive cards</strong><small>Apply a small upward shift on hover and focus.</small></span></label></div>
          <div className="studio-control-card"><div className="studio-card-heading"><span>02</span><div><h3>Accessibility behavior</h3><p>Respect reduced motion and make focus unmistakable.</p></div></div><Slider label="Focus ring width" value={draft.motion.focusWidth} min={1} max={5} step={1} suffix=" px" onChange={(value) => edit("motion", "focusWidth", value)}/><label className="studio-check"><input type="checkbox" checked={draft.motion.reducedMotion} onChange={(event) => edit("motion", "reducedMotion", event.target.checked)}/><span><strong>Reduce motion</strong><small>Disable theme transitions, hover lift and decorative shadow motion.</small></span></label><div className="studio-motion-sample" style={{ transitionDuration: `${draft.motion.duration}ms`, transitionTimingFunction: draft.motion.easing }}>Hover to preview motion</div></div>
        </div>}

        <div className="studio-export-row"><span role="status">{notice || "Edits update the preview immediately."}</span><div><button className="studio-secondary-action" onClick={() => setDraft(readActiveTheme())}>Discard edits</button><button className="gold-button" onClick={applyGlobally}>Apply to MAATAA</button></div></div>
        <details className="studio-css-export"><summary>Inspect generated CSS variables</summary><pre>{themeToCss(draft)}</pre></details>
      </div>

      <aside className="studio-preview-column">
        <div className="studio-preview-heading"><div><p className="studio-eyebrow">CANVAS <span>LIVE</span></p><h2>{draft.name || "Untitled theme"}</h2></div><span className="studio-preview-size">UI KIT · RESPONSIVE</span></div>
        <div className="theme-studio-preview" style={cssVariables} data-surface-style={draft.shape.surfaceStyle} data-reduced-motion={draft.motion.reducedMotion}>
          <div className="studio-preview-nav"><span className="studio-preview-logo">M</span><strong>MAATAA <span>STUDIO</span></strong><nav><button className={previewTab === "Overview" ? "is-active" : ""} onClick={() => setPreviewTab("Overview")}>Overview</button><button className={previewTab === "Activity" ? "is-active" : ""} onClick={() => setPreviewTab("Activity")}>Activity</button></nav><Button variant="primary">Create project</Button></div>
          <div className="studio-preview-content"><p className="studio-eyebrow">{previewTab === "Overview" ? "YOUR WORKSPACE" : "LATEST ACTIVITY"}</p><h3>Ideas into interfaces.</h3><p className="studio-preview-lede">A real component preview powered by the tokens you are editing.</p>
            <div className="studio-preview-stats"><Card><span>Active projects</span><strong>08</strong><small>Across your workspace</small></Card><Card><span>Completion</span><strong>76%</strong><small><i/></small></Card></div>
            <Card className="studio-preview-form" header={<div className="studio-preview-card-title"><strong>Quick update</strong><Badge tone="success">On track</Badge></div>}><label className="studio-preview-label">Project title<Input aria-label="Preview project title" value={previewValue} onChange={(event) => setPreviewValue(event.target.value)}/></label><div className="studio-preview-actions"><Button variant="secondary">Save draft</Button><Button variant="primary">Publish update</Button></div></Card>
            <div className="studio-preview-note"><span>✳</span><p>Theme tokens carry through actions, forms, surfaces, typography and focus states.</p></div>
          </div>
          <footer><span>MAATAA UI · THEME PREVIEW</span><span>Built for clarity</span></footer>
        </div>
        <div className="studio-preview-foot"><span className="studio-preview-swatches">{[draft.colors.primary, draft.colors.secondary, draft.colors.success, draft.colors.focus].map((color, index) => <i key={`${color}-${index}`} style={{ background: color }}/>)}</span><span>Preview uses package components</span><span>{Math.round(draft.shape.radius)} px radius</span></div>
        {presets.length > 0 && <div className="studio-saved-count">{presets.length} local {presets.length === 1 ? "preset" : "presets"}<button onClick={() => choosePreset(presets[presets.length - 1].name)}>Restore most recent</button></div>}
      </aside>
    </div>
  </section>;
}
