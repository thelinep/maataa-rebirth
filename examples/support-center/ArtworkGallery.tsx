import * as React from "react";
import { ARCADE_GAME_THEME } from "../redux-demo/themeStudioPresets";
import { themeToCssVariables } from "../redux-demo/themeStudioModel";
import { ARTWORK_FRAMES, ARTWORK_WORLDS, artworkAsset, artworkFilename, type ArtworkFrame } from "./artworkModel";
import "./artwork-gallery.css";

export function ArtworkCanvas({ frame }: { frame: ArtworkFrame }) {
  return <article className="aq-frame" data-testid="artwork-frame" style={{ backgroundImage: `linear-gradient(90deg,rgba(13,10,28,.96),rgba(13,10,28,.75) 40%,rgba(13,10,28,.05) 75%),url('${artworkAsset(frame.world)}')` }} aria-label={`${frame.title} artwork frame`}>
    <header><strong>MAATAA · ARCADE QUEST</strong><span>{frame.source} / ARTWORK CONCEPT</span></header>
    <div className="aq-frame-title"><h2>{frame.title}</h2><p>{frame.family}</p><p>{frame.summary}</p></div>
    <div className="aq-frame-navigation" aria-label="Illustrative navigation">{frame.navigation.map((label) => <span key={label}>{label}</span>)}</div>
    <div className="aq-frame-records"><strong>Illustrative work queue</strong>{frame.samples.map((sample, index) => <p key={index}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{sample}</p>)}</div>
    <footer>{frame.boundary}</footer>
  </article>;
}

export function ArtworkGallery({ route }: { route: string }) {
  const [query, setQuery] = React.useState("");
  const [source, setSource] = React.useState("All sources");
  const [world, setWorld] = React.useState("All worlds");
  const [page, setPage] = React.useState(0);
  let id = "";
  try { id = route.startsWith("artwork/") ? decodeURIComponent(route.slice(8)) : ""; } catch { id = "invalid"; }
  const frame = ARTWORK_FRAMES.find((item) => item.id === id);
  const filtered = ARTWORK_FRAMES.filter((item) => (source === "All sources" || source === item.source) && (world === "All worlds" || world === item.world) && `${item.title} ${item.id} ${item.family}`.toLowerCase().includes(query.trim().toLowerCase()));
  const perPage = 12, lastPage = Math.max(0, Math.ceil(filtered.length / perPage) - 1), currentPage = Math.min(page, lastPage);
  return <main className="aq-gallery" style={themeToCssVariables(ARCADE_GAME_THEME) as React.CSSProperties}>
    <div className="aq-gallery-inner"><a href="#/gaming">Game UI Help</a><h1>Arcade Quest artwork</h1><p>{ARTWORK_FRAMES.length} named frames, covering every registered MAATAA and TLPS workspace plus twelve Support Center states. Eight original scene illustrations are shared across related frames.</p>
      <div className="aq-downloads"><a href="./artwork/frame-pack.zip" download>Download every frame</a><a href="./artwork/frame-manifest.json" download>Download frame manifest</a></div>
      {id ? frame ? <><a href="#/artwork">All artwork frames</a><div className="aq-detail"><ArtworkCanvas frame={frame} /></div><a href={`./artwork/frames/${artworkFilename(frame)}`} download>Download this frame</a><p>Visual concept only. Navigation and sample rows inside the artwork are illustrative.</p></> : <><h2>Frame not found</h2><a href="#/artwork">Return to all frames</a></> : <>
        <div className="aq-filters"><label>Find an artwork frame<input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(0); }} /></label><label>Frame source<select aria-label="Frame source" value={source} onChange={(event) => { setSource(event.target.value); setPage(0); }}><option>All sources</option><option>MAATAA</option><option>TLPS</option><option>Support Center</option></select></label><label>Artwork world<select aria-label="Artwork world" value={world} onChange={(event) => { setWorld(event.target.value); setPage(0); }}><option>All worlds</option>{ARTWORK_WORLDS.map((name) => <option key={name}>{name}</option>)}</select></label></div>
        <p role="status">{filtered.length} frames found · Page {currentPage + 1} of {lastPage + 1}</p>
        <div className="aq-thumbnail-grid">{filtered.slice(currentPage * perPage, (currentPage + 1) * perPage).map((item) => <a key={item.id} href={`#/artwork/${encodeURIComponent(item.id)}`}><img src={artworkAsset(item.world)} loading="lazy" width="768" height="512" alt="" /><strong>{item.title}</strong><span>{item.source} · {item.family}</span></a>)}</div>
        {!filtered.length && <p>No frames match. Clear your search or choose a different source.</p>}
        <div className="aq-pagination"><button disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>Previous frames</button><button disabled={currentPage === lastPage} onClick={() => setPage(currentPage + 1)}>Next frames</button></div>
      </>}
    </div>
  </main>;
}
