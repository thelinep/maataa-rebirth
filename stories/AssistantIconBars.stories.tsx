import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AISpaceToolbar } from "../src/ai-space-atoms/AISpaceToolbar";
import "./assistant-icon-bars.css";

type Theme = "light" | "dark" | "high-contrast" | "oled";
type Density = "compact" | "default" | "comfortable";
type Tool = { id: string; label: string; glyph: string };
type Area = { id: string; label: string; tools: Tool[] };

const areas: Area[] = [
  {
    id: "general",
    label: "General Information",
    tools: [
      { id: "question", label: "Ask a question", glyph: "chat" },
      { id: "events", label: "Current events", glyph: "book" },
      { id: "weather", label: "Weather", glyph: "spark" },
      { id: "forecast", label: "Forecast details", glyph: "chart" },
      { id: "knowledge", label: "General knowledge", glyph: "book" },
      { id: "places", label: "Places and world", glyph: "grid" },
      { id: "time", label: "Time and dates", glyph: "calendar" },
    ],
  },
  {
    id: "email",
    label: "Email Management",
    tools: [
      { id: "compose", label: "Compose", glyph: "write" },
      { id: "inbox", label: "Inbox", glyph: "book" },
      { id: "check", label: "Check for new mail", glyph: "history" },
      { id: "reply", label: "Reply", glyph: "chat" },
      { id: "forward", label: "Forward", glyph: "export" },
      { id: "attach", label: "Attach file", glyph: "attach" },
      { id: "archive", label: "Archive", glyph: "save" },
      { id: "search", label: "Search mail", glyph: "search" },
      { id: "accounts", label: "Manage accounts", glyph: "sliders" },
    ],
  },
  {
    id: "tasks",
    label: "Task and Schedule Management",
    tools: [
      { id: "reminder", label: "New reminder", glyph: "calendar" },
      { id: "todo", label: "To-do list", glyph: "check" },
      { id: "calendar", label: "Calendar", glyph: "calendar" },
      { id: "event", label: "New event", glyph: "spark" },
      { id: "alarm", label: "Alarm", glyph: "history" },
      { id: "repeat", label: "Repeat", glyph: "compare" },
      { id: "priority", label: "Priority", glyph: "sliders" },
    ],
  },
  {
    id: "documents",
    label: "Document Handling",
    tools: [
      { id: "open", label: "Open", glyph: "book" },
      { id: "new", label: "New document", glyph: "write" },
      { id: "edit", label: "Edit", glyph: "code" },
      { id: "save", label: "Save", glyph: "save" },
      { id: "word", label: "Word document", glyph: "book" },
      { id: "pdf", label: "Export as PDF", glyph: "export" },
      { id: "print", label: "Print", glyph: "grid" },
      { id: "share", label: "Share or send", glyph: "share" },
    ],
  },
  {
    id: "files",
    label: "File Organization",
    tools: [
      { id: "folders", label: "Folders", glyph: "grid" },
      { id: "sort", label: "Sort", glyph: "sliders" },
      { id: "search-folder", label: "Search in folder", glyph: "search" },
      { id: "find", label: "Find file", glyph: "search" },
      { id: "duplicate", label: "Duplicate", glyph: "compare" },
      { id: "backup", label: "Back up now", glyph: "save" },
      { id: "restore", label: "Restore from backup", glyph: "history" },
      { id: "trash", label: "Move to trash", glyph: "export" },
    ],
  },
  {
    id: "web",
    label: "Web Search",
    tools: [
      { id: "search-web", label: "Search the web", glyph: "search" },
      { id: "open-site", label: "Open website", glyph: "grid" },
      { id: "links", label: "Quick links", glyph: "share" },
      { id: "bookmark", label: "Bookmark", glyph: "save" },
      { id: "history", label: "History", glyph: "history" },
      { id: "filter", label: "Filter results", glyph: "filter" },
      { id: "browser", label: "Open in browser", glyph: "export" },
    ],
  },
  {
    id: "code",
    label: "Programming Help",
    tools: [
      { id: "explain", label: "Explain code", glyph: "book" },
      { id: "function", label: "Write a function", glyph: "code" },
      { id: "debug", label: "Debug", glyph: "search" },
      { id: "command", label: "Run a command", glyph: "terminal" },
      { id: "run", label: "Run", glyph: "play" },
      { id: "version", label: "Version control", glyph: "compare" },
      { id: "docs", label: "Docs and references", glyph: "book" },
    ],
  },
  {
    id: "translate",
    label: "Language Translation",
    tools: [
      { id: "translate", label: "Translate", glyph: "write" },
      { id: "swap", label: "Swap languages", glyph: "compare" },
      { id: "speak", label: "Speak to translate", glyph: "voice" },
      { id: "listen", label: "Listen", glyph: "voice" },
      { id: "image-text", label: "Translate text in an image", glyph: "image" },
      { id: "dictionary", label: "Dictionary", glyph: "book" },
      { id: "copy", label: "Copy translation", glyph: "save" },
    ],
  },
  {
    id: "finance",
    label: "Personal Finance Management",
    tools: [
      { id: "accounts", label: "Accounts", glyph: "grid" },
      { id: "expense", label: "Add expense", glyph: "write" },
      { id: "budget", label: "Budget", glyph: "chart" },
      { id: "savings", label: "Savings goals", glyph: "save" },
      { id: "bills", label: "Bills due", glyph: "calendar" },
      { id: "trends", label: "Spending trends", glyph: "chart" },
      { id: "banks", label: "Banks", glyph: "book" },
      { id: "currency", label: "Currency", glyph: "compare" },
    ],
  },
];

const paths: Record<string, React.ReactNode> = {
  chat: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-4.2a2.5 2.5 0 0 1-1-2z" />
      <path d="M8 8h8M8 11h5" />
    </>
  ),
  voice: (
    <>
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v4m-4 0h8" />
    </>
  ),
  attach: (
    <path d="m8 12.5 6.7-6.7a3 3 0 0 1 4.2 4.2l-8.5 8.5a5 5 0 0 1-7.1-7.1l8.2-8.2" />
  ),
  history: (
    <>
      <path d="M3 11a9 9 0 1 1 2.5 6.2" />
      <path d="M3 4v7h7m2-6v7l4 2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 5 5" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21z" />
      <path d="M4 5v14m4-13h8" />
    </>
  ),
  compare: (
    <>
      <path d="M4 7h13m0 0-3-3m3 3-3 3M20 17H7m0 0 3-3m-3 3 3 3" />
    </>
  ),
  save: (
    <>
      <path d="M5 3h12l3 3v15H4V3z" />
      <path d="M8 3v6h8V3m-8 18v-7h8v7" />
    </>
  ),
  write: (
    <>
      <path d="m4 16.5-.8 4.3 4.3-.8L19 8.5 15.5 5z" />
      <path d="m13.5 7 3.5 3.5M4 4h7" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 6h9m4 0h3M4 12h3m4 0h9M4 18h9m4 0h3" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="15" cy="18" r="2" />
    </>
  ),
  export: (
    <>
      <path d="M12 15V3m-4 4 4-4 4 4" />
      <path d="M5 12v8h14v-8" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="14" y="3" width="7" height="8" rx="1" />
      <rect x="3" y="14" width="8" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18m0-12h12" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 1.4-3.4 1.5 1.5 0 0 1 1.1-2.6H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10" cy="7.5" r="1" />
      <circle cx="15" cy="8" r="1" />
    </>
  ),
  code: (
    <>
      <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" />
    </>
  ),
  terminal: (
    <>
      <path d="m4 5 6 6-6 6m8 1h8" />
    </>
  ),
  check: (
    <>
      <path d="m4 12 5 5L20 6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4m0 16h17M7 15l4-5 4 3 5-7" />
    </>
  ),
  filter: (
    <>
      <path d="M3 5h18l-7 8v6l-4 2v-8z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4m10-4v4M3 10h18" />
    </>
  ),
  timeline: (
    <>
      <path d="M4 6h16M4 12h10M4 18h16" />
      <circle cx="8" cy="12" r="1" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m9 11 6-5m-6 8 6 4" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="3" width="7" height="6" rx="1" />
      <rect x="14" y="15" width="7" height="6" rx="1" />
      <path d="M10 6h4v12h-4m0 0 2-2m-2 2 2 2" />
    </>
  ),
  play: (
    <>
      <path d="m8 5 11 7-11 7z" />
    </>
  ),
};

function Icon({ name }: { name: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] ?? paths.spark}
    </svg>
  );
}

const variants = [
  {
    id: "labeled",
    name: "Labeled toolbar",
    note: "The full tool names remain visible",
    kind: "labeled",
  },
  {
    id: "icons",
    name: "Icon-only toolbar",
    note: "Tight spaces; labels remain available to assistive technology",
    kind: "icons",
  },
  {
    id: "grouped",
    name: "Grouped with primary action",
    note: "The main action stands out; related tools sit in a separate group",
    kind: "grouped",
  },
  {
    id: "rail",
    name: "Side rail",
    note: "A collapsible window-edge rail",
    kind: "rail",
  },
  {
    id: "floating",
    name: "Floating tool dock",
    note: "A compact group for canvas-heavy work",
    kind: "floating",
  },
  {
    id: "tabbar",
    name: "Phone tab bar",
    note: "Four tools stay visible; remaining tools open in a sheet",
    kind: "tabbar",
  },
  {
    id: "overflow",
    name: "Toolbar with overflow menu",
    note: "Tools that do not fit move into More",
    kind: "overflow",
  },
  {
    id: "chips",
    name: "Quick-action chips",
    note: "Suggestions can sit below a reply or message box",
    kind: "chips",
  },
] as const;

function ToolButton({
  tool,
  selected,
  onClick,
  labeled = false,
}: {
  tool: Tool;
  selected: boolean;
  onClick: () => void;
  labeled?: boolean;
}) {
  return (
    <button
      className={`aib-tool${labeled ? " labeled" : ""}`}
      type="button"
      aria-label={tool.label}
      aria-pressed={selected}
      title={tool.label}
      onClick={onClick}
    >
      <Icon name={tool.glyph} />
      <span className="aib-tool-label">{tool.label}</span>
    </button>
  );
}

function SampleBar({
  kind,
  area,
  allAreas,
  selectedTool,
  onSelect,
}: {
  kind: string;
  area: Area;
  allAreas: boolean;
  selectedTool: string;
  onSelect: (id: string) => void;
}) {
  if (allAreas)
    return (
      <div className="aib-all-areas">
        {areas.map((item) => (
          <div className="aib-area-row" key={item.id}>
            <span className="aib-area-name">{item.label}</span>
            <div className="aib-tools">
              {item.tools.map((tool) => (
                <ToolButton
                  key={tool.id}
                  tool={tool}
                  selected={selectedTool === `${item.id}:${tool.id}`}
                  labeled
                  onClick={() => onSelect(`${item.id}:${tool.id}`)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );

  const tools = area.tools.map((tool) => (
    <ToolButton
      key={tool.id}
      tool={tool}
      selected={selectedTool === `${area.id}:${tool.id}`}
      labeled={kind === "grouped" || kind === "chips"}
      onClick={() => onSelect(`${area.id}:${tool.id}`)}
    />
  ));
  if (kind === "icons") return <div className="aib-tools">{tools}</div>;
  if (kind === "grouped")
    return (
      <div className="aib-grouped">
        <button
          className="aib-primary"
          type="button"
          onClick={() => onSelect(`${area.id}:${area.tools[0].id}`)}
        >
          <Icon name={area.tools[0].glyph} />
          <span>{area.tools[0].label}</span>
        </button>
        <div className="aib-tools">{tools.slice(1)}</div>
      </div>
    );
  if (kind === "rail") return <RailSample tools={tools} area={area} />;
  if (kind === "floating")
    return (
      <div className="aib-floating">
        <span className="aib-floating-label">{area.label}</span>
        <div className="aib-tools">{tools}</div>
      </div>
    );
  if (kind === "tabbar") return <PhoneTabBar tools={tools} area={area} />;
  if (kind === "overflow") return <OverflowToolbar tools={tools} area={area} />;
  if (kind === "chips") return <div className="aib-chips">{tools}</div>;
  return (
    <div className="aib-tools">
      {tools.map((tool, index) => (index < 4 ? tool : null))}
    </div>
  );
}

function RailSample({ tools, area }: { tools: React.ReactNode[]; area: Area }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className={`aib-side-rail ${expanded ? "expanded" : "collapsed"}`}>
      <button
        type="button"
        className="aib-rail-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Collapse rail" : `Expand ${area.label} rail`}
      </button>
      <div className="aib-rail-tools">
        {tools.map((tool, index) => (index < 6 ? tool : null))}
      </div>
    </div>
  );
}

function PhoneTabBar({
  tools,
  area,
}: {
  tools: React.ReactNode[];
  area: Area;
}) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="aib-phone">
      <div className="aib-phone-content">{area.label} preview</div>
      <nav className="aib-phone-tabs" aria-label={`${area.label} tools`}>
        {tools.slice(0, 4).map((tool, index) => (
          <React.Fragment key={index}>{tool}</React.Fragment>
        ))}
        <button
          type="button"
          aria-expanded={showMore}
          onClick={() => setShowMore((value) => !value)}
        >
          <Icon name="grid" />
          <span>More</span>
        </button>
      </nav>
      {showMore && (
        <section
          className="aib-phone-sheet"
          aria-label={`More ${area.label} tools`}
        >
          <h3>More tools</h3>
          <div className="aib-tools">{tools.slice(4)}</div>
        </section>
      )}
    </div>
  );
}

function OverflowToolbar({
  tools,
  area,
}: {
  tools: React.ReactNode[];
  area: Area;
}) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="aib-overflow-wrap">
      <div className="aib-tools">
        {tools.slice(0, 4)}
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={showMore}
          onClick={() => setShowMore((value) => !value)}
        >
          <Icon name="grid" />
          <span>More tools</span>
        </button>
      </div>
      {showMore && (
        <div
          className="aib-overflow-menu"
          role="group"
          aria-label={`More ${area.label} tools`}
        >
          <strong>More tools</strong>
          {tools.slice(4)}
        </div>
      )}
    </div>
  );
}

function AssistantIconBarsGallery() {
  const [areaId, setAreaId] = useState(areas[0].id);
  const [theme, setTheme] = useState<Theme | "all">("all");
  const [density, setDensity] = useState<Density>("default");
  const [selectedTool, setSelectedTool] = useState("general:question");
  const area = areas.find((item) => item.id === areaId) ?? areas[0];
  const visibleThemes: Theme[] =
    theme === "all" ? ["light", "dark", "high-contrast", "oled"] : [theme];
  return (
    <main
      className="maataa-root aib-gallery"
      data-theme={theme === "all" ? "light" : theme}
      data-maataa-theme={theme}
      data-density={density}
    >
      <header className="aib-header">
        <div>
          <p className="aib-kicker">MAATAA UI · COMPONENT GALLERY</p>
          <h1>Assistant icon bars</h1>
          <p>
            Eight toolbar patterns. Change the work area, theme or density;
            every control is keyboard operable.
          </p>
        </div>
        <span className="aib-brand" aria-hidden="true">
          M
        </span>
      </header>
      <section className="aib-controls" aria-label="Gallery controls">
        <label>
          Area
          <select
            value={areaId}
            onChange={(event) => {
              const nextArea =
                areas.find((item) => item.id === event.target.value) ??
                areas[0];
              setAreaId(nextArea.id);
              setSelectedTool(`${nextArea.id}:${nextArea.tools[0].id}`);
            }}
          >
            {areas.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Theme
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value as Theme)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="high-contrast">High contrast</option>
            <option value="oled">OLED</option>
            <option value="all">All four themes</option>
          </select>
        </label>
        <label>
          Density
          <select
            value={density}
            onChange={(event) => setDensity(event.target.value as Density)}
          >
            <option value="compact">Compact</option>
            <option value="default">Default</option>
            <option value="comfortable">Comfortable</option>
          </select>
        </label>
        <p className="aib-status" aria-live="polite">
          Previewing <strong>{area.label}</strong> ·{" "}
          {theme === "all" ? "all four themes" : theme.replace("-", " ")} ·{" "}
          {density}
        </p>
      </section>
      <p className="aib-disclosure">
        The nine area names and tool sets are gallery examples, ready to be
        replaced by the approved assistant catalog.
      </p>
      <section
        className="aib-versions"
        aria-label="Eight assistant toolbar versions"
      >
        {variants.map((variant, index) => (
          <article className="aib-version" key={variant.id}>
            <div className="aib-version-heading">
              <span className="aib-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{variant.name}</h2>
                <p>{variant.note}</p>
              </div>
            </div>
            <div className="aib-theme-grid">
              {visibleThemes.map((itemTheme) => (
                <section
                  className="maataa-root aib-theme-stage"
                  data-theme={itemTheme}
                  data-maataa-theme={itemTheme}
                  key={itemTheme}
                >
                  <span className="aib-theme-label">
                    {itemTheme.replace("-", " ")}
                  </span>
                  <AISpaceToolbar
                    className={`aib-specimen aib-${variant.kind}`}
                    role="toolbar"
                    aria-label={`${variant.name} for ${area.label}`}
                  >
                    <SampleBar
                      kind={variant.kind}
                      area={area}
                      allAreas={false}
                      selectedTool={selectedTool}
                      onSelect={setSelectedTool}
                    />
                  </AISpaceToolbar>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>
      <section
        className="aib-area-matrix"
        aria-labelledby="aib-area-matrix-heading"
      >
        <header>
          <h2 id="aib-area-matrix-heading">Every area, labeled toolbar</h2>
          <p>
            The default labeled version across all nine reference areas and the
            selected theme set.
          </p>
        </header>
        {areas.map((item) => (
          <article className="aib-matrix-row" key={item.id}>
            <h3>{item.label}</h3>
            <div className="aib-theme-grid">
              {visibleThemes.map((itemTheme) => (
                <section
                  className="maataa-root aib-theme-stage"
                  data-theme={itemTheme}
                  data-maataa-theme={itemTheme}
                  key={itemTheme}
                >
                  <span className="aib-theme-label">
                    {itemTheme.replace("-", " ")}
                  </span>
                  <AISpaceToolbar
                    className="aib-specimen"
                    role="toolbar"
                    aria-label={`${item.label} labeled toolbar`}
                  >
                    <div className="aib-tools">
                      {item.tools.map((tool) => (
                        <ToolButton
                          key={tool.id}
                          tool={tool}
                          selected={selectedTool === `${item.id}:${tool.id}`}
                          labeled
                          onClick={() =>
                            setSelectedTool(`${item.id}:${tool.id}`)
                          }
                        />
                      ))}
                    </div>
                  </AISpaceToolbar>
                </section>
              ))}
            </div>
          </article>
        ))}
      </section>
      <footer className="aib-footer">
        <span>Theme values resolve from MAATAA UI tokens.</span>
        <span>
          Area names and actions are reference examples, not an approved
          assistant catalog. Preview actions do not call services.
        </span>
      </footer>
    </main>
  );
}

const meta = {
  title: "Assistant/Icon Bars",
  component: AssistantIconBarsGallery,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AssistantIconBarsGallery>;
export default meta;
type Story = StoryObj<typeof meta>;
export const AllVersions: Story = {};
