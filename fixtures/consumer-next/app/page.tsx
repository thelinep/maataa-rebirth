import Link from "next/link";
const capabilities = [
  { title: "Shared components", text: "Compose application interfaces from reusable React components and package design tokens." },
  { title: "Application-owned flows", text: "Keep routing, domain data, and operational authority in the consuming application." },
  { title: "A concrete starting point", text: "This Next.js App Router example pairs a public page with a local guided workflow." },
];

export default function Page() {
  return (
    <main className="consumer-page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">A shared React package for product-specific applications.</h1>
          <p className="hero-lede">MAATAA UI provides the reusable interface foundation. Each consuming application owns its routes, domain data, and authority.</p>
          <div className="hero-actions">
            <a className="m-button m-ui" data-variant="primary" href="#capabilities">Explore the system</a>
            <Link className="text-link" href="/workflow">Explore the NEVO event workflow <span aria-hidden="true">↗</span></Link>
          </div>
          <p className="hero-note">This example uses the packaged React library in Next.js App Router.</p>
        </div>
        <div className="hero-art" aria-label="A composition of reusable interface layers" role="img">
          <div className="art-label">ONE SYSTEM / MANY SURFACES</div>
          <div className="art-stack"><span>Application</span><span>Page</span><span>Layout</span><span>Component</span><span>Foundation</span></div>
          <div className="art-caption">Start with the foundation.<br />Shape the product around it.</div>
        </div>
      </section>

      <section className="capabilities" id="capabilities" aria-labelledby="capabilities-title">
        <div className="section-heading"><h2 id="capabilities-title">Shared where it helps.<br />Independent where it matters.</h2></div>
        <div className="capability-grid">
          {capabilities.map((item) => <article className="capability-item" key={item.title}>
          <h3>{item.title}</h3><p>{item.text}</p>
          </article>)}
        </div>
      </section>

      <section className="workflow-callout" aria-labelledby="workflow-callout-title">
        <div><p className="eyebrow">NEVO · EVENT OPERATIONS</p><h2 id="workflow-callout-title">See a brief become an operator plan.</h2><p>Explore synthetic event data, add a local planning note, and review the handoff boundary. The sample stops before tenant access or commercial action.</p></div>
        <Link className="workflow-link" href="/workflow">Open NEVO sample workflow <span aria-hidden="true">→</span></Link>
      </section>
      <footer className="consumer-footer"><span>MAATAA UI · App Router consumer</span><span>Illustrative sample · no backend connected</span></footer>
    </main>
  );
}
