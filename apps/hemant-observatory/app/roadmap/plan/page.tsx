import Link from "next/link";
import { enterpriseRoadmap, roadmapPhases } from "@/lib/enterprise-roadmap";

export default function EnterprisePlanPage() {
  return <main className="m-page"><div className="m-main">
    <Link className="back-link" href="/roadmap">← Back to Kanban</Link>
    <div className="m-hero"><p className="eyebrow">CANONICAL TASK REGISTER · {enterpriseRoadmap.length} ATOMIC TASKS</p><h1>Enterprise delivery checklist</h1><p className="module-description">The task definitions and initial evidence statuses that drive the local Kanban board.</p></div>
    {roadmapPhases.map((phase) => <section className="m-panel" key={phase}><h2>{phase}</h2>{enterpriseRoadmap.filter((task) => task.phase === phase).map((task) => <article className="plan-task" key={task.id}><h3><code>{task.id}</code> · {task.title} <span>{task.status}</span></h3><p>{task.detail}</p><p><strong>Acceptance:</strong> {task.acceptance}</p>{task.dependsOn?.length ? <p><strong>Depends on:</strong> {task.dependsOn.join(", ")}</p> : null}{task.input ? <p><strong>Owner input:</strong> {task.input}</p> : null}{task.evidence ? <p><strong>Current evidence:</strong> {task.evidence}</p> : null}</article>)}</section>)}
    <p className="m-note">For durable team collaboration, replace browser-local progress with authenticated MAATAA identity, a versioned roadmap API and an audited database contract. Until then, localStorage does not sync to another browser or user.</p>
  </div></main>;
}
