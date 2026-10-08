import * as React from "react";
import { ATOMIC_COMPONENT_REGISTRY } from "@maataa/ui/registries/atomicComponentRegistry";
import { COMPONENT_REGISTRY } from "@maataa/ui/registries/componentRegistry";
import {
  DEMO_BOOKINGS,
  DEMO_VENDORS,
} from "@maataa/ui/static-data/demoCommerce";
import { DEMO_EVALUATIONS } from "@maataa/ui/static-data/demoAI";
import { DEMO_EVENTS } from "@maataa/ui/static-data/demoEvents";

type RegistryRecord = {
  id: string;
  name: string;
  category: string;
  importPath: string;
};

type DemoId =
  | "scenario-ui"
  | "scenario-nevo"
  | "scenario-spatial"
  | "scenario-ai"
  | "scenario-mobile"
  | "scenario-control";
const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function DownloadButton({
  filename,
  value,
  children = "Export local plan",
}: {
  filename: string;
  value: unknown;
  children?: React.ReactNode;
}) {
  const [done, setDone] = React.useState(false);
  return (
    <button
      className="gold-button"
      onClick={() => {
        const url = URL.createObjectURL(
          new Blob([JSON.stringify(value, null, 2)], {
            type: "application/json",
          }),
        );
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        anchor.click();
        URL.revokeObjectURL(url);
        setDone(true);
        window.setTimeout(() => setDone(false), 1600);
      }}
    >
      {done ? "Export prepared" : children}
    </button>
  );
}

function DemoIntro({
  title,
  description,
  boundary,
}: {
  title: string;
  description: string;
  boundary: string;
}) {
  return (
    <header className="experience-intro">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <p className="experience-boundary">{boundary}</p>
    </header>
  );
}

function RegistryExperience() {
  const [kind, setKind] = React.useState<"components" | "atoms">("components");
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string>(
    COMPONENT_REGISTRY[0]?.id ?? "",
  );
  const [copied, setCopied] = React.useState(false);
  const records: readonly RegistryRecord[] =
    kind === "components"
      ? COMPONENT_REGISTRY as readonly RegistryRecord[]
      : ATOMIC_COMPONENT_REGISTRY as readonly RegistryRecord[];
  const filtered = records
    .filter((record) =>
      `${record.name} ${record.id} ${record.category} ${record.importPath}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .slice(0, 100);
  const selected =
    records.find((record) => record.id === selectedId) ?? filtered[0];
  const copy = async () => {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(
        `import { ${selected.name} } from "${selected.importPath}";`,
      );
    } catch {
      /* Clipboard can be unavailable in an embedded preview. */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="experience-stack">
      <DemoIntro
        title="MAATAA UI Registry Explorer"
        description="Find a real package declaration, inspect its import path, and copy a starter import."
        boundary="Package declarations are local registry data. Copying an import does not install or execute it."
      />
      <div className="experience-toolbar">
        <div className="experience-tabs" aria-label="Registry type">
          <button
            aria-pressed={kind === "components"}
            onClick={() => {
              setKind("components");
              setSelectedId(COMPONENT_REGISTRY[0]?.id ?? "");
            }}
          >
            Components
          </button>
          <button
            aria-pressed={kind === "atoms"}
            onClick={() => {
              setKind("atoms");
              setSelectedId(ATOMIC_COMPONENT_REGISTRY[0]?.id ?? "");
            }}
          >
            Atomic parts
          </button>
        </div>
        <label className="experience-search">
          Search registry
          <input
            aria-label="Search registry"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, category, or ID"
          />
        </label>
      </div>
      <div className="experience-split">
        <section className="experience-list" aria-label="Registry results">
          <div className="experience-list-head">
            {filtered.length} matching entries
          </div>
          {filtered.map((record) => (
            <button
              key={record.id}
              data-selected={selected?.id === record.id}
              onClick={() => setSelectedId(record.id)}
            >
              <strong>{record.name}</strong>
              <span>
                {record.category} · {record.id}
              </span>
            </button>
          ))}
          {!filtered.length && (
            <p className="experience-empty">
              No registry entries match. Try a shorter search.
            </p>
          )}
        </section>
        {selected && (
          <section className="experience-detail">
            <h3>
              <span className="experience-detail-kind">
                {kind === "components" ? "Component" : "Atomic part"} ·
              </span>{" "}
              {selected.name}
            </h3>
            <dl>
              <dt>Registry ID</dt>
              <dd>{selected.id}</dd>
              <dt>Category</dt>
              <dd>{selected.category}</dd>
              <dt>Import path</dt>
              <dd>
                <code>{selected.importPath}</code>
              </dd>
            </dl>
            <pre>
              <code>{`import { ${selected.name} } from "${selected.importPath}";`}</code>
            </pre>
            <button className="gold-button" onClick={copy}>
              {copied ? "Import copied" : "Copy import"}
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

function NevoExperience() {
  const [eventId, setEventId] = React.useState(DEMO_EVENTS[0].id);
  const [view, setView] = React.useState<"overview" | "vendors" | "run-sheet">(
    "overview",
  );
  const [shortlist, setShortlist] = React.useState<string[]>([]);
  const [checks, setChecks] = React.useState<Record<string, boolean>>({
    venue: false,
    guest: false,
    production: false,
  });
  const [prepared, setPrepared] = React.useState(false);
  const event =
    DEMO_EVENTS.find((item) => item.id === eventId) ?? DEMO_EVENTS[0];
  const vendorBookings = DEMO_BOOKINGS.filter(
    (booking) => booking.eventId === event.id,
  );
  const vendors = DEMO_VENDORS.filter(
    (vendor) =>
      vendor.city === event.city ||
      vendor.city.includes(event.city.split(" ")[0]),
  );
  return (
    <div className="experience-stack">
      <DemoIntro
        title="NEVO Event Command Center"
        description="Choose a sample event, review its planning data, shortlist local vendors, and prepare a run-sheet snapshot."
        boundary="Synthetic event and vendor fixtures only. Shortlisting is local; it does not contact vendors or confirm availability."
      />
      <div className="experience-toolbar">
        <label className="experience-search">
          Sample event
          <select
            aria-label="Sample event"
            value={eventId}
            onChange={(e) => {
              setEventId(e.target.value);
              setShortlist([]);
              setChecks({ venue: false, guest: false, production: false });
              setPrepared(false);
            }}
          >
            {DEMO_EVENTS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <nav className="experience-tabs" aria-label="Event demo sections">
          {(["overview", "vendors", "run-sheet"] as const).map((item) => (
            <button
              key={item}
              aria-pressed={view === item}
              onClick={() => setView(item)}
            >
              {item === "run-sheet"
                ? "Run sheet"
                : item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      <div className="experience-event-heading">
        <div>
          <h3>{event.name}</h3>
          <p>
            {event.city} · {event.venue} ·{" "}
            {new Date(event.startAt).toLocaleDateString("en-IN", {
              dateStyle: "medium",
            })}
          </p>
        </div>
        <span className="experience-status">{event.status} · sample</span>
      </div>
      {view === "overview" && (
        <div className="experience-columns">
          <section className="experience-panel">
            <h3>Planning snapshot</h3>
            <dl className="experience-facts">
              <dt>Guest plan</dt>
              <dd>{event.guests}</dd>
              <dt>Budget reference</dt>
              <dd>{currency.format(event.budget)}</dd>
              <dt>Existing fixture lines</dt>
              <dd>{vendorBookings.length}</dd>
              <dt>City / venue</dt>
              <dd>
                {event.city} · {event.venue}
              </dd>
            </dl>
          </section>
          <section className="experience-panel">
            <h3>Pre-review checklist</h3>
            {(
              [
                ["venue", "Venue notes reviewed"],
                ["guest", "Guest plan reviewed"],
                ["production", "Production needs reviewed"],
              ] as const
            ).map(([key, label]) => (
              <label className="experience-check" key={key}>
                <input
                  type="checkbox"
                  checked={checks[key]}
                  onChange={(e) => {
                    setChecks({ ...checks, [key]: e.target.checked });
                    setPrepared(false);
                  }}
                />
                {label}
              </label>
            ))}
            <button
              className="gold-button"
              disabled={!Object.values(checks).every(Boolean)}
              onClick={() => setPrepared(true)}
            >
              Prepare local review
            </button>
            {prepared && (
              <p role="status" className="experience-success">
                Review snapshot prepared for {event.name}. No event status
                changed.
              </p>
            )}
          </section>
        </div>
      )}
      {view === "vendors" && (
        <div className="experience-columns">
          <section className="experience-panel">
            <h3>Vendor fixtures</h3>
            {vendors.map((vendor) => (
              <div className="experience-record" key={vendor.id}>
                <div>
                  <strong>{vendor.name}</strong>
                  <span>
                    {vendor.category} · {vendor.city} · {vendor.status}
                  </span>
                </div>
                <button
                  aria-pressed={shortlist.includes(vendor.id)}
                  onClick={() =>
                    setShortlist(
                      shortlist.includes(vendor.id)
                        ? shortlist.filter((id) => id !== vendor.id)
                        : [...shortlist, vendor.id],
                    )
                  }
                >
                  {shortlist.includes(vendor.id)
                    ? "Remove from list"
                    : "Add to local list"}
                </button>
              </div>
            ))}
            {!vendors.length && (
              <p>
                No same-city vendor fixtures; use the sample vendor list below.
              </p>
            )}
            {vendors.length < DEMO_VENDORS.length && (
              <p className="experience-note">
                Showing city matches only. Vendor records describe demo
                fixtures, not live availability.
              </p>
            )}
          </section>
          <section className="experience-panel">
            <h3>Local shortlist</h3>
            {shortlist.length ? (
              <ul>
                {shortlist.map((id) => (
                  <li key={id}>
                    {DEMO_VENDORS.find((item) => item.id === id)?.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Select vendors to build a temporary planning list.</p>
            )}
            <p className="experience-note">
              Existing bookings shown in the static fixture:{" "}
              {vendorBookings.length}. No booking is created by this demo.
            </p>
          </section>
        </div>
      )}
      {view === "run-sheet" && (
        <section className="experience-panel">
          <h3>Run-sheet draft</h3>
          <div className="experience-record">
            <strong>Guest arrival</strong>
            <span>
              30 minutes before the sample start time · planning suggestion
            </span>
          </div>
          <div className="experience-record">
            <strong>Event programme</strong>
            <span>
              Schedule details have not been provided in the event fixture.
            </span>
          </div>
          <div className="experience-record">
            <strong>Venue access</strong>
            <span>Confirm with the venue through your own process.</span>
          </div>
          <DownloadButton
            filename={`${event.id}-local-run-sheet.json`}
            value={{
              event,
              vendorShortlist: shortlist.map((id) =>
                DEMO_VENDORS.find((vendor) => vendor.id === id),
              ),
              note: "Synthetic planning draft. No vendor availability or event booking is confirmed.",
            }}
          >
            Download run-sheet draft
          </DownloadButton>
        </section>
      )}
    </div>
  );
}

function SpatialExperience() {
  const [eventId, setEventId] = React.useState(DEMO_EVENTS[0].id);
  const [placed, setPlaced] = React.useState<string[]>(["B2", "B3", "C2"]);
  const [label, setLabel] = React.useState("Welcome zone");
  const cells = Array.from(
    { length: 48 },
    (_, index) =>
      `${String.fromCharCode(65 + Math.floor(index / 8))}${(index % 8) + 1}`,
  );
  const event =
    DEMO_EVENTS.find((item) => item.id === eventId) ?? DEMO_EVENTS[0];
  return (
    <div className="experience-stack">
      <DemoIntro
        title="NEVO Spatial Planning"
        description="Block out simple zones on a sample venue canvas, then export the layout as a planning note."
        boundary="Illustrative grid only. It is not a measured CAD plan, surveyed venue, approved floor plan, or safety review."
      />
      <div className="experience-toolbar">
        <label className="experience-search">
          Event context
          <select
            aria-label="Spatial event"
            value={eventId}
            onChange={(e) => {
              setEventId(e.target.value);
              setPlaced([]);
            }}
          >
            {DEMO_EVENTS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="experience-search">
          Zone label
          <input
            aria-label="Zone label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            maxLength={48}
          />
        </label>
        <span className="experience-status">
          {placed.length} blocks placed · local
        </span>
      </div>
      <div className="spatial-board-wrap">
        <div className="spatial-axis" aria-hidden="true">
          <span>North ↑</span>
          <span>Sample room · 8 × 6 blocks</span>
        </div>
        <div
          className="spatial-grid"
          role="group"
          aria-label="Illustrative venue zone planner"
        >
          {cells.map((cell) => (
            <button
              key={cell}
              aria-label={`${placed.includes(cell) ? "Remove" : "Place"} ${label || "zone"} at ${cell}`}
              aria-pressed={placed.includes(cell)}
              data-placed={placed.includes(cell)}
              onClick={() =>
                setPlaced(
                  placed.includes(cell)
                    ? placed.filter((item) => item !== cell)
                    : [...placed, cell],
                )
              }
            >
              <span>{cell}</span>
              {placed.includes(cell) && <strong>{label || "Zone"}</strong>}
            </button>
          ))}
        </div>
      </div>
      <div className="experience-footer-row">
        <p>
          {event.name} · {event.venue}, {event.city}
          <br />
          <span>Cell dimensions and venue geometry are not supplied.</span>
        </p>
        <div>
          <button className="ghost-button" onClick={() => setPlaced([])}>
            Clear layout
          </button>
          <DownloadButton
            filename={`${event.id}-spatial-planning.json`}
            value={{
              eventId: event.id,
              venue: event.venue,
              city: event.city,
              grid: { rows: 6, columns: 8 },
              zoneLabel: label,
              placedCells: placed,
              scope: "Illustrative layout only; not a venue plan or approval.",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function AiEvidenceExperience() {
  const [evaluationId, setEvaluationId] = React.useState(
    DEMO_EVALUATIONS[0].id,
  );
  const [ran, setRan] = React.useState(false);
  const [reviewed, setReviewed] = React.useState<string[]>([]);
  const evaluation =
    DEMO_EVALUATIONS.find((item) => item.id === evaluationId) ??
    DEMO_EVALUATIONS[0];
  return (
    <div className="experience-stack">
      <DemoIntro
        title="AI Evidence Command Center"
        description="Select a fixture evaluation, run a deterministic local check, and inspect the evidence identifiers behind its score."
        boundary="No model is called. Scores, messages, and evidence IDs are static demonstration fixtures."
      />
      <div className="experience-toolbar">
        <label className="experience-search">
          Evaluation
          <select
            aria-label="Evaluation fixture"
            value={evaluationId}
            onChange={(e) => {
              setEvaluationId(e.target.value);
              setReviewed([]);
              setRan(false);
            }}
          >
            {DEMO_EVALUATIONS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <button className="gold-button" onClick={() => setRan(true)}>
          Run fixture check
        </button>
        <span className="experience-status">
          {ran ? "Fixture check complete" : "Not run in this session"}
        </span>
      </div>
      <div className="experience-columns">
        <section className="experience-panel">
          <h3>{evaluation.name}</h3>
          <div className="evidence-score">
            {Math.round(evaluation.score * 100)}
            <span>%</span>
          </div>
          <p>{evaluation.metric.replaceAll("_", " ")}</p>
          <span className={`experience-status tone-${evaluation.severity}`}>
            {evaluation.severity} · fixture
          </span>
          {ran && (
            <p role="status" className="experience-success">
              Deterministic fixture result loaded. This is not a fresh model
              evaluation.
            </p>
          )}
        </section>
        <section className="experience-panel">
          <h3>Evidence references</h3>
          <p>Mark each reference as inspected in this local preview.</p>
          {evaluation.evidence.map((id) => (
            <label className="experience-check" key={id}>
              <input
                type="checkbox"
                checked={reviewed.includes(id)}
                onChange={(e) =>
                  setReviewed(
                    e.target.checked
                      ? [...reviewed, id]
                      : reviewed.filter((item) => item !== id),
                  )
                }
              />
              <code>{id}</code>
              <span>static reference</span>
            </label>
          ))}
          <div className="experience-note">
            {reviewed.filter((id) => evaluation.evidence.includes(id)).length}{" "}
            of {evaluation.evidence.length} references inspected locally. Source
            payloads are not included in this fixture.
          </div>
        </section>
      </div>
    </div>
  );
}

function MobileExperience() {
  const [tab, setTab] = React.useState<"schedule" | "checklist" | "updates">(
    "schedule",
  );
  const [checked, setChecked] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState("");
  const [messageSaved, setMessageSaved] = React.useState(false);
  return (
    <div className="experience-stack">
      <DemoIntro
        title="Mobile Device Preview"
        description="Try a compact crew-facing production view: switch sections, check preparation items, and draft an update."
        boundary="Responsive interface simulation in this browser. It does not send messages or verify a physical device."
      />
      <div className="mobile-demo-layout">
        <div className="mobile-frame" aria-label="Simulated smartphone">
          <div className="mobile-screen">
            <div className="mobile-status">
              <span>9:41</span>
              <span>DEMO · OFFLINE</span>
            </div>
            <header>
              <strong>Production day</strong>
              <span>Feature Film Demo</span>
            </header>
            <nav aria-label="Mobile preview sections">
              {(["schedule", "checklist", "updates"] as const).map((item) => (
                <button
                  key={item}
                  aria-pressed={tab === item}
                  onClick={() => setTab(item)}
                >
                  {item === "schedule"
                    ? "Today"
                    : item === "checklist"
                      ? "Checks"
                      : "Updates"}
                </button>
              ))}
            </nav>
            {tab === "schedule" && (
              <div className="mobile-content">
                <p className="mobile-date">SAMPLE CALL · 18 OCT</p>
                <h3>Scene 12A</h3>
                <p>Mountain Road · DAY</p>
                <div className="mobile-time">
                  09:00 <span>crew call</span>
                </div>
                <div className="mobile-time">
                  10:30 <span>first setup · sample</span>
                </div>
                <div className="mobile-callout">
                  Location note only
                  <br />
                  Permission not verified
                </div>
              </div>
            )}
            {tab === "checklist" && (
              <div className="mobile-content">
                <p className="mobile-date">PREPARATION CHECKS</p>
                {[
                  "Review call sheet",
                  "Confirm transport plan",
                  "Check equipment list",
                ].map((item) => (
                  <label className="experience-check" key={item}>
                    <input
                      type="checkbox"
                      checked={checked.includes(item)}
                      onChange={(e) =>
                        setChecked(
                          e.target.checked
                            ? [...checked, item]
                            : checked.filter((x) => x !== item),
                        )
                      }
                    />
                    {item}
                  </label>
                ))}
                <p>{checked.length} of 3 checked on this screen.</p>
              </div>
            )}
            {tab === "updates" && (
              <form
                className="mobile-content"
                onSubmit={(e) => {
                  e.preventDefault();
                  setMessageSaved(true);
                }}
              >
                <label>
                  Local update
                  <textarea
                    aria-label="Local update"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setMessageSaved(false);
                    }}
                    placeholder="Write a sample crew update"
                  />
                </label>
                <button className="gold-button" type="submit">
                  Save draft
                </button>
                {messageSaved && (
                  <p role="status">Draft saved in this screen only.</p>
                )}
              </form>
            )}
            <div className="mobile-home-indicator" />
          </div>
        </div>
        <section className="experience-panel mobile-summary">
          <h3>
            {tab === "schedule"
              ? "Today"
              : tab === "checklist"
                ? "Checks"
                : "Updates"}
          </h3>
          <p>
            Change a section or complete the sample checklist on the simulated
            device.
          </p>
          <div className="experience-record">
            <strong>Offline preview</strong>
            <span>Nothing is synced or sent.</span>
          </div>
          <div className="experience-record">
            <strong>Responsive host</strong>
            <span>The framed screen scales to the available column width.</span>
          </div>
          <DownloadButton
            filename="mobile-preview-state.json"
            value={{
              tab,
              checked,
              draft: message,
              draftSaved: messageSaved,
              scope: "Mobile UI simulation only.",
            }}
          >
            Export preview state
          </DownloadButton>
        </section>
      </div>
    </div>
  );
}

function ControlPlaneExperience() {
  const [observed, setObserved] = React.useState(false);
  const [reviewed, setReviewed] = React.useState<string[]>([]);
  const controls = [
    {
      id: "runtime",
      name: "Demo runtime",
      declared: "Local Vite preview",
      observation: "This page is rendering in the browser",
      evidence: "Current browser session",
    },
    {
      id: "state",
      name: "Demo data",
      declared: "Static deterministic fixtures",
      observation: "Fixture catalog is loaded",
      evidence: "Bundled sample records",
    },
    {
      id: "auth",
      name: "Identity boundary",
      declared: "Host-owned integration required",
      observation: "No authenticated identity is configured",
      evidence: "No auth provider in this demo",
    },
    {
      id: "providers",
      name: "External providers",
      declared: "Not connected",
      observation: "No live provider calls are made",
      evidence: "Local-only demo behavior",
    },
  ];
  return (
    <div className="experience-stack">
      <DemoIntro
        title="Control Plane Readiness"
        description="Compare declared demo boundaries with observations from this local page and review the sample evidence labels."
        boundary="These checks inspect demo declarations only. They do not inspect production systems, security controls, or deployments."
      />
      <div className="experience-toolbar">
        <button
          className="gold-button"
          onClick={() => {
            setObserved(true);
            setReviewed([]);
          }}
        >
          Inspect local demo
        </button>
        <span className="experience-status">
          {observed ? "Local inspection complete" : "Awaiting local inspection"}
        </span>
        <span className="experience-note">
          {reviewed.length} of {controls.length} rows reviewed
        </span>
      </div>
      <div className="control-table-wrap">
        <table className="control-table">
          <thead>
            <tr>
              <th>Control area</th>
              <th>Declared</th>
              <th>Local observation</th>
              <th>Evidence source</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {controls.map((control) => (
              <tr key={control.id}>
                <th scope="row">{control.name}</th>
                <td>{control.declared}</td>
                <td>
                  {observed
                    ? control.observation
                    : "Run local inspection to reveal"}
                </td>
                <td>{observed ? control.evidence : "Not inspected"}</td>
                <td>
                  <button
                    disabled={!observed}
                    aria-pressed={reviewed.includes(control.id)}
                    onClick={() =>
                      setReviewed(
                        reviewed.includes(control.id)
                          ? reviewed.filter((id) => id !== control.id)
                          : [...reviewed, control.id],
                      )
                    }
                  >
                    {reviewed.includes(control.id)
                      ? "Reviewed"
                      : "Review sample"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {observed && (
        <div className="experience-boundary" role="status">
          {reviewed.length === controls.length
            ? "All sample rows reviewed. This confirms only that the demo labels were inspected."
            : "Observation is limited to this browser session and bundled fixtures. Review all rows to complete this walkthrough."}
        </div>
      )}
    </div>
  );
}

export function DemoExperience({ scenarioId }: { scenarioId: DemoId }) {
  switch (scenarioId) {
    case "scenario-ui":
      return <RegistryExperience />;
    case "scenario-nevo":
      return <NevoExperience />;
    case "scenario-spatial":
      return <SpatialExperience />;
    case "scenario-ai":
      return <AiEvidenceExperience />;
    case "scenario-mobile":
      return <MobileExperience />;
    case "scenario-control":
      return <ControlPlaneExperience />;
    default:
      return (
        <div className="experience-empty">
          Choose one of the demo experiences above.
        </div>
      );
  }
}
