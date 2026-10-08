import "./tlpPublicSurface.css";

const workflow = [
  ["01", "Ideation", "Turn a prompt into a story premise, treatment, and audience hypothesis."],
  ["02", "Script", "Shape a beat map, character arcs, scene ideas, and a review queue."],
  ["03", "Pre-production", "Explore a synthetic breakdown, schedule, and cost scenario."],
  ["04", "Production", "Walk through mock call-sheet and day-report scenarios."],
  ["05", "Post-production", "Review a sample finishing plan and simulated QC notes."],
  ["06", "Release", "Prepare concept materials and inspect an explicitly unreleased status."],
];

const available = [
  { number: "01", title: "A six-stage film workflow", text: "Navigate Ideation through Release in one responsive workspace. Stage checklists help organize next steps." },
  { number: "02", title: "Prompt-to-concept drafts", text: "Explore a story treatment, character arcs, scene seeds, and concept-kit copy for 30 Trillion India." },
  { number: "03", title: "Repeatable simulation data", text: "Inspect synthetic schedule, budget, production, QC, and audience scenarios with clear demo labels." },
  { number: "04", title: "Browser-local progress", text: "Project title, active stage, checklist, and draft iteration stay in this browser. There is no shared account or server workspace." },
];

const vision = [
  { title: "Content creation & pitching", original: "Create pitches for studios and producers", status: "Prototype only", detail: "The demo supplies a fictional concept treatment and a downloadable text concept kit. Studio submissions and pitch workflows are not connected." },
  { title: "Scriptwriting assistance", original: "AI writing suggestions and feedback", status: "Proposed · unverified", detail: "The current drafts are deterministic fixtures. No language model or script-feedback service is called." },
  { title: "Resource & talent hiring", original: "Discover actors, crew, and post-production talent", status: "Proposed · unverified", detail: "No talent directory, availability data, introductions, contracts, or hiring service is present." },
  { title: "Monetization opportunities", original: "Licensing, streaming, and advertising pathways", status: "Proposed · unverified", detail: "No marketplace, distributor connection, licensing deal, payout, or revenue service is present." },
  { title: "AI-powered insights", original: "Audience, demographic, and market signals", status: "Proposed · unverified", detail: "Audience values in the film workspace are synthetic scenario arithmetic, not analytics or market research." },
  { title: "Collaboration & studio network", original: "Connect team members, studios, and producers", status: "Proposed · unverified", detail: "No login, shared project, messaging, producer network, or studio integration is connected." },
  { title: "Project management", original: "Virtual line-producer coordination", status: "Limited prototype", detail: "Stage navigation and checklists work locally. Budgets, deadlines, approvals, and production status are not authoritative." },
  { title: "Copyright protection", original: "Recognize and flag unauthorized use", status: "Proposed · unverified", detail: "The app has a rights-review checklist only. It does not scan content, detect infringement, or provide legal protection." },
];

export function TlpPublicSurface({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <main className="tlp-public">
      <header className="tlp-public-header">
        <a href="./index.html?surface=tlp" className="tlp-public-brand" aria-label="TLP public overview">
          <span className="tlp-public-mark">T</span>
          <span><strong>TLP</strong><small>THE LINE PRODUCER</small></span>
        </a>
        <nav aria-label="TLP overview">
          <a href="#workflow">Workflow</a>
          <a href="#available">Available now</a>
          <a href="#vision">Product vision</a>
        </nav>
        <button className="tlp-header-cta" type="button" onClick={onOpenWorkspace}>Open workspace ↗</button>
      </header>

      <section className="tlp-product-hero" id="overview">
        <div className="tlp-hero-copy">
          <span className="tlp-public-kicker"><i /> FILM PLANNING · LOCAL PRODUCT PREVIEW</span>
          <h1>Make the<br />next scene<br /><em>possible.</em></h1>
          <p>TLP (The Line Producer) is a guided film-production planning workspace. Move a project from its first idea to a release plan, with generated creative starting points and clearly marked simulation data.</p>
          <div className="tlp-hero-actions">
            <a className="tlp-action-primary" href="#workflow">Explore the workflow <span>↘</span></a>
            <a className="tlp-action-secondary" href="?surface=film">View 30 Trillion India <span>↗</span></a>
          </div>
          <div className="tlp-hero-proof"><span>6 PRODUCTION STAGES</span><span>LOCAL DEMO</span><span>NO CONNECTED AI PROVIDER</span></div>
        </div>
        <div className="tlp-hero-art" role="img" aria-label="Illustrative film production plan from first idea through release">
          <div className="tlp-art-orbit orbit-one" /><div className="tlp-art-orbit orbit-two" />
          <div className="tlp-art-title"><span>ONE PROJECT · SIX MOVEMENTS</span><strong>IDEA<br /><i>→</i> FILM<br /><i>→</i> RELEASE PLAN</strong></div>
          <div className="tlp-art-route">{workflow.map(([number, label]) => <div key={number}><b>{number}</b><span>{label}</span><i /></div>)}</div>
          <small className="tlp-art-caption">ILLUSTRATIVE WORKFLOW · NOT A PRODUCTION STATUS</small>
        </div>
      </section>

      <section className="tlp-workflow-section" id="workflow">
        <div className="tlp-section-shell">
          <div className="tlp-section-overline">01 / THE WORKFLOW</div>
          <div className="tlp-section-heading"><h2>A clear path<br />through the work.</h2><p>One sample project carries the same six stages used by the TLP film-planning demo.</p></div>
          <div className="tlp-workflow-grid">{workflow.map(([number, label, text]) => <article key={number}><span>{number}</span><h3>{label}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="tlp-available-section" id="available">
        <div className="tlp-section-shell">
          <div className="tlp-section-overline">02 / AVAILABLE IN THIS PREVIEW</div>
          <div className="tlp-section-heading"><h2>Working pieces,<br /><i>shown honestly.</i></h2><p>Try the parts that are implemented today. The scope and boundaries stay visible beside the demo.</p></div>
          <div className="tlp-available-grid">{available.map((item) => <article key={item.number}><span>{item.number} / AVAILABLE</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          <button className="tlp-dark-cta" type="button" onClick={onOpenWorkspace}>Open the production workspace <span>↗</span></button>
        </div>
      </section>

      <section className="tlp-vision-section" id="vision">
        <div className="tlp-section-shell">
          <div className="tlp-section-overline">03 / THE BROADER VISION</div>
          <div className="tlp-section-heading"><h2>A wider idea<br />for TLP.</h2><p>The supplied product brief describes these ambitions. Each card separates that vision from verified behavior in the current preview.</p></div>
          <div className="tlp-vision-grid">{vision.map((item, index) => <article key={item.title}><div className="tlp-vision-card-head"><span>0{index + 1}</span><b className={item.status.includes("Proposed") ? "is-proposed" : ""}>{item.status}</b></div><h3>{item.title}</h3><p className="tlp-vision-original">VISION · {item.original}</p><p>{item.detail}</p></article>)}</div>
        </div>
      </section>

      <section className="tlp-ai-boundary">
        <div className="tlp-section-shell tlp-ai-boundary-inner">
          <div><span className="tlp-section-overline">04 / AI & DATA BOUNDARY</span><h2>Creative drafts.<br /><i>Clearly labeled.</i></h2></div>
          <div><p>The current project includes authored, deterministic draft variations and repeatable synthetic production scenarios. They help demonstrate a possible workflow; they are not live model output, market evidence, a production record, or a release forecast.</p><ul><li>No LLM provider is called.</li><li>No talent, studio, marketplace, or payment service is connected.</li><li>No audience or copyright-recognition dataset is used.</li><li>Project state stays in this browser.</li></ul></div>
        </div>
      </section>

      <footer className="tlp-public-footer">
        <a href="./index.html?surface=tlp" className="tlp-public-brand"><span className="tlp-public-mark">T</span><span><strong>TLP</strong><small>THE LINE PRODUCER</small></span></a>
        <p>Local product preview · proposed capabilities require implementation and verification.</p>
        <div><a href="?surface=film">30 Trillion India concept</a><button type="button" onClick={onOpenWorkspace}>Open workspace ↗</button></div>
      </footer>
    </main>
  );
}
