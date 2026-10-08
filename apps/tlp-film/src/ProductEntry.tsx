import { useState } from "react";
import { Button } from "@maataa/ui";
import { TLPS_PROJECT_TYPES, type TlpsProjectType, type TlpsRole } from "../../tlps/src/types";
import { operatingSystemsForRole, TLPS_ROLE_CHOICES, type TlpsOsId } from "../../tlps/src/operatingSystems";
import "./productEntry.css";

export type TlpProjectIntake = {
  role: TlpsRole;
  roleLabel: string;
  operatingSystem: TlpsOsId;
  productionType: TlpsProjectType;
  title: string;
  idea: string;
};

export function LocalPreviewAccess({ onEnter, onBack }: { onEnter: () => void; onBack: () => void }) {
  return <main className="tlp-entry"><section className="tlp-entry-card" aria-labelledby="tlp-access-title">
    <a className="tlp-entry-brand" href="?surface=tlp"><span>T</span><strong>TLP <small>THE LINE PRODUCER</small></strong></a>
    <p className="tlp-entry-kicker">WORKSPACE ACCESS</p><h1 id="tlp-access-title">Continue to your workspace</h1>
    <p>Sign-in is not connected in this preview. Continue into a local demo session to explore the product flow.</p>
    <div className="tlp-entry-notice"><strong>Local preview only</strong><span>This does not verify your identity or create a real account. Your demo session stays in this browser.</span></div>
    <Button variant="primary" onClick={onEnter}>Continue to local preview</Button>
    <button className="tlp-entry-back" type="button" onClick={onBack}>Back to public page</button>
  </section></main>;
}

const activeInFilmPreview = new Set<TlpsOsId>(["film-os", "production-os"]);

export function TlpWorkspaceSetup({ onComplete }: { onComplete: (intake: TlpProjectIntake) => void }) {
  const [step, setStep] = useState<"role" | "os" | "project">("role");
  const [role, setRole] = useState<TlpsRole | "">("");
  const [os, setOs] = useState<TlpsOsId | "">("");
  const [productionType, setProductionType] = useState<TlpsProjectType>("Feature Film");
  const [title, setTitle] = useState("");
  const [idea, setIdea] = useState("");
  const systems = role ? operatingSystemsForRole(role) : [];
  const roleLabel = TLPS_ROLE_CHOICES.find((choice) => choice.id === role)?.label ?? "";

  return <main className="tlp-entry tlp-setup"><div className="tlp-setup-shell">
    <div className="tlp-setup-brand"><span>T</span><strong>TLP <small>WORKSPACE</small></strong><span className="tlp-demo-badge">LOCAL PREVIEW</span></div>
    <div className="tlp-setup-progress" aria-label={`Step ${step === "role" ? 1 : step === "os" ? 2 : 3} of 3`}><span className={step === "role" ? "is-current" : "is-done"}>1 · Role</span><i /><span className={step === "os" ? "is-current" : step === "project" ? "is-done" : ""}>2 · Work area</span><i /><span className={step === "project" ? "is-current" : ""}>3 · Project</span></div>
    {step === "role" && <section className="tlp-setup-panel" aria-labelledby="tlp-role-title"><p className="tlp-entry-kicker">STEP 1 · YOUR WORK</p><h1 id="tlp-role-title">What is your role?</h1><p>We’ll show the work areas that fit what you do.</p><label className="tlp-setup-field"><span>Choose one role</span><select aria-label="Choose your role" value={role} onChange={(event) => { setRole(event.target.value as TlpsRole | ""); setOs(""); }}><option value="">Select a role</option>{TLPS_ROLE_CHOICES.map((choice) => <option key={choice.id} value={choice.id}>{choice.label}</option>)}</select></label><div className="tlp-entry-actions"><Button variant="primary" disabled={!role} onClick={() => setStep("os")}>Show my work areas →</Button></div></section>}
    {step === "os" && <section className="tlp-setup-panel" aria-labelledby="tlp-os-title"><p className="tlp-entry-kicker">STEP 2 · YOUR TOOLS</p><h1 id="tlp-os-title">Choose a work area</h1><p>Suggested for {roleLabel}. Only Film OS and Production OS open in this film preview; the other areas are listed for guidance.</p><div className="tlp-setup-os-grid">{systems.map((system) => activeInFilmPreview.has(system.id) ? <button type="button" aria-pressed={os === system.id} className={`tlp-setup-os ${os === system.id ? "is-selected" : ""}`} key={system.id} onClick={() => setOs(system.id)}><strong>{system.name}</strong><span>{system.detail}</span><small>{os === system.id ? "Selected ✓" : "Available in this preview"}</small></button> : <article className="tlp-setup-os is-catalogue" key={system.id}><strong>{system.name}</strong><span>{system.detail}</span><small>Catalogue · not active here</small></article>)}</div><div className="tlp-entry-actions"><Button variant="ghost" onClick={() => setStep("role")}>Back</Button><Button variant="primary" disabled={!os} onClick={() => setStep("project")}>Continue with this area →</Button></div></section>}
    {step === "project" && <section className="tlp-setup-panel" aria-labelledby="tlp-project-title"><p className="tlp-entry-kicker">STEP 3 · YOUR PROJECT</p><h1 id="tlp-project-title">What do you want to make?</h1><p>Choose a type and tell us the idea. You can add the details later.</p><label className="tlp-setup-field"><span>Choose one project type</span><select aria-label="Choose project type" value={productionType} onChange={(event) => setProductionType(event.target.value as TlpsProjectType)}>{TLPS_PROJECT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}</select></label><label className="tlp-setup-field"><span>Project name</span><input value={title} maxLength={120} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. 30 Trillion India" /></label><label className="tlp-setup-field"><span>Your idea</span><textarea value={idea} maxLength={5000} onChange={(event) => setIdea(event.target.value)} rows={5} placeholder="Describe it in your own words…" /></label><div className="tlp-entry-actions"><Button variant="ghost" onClick={() => setStep("os")}>Back</Button><Button variant="primary" disabled={!os || !title.trim() || !idea.trim()} onClick={() => onComplete({ role: role as TlpsRole, roleLabel, operatingSystem: os as TlpsOsId, productionType, title: title.trim(), idea: idea.trim() })}>Create local project →</Button></div><small className="tlp-entry-boundary">This creates a browser-local demo project. No AI generation, account, or production service is connected.</small></section>}
  </div></main>;
}
