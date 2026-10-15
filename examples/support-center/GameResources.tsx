import * as React from "react";
import { ARCADE_GAME_THEME } from "../redux-demo/themeStudioPresets";
import { themeToCssVariables } from "../redux-demo/themeStudioModel";
import "./game-support.css";
import { ShreePayments } from "./ShreePayments";

const chapters = {
  handbook: { title: "Arcade Quest handbook", intro: "A guide to the MAATAA interface and its illustrated world.", world: "welcome", entries: [
    ["The world", "Eight floating-island environments represent welcome, creative work, operations, knowledge, markets, people, governance and platform work. They are artwork themes for the interface."],
    ["What you can do today", "Choose a theme, explore named workspace frames, try browser-local TLPS demos and prepare a support handoff. Current controls do not implement a playable adventure, scores, multiplayer or game rewards."],
    ["Your progress", "Workplace records and review notes stay in this browser. Export your handover before clearing site data or moving to another device."],
    ["Comfort and control", "Use keyboard navigation and visible focus indicators. Theme Studio provides reduced-motion settings, contrast checks and adjustable typography."],
  ] },
  playbook: { title: "Arcade Quest playbook", intro: "Practical routes through the tools that work today.", world: "operations", entries: [
    ["Choose your visual world", "Open Theme Studio, select Arcade Quest to preview, then use Apply theme if you want it across MAATAA and TLPS."],
    ["Run a workplace rehearsal", "Choose a work area and a workplace. Load samples or add personal records. Name a plan owner, add review notes and check the four local steps in order."],
    ["Review and hand over", "Changing records or the plan owner restarts review. Check the revised plan and export a local JSON handover. A completed rehearsal is not a real-world approval."],
    ["Get unstuck", "Refresh a blank preview after a rebuild. Search Game UI Help, then prepare and review a local support handoff if you still need help."],
  ] },
  guides: { title: "Arcade Quest guides", intro: "Find the right reference for your next action.", world: "creative", entries: [
    ["Themes and appearance", "Theme Studio includes all curated visual candidates and personal presets. Previewing a candidate does not automatically apply it."],
    ["Artwork and frame downloads", "The artwork gallery covers the current MAATAA and TLPS workspace registries. Open a named frame to download it, or download the full frame pack and provenance manifest."],
    ["Brahmini and her team", "Connect a model provider before requesting an AI product kit. Review source drafts and acceptance checks; generated text does not establish execution or deployment."],
    ["Support and data", "Use the existing handoff flow to describe and review an issue, save it locally, and copy or export it through an approved channel. Do not include secrets."],
  ] },
} as const;

export function GameResources({ section }: { section: string }) {
  const chapter = chapters[section as keyof typeof chapters];
  return <main className="sc-game-support" style={themeToCssVariables(ARCADE_GAME_THEME) as React.CSSProperties}><div className="sc-game-inner">
    <a href="#/gaming">Back to Game UI Help</a>
    <nav className="sc-game-resource-nav" aria-label="Game resources">{["handbook", "playbook", "guides", "payments"].map((item) => <a href={`#/gaming/${item}`} aria-current={section === item ? "page" : undefined} key={item}>{item[0].toUpperCase() + item.slice(1)}</a>)}</nav>
    {chapter ? <><header className="sc-game-heading"><div><h1>{chapter.title}</h1><p>{chapter.intro}</p></div><img className="sc-game-key-art" src={`./artwork/${chapter.world}.webp`} width="768" height="512" alt="" /></header>{chapter.entries.map(([title, text]) => <section className="sc-game-resource-chapter" key={title}><h2>{title}</h2><p>{text}</p></section>)}<p><a href="#/artwork">Explore the artwork library</a></p></> : section === "payments" ? <ShreePayments /> : <><h1>Guide not found</h1><p>Choose a resource from the navigation above.</p></>}
  </div></main>;
}
