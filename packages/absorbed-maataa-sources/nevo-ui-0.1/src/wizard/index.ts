export * from "./types.js";
export { NevoWizard, useNevoWizard, createMemoryWizardAdapter } from "./context.js";
export type { NevoWizardProps } from "./context.js";
export {
  NevoWizardShell,
  NevoWizardHeader,
  NevoWizardProgress,
  NevoWizardStepper,
  NevoWizardStep,
  NevoWizardBody,
  NevoWizardActions,
  NevoWizardSummary,
  NevoWizardError,
  NevoWizardSaveIndicator,
  NevoWizardMobileNav,
} from "./NevoWizardParts.js";
export { NevoWizardDefaultLayout } from "./DefaultLayout.js";

// Compound-component alias: the same parts re-exported above, grouped
// under one namespace for call sites that prefer Wizard.Root / Wizard.Step
// -style JSX -- the shape newer libraries (Chakra v3, Base UI) converged
// on, and what the @maataa/ui "best of all" review recommended adopting.
// Purely additive: every flat name above keeps working exactly as before,
// so no existing consumer (event-create-form.tsx, public-event-wizard.tsx,
// nevo-wizard-demo.tsx, stories, e2e specs) needs to change. New code can
// pick either form; Wizard.* is the one documented as preferred going
// forward (see README.md).
import { NevoWizard as WizardRoot } from "./context.js";
import {
  NevoWizardShell as WizardShell,
  NevoWizardHeader as WizardHeader,
  NevoWizardProgress as WizardProgress,
  NevoWizardStepper as WizardStepper,
  NevoWizardStep as WizardStep,
  NevoWizardBody as WizardBody,
  NevoWizardActions as WizardActions,
  NevoWizardSummary as WizardSummary,
  NevoWizardError as WizardError,
  NevoWizardSaveIndicator as WizardSaveIndicator,
  NevoWizardMobileNav as WizardMobileNav,
} from "./NevoWizardParts.js";
import { NevoWizardDefaultLayout as WizardDefaultLayout } from "./DefaultLayout.js";

export const Wizard = {
  Root: WizardRoot,
  Shell: WizardShell,
  Header: WizardHeader,
  Progress: WizardProgress,
  Stepper: WizardStepper,
  Step: WizardStep,
  Body: WizardBody,
  Actions: WizardActions,
  Summary: WizardSummary,
  Error: WizardError,
  SaveIndicator: WizardSaveIndicator,
  MobileNav: WizardMobileNav,
  DefaultLayout: WizardDefaultLayout,
} as const;

// useNevoWizard/createMemoryWizardAdapter aren't JSX parts, so they stay
// under their existing flat names above rather than being force-fit into
// this namespace object.
