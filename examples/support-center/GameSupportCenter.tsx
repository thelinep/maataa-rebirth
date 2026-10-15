import * as React from "react";
import { Button } from "@maataa/ui/actions/Button";
import { MaataaIcon } from "@maataa/ui/icons/MaataaIcon";
import { ARCADE_GAME_THEME } from "../redux-demo/themeStudioPresets";
import { themeToCssVariables } from "../redux-demo/themeStudioModel";
import "./game-support.css";

const guides = [
  { title: "Equip the Arcade Quest theme", category: "Getting started", text: "Open Theme Studio and select MAATAA · Arcade Quest. Selection changes only the preview. Choose Apply theme to use it across MAATAA and TLPS on that device. Export JSON to keep a copy.", link: "Open Theme Studio", href: "http://127.0.0.1:4177/#/theme-studio" },
  { title: "Start a workplace demo", category: "Getting started", text: "Choose a TLPS work area and a workplace. Add sample or personal records, name a plan owner and add a review note. Check each step in order. Locked steps cannot skip the review.", link: "Explore workplaces", href: "http://127.0.0.1:4177/#/tlps/workplaces" },
  { title: "Recover a blank preview", category: "Troubleshooting", text: "Refresh the page first: a newly built local preview can replace files an older tab was using. If it still fails, check that the local preview is running. Keep your browser storage unless you have exported anything you want to retain.", link: "Read appearance help", href: "#/article/themes" },
  { title: "Keep and export your progress", category: "Troubleshooting", text: "Workplace drafts stay in this browser. Export demo handover before moving devices or clearing site data. Changing records or the plan owner restarts review while keeping the notes. Sample records are synthetic.", link: "Open workplace demos", href: "http://127.0.0.1:4177/#/tlps/workplaces" },
  { title: "Keep motion and focus comfortable", category: "Accessibility", text: "Arcade Quest has no flashing or looping effects. Use Motion & focus in Theme Studio to enable reduced motion or adjust focus width. Keyboard users can tab through the theme options, workplace actions and available review steps.", link: "Read accessibility help", href: "#/article/accessibility" },
  { title: "Connect Brahmini before requesting AI work", category: "Getting started", text: "Brahmini needs a connected provider for AI creation. Review the destination and information before sending a request. A generated product kit is a draft; it does not establish that code was executed, built or deployed.", link: "Open Brahmini", href: "http://127.0.0.1:4177/#/brahmini" },
];

export function GameSupportCenter({ onRequest }: { onRequest: () => void }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All topics");
  const shown = guides.filter((guide) => (category === "All topics" || guide.category === category) && `${guide.title} ${guide.text}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <main className="sc-game-support" style={themeToCssVariables(ARCADE_GAME_THEME) as React.CSSProperties}>
    <div className="sc-game-inner">
      <a href="#/home">Back to Support Center</a>
      <nav className="sc-game-resource-nav" aria-label="Game resources">{["handbook", "playbook", "guides", "payments"].map((item) => <a key={item} href={`#/gaming/${item}`}>{item[0].toUpperCase() + item.slice(1)}</a>)}</nav>
      <header className="sc-game-heading"><div><h1>Your next quest: a clear answer.</h1><p>Game UI Help for MAATAA. Set up a theme, try a workplace demo, or recover your next step.</p><a href="#/artwork">Explore all artwork frames <MaataaIcon name="arrow-right" /></a></div><img className="sc-game-key-art" src="./artwork/welcome.webp" width="768" height="512" alt="" /></header>
      <div className="sc-game-controls">
        <label>Search Game UI Help<input type="search" placeholder="Themes, progress, blank screen…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label>Help topic<select aria-label="Help topic" value={category} onChange={(event) => setCategory(event.target.value)}><option>All topics</option><option>Getting started</option><option>Troubleshooting</option><option>Accessibility</option></select></label>
      </div>
      <section className="sc-game-guides" aria-labelledby="sc-game-guides-title"><h2 id="sc-game-guides-title">Choose your next step</h2><p role="status">{shown.length} {shown.length === 1 ? "guide" : "guides"} found</p>
        {shown.map((guide) => <details key={guide.title}><summary>{guide.title}</summary><p>{guide.text}</p><a href={guide.href}>{guide.link}<MaataaIcon name="arrow-right" /></a></details>)}
        {!shown.length && <div><p>No matching guides. Try another phrase or clear the filters.</p><Button variant="secondary" onClick={() => { setQuery(""); setCategory("All topics"); }}>Clear filters</Button></div>}
      </section>
      <section className="sc-game-faq" aria-labelledby="sc-game-faq-title"><h2 id="sc-game-faq-title">Before you continue</h2><details><summary>Is this a playable video game?</summary><p>This is a video game inspired interface theme and help hub. Game mechanics, scores, multiplayer and game publishing are not included.</p></details><details><summary>Does support receive my request automatically?</summary><p>No. Prepare a request, review it and save a local handoff. Copy or export it for an approved support channel. There is no connected ticket queue or live support chat.</p></details></section>
      <section className="sc-game-request"><div><h2>Still stuck?</h2><p>Describe what happened and what you expected. Leave out passwords, tokens and private production records.</p></div><Button onClick={onRequest}>Prepare a support handoff</Button></section>
      <p className="sc-game-scope">This help hub runs locally. Its Arcade Quest styling is scoped to this page; it does not change your chosen MAATAA theme.</p>
    </div>
  </main>;
}
