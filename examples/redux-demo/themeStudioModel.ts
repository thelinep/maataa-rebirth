export type StudioTheme = {
  name: string;
  colors: {
    canvas: string;
    surface: string;
    elevated: string;
    text: string;
    muted: string;
    border: string;
    primary: string;
    primaryText: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    focus: string;
  };
  typography: {
    bodyFont: string;
    headingFont: string;
    monoFont: string;
    baseSize: number;
    scale: number;
    lineHeight: number;
    headingWeight: number;
    letterSpacing: number;
  };
  shape: {
    radius: number;
    surfaceStyle: "solid" | "soft" | "glass";
    borderWidth: number;
    density: number;
    shadowBlur: number;
    shadowY: number;
    shadowOpacity: number;
  };
  motion: {
    duration: number;
    easing: string;
    hoverLift: boolean;
    reducedMotion: boolean;
    focusWidth: number;
  };
};

export const STUDIO_STORAGE_KEY = "maataa.theme-studio.presets.v1";
export const STUDIO_ACTIVE_KEY = "maataa.theme-studio.active.v1";

export const FONT_STACKS = {
  "Inter with system fallback": 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  "System sans": 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  "Humanist sans": '"Trebuchet MS", Arial, sans-serif',
  "Editorial serif": 'Georgia, "Times New Roman", serif',
  "System monospace": 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const;

export function sanitizeFontStack(value: string): string {
  return value.replace(/[;{}<>\r\n]/g, " ").slice(0, 180);
}

export const DEFAULT_STUDIO_THEME: StudioTheme = {
  name: "MAATAA Signature",
  colors: {
    canvas: "#17140f", surface: "#211d17", elevated: "#29231b", text: "#f6efe3", muted: "#bdb2a3",
    border: "#42392f", primary: "#d5ad61", primaryText: "#1b150b", secondary: "#3a3024", success: "#73c69a",
    warning: "#e7b458", danger: "#eb8a7f", info: "#83b7e1", focus: "#edc66f",
  },
  typography: {
    bodyFont: FONT_STACKS["Inter with system fallback"], headingFont: FONT_STACKS["Inter with system fallback"],
    monoFont: FONT_STACKS["System monospace"], baseSize: 16, scale: 1.22, lineHeight: 1.55, headingWeight: 700, letterSpacing: -0.02,
  },
  shape: { radius: 14, surfaceStyle: "soft", borderWidth: 1, density: 1, shadowBlur: 24, shadowY: 8, shadowOpacity: 0.2 },
  motion: { duration: 180, easing: "ease-out", hoverLift: true, reducedMotion: false, focusWidth: 2 },
};

export const COLOR_FIELDS: Array<{ key: keyof StudioTheme["colors"]; label: string }> = [
  { key: "canvas", label: "Canvas" }, { key: "surface", label: "Surface" }, { key: "elevated", label: "Elevated" },
  { key: "text", label: "Text" }, { key: "muted", label: "Muted text" }, { key: "border", label: "Border" },
  { key: "primary", label: "Primary" }, { key: "primaryText", label: "Text on primary" }, { key: "secondary", label: "Secondary" },
  { key: "success", label: "Success" }, { key: "warning", label: "Warning" }, { key: "danger", label: "Danger" },
  { key: "info", label: "Info" }, { key: "focus", label: "Focus ring" },
];

export function contrastRatio(foreground: string, background: string): number {
  const luminance = (color: string) => {
    const values = color.match(/[\da-f]{2}/gi)?.slice(-3).map((channel) => parseInt(channel, 16) / 255);
    if (!values || values.length !== 3) return 0;
    const linear = values.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  };
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function themeToCssVariables(theme: StudioTheme): Record<string, string> {
  const { colors, typography, shape, motion } = theme;
  const r = Math.max(0, shape.radius);
  const typeSize = (step: number) => `${Math.round(typography.baseSize * Math.pow(typography.scale, step) * 100) / 100}px`;
  const shadowAlpha = motion.reducedMotion ? 0 : shape.shadowOpacity;
  const cardShadow = motion.reducedMotion || shape.surfaceStyle === "solid" ? "none" : shape.surfaceStyle === "glass"
    ? `0 ${shape.shadowY}px ${shape.shadowBlur}px rgba(0,0,0,${shadowAlpha.toFixed(2)})`
    : `0 ${Math.max(1, Math.round(shape.shadowY * 0.35))}px ${Math.max(2, Math.round(shape.shadowBlur * 0.45))}px rgba(0,0,0,${(shadowAlpha * 0.55).toFixed(2)})`;
  const cardBackground = shape.surfaceStyle === "soft" ? colors.elevated : shape.surfaceStyle === "glass"
    ? `color-mix(in srgb, ${colors.surface} 76%, transparent)` : colors.surface;
  return {
    "--m-bg": colors.canvas, "--m-surface": colors.surface, "--m-elevated": colors.elevated,
    "--m-text": colors.text, "--m-muted": colors.muted, "--m-border": colors.border,
    "--m-primary": colors.primary, "--m-primary-contrast": colors.primaryText, "--m-secondary": colors.secondary,
    "--m-success": colors.success, "--m-warning": colors.warning, "--m-danger": colors.danger, "--m-info": colors.info,
    "--m-focus": colors.focus, "--m-font-sans": typography.bodyFont, "--m-font-heading": typography.headingFont,
    "--m-font-mono": typography.monoFont, "--m-font-size-base": `${typography.baseSize}px`,
    "--m-font-scale": String(typography.scale), "--m-line-height": String(typography.lineHeight),
    "--m-font-size-h1": typeSize(3), "--m-font-size-h2": typeSize(2), "--m-font-size-h3": typeSize(1),
    "--m-font-size-h4": typeSize(0), "--m-font-size-h5": typeSize(-1), "--m-font-size-h6": typeSize(-2),
    "--m-font-weight-strong": String(typography.headingWeight), "--m-letter-spacing": `${typography.letterSpacing}em`,
    "--m-radius-xs": `${Math.round(r * 0.28)}px`, "--m-radius-sm": `${Math.round(r * 0.55)}px`,
    "--m-radius-md": `${Math.round(r * 0.8)}px`, "--m-radius-lg": `${r}px`, "--m-border-width": `${shape.borderWidth}px`,
    "--m-density": String(shape.density), "--m-surface-style": shape.surfaceStyle, "--m-card-bg": cardBackground, "--m-card-shadow": cardShadow,
    "--m-shadow-sm": `0 ${Math.max(1, Math.round(shape.shadowY * 0.35))}px ${Math.max(2, Math.round(shape.shadowBlur * 0.45))}px rgba(0,0,0,${(shadowAlpha * 0.55).toFixed(2)})`,
    "--m-shadow-md": `0 ${shape.shadowY}px ${shape.shadowBlur}px rgba(0,0,0,${shadowAlpha.toFixed(2)})`,
    "--m-motion-duration": motion.reducedMotion ? "0ms" : `${motion.duration}ms`, "--m-motion-easing": motion.easing,
    "--m-hover-lift": motion.hoverLift && !motion.reducedMotion ? "-2px" : "0px", "--m-focus-width": `${motion.focusWidth}px`,
  };
}

export function themeToCss(theme: StudioTheme): string {
  const variables = themeToCssVariables(theme);
  return `:root {\n${Object.entries(variables).map(([key, value]) => `  ${key}: ${value};`).join("\n")}\n}`;
}

export function parseSavedThemes(value: string | null): StudioTheme[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is StudioTheme => Boolean(item && typeof item === "object" && typeof item.name === "string" && item.colors && item.typography && item.shape && item.motion));
  } catch {
    return [];
  }
}

export function parseActiveTheme(value: string | null): StudioTheme | null {
  const parsed = parseSavedThemes(value ? `[${value}]` : null);
  return parsed[0] ?? null;
}

export function applyThemeTokens(target: HTMLElement, theme: StudioTheme): void {
  for (const [property, value] of Object.entries(themeToCssVariables(theme))) target.style.setProperty(property, value);
  target.dataset.maataaCustomTheme = "true";
}

export function clearThemeTokens(target: HTMLElement): void {
  for (const property of Object.keys(themeToCssVariables(DEFAULT_STUDIO_THEME))) target.style.removeProperty(property);
  delete target.dataset.maataaCustomTheme;
}
