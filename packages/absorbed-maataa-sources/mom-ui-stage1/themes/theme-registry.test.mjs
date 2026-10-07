import assert from "node:assert/strict";
import {
  getRecommendedThemes,
  getThemeById,
  getThemesByFamily,
  resolveThemeStack,
  THEME_FAMILIES,
  THEME_REGISTRY,
  themeToCSSVariables
} from "../dist/themes/index.js";

const requiredFields = [
  "id",
  "name",
  "family",
  "description",
  "targetUsers",
  "accessibilityProfile",
  "motionProfile",
  "colorTokens",
  "typographyTokens",
  "layoutDensity",
  "deviceSupport",
  "runtimeModes",
  "chakraMapping",
  "aiAssistantMode",
  "recommendedFor",
  "avoidFor",
  "cssVariables"
];

const ids = THEME_REGISTRY.map((theme) => theme.id);
assert.equal(new Set(ids).size, ids.length, "theme ids must be unique");

for (const family of THEME_FAMILIES) {
  assert.ok(getThemesByFamily(family).length > 0, `${family} must contain themes`);
}

for (const theme of THEME_REGISTRY) {
  for (const field of requiredFields) {
    assert.ok(field in theme, `${theme.id} missing ${field}`);
  }

  assert.equal(getThemeById(theme.id)?.id, theme.id, `${theme.id} must be selectable by lookup`);
  assert.ok(theme.description.length > 16, `${theme.id} needs a useful description`);
  assert.ok(theme.targetUsers.length > 0, `${theme.id} needs targetUsers`);
  assert.ok(theme.recommendedFor.length > 0, `${theme.id} needs recommendedFor`);
  assert.ok(theme.avoidFor.length > 0, `${theme.id} needs avoidFor`);
  assert.ok(Object.keys(theme.colorTokens).length >= 12, `${theme.id} needs complete color tokens`);
  assert.ok(Object.keys(theme.typographyTokens).length >= 8, `${theme.id} needs complete typography tokens`);
  assert.equal(
    theme.cssVariables["--maataa-primary"],
    theme.colorTokens.primary,
    `${theme.id} CSS primary must match token`
  );
  assert.ok(theme.cssVariables["--maataa-bg"], `${theme.id} needs usable CSS variables`);
}

assert.ok(
  getRecommendedThemes({ age: 4 }).some((theme) => theme.id === "age-bloom"),
  "age 4 should recommend Bloom"
);
assert.ok(
  getRecommendedThemes({ age: 34 }).some((theme) => theme.id === "age-nexus"),
  "age 34 should recommend Nexus"
);
assert.ok(
  getRecommendedThemes({ network: "offline" }).some((theme) => theme.id === "network-offline"),
  "offline should recommend Offline"
);

const stack = resolveThemeStack({
  themeIds: ["age-nexus", "accessibility-focus-pulse", "device-desktop-runtime"],
  network: "4g",
  chakra: "solar"
});

assert.ok(stack.ids.includes("age-nexus"), "stack should preserve explicit age theme");
assert.ok(stack.cssVariables["--maataa-primary"], "stack should merge CSS variables");
assert.ok(themeToCSSVariables("age-sattva")["--maataa-age-band"], "themeToCSSVariables should resolve ids");

console.log(
  `Maataa UI theme registry integrity ok: ${THEME_REGISTRY.length} themes across ${THEME_FAMILIES.length} families`
);
