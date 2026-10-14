import * as React from "react";
import { Button } from "@maataa/ui/actions/Button";
import { MaataaIcon, type MaataaIconName } from "@maataa/ui/icons/MaataaIcon";

type Action = { label: string; icon: MaataaIconName; onClick: () => void; disabled?: boolean; description: string };

export function WorkplaceActionBar({ actions }: { actions: readonly Action[] }) {
  return <div className="tlps-workplace-action-bar" role="group" aria-label="Workplace actions">
    {actions.map((action) => <Button key={action.label} variant="secondary" onClick={action.onClick} disabled={action.disabled} title={action.description}>
      <MaataaIcon name={action.icon} size={20} /><span>{action.label}</span>
    </Button>)}
  </div>;
}

const stepIcons: readonly MaataaIconName[] = ["form", "evidence", "demos", "docs"];
const stepLabels = ["Prepare", "Review", "Rehearse", "Handover"];

export function WorkplaceStepsBar({ steps, completed, onSelect }: { steps: readonly string[]; completed: number; onSelect: (index: number) => void }) {
  return <nav className="tlps-workplace-steps-bar" aria-label="Workplace workflow steps">
    <ol>{steps.map((title, index) => {
      const done = index < completed;
      const current = index === completed;
      const state = done ? "Checked locally" : current ? "Current step" : "Locked";
      return <li key={title} data-state={done ? "done" : current ? "current" : "locked"}>
        <button type="button" aria-current={current ? "step" : undefined} disabled={index > completed} aria-label={`${stepLabels[index]}: ${title}. ${state}`} title={title} onClick={() => onSelect(index)}>
          <span className="tlps-workplace-step-icon"><MaataaIcon name={done ? "check" : stepIcons[index]} size={22} /></span>
          <span><strong>{stepLabels[index]}</strong><small>{state}</small></span>
        </button>
      </li>;
    })}</ol>
  </nav>;
}
