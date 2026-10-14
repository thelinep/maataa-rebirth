import * as React from "react";
import { Button } from "@maataa/ui/actions/Button";
import { Select } from "@maataa/ui/forms";
import { Card } from "@maataa/ui/surfaces/Card";
import { Badge } from "@maataa/ui/feedback/Badge";
import { MaataaIcon } from "../../src/icons/MaataaIcon";
import {
  crewRateBases,
  lifecycleStages,
  peopleRoleGroups,
  productOperatingSystems,
} from "./tlpsLifecycle";
import "./tlps-surfaces.css";
import { TlpsBrand } from "./TlpsBrand";
const TlpsWorkplaces = React.lazy(() => import("./TlpsWorkplaces").then((module) => ({ default: module.TlpsWorkplaces })));
import { readStoredText, writeStoredValue } from "@maataa/ui/compounds";

type Props = { route: string; navigate: (path: string) => void };
type Audience =
  | "Writer / creator"
  | "Producer / filmmaker"
  | "Event / campaign planner"
  | "Publisher / financier"
  | "Team / enterprise"
  | "Just exploring";
type Journey =
  | "I2S · Idea to Script"
  | "I2R · Idea to Release"
  | "I2B · Idea to Book"
  | "Choose for me";
type Automation =
  | "Guided, step by step"
  | "AI-assisted drafts"
  | "Automate as much as possible";
type Setup = {
  audience: Audience | "";
  content: string;
  journey: Journey | "";
  automation: Automation | "";
  idea: string;
  online: boolean;
};
const initial: Setup = {
  audience: "",
  content: "",
  journey: "",
  automation: "Guided, step by step",
  idea: "",
  online: false,
};
const audiences: Audience[] = [
  "Writer / creator",
  "Producer / filmmaker",
  "Event / campaign planner",
  "Publisher / financier",
  "Team / enterprise",
  "Just exploring",
];
const audienceLabels: Record<Audience, string> = {
  "Writer / creator": "I write or create",
  "Producer / filmmaker": "I make films",
  "Event / campaign planner": "I plan events or ads",
  "Publisher / financier": "I publish or fund",
  "Team / enterprise": "I work with a team",
  "Just exploring": "I am looking around",
};
const journeys: Journey[] = [
  "I2S · Idea to Script",
  "I2R · Idea to Release",
  "I2B · Idea to Book",
  "Choose for me",
];
const automations: Automation[] = [
  "Guided, step by step",
  "AI-assisted drafts",
  "Automate as much as possible",
];
const journeyLabels: Record<Journey, string> = {
  "I2S · Idea to Script": "Write a script",
  "I2R · Idea to Release": "Make and share a film",
  "I2B · Idea to Book": "Make a book",
  "Choose for me": "Help me choose",
};
const automationLabels: Record<Automation, string> = {
  "Guided, step by step": "Guide me, one step at a time",
  "AI-assisted drafts": "Help me write",
  "Automate as much as possible": "Do as much as possible",
};
const stageCopy: Record<
  string,
  {
    title: string;
    description: string;
    icon: "sparkles" | "page" | "workspace" | "demos" | "tool" | "arrow-right";
  }
> = {
  ideation: {
    title: "Start with the idea",
    description: "Say what you want to make and who it is for.",
    icon: "sparkles",
  },
  script: {
    title: "Write the story",
    description: "Plan the words, scenes and changes.",
    icon: "page",
  },
  "pre-production": {
    title: "Get ready to film",
    description: "Plan people, places, dates and money.",
    icon: "workspace",
  },
  production: {
    title: "Film it",
    description: "Keep the day, people and notes in one plan.",
    icon: "demos",
  },
  "post-production": {
    title: "Finish the film",
    description: "Plan picture, sound and final checks.",
    icon: "tool",
  },
  release: {
    title: "Share the film",
    description: "Plan how people will find and see it.",
    icon: "arrow-right",
  },
};
const osPlainNames: Record<string, string> = {
  "Production OS": "Production",
  "Film OS": "Film",
  "Campaign OS": "Campaigns",
  "ATL OS": "Ads",
  "BTL OS": "Local ads",
  "OOH / DOOH OS": "Outdoor ads",
  "Marketplace OS": "Marketplace",
  "Evidence OS": "Files & checks",
  "Finance OS": "Finance",
  "Investor Hub OS": "Find funding",
  "Event OS": "Events",
  "Wedding OS": "Weddings",
  "Exhibition & Spatial OS": "Places & spaces",
  "MAATAA AI": "AI help",
  "Analytics OS": "Reports",
  "Core Platform OS": "Core tools",
  "Casting OS": "Casting",
  "Crew OS": "Crew",
  "Location OS": "Locations",
  "Equipment & Logistics OS": "Equipment & travel",
};
const statusPlainNames: Record<string, string> = {
  "Declared in product types": "Listed in TLPS",
  "Workspace registry": "Workspace listed",
  "Contract only": "Tool listed",
  "Separate local demo": "Demo you can open",
};
const topicTitles: Record<string, string> = {
  audience: "Who is this for?",
  research: "Learn about the subject",
  concept: "Shape the idea",
  storyboard: "Plan what people will see",
  acquisition: "Get or write a script",
  rights: "Check permissions",
  draft: "Write the story",
  format: "Get the script ready",
  breakdown: "List what each scene needs",
  casting: "Choose people and jobs",
  recce: "Check places and travel",
  schedule: "Plan the days",
  music: "Plan music",
  "call-sheet": "Plan a shoot day",
  "set-operations": "Run the set",
  safety: "Keep people safe",
  "daily-report": "Write end-of-day notes",
  edit: "Edit the film",
  picture: "Finish the picture",
  sound: "Finish sound and music",
  accessibility: "Add captions and check the files",
  clearance: "Get ready to share",
  distribution: "Choose where to share",
  marketing: "Make posters and messages",
  performance: "Share and learn",
  "policy-review": "Check money and official rules",
};
const wordSwaps: [string, string][] = [
  ["source materials", "where the details came from"],
  ["source material", "where the details came from"],
  ["qualified counsel", "legal expert"],
  ["qualified review", "expert check"],
  ["underlying works", "source stories"],
  ["story beats", "main story moments"],
  ["character arcs", "how characters change"],
  ["synopsis", "short story summary"],
  ["premise", "main idea"],
  ["clearances", "permissions"],
  ["clearance", "permission"],
  ["call sheets", "shoot-day plans"],
  ["call sheet", "shoot-day plan"],
  ["pre-production", "before filming"],
  ["recce", "place visit"],
  ["vendor", "seller"],
  ["catering", "food"],
  ["dependencies", "things to do first"],
  ["deliverables", "files to send"],
  ["counterparties", "other people or groups"],
  ["provenance", "file history"],
  ["visual effects", "picture effects"],
  ["distribution", "sharing"],
];
function plainWords(value: string) {
  return wordSwaps.reduce(
    (text, [term, simple]) =>
      text.replace(
        new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
        simple,
      ),
    value,
  );
}
const productIcons: Record<
  string,
  "demos" | "workspace" | "tool" | "metrics" | "evidence"
> = {
  "production-film": "demos",
  "campaign-event": "workspace",
  "marketplace-locations": "tool",
  finance: "metrics",
  evidence: "evidence",
};
const contentTypes = [
  "Feature film",
  "Short film",
  "Web series / TV series",
  "Documentary",
  "Animation",
  "Music video",
  "Campaign / digital ad",
  "Event",
  "Book",
  "Comic book",
  "Screenplay / script",
  "AI-assisted film",
];
function restoreSetup(): Setup {
  try {
    const raw = JSON.parse(
      readStoredText("maataa.tlps.onboarding.v1") || "{}",
    ) as Partial<Setup>;
    return {
      audience: audiences.includes(raw.audience as Audience)
        ? (raw.audience as Audience)
        : "",
      content: contentTypes.includes(raw.content || "")
        ? raw.content || ""
        : "",
      journey: journeys.includes(raw.journey as Journey)
        ? (raw.journey as Journey)
        : "",
      automation: automations.includes(raw.automation as Automation)
        ? (raw.automation as Automation)
        : initial.automation,
      idea: typeof raw.idea === "string" ? raw.idea.slice(0, 2000) : "",
      online: raw.online === true,
    };
  } catch {
    return initial;
  }
}
const journeyStages: Record<
  Exclude<Journey, "Choose for me">,
  {
    name: string;
    workspace: string;
    availability: "Local preview" | "Planned";
  }[]
> = {
  "I2S · Idea to Script": [
    {
      name: "Tell us your idea",
      workspace: "Idea details",
      availability: "Planned",
    },
    {
      name: "Choose what to make and how it should feel",
      workspace: "Story plan",
      availability: "Planned",
    },
    {
      name: "Plan the story and scenes",
      workspace: "Story plan",
      availability: "Planned",
    },
    {
      name: "Write and improve the script",
      workspace: "Script",
      availability: "Planned",
    },
    {
      name: "Check and share the script",
      workspace: "Check and share",
      availability: "Planned",
    },
  ],
  "I2B · Idea to Book": [
    {
      name: "Tell us your idea and who will read it",
      workspace: "Book idea",
      availability: "Planned",
    },
    {
      name: "Plan the pages or comic panels",
      workspace: "Book plan",
      availability: "Planned",
    },
    {
      name: "Write the words and picture notes",
      workspace: "Writing",
      availability: "Planned",
    },
    {
      name: "Check the book and make a sample copy",
      workspace: "Book check",
      availability: "Planned",
    },
    {
      name: "Get the book ready to share",
      workspace: "Share the book",
      availability: "Planned",
    },
  ],
  "I2R · Idea to Release": [],
};
function chooseJourney(content: string): Exclude<Journey, "Choose for me"> {
  return ["Book", "Comic book"].includes(content)
    ? "I2B · Idea to Book"
    : content === "Screenplay / script"
      ? "I2S · Idea to Script"
      : "I2R · Idea to Release";
}
const nav = [
  ["/tlps", "Home"],
  ["/tlps/marketing", "How it works"],
  ["/tlps/catalog", "TLPS tools"],
  ["/tlps/workplaces", "Workplaces"],
  ["/tlps/brand", "Brand"],
  ["/tlps/onboarding", "Start here"],
] as const;
const products = [
  {
    id: "production-film",
    name: "Film plan",
    description: "Plan costs, people, places and shoot days.",
    stage: "Working demo",
    detail:
      "Try a film plan with sample costs, team and place notes, a day plan, checks and a handover file.",
    boundary: "This is a sample plan. It does not run a real film shoot.",
  },
  {
    id: "campaign-event",
    name: "Campaigns and events",
    description: "Plan ads, campaigns and events.",
    stage: "Planned",
    detail:
      "The TLPS product list includes campaign and event planning. These steps are not working in this demo yet.",
    boundary: "No live campaign, event booking or vendor deal is made.",
  },
  {
    id: "marketplace-locations",
    name: "Places and services",
    description: "Find places and compare services.",
    stage: "Planned",
    detail:
      "The demo can save a note about a place. Finding places and comparing services are planned for later.",
    boundary: "A saved place is not a booking or permission to use it.",
  },
  {
    id: "finance",
    name: "Finance",
    description: "Plan costs and keep money details together.",
    stage: "Planned",
    detail:
      "Finance is a separate TLPS area. The film demo shows estimated costs only.",
    boundary:
      "No payments, bank details, funding offers or confirmed finances.",
  },
  {
    id: "evidence",
    name: "Evidence",
    description: "Keep files, checks and approvals together.",
    stage: "Working demo",
    detail:
      "The demo can list sample file names, sizes and check codes. You can review the list before sharing it.",
    boundary:
      "Files stay on this device. Nothing is uploaded or kept in a shared folder.",
  },
];
const steps = ["Start", "Plan", "Check", "Share"];

function TlpsNav({
  route,
  navigate,
}: {
  route: string;
  navigate: Props["navigate"];
}) {
  return (
    <nav className="tlps-site-nav" aria-label="TLPS site">
      {nav.map(([path, label]) => (
        <button
          type="button"
          key={path}
          aria-current={
            route === path ||
            (path === "/tlps/catalog" && route.startsWith(path + "/"))
              ? "page"
              : undefined
          }
          onClick={() => navigate(path)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
function ScopeLine() {
  return (
    <p className="tlps-scope-line">
      <Badge tone="info">Demo</Badge>
      <span>Try a sample plan on this device.</span>
    </p>
  );
}

function PublicHome({ navigate }: { navigate: Props["navigate"] }) {
  const [audience, setAudience] = React.useState<Audience | "">(""),
    [content, setContent] = React.useState("");
  const begin = () => {
    writeStoredValue("maataa.tlps.onboarding.v1", { ...initial, audience, content });
    navigate("/tlps/onboarding");
  };
  return (
    <>
      <section className="tlps-public-hero">
        <div className="tlps-hero-copy">
          <p className="tlps-overline">YOUR IDEA. YOUR NEXT STEP.</p>
          <h1>What do you want to make?</h1>
          <p className="tlps-lede">
            Tell us what you do and what you want to make. We will show you the
            steps.
          </p>
          <div className="tlps-hero-actions">
            <Button
              variant="secondary"
              onClick={() => navigate("/tlps-workflow")}
            >
              See the film plan demo
            </Button>
          </div>
          <p className="tlps-plain-note">
            No account needed. This demo saves on this device.
          </p>
        </div>
        <div className="tlps-home-intake">
          <div className="tlps-home-intake-heading">
            <span>
              <MaataaIcon name="user" /> FIRST, JUST TWO THINGS
            </span>
            <strong>Let’s start with you.</strong>
          </div>
          <label>
            What do you do?
            <Select
              aria-label="What do you do?"
              value={audience}
              onChange={(event) => setAudience(event.target.value as Audience | "")}
            >
              <option value="">Choose one</option>
              {audiences.map((role) => (
                <option key={role} value={role}>
                  {audienceLabels[role]}
                </option>
              ))}
            </Select>
          </label>
          <label>
            What do you want to make?
            <Select
              aria-label="What do you want to make?"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            >
              <option value="">Choose one</option>
              {contentTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Select>
          </label>
          <button
            className="tlps-home-intake-submit"
            type="button"
            onClick={begin}
            disabled={!audience || !content}
          >
            Next <span aria-hidden="true">→</span>
          </button>
          <p>Your choices stay in this browser.</p>
        </div>
      </section>
      <section className="tlps-public-band">
        <div>
          <h2>Who can use it?</h2>
          <p className="tlps-section-intro">
            People making a film, a show, an event or a book.
          </p>
        </div>
        <div className="tlps-audience-list">
          <div>
            <strong>People making a film</strong>
            <span>Keep costs, dates and team notes together.</span>
          </div>
          <div>
            <strong>People finding a place</strong>
            <span>Save place notes and permission checks.</span>
          </div>
          <div>
            <strong>Teams</strong>
            <span>See what is done and what still needs a check.</span>
          </div>
        </div>
      </section>
      <section className="tlps-proof-row">
        <div className="tlps-proof-intro">
          <h2>Try it now</h2>
          <p>
            Make a sample film plan with costs, people, places, a day plan,
            checks and a handover file.
          </p>
          <p>
            Other TLPS tools are shown as plans. They do not work in this demo
            yet.
          </p>
        </div>
        <div className="tlps-proof-measures">
          <strong className="tlps-preview-label">One working demo</strong>
          <span>It runs here with made-up example details.</span>
          <button type="button" onClick={() => navigate("/tlps/catalog")}>
            See all TLPS tools <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </>
  );
}

function Marketing({ navigate }: { navigate: Props["navigate"] }) {
  return (
    <>
      <section className="tlps-marketing-head">
        <div>
          <p className="tlps-overline">HOW TLPS WORKS</p>
          <h1>One clear path, from start to share.</h1>
        </div>
        <p>
          TLPS brings film plans, people, places, money and files into one
          guide. This demo only runs the film-planning steps shown as working.
        </p>
      </section>
      <section className="tlps-flow-map" aria-label="How the plan works">
        {steps.map((s, i) => (
          <article key={s} className="tlps-flow-step">
            <span className="tlps-flow-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2>{s}</h2>
            <p>
              {
                [
                  "Say what you want to make and who will lead it.",
                  "Set dates, people, places and expected costs.",
                  "Ask the right person to check the plan.",
                  "Save the plan and send it to your team.",
                ][i]
              }
            </p>
            <small>{["START", "PLAN", "CHECK", "SHARE"][i]}</small>
          </article>
        ))}
      </section>
      <section className="tlps-marketing-detail">
        <div className="tlps-detail-aside">
          <p className="tlps-overline">TLPS TOOLS</p>
          <h2>Start with one plan. Add more when you need them.</h2>
          <p>
            TLPS has separate areas for film plans, campaigns, events, places,
            Finance and Evidence. The film-planning demo is the part you can try
            now.
          </p>
          <Button variant="secondary" onClick={() => navigate("/tlps/catalog")}>
            See TLPS tools
          </Button>
        </div>
        <div className="tlps-product-index">
          {products.map((product, i) => (
            <button
              type="button"
              key={product.id}
              onClick={() => navigate(`/tlps/catalog/${product.id}`)}
            >
              <span>0{i + 1}</span>
              <div>
                <strong>{product.name}</strong>
                <p>{product.description}</p>
              </div>
              <Badge
                tone={product.stage === "Working demo" ? "success" : "info"}
              >
                {product.stage}
              </Badge>
            </button>
          ))}
        </div>
      </section>
      <section className="tlps-truth-panel">
        <strong>About this demo</strong>
        <p>
          Your plan saves on this device. It does not book a place, pay anyone,
          check legal papers or finish a film.
        </p>
        <button type="button" onClick={() => navigate("/tlps-workflow")}>
          Open the film plan demo <span aria-hidden="true">→</span>
        </button>
      </section>
      <section className="tlps-end-cta">
        <h2>Shape a pilot around your team’s work.</h2>
        <p>
          Tell the guided setup what you need to plan. It stays in this browser.
        </p>
        <Button onClick={() => navigate("/tlps/onboarding")}>
          Start guided onboarding
        </Button>
      </section>
    </>
  );
}

function Onboarding({ navigate }: { navigate: Props["navigate"] }) {
  const [setup, setSetup] = React.useState<Setup>(restoreSetup);
  const [saved, setSaved] = React.useState(false),
    [error, setError] = React.useState(""),
    [built, setBuilt] = React.useState(false),
    [voice, setVoice] = React.useState("");
  const update = (field: keyof Setup, value: string | boolean) => {
    setSetup((s) => ({ ...s, [field]: value }));
    setSaved(false);
    setError("");
    setBuilt(false);
  };
  const journey =
    setup.journey && setup.journey !== "Choose for me"
      ? setup.journey
      : chooseJourney(setup.content);
  const isReleasePath = journey === "I2R · Idea to Release";
  const ready = Boolean(
    setup.audience && setup.content && setup.idea.trim().length >= 8,
  );
  const save = () => {
    if (!ready) {
      setError(
        "Tell us your role, what you want to make and a little about the idea.",
      );
      return;
    }
    if (writeStoredValue("maataa.tlps.onboarding.v1", { ...setup, journey, schemaVersion: 2, savedAt: new Date().toISOString() })) {
      setSaved(true);
      setError("");
    } else {
      setError(
        "This browser could not save the setup. You can still review your suggested path.",
      );
    }
  };
  const startVoice = () => {
    type Recognition = {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      onresult:
        | ((event: {
            results: ArrayLike<ArrayLike<{ transcript: string }>>;
          }) => void)
        | null;
      onerror: ((event: { error: string }) => void) | null;
      onend: (() => void) | null;
      start: () => void;
      stop: () => void;
    };
    const host = window as Window & {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const Recognition = host.SpeechRecognition || host.webkitSpeechRecognition;
    if (!Recognition) {
      setVoice(
        "Voice input is not available in this browser. You can type your idea instead.",
      );
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    setVoice("Listening… speak your idea.");
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || "")
        .join(" ")
        .trim();
      if (transcript)
        update("idea", `${setup.idea}${setup.idea ? " " : ""}${transcript}`);
      setVoice(
        transcript
          ? "Added your words to the idea brief."
          : "No speech was captured. Try again or type your idea.",
      );
    };
    recognition.onerror = (event) =>
      setVoice(
        event.error === "not-allowed"
          ? "Microphone access was not allowed. You can type your idea instead."
          : "Voice input stopped. You can try again or type your idea.",
      );
    recognition.onend = () => {};
    try {
      recognition.start();
    } catch {
      setVoice("Voice input could not start. You can type your idea instead.");
    }
  };
  return (
    <section className="tlps-onboard">
      <div className="tlps-onboard-heading">
        <div>
          <p className="tlps-overline">YOUR IDEA STARTS HERE</p>
          <h1>What do you want to make?</h1>
          <p>
            Tell us what you do and what you want to make. We’ll show you what
            to do next.
          </p>
        </div>
        <Badge tone="info">Guided setup</Badge>
      </div>
      <Card
        className="tlps-onboard-card tlps-idea-card"
        header={
          <>
            <h2>
              <MaataaIcon name="sparkles" /> Start with you and your idea
            </h2>
            <p>Tell us what you do, what you want to make and your idea.</p>
          </>
        }
      >
        <div className="tlps-idea-grid">
          <label>
            What do you do?
            <Select
              aria-label="What do you do?"
              value={setup.audience}
              onChange={(e) => update("audience", e.target.value)}
            >
              <option value="">Choose one</option>
              {audiences.map((role) => (
                <option key={role} value={role}>
                  {audienceLabels[role]}
                </option>
              ))}
            </Select>
          </label>
          <label>
            What do you want to make?
            <Select
              aria-label="What do you want to make?"
              value={setup.content}
              onChange={(e) => update("content", e.target.value)}
            >
              <option value="">Choose one</option>
              {contentTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Select>
          </label>
          <label>
            How far do you want to go?
            <Select
              aria-label="How far do you want to go?"
              value={setup.journey}
              onChange={(e) => update("journey", e.target.value)}
            >
              <option value="">Help me choose</option>
              {journeys.map((path) => (
                <option key={path} value={path}>
                  {journeyLabels[path]}
                </option>
              ))}
            </Select>
            <small>From a story to a script, book or shared film.</small>
          </label>
          <label>
            How much help do you want?
            <Select
              aria-label="How much help do you want?"
              value={setup.automation}
              onChange={(e) => update("automation", e.target.value)}
            >
              {automations.map((option) => (
                <option key={option} value={option}>
                  {automationLabels[option]}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <div className="tlps-idea-prompt">
          <label htmlFor="tlps-idea">Tell us your idea</label>
          <textarea
            id="tlps-idea"
            value={setup.idea}
            onChange={(event) => update("idea", event.target.value)}
            placeholder="Say it in your own words. For example: I want to make a film about…"
            rows={5}
            maxLength={2000}
          />
          <div className="tlps-idea-prompt-foot">
            <span>{setup.idea.length}/2000 · saved on this device</span>
            <button
              type="button"
              onClick={startVoice}
              aria-label="Speak your idea"
            >
              <MaataaIcon name="support" />
              {voice === "Listening… speak your idea." ? "Listening…" : "Speak"}
            </button>
          </div>
          {voice && (
            <p role="status" className="tlps-voice-status">
              {voice}
            </p>
          )}
        </div>
        <fieldset className="tlps-automation-choice">
          <legend>Where should we help?</legend>
          <label>
            <input
              type="checkbox"
              checked={setup.online}
              onChange={(event) => update("online", event.target.checked)}
            />
            <span>
              <strong>Show online steps too</strong>
              <small>
                We will show where they fit. This preview does not contact or
                book any service.
              </small>
            </span>
          </label>
        </fieldset>
        <div className="tlps-availability-grid">
          <div>
            <Badge
              tone={
                setup.automation === "Guided, step by step" ? "success" : "info"
              }
            >
              {automationLabels[setup.automation || "Guided, step by step"]}
            </Badge>
            <p>
              {setup.automation === "Guided, step by step"
                ? "Ready now: a simple checklist and a film-planning demo."
                : setup.automation === "AI-assisted drafts"
                  ? "Writing help is not connected in this demo yet."
                  : "Automatic work is not connected in this demo yet."}
            </p>
          </div>
          <div>
            <Badge tone="info">More ways to make</Badge>
            <p>
              AI pictures, films, books, finding money, hiring and bookings need
              other services. They are not switched on here.
            </p>
          </div>
        </div>
        {error && (
          <p className="tlps-form-error" role="alert">
            {error}
          </p>
        )}
        {saved && (
          <p className="tlps-form-saved" role="status">
            Your idea and steps are saved on this device.
          </p>
        )}
        <div className="tlps-onboard-actions">
          <Button variant="secondary" onClick={save}>
            Save my idea
          </Button>
          <Button
            onClick={() => {
              if (!ready) {
                setError(
                  "Choose a role and format, then describe your idea in at least a few words.",
                );
                return;
              }
              setBuilt(true);
              setError("");
            }}
          >
            Show my steps
          </Button>
        </div>
      </Card>
      {built && (
        <section
          className="tlps-generated-path"
          aria-label="Your suggested creation path"
        >
          <div className="tlps-generated-heading">
            <div>
              <p className="tlps-overline">YOUR NEXT STEPS</p>
              <h2>{journeyLabels[journey]}</h2>
              <p>
                {setup.content} · {setup.audience ? audienceLabels[setup.audience] : ""}
              </p>
            </div>
            <Badge tone="info">Guide · no finished work is made yet</Badge>
          </div>
          <blockquote>{setup.idea}</blockquote>
          {isReleasePath ? (
            <>
              <p className="tlps-os-intro">
                Your film plan has six simple steps. Open a step to see what to
                do and which parts of TLPS may help.
              </p>
              <div className="tlps-os-portfolio">
                <strong>What can help at each step</strong>
                <div>
                  {productOperatingSystems.map((item) => (
                    <span
                      key={item.id}
                      title={`${item.label} · ${statusPlainNames[item.status]}`}
                    >
                      {osPlainNames[item.label] || item.label}
                      <small>{statusPlainNames[item.status]}</small>
                    </span>
                  ))}
                </div>
              </div>
              <div className="tlps-lifecycle-stages">
                {lifecycleStages.map((stage, index) => {
                  const copy = stageCopy[stage.id];
                  return (
                    <details
                      key={stage.id}
                      className="tlps-lifecycle-stage"
                      open={index === 0}
                    >
                      <summary>
                        <span className="tlps-stage-icon">
                          <MaataaIcon name={copy.icon} />
                        </span>
                        <span className="tlps-path-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="tlps-stage-title">
                          <strong>{copy.title}</strong>
                          <small>{copy.description}</small>
                        </span>
                        <Badge
                          tone={
                            stage.id === "pre-production" ? "success" : "info"
                          }
                        >
                          {stage.id === "pre-production"
                            ? "Planning demo"
                            : "Guide"}
                        </Badge>
                        <span className="tlps-stage-count">
                          {stage.systems.length} parts
                        </span>
                      </summary>
                      <div className="tlps-stage-detail">
                        <div>
                          <h3>Tools and plans for this step</h3>
                          <div className="tlps-stage-systems">
                            {stage.systems.map((system) => (
                              <span
                                key={`${system.kind}-${system.name}`}
                                className={`tlps-system-chip is-${system.kind.toLowerCase().replaceAll(" ", "-")}`}
                              >
                                <strong>
                                  {osPlainNames[system.name] || system.name}
                                </strong>
                                <small>
                                  {system.kind === "Product OS"
                                    ? statusPlainNames[system.status]
                                    : `${system.name} · ${statusPlainNames[system.status]}`}
                                </small>
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3>Places to work</h3>
                          <div className="tlps-workspace-chips">
                            {stage.workspaces.map((workspace) => (
                              <span key={workspace}>
                                {workspace.replace(/ Workspace$/, "")}
                              </span>
                            ))}
                          </div>
                        </div>
                        {stage.id === "pre-production" && (
                          <section className="tlps-people-roles">
                            <h3>People and jobs</h3>
                            <p>
                              These are job names. This demo does not find or
                              hire people.
                            </p>
                            <div className="tlps-role-groups">
                              {peopleRoleGroups.map((group) => (
                                <div key={group.label}>
                                  <strong>
                                    {{
                                      "Cast roles": "Actors",
                                      "Crew roles": "Film crew",
                                      "Heads of department": "Team leads",
                                    }[group.label] || group.label}{" "}
                                    · {group.roles.length}
                                  </strong>
                                  <div>
                                    {group.roles.map((role) => (
                                      <span key={role}>{role}</span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="tlps-rate-bases">
                              <strong>Ways to pay (examples)</strong>
                              {crewRateBases.map((rate) => (
                                <span key={rate}>{rate}</span>
                              ))}
                            </div>
                          </section>
                        )}
                        <div>
                          <h3>Things to do</h3>
                          <div className="tlps-topic-grid">
                            {stage.topics.map((topic) => (
                              <article key={topic.id}>
                                <div>
                                  <strong>
                                    {topicTitles[topic.id] || topic.title}
                                  </strong>
                                  {topic.reviewRequired && (
                                    <Badge tone="warning">
                                      Ask someone to check
                                    </Badge>
                                  )}
                                </div>
                                <p>{plainWords(topic.summary)}</p>
                                <ul>
                                  {topic.tasks.map((task) => (
                                    <li key={task}>{plainWords(task)}</li>
                                  ))}
                                </ul>
                              </article>
                            ))}
                          </div>
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </>
          ) : (
            <ol className="tlps-simple-path">
              {journeyStages[journey].map((item, index) => (
                <li key={item.workspace}>
                  <span className="tlps-path-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.workspace.replace(/ Workspace$/, "")}</p>
                  </div>
                  <Badge
                    tone={
                      item.availability === "Local preview" ? "success" : "info"
                    }
                  >
                    {item.availability === "Local preview"
                      ? "Demo you can try"
                      : "Planned"}
                  </Badge>
                </li>
              ))}
            </ol>
          )}
          <div className="tlps-generated-next">
            <div>
              <strong>Try the film plan demo</strong>
              <p>
                See sample costs, people, places, shoot-day notes, checks and a
                handover file. Casting, hiring, bookings, editing and release
                are not working in this demo yet.
              </p>
            </div>
            <Button onClick={() => navigate("/tlps-workflow")}>
              Open film plan demo
            </Button>
          </div>
          <p className="tlps-onboard-foot">
            These six steps show the TLPS plan. A listed tool may still be
            planned. This guide does not make a script, book or film, find
            money, hire people or share a release.
          </p>
        </section>
      )}
      <p className="tlps-onboard-foot">
        You can make a film, show, book, comic, campaign or event. This demo
        uses made-up details saved on this device. Places, permissions and
        bookings are not checked.
      </p>
    </section>
  );
}

function Catalog({
  route,
  navigate,
}: {
  route: string;
  navigate: Props["navigate"];
}) {
  const [query, setQuery] = React.useState("");
  const id = route.split("/").at(-1) || "";
  const selected = products.find((product) => product.id === id);
  if (selected)
    return (
      <section className="tlps-catalog">
        <p className="tlps-overline">
          <button
            type="button"
            className="tlps-back-link"
            onClick={() => navigate("/tlps/catalog")}
          >
            TLPS tools
          </button>{" "}
          / {selected.name}
        </p>
        <div className="tlps-catalog-detail">
          <div>
            <h1>{selected.name}</h1>
            <p className="tlps-lede">{selected.description}</p>
            <Badge
              tone={selected.stage === "Working demo" ? "success" : "info"}
            >
              {selected.stage}
            </Badge>
          </div>
          <section>
            <h2>What you can do</h2>
            <p>{selected.detail}</p>
            <h2>What this does not do</h2>
            <p>{selected.boundary}</p>
          </section>
        </div>
        <div className="tlps-catalog-actions">
          <Button onClick={() => navigate("/tlps/workplaces")}>
            Explore workplaces and demos
          </Button>
          <Button onClick={() => navigate("/tlps-workflow")}>
            Open the film plan demo
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/tlps/marketing")}
          >
            How it works
          </Button>
        </div>
      </section>
    );
  const filtered = products.filter((product) =>
    `${product.name} ${product.description} ${product.stage}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <section className="tlps-catalog">
      <div className="tlps-catalog-heading">
        <div>
          <p className="tlps-overline">TLPS TOOLS</p>
          <h1>TLPS product catalogue</h1>
          <p className="tlps-lede">
            What TLPS can help with. Open a tool to see what works in this demo
            and what is planned.
          </p>
        </div>
        <label>
          Find a tool
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type a word"
          />
        </label>
      </div>
      <p className="tlps-catalog-note">
        We mark each tool as a demo or planned, so you can see what works today.
      </p>
      <div className="tlps-catalog-list" aria-label="TLPS tools">
        {filtered.map((product, index) => (
          <article key={product.id}>
            <span className="tlps-catalog-index">
              <MaataaIcon name={productIcons[product.id]} />
              <small>{String(index + 1).padStart(2, "0")}</small>
            </span>
            <div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <Badge
                tone={product.stage === "Working demo" ? "success" : "info"}
              >
                {product.stage}
              </Badge>
            </div>
            <button
              type="button"
              onClick={() => navigate(`/tlps/catalog/${product.id}`)}
              aria-label={`View ${product.name}`}
            >
              Open <span aria-hidden="true">→</span>
            </button>
          </article>
        ))}
        {!filtered.length && (
          <p role="status">
            No tools match “{query}”. Clear the search to see all tools.
          </p>
        )}
      </div>
      <section className="tlps-catalog-os">
        <div>
          <p className="tlps-overline">MAKE A FILM</p>
          <h2>Six simple steps</h2>
          <p>
            Open the guide to see each step, plus Casting, Crew, Places,
            Equipment, Finance and Evidence.
          </p>
          <button type="button" onClick={() => navigate("/tlps/onboarding")}>
            See the six steps <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="tlps-catalog-os-grid">
          {productOperatingSystems.map((item) => (
            <span key={item.id}>{osPlainNames[item.label] || item.label}</span>
          ))}
        </div>
      </section>
    </section>
  );
}

export function TlpsSurfaces({ route, navigate }: Props) {
  const page =
    route === "/tlps/workplaces" || route.startsWith("/tlps/workplaces/") ? (
      <React.Suspense fallback={<p role="status">Loading workplaces…</p>}><TlpsWorkplaces route={route} navigate={navigate} /></React.Suspense>
    ) : route === "/tlps/brand" ? (
      <TlpsBrand navigate={navigate} />
    ) : route === "/tlps/onboarding" ? (
      <Onboarding navigate={navigate} />
    ) : route === "/tlps/marketing" ? (
      <Marketing navigate={navigate} />
    ) : route.startsWith("/tlps/catalog") ? (
      <Catalog route={route} navigate={navigate} />
    ) : (
      <PublicHome navigate={navigate} />
    );
  return (
    <div className="page-section tlps-site">
      <header className="tlps-site-header">
        <a href="#/tlps" aria-label="TLPS home">
          tlps.in<span>Film and project planning</span>
        </a>
        <TlpsNav route={route} navigate={navigate} />
        <ScopeLine />
      </header>
      {page}
      <footer className="tlps-site-footer">
        <div>
          <strong>TLPS · MAATAA demo</strong>
          <span>See what works now and what is planned.</span>
        </div>
        <nav aria-label="TLPS resources">
          <button type="button" onClick={() => navigate("/tlps/marketing")}>
            How it works
          </button>
          <button type="button" onClick={() => navigate("/tlps/catalog")}>
            TLPS tools
          </button>
          <button type="button" onClick={() => navigate("/tlps/onboarding")}>
            Start here
          </button>
          <button type="button" onClick={() => navigate("/tlps-workflow")}>
            Film plan demo
          </button>
        </nav>
      </footer>
    </div>
  );
}
