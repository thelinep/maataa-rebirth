import Link from "next/link";
import { EnterpriseKanban } from "@/components/enterprise-kanban";

export default function EnterpriseRoadmapPage() {
  return (
    <div className="m-page roadmap-page">
      <a className="skip-link" href="#roadmap-content">Skip to roadmap board</a>
      <header className="m-header">
        <Link className="back-link" href="/">← Observatory overview</Link>
        <nav aria-label="Roadmap navigation" className="m-nav">
          <Link href="/research">Methods & evidence</Link>
          <Link href="/spacecraft">Spacecraft telemetry</Link>
          <Link href="/panchanga">Panchanga profiles</Link>
          <Link href="/roadmap" aria-current="page">Enterprise roadmap</Link>
        </nav>
      </header>
      <main id="roadmap-content" className="m-main roadmap-main">
        <div className="m-hero roadmap-hero">
          <p className="eyebrow">PRODUCT DELIVERY · EVIDENCE GATES</p>
          <h1>From observatory prototype to enterprise pilot.</h1>
          <p className="module-description">A dependency-aware work board for science qualification, platform security, operations and eventual enterprise delivery. Buyer selection, customer discovery and pilot/commercial gates are intentionally deferred until the technical product is built. “Done” describes checked-in prototype evidence only; it does not mean production approval.</p>
          <dl className="m-status" aria-label="Roadmap boundaries">
            <div><dt>Progress storage</dt><dd>This browser only · localStorage</dd></div>
            <div><dt>Shared team sync</dt><dd>Not connected · requires identity and database services</dd></div>
            <div><dt>Release state</dt><dd>Local prototype · no production deployment</dd></div>
          </dl>
        </div>
        <EnterpriseKanban />
        <section className="roadmap-followthrough" aria-labelledby="enterprise-path-title">
          <div className="roadmap-section-head">
            <div><p className="eyebrow">AFTER THE BOARD</p><h2 id="enterprise-path-title">What this can become—and the proof each offer needs</h2></div>
            <Link href="/services" className="roadmap-doc-link">Current service inventory →</Link>
          </div>
          <div className="offer-list">
            <article><h3>Research and education workbench</h3><p>Reproducible sky/time exercises, provenance reports and observatory training. Earliest credible pilot; uses existing UI and bounded science slices after validation.</p><small>Buyer proof: learner/operator task completion and independent replay.</small></article>
            <article><h3>Observatory data and calendar toolkit</h3><p>Configured ephemeris, time and Panchanga profiles for institutions. Requires independent references, sunrise rules and profile-specific acceptance cases.</p><small>Buyer proof: agreed comparison accuracy, named authority and supported locations.</small></article>
            <article><h3>Space mission ground-data adapter</h3><p>Ingests and correlates approved mission clock and telemetry products for analysis. The existing Mars 2020 sample is archival and bounded; it is not an operational adapter.</p><small>Buyer proof: mission-approved kernels, CSPICE differential tests and security review.</small></article>
            <article><h3>Flight or navigation software</h3><p>A separate, safety-critical product line with mission-specific requirements, estimator validation, target hardware qualification and assurance evidence.</p><small>Not supported by today’s prototype; do not sell as flight-ready.</small></article>
          </div>
          <div className="market-path"><h3>Potential India-first discovery channels</h3><p>Evaluate academic research and SpaceTech programs as routes to discovery or pilots, not as confirmed funding or sales. Recheck each call’s current eligibility and dates before applying.</p>
            <ul>
              <li><a href="https://www.isro.gov.in/academia.html" target="_blank" rel="noreferrer">ISRO Academia programs</a> and <a href="https://www.isro.gov.in/SponsoredResearch.html" target="_blank" rel="noreferrer">RESPOND research opportunities</a></li>
              <li><a href="https://www.inspace.gov.in/" target="_blank" rel="noreferrer">IN-SPACe ecosystem pathways</a> and <a href="https://www.isro.gov.in/Spin.html" target="_blank" rel="noreferrer">SpaceTech Innovation Network (SpIN)</a></li>
              <li><a href="https://www.isro.gov.in/ISRO_EN/NSIL.html" target="_blank" rel="noreferrer">NSIL commercial mission-support context</a>; partnership and procurement eligibility must be checked directly.</li>
            </ul>
          </div>
          <p className="roadmap-input-note"><strong>Technical owner input remains visible in the board:</strong> mission and approved kernel source (if mission-clock work is in scope), accepted science profile/reference, deployment/data-residency policy and commercial redistribution rights. Buyer, pilot, pricing and customer-service decisions are deliberately deferred until the technical product baseline is built; none are being inferred or treated as complete.</p>
        </section>
        <footer className="roadmap-footer"><span>HEMANT SAMWAT · ENTERPRISE DELIVERY PLAN</span><Link href="/roadmap/plan">Open the full atomic checklist →</Link><span>Local board state is a planning aid, not a release certificate.</span></footer>
      </main>
    </div>
  );
}
