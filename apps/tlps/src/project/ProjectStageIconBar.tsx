import * as React from 'react';
import { MaataaIcon, type MaataaIconName } from '@maataa/ui/icons/MaataaIcon';
import './project-stage-icon-bar.css';

export const TLPS_PROJECT_STAGES = [
  { id: 'idea', label: 'Idea', icon: 'sparkles', description: 'Capture the starting idea.' },
  { id: 'story', label: 'Story', icon: 'docs', description: 'Develop the story and script.' },
  { id: 'board', label: 'Board', icon: 'layout', description: 'Arrange the storyboard and visual plan.' },
  { id: 'pre', label: 'Pre', icon: 'form', description: 'Prepare people, places, schedules and estimates.' },
  { id: 'production', label: 'Production', icon: 'demos', description: 'Organise production work.' },
  { id: 'post', label: 'Post', icon: 'tool', description: 'Plan editing, sound, VFX and finishing.' },
  { id: 'release', label: 'Release', icon: 'arrow-right', description: 'Prepare delivery and release.' },
  { id: 'shree', label: 'Shree', icon: 'metrics', description: 'Review finance and settlement planning. No payment or fund release is triggered.' },
] as const satisfies readonly { id: string; label: string; icon: MaataaIconName; description: string }[];
export type TlpsProjectStage = typeof TLPS_PROJECT_STAGES[number]['id'];

/** Controlled stage navigation, separate from completion, approvals, billing and custody. */
export function ProjectStageIconBar({ value, onValueChange, vertical = false }: {
  value: TlpsProjectStage;
  onValueChange: (stage: TlpsProjectStage) => void;
  vertical?: boolean;
}) {
  return <nav className={`tlps-project-stage-bar${vertical ? ' is-vertical' : ''}`} aria-label="Project stages">
    <ol>{TLPS_PROJECT_STAGES.map((stage, index) => <li key={stage.id}>
      <button type="button" aria-current={value === stage.id ? 'step' : undefined} onClick={() => onValueChange(stage.id)} title={stage.description}>
        <span className="tlps-project-stage-symbol"><MaataaIcon name={stage.icon} size={24} /></span>
        <span className="tlps-project-stage-text"><span className="tlps-project-stage-position">{index + 1}</span><strong>{stage.label}</strong></span>
      </button>
    </li>)}</ol>
  </nav>;
}
