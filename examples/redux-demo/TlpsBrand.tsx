import * as React from "react";
import { Button } from "@maataa/ui/actions/Button";
import { Badge } from "@maataa/ui/feedback/Badge";
import "./tlps-brand.css";

const palette = [
  { name: "Canvas", token: "--m-bg", fallback: "#fbf8f1" },
  { name: "Ink", token: "--m-text", fallback: "#221d16" },
  { name: "Accent", token: "--m-primary", fallback: "#7a5d2e" },
  { name: "Surface", token: "--m-surface", fallback: "#ffffff" },
] as const;

export function TlpsBrand({ navigate }: { navigate: (path: string) => void }) {
  const root = React.useRef<HTMLElement>(null);
  const [notice, setNotice] = React.useState("");
  const download = () => {
    if (!root.current) return;
    const style = getComputedStyle(root.current);
    const kit = {
      schemaVersion: "tlps.brand-kit.v1",
      brand: { name: "TLPS", domain: "tlps.in", descriptor: "Film and project planning" },
      status: "local-preview",
      framework: "@maataa/ui",
      palette: palette.map(({ name, token, fallback }) => ({ name, token, value: style.getPropertyValue(token).trim() || fallback })),
      typography: { body: style.fontFamily, heading: getComputedStyle(root.current.querySelector("h1")!).fontFamily },
      voice: ["Use plain words.", "Name the next action.", "Separate a plan from a confirmed outcome."],
      boundaries: ["Domain is a brand reference, not deployment evidence.", "Theme values reflect this browser at export time.", "No booking, payment or production approval is implied."],
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(kit, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "tlps-in-brand-kit.json";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Brand kit downloaded with the current theme values.");
  };
  return (
    <section ref={root} className="tlps-brand" aria-labelledby="tlps-brand-title">
      <div className="tlps-brand-intro">
        <div>
          <h1 id="tlps-brand-title">A clear identity for every next step.</h1>
          <p>TLPS brings film and project planning into focus. Use this brand reference to keep its name, colours and voice consistent across MAATAA UI surfaces.</p>
          <Badge tone="info">Local brand preview</Badge>
        </div>
        <div className="tlps-brand-specimen" aria-label="TLPS brand specimen">
          <strong>tlps<span>.in</span></strong>
          <p>Film and project planning</p>
          <span>Start. Plan. Check. Share.</span>
        </div>
      </div>
      <section className="tlps-brand-section" aria-labelledby="tlps-brand-colours">
        <div><h2 id="tlps-brand-colours">Colour with a purpose</h2><p>These roles follow your active MAATAA theme, including dark and high contrast modes.</p></div>
        <dl className="tlps-brand-palette">
          {palette.map(({ name, token, fallback }) => <div key={token}>
            <div className="tlps-brand-swatch" aria-hidden="true" style={{ backgroundColor: `var(${token}, ${fallback})` }} />
            <dt>{name}</dt><dd><code>{token}</code></dd>
          </div>)}
        </dl>
      </section>
      <section className="tlps-brand-section" aria-labelledby="tlps-brand-voice">
        <div><h2 id="tlps-brand-voice">Words that move a plan forward</h2><p>Keep the next action clear and the outcome honest.</p></div>
        <div className="tlps-brand-voice">
          <h3>Your idea. Your next step.</h3>
          <p>Use plain words. Say “Save your plan” or “Review location notes”. Describe an estimate as an estimate and a demo as a demo.</p>
          <p className="tlps-plain-note">The tlps.in name is a brand reference here. This page does not establish a live domain or a production service.</p>
        </div>
      </section>
      <div className="tlps-brand-actions">
        <Button onClick={download}>Download brand kit</Button>
        <Button variant="secondary" onClick={() => navigate("/tlps/onboarding")}>Start a TLPS plan</Button>
        <Button variant="secondary" onClick={() => navigate("/branding-studio")}>Open Branding Studio</Button>
      </div>
      <p className="tlps-brand-notice" role="status">{notice}</p>
    </section>
  );
}
