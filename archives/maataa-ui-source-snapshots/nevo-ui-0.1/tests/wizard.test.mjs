import assert from "node:assert/strict";
import test from "node:test";
import * as wizard from "../dist/wizard/index.js";

test("keeps every flat wizard export working after adding the Wizard namespace", () => {
  for (const name of ["NevoWizard", "NevoWizardShell", "NevoWizardStep", "NevoWizardDefaultLayout", "useNevoWizard", "createMemoryWizardAdapter"]) {
    assert.equal(typeof wizard[name], "function", `${name} must still be exported`);
  }
});

test("exports a Wizard namespace that aliases the same parts, not copies", () => {
  assert.equal(typeof wizard.Wizard, "object", "Wizard namespace must be exported");
  const expectedKeys = ["Root", "Shell", "Header", "Progress", "Stepper", "Step", "Body", "Actions", "Summary", "Error", "SaveIndicator", "MobileNav", "DefaultLayout"];
  for (const key of expectedKeys) {
    assert.equal(typeof wizard.Wizard[key], "function", `Wizard.${key} must be exported`);
  }
  assert.equal(wizard.Wizard.Root, wizard.NevoWizard, "Wizard.Root must be the exact same function as NevoWizard");
  assert.equal(wizard.Wizard.Step, wizard.NevoWizardStep, "Wizard.Step must be the exact same function as NevoWizardStep");
  assert.equal(wizard.Wizard.DefaultLayout, wizard.NevoWizardDefaultLayout, "Wizard.DefaultLayout must be the exact same function as NevoWizardDefaultLayout");
});
