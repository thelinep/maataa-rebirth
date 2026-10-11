// Deprecated layout names and the stable layout with the same template (decision 2026-10-12).
// The generator emits the stable name so generated code never imports a deprecated export.
export const DEPRECATED_LAYOUT_ALIASES: Readonly<Record<string, string>> = {
  BeforeAfterLayout: "ComparisonLayout",
  PageBuilderLayout: "BuilderLayout",
  CenteredContainerLayout: "SingleColumnLayout",
  CollapsibleSidebarLayout: "SidebarShellLayout",
  KnowledgeBaseLayout: "DocumentationLayout",
  ResponsiveThreePaneLayout: "ThreeColumnLayout",
  StepperFormLayout: "WizardLayout",
};
