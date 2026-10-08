import { getFilmStagePacket } from "./filmProject30Trillion";
import "./publicFilmSurface.css";

const idea = getFilmStagePacket("ideation", 1);
const release = getFilmStagePacket("release", 1);
const logline = idea.artifacts[0].text;
const treatment = idea.artifacts[1].text;

function downloadConceptKit() {
  const content = [
    "30 TRILLION INDIA — FICTIONAL FEATURE-FILM CONCEPT KIT",
    "DEMO CONCEPT ONLY · NOT A RELEASE ANNOUNCEMENT",
    "",
    "LOGLINE",
    logline,
    "",
    "SHORT SYNOPSIS",
    treatment,
    "",
    "RELEASE STATUS",
    "Not released. No release date, rights clearance, distributor, or screening is confirmed.",
  ].join("\n");
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/plain;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "30-trillion-india-concept-kit.txt";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function PublicFilmSurface({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <main className="public-film" id="public">
      <header className="public-film-nav">
        <a className="public-brand" href="#public" aria-label="30 Trillion India home">
          <span className="public-brand-mark">30</span>
          <span><strong>30 TRILLION INDIA</strong><small>A FICTIONAL FEATURE CONCEPT</small></span>
        </a>
        <nav aria-label="Film page">
          <a href="#story">Story</a>
          <a href="#world">The world</a>
          <a href="#notes">Concept kit</a>
          <a href="#release">Release status</a>
        </nav>
        <button className="public-nav-cta" onClick={onOpenWorkspace}>Production workspace ↗</button>
      </header>

      <section className="public-hero" aria-labelledby="public-title">
        <div className="public-hero-copy">
          <span className="public-eyebrow"><i /> FICTIONAL FILM CONCEPT · DEVELOPMENT PREVIEW</span>
          <h1 id="public-title">The future<br />has a family<br /><em>address.</em></h1>
          <p className="public-logline">{logline}</p>
          <div className="public-actions">
            <a className="public-button public-button-primary" href="#story">Explore the story <span>↓</span></a>
            <button className="public-button public-button-quiet" onClick={downloadConceptKit}>Download concept kit</button>
          </div>
          <p className="public-hero-note">An imagined tomorrow. A story about the choices people make together.</p>
        </div>
        <div className="film-poster" role="img" aria-label="Abstract concept poster of a coastline, a city horizon, and three paths of light">
          <div className="poster-sun" />
          <div className="poster-horizon poster-horizon-back" />
          <div className="poster-horizon poster-horizon-front" />
          <div className="poster-road poster-road-one" />
          <div className="poster-road poster-road-two" />
          <div className="poster-caption"><span>MADE OF MANY TOMORROWS</span><strong>30<br />TRILLION<br />INDIA</strong><small>CONCEPT ART DIRECTION · NOT A FILM STILL</small></div>
          <div className="poster-index">A STORY IN SIX MOVEMENTS <b>01 — 06</b></div>
        </div>
        <div className="hero-bottomline"><span>FEATURE FILM · ENSEMBLE DRAMA</span><span>SPECULATIVE FICTION · NOT AN ECONOMIC FORECAST</span></div>
      </section>

      <section className="public-story section-wrap" id="story">
        <div className="section-kicker">01 / THE STORY</div>
        <div className="story-copy">
          <h2>One family.<br /><span>Many definitions of progress.</span></h2>
          <p>{treatment}</p>
          <p className="story-disclaimer">The characters, places, and events are fictional draft material.</p>
        </div>
        <div className="story-stamp"><span>STORY WORLD</span><strong>FUTURE,<br />IMAGINED.</strong><small>No prediction.<br />No policy claim.</small></div>
      </section>

      <section className="public-world" id="world">
        <div className="section-wrap world-inner">
          <div className="section-kicker">02 / THE WORLD</div>
          <div className="world-heading"><h2>Big change,<br /><i>human scale.</i></h2><p>A coastal district at a turning point: a working port, a farming cooperative, a repair shop, and a new corridor meet in one fictional place.</p></div>
          <div className="world-cards">
            <article className="world-card world-land"><span>01 · LAND</span><h3>What do we carry forward?</h3><p>Memory, livelihood, and the right to shape a changing home.</p><b>PLACE / BELONGING</b></article>
            <article className="world-card world-energy"><span>02 · ENERGY</span><h3>Who keeps the lights on?</h3><p>Skill, infrastructure, and the unseen work behind a brighter city.</p><b>WORK / RESILIENCE</b></article>
            <article className="world-card world-care"><span>03 · CARE</span><h3>Who gets to decide?</h3><p>Three generations negotiate what a shared future should ask of them.</p><b>FAMILY / AGENCY</b></article>
          </div>
        </div>
      </section>

      <section className="public-characters section-wrap">
        <div className="section-kicker">03 / THE PEOPLE</div>
        <div className="character-heading"><h2>Three lives<br />in the same current.</h2><p>Draft characters for story development—not cast announcements.</p></div>
        <div className="character-list">
          <article><span>01 / THE BUILDER</span><h3>Asha</h3><p>A port electrician who trusts a working system more than a promise.</p><small>FICTIONAL CHARACTER</small></article>
          <article><span>02 / THE KEEPER</span><h3>Dev</h3><p>A cooperative organizer who knows a place by the people who depend on it.</p><small>FICTIONAL CHARACTER</small></article>
          <article><span>03 / THE LISTENER</span><h3>Mira</h3><p>An apprentice sound recordist learning that observing is also a choice.</p><small>FICTIONAL CHARACTER</small></article>
        </div>
      </section>

      <section className="public-notes" id="notes">
        <div className="section-wrap notes-inner">
          <div className="section-kicker">04 / FROM THE CONCEPT DESK</div>
          <div className="notes-main"><span className="notes-label">DEVELOPMENT NOTE · DRAFT</span><h2>Listen for the<br />people between<br />the headlines.</h2><p>The visual direction follows working hands, changing light, local sound, and the distance between home and a new horizon. This is a design brief for future development—not footage from a completed film.</p><button className="public-button public-button-primary" onClick={downloadConceptKit}>Get the concept kit <span>↗</span></button></div>
          <div className="notes-visual" aria-hidden="true"><div className="notes-orbit orbit-a"/><div className="notes-orbit orbit-b"/><div className="notes-orbit orbit-c"/><span>FIELD<br />NOTES<br /><b>TTI / 01</b></span></div>
        </div>
      </section>

      <section className="public-release section-wrap" id="release">
        <div className="section-kicker">05 / RELEASE STATUS</div>
        <div className="release-content"><div><span className="release-status"><i /> CONCEPT ONLY · NOT RELEASED</span><h2>A public page<br />for a project<br />still in the making.</h2><p>{release.boundary}</p></div><div className="release-checks"><div><span>Release date</span><strong>Not set</strong></div><div><span>Distribution partner</span><strong>None confirmed</strong></div><div><span>Screenings / bookings</span><strong>None confirmed</strong></div><div><span>Watch trailer</span><strong>No trailer exists</strong></div></div></div>
      </section>

      <section className="public-faq section-wrap">
        <div className="section-kicker">06 / QUESTIONS</div>
        <h2>Clear answers<br />for this concept.</h2>
        <div className="faq-list">
          <details><summary>Is this a released feature film?</summary><p>No. This page presents a fictional development concept inside a local product demo.</p></details>
          <details><summary>Does “30 Trillion India” describe a real economic forecast?</summary><p>No. The title is a story device. The film concept makes no GDP, policy, or economic prediction.</p></details>
          <details><summary>Are the budget and audience figures real?</summary><p>No. Any production and audience values in the workspace are synthetic workflow simulations, not quotes or market research.</p></details>
          <details><summary>Can I watch a trailer or reserve a screening?</summary><p>No trailer, screening, release date, ticket, or distributor is confirmed. This page has no booking or signup form.</p></details>
        </div>
      </section>

      <footer className="public-footer">
        <a className="public-brand" href="#public"><span className="public-brand-mark">30</span><span><strong>30 TRILLION INDIA</strong><small>FICTIONAL FEATURE CONCEPT</small></span></a>
        <p>Concept preview only · All story and simulation details are illustrative.</p>
        <button onClick={onOpenWorkspace}>Open the production workspace ↗</button>
      </footer>
    </main>
  );
}
