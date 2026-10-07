import type { EcosystemItem } from "@maataa/content-engine";
import type { CSSProperties } from "react";
import { BrandAsset } from "../surfaces/BrandAsset.tsx";
import { BrandButton } from "../surfaces/BrandButton.tsx";
import { EcosystemGraph } from "./EcosystemGraph.tsx";
import { HoverDepth, MotionPanel } from "./CinematicMotion.tsx";
import { LiveStatusMatrix } from "./LiveStatusMatrix.tsx";
import { MobileQuickActions } from "../mobile/MobileQuickActions.tsx";

type HomepageComposition = {
  featured: EcosystemItem[];
  recent: EcosystemItem[];
  top: EcosystemItem[];
  recommended: EcosystemItem[];
  trending: EcosystemItem[];
};

type CinematicHomepageProps = {
  composition: HomepageComposition;
  apiBaseUrl: string;
  heroImage: string;
  liveDomainCount: number;
  themeVariables?: CSSProperties;
  dhyaanRuntime?: {
    title: string;
    subtitle: string;
    caption: string;
    eyebrow: string;
    boardImage: string;
    mission: string;
    evidenceNote: string;
    primaryAction: { label: string; href: string };
    secondaryAction: { label: string; href: string };
    deviceBands: readonly { id: string; label: string; breakpoint: string }[];
    navItems: readonly string[];
    trustSignals: readonly string[];
    runtimeDomains: readonly { id: string; title: string; subtitle: string; description: string; href: string }[];
    runtimeFeed: readonly { id: string; label: string; extractedLatencyLabel: string }[];
    featurePillars: readonly { id: string; title: string; description: string }[];
  };
  offlineSnapshot?: {
    queue: {
      total: number;
      pending: number;
      failed: number;
      conflicts: number;
    };
    cache: {
      total: number;
      expired: number;
    };
    media: {
      total: number;
      availableOffline: number;
    };
  };
};

const knowledgeStreams = [
  "426+ scripts to explore",
  "700+ languages to learn from",
  "10,000+ years of context",
  "Digital Gurukul preview for books and institutions",
  "Hemant Samwat calendar surface under review",
  "Radio access restored by email",
  "Clear map of live domains"
];

const trustSignals = [
  "Public health checks online",
  "Single-VPS deployment verified",
  "Secure domain routing",
  "Privacy and terms published",
  "Payments verified server-side",
  "Device-aware account safety"
];

const startActions = [
  { label: "Listen", href: "/radio", detail: "Play previews and unlock full songs." },
  { label: "Create", href: "https://tlps.in", detail: "Submit a production request." },
  { label: "Learn", href: "/digital-gurukul", detail: "Preview books, onboarding, and institutional learning paths." },
  { label: "Calendar", href: "/hemant-samwat", detail: "Explore samwat, panchang, festivals, and nature alignment." },
  { label: "Explore", href: "/domains", detail: "See every live domain." },
  { label: "Collaborate", href: "/contact", detail: "Reach the team with a clear request." }
];

const ecosystemGroups = [
  {
    title: "Runtime",
    eyebrow: "Maataa",
    href: "/maataa",
    summary: "Runtime health, status matrix, local-first contracts, release evidence, and orchestration visibility.",
    signals: ["Status Matrix", "Offline Core", "Runtime Health"]
  },
  {
    title: "Production",
    eyebrow: "TLP",
    href: "/tlp",
    summary: "Production requests, sessions, stages, studios, roles, approvals, and field work.",
    signals: ["Projects", "Studios", "Approvals"]
  },
  {
    title: "Distribution",
    eyebrow: "Radio",
    href: "/radio",
    summary: "Audio previews, unlock state, lyrics, artist metadata, and cached playback contracts.",
    signals: ["Preview", "Unlock", "Offline Playback"]
  },
  {
    title: "Education",
    eyebrow: "Digital Gurukul",
    href: "/digital-gurukul",
    summary:
      "Books, schools, universities, researchers, teachers, students, sponsors, analytics, and preview-safe publishing workflows.",
    signals: ["Books", "Onboarding", "Preview Safety"]
  },
  {
    title: "Intelligence",
    eyebrow: "KBM",
    href: "/review",
    summary: "Ingestion, evidence, review-required promotion, and operational memory boundaries.",
    signals: ["Ingestion", "Review Queue", "Evidence Graph"]
  },
  {
    title: "Ecosystem",
    eyebrow: "ALLB",
    href: "/allb",
    summary: "Commerce, media, communication, knowledge, agriculture, games, news, and ad-space relationships.",
    signals: ["Commerce", "Krishi", "AdSpace"]
  },
  {
    title: "Time",
    eyebrow: "Hemant Samwat",
    href: "/hemant-samwat",
    summary:
      "Civilizational calendar, panchang, festivals, agriculture alignment, and cultural learning surface under review.",
    signals: ["Samwat", "Panchang", "Festivals"]
  },
  {
    title: "Community",
    eyebrow: "Collaboration",
    href: "/contact",
    summary: "Creators, contributors, operators, sessions, and production collaboration channels.",
    signals: ["Creators", "Sessions", "Contributors"]
  }
];

const topologyNodes = [
  { label: "Offline Core", state: "Local-first contract", detail: "Queues, cache, conflicts, media index" },
  { label: "Ingestion Runtime", state: "Needs review", detail: "WhatsApp exports, scripts, notes, schedules" },
  { label: "KBM", state: "Review required", detail: "Accepted artifacts become trusted memory" },
  {
    label: "Digital Gurukul",
    state: "Preview gated",
    detail: "Education publishing, onboarding, analytics, and school data boundaries"
  },
  {
    label: "Hemant Samwat",
    state: "Origin review",
    detail: "Calendar surface exists locally while domain TLS evidence remains gated"
  },
  { label: "TLP Sessions", state: "Operational", detail: "Projects, roles, tasks, stages, evidence" },
  { label: "Radio", state: "Distribution", detail: "Preview, unlock state, cached playback" },
  { label: "Status Matrix", state: "Observable", detail: "Health, events, release evidence" }
];

const ingestionFlow = [
  { title: "Import", detail: "Bring in notes, scripts, lyrics, schedules, or WhatsApp exports." },
  { title: "Parse", detail: "Classify format and source with conservative confidence." },
  { title: "Review", detail: "Default state is needs review. No auto-trust." },
  { title: "Accept / Reject", detail: "A reviewer decision creates the trust boundary." },
  { title: "Promote", detail: "Accepted artifacts can become KBM-ready records." },
  { title: "Use", detail: "Promoted evidence can support production sessions and answers." }
];

export function CinematicHomepage({
  composition,
  apiBaseUrl,
  heroImage,
  liveDomainCount,
  themeVariables,
  dhyaanRuntime,
  offlineSnapshot
}: CinematicHomepageProps) {
  const offline = offlineSnapshot ?? {
    queue: { total: 0, pending: 0, failed: 0, conflicts: 0 },
    cache: { total: 0, expired: 0 },
    media: { total: 0, availableOffline: 0 }
  };
  const heroTitle = dhyaanRuntime?.title ?? "One Earth.\nInfinite Knowledge.\nStart Anywhere.";
  const heroTitleLines = heroTitle.split("\n");

  return (
    <main className={`sovereign-home${dhyaanRuntime ? " sovereign-home-dhyaan" : ""}`} style={themeVariables}>
      <section className="sovereign-hero" aria-labelledby="sovereign-hero-title">
        <BrandAsset alt="" aspectRatio="16 / 9" className="sovereign-hero-bg" priority sizes="100vw" src={heroImage} />
        <div className="sovereign-hero-overlay" />
        <div className="orbital-ring orbital-ring-one" />
        <div className="orbital-ring orbital-ring-two" />
        <div className="sovereign-hero-content">
          <MotionPanel className="sovereign-hero-copy">
            <p className="section-label">{dhyaanRuntime?.eyebrow ?? "Knowledge, sound, scripts, and production"}</p>
            <h1 id="sovereign-hero-title" className="hero-heading">
              {heroTitleLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < heroTitleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h1>
            {dhyaanRuntime ? <p className="dhyaan-subtitle">{dhyaanRuntime.subtitle}</p> : null}
            <p className="cosmic-caption">
              {dhyaanRuntime?.caption ??
                "Vaigyaaniq brings listening, learning, production help, scripts, and live system status into one understandable ecosystem."}
            </p>
            <div className="sovereign-actions">
              <BrandButton href={dhyaanRuntime?.primaryAction.href ?? "#start-here"}>
                {dhyaanRuntime?.primaryAction.label ?? "Start here"}
              </BrandButton>
              <BrandButton href={dhyaanRuntime?.secondaryAction.href ?? "/domains"} variant="secondary">
                {dhyaanRuntime?.secondaryAction.label ?? "View domains"}
              </BrandButton>
            </div>
            <MobileQuickActions />
          </MotionPanel>
          <MotionPanel className="hero-command-panel" delay={0.12}>
            <p>{dhyaanRuntime ? "Extracted preview runtime" : "Live now"}</p>
            <div className="pulse-row">
              <span />
              <strong>{dhyaanRuntime ? "PHKD-safe board metadata" : "Systems online"}</strong>
            </div>
            {dhyaanRuntime ? (
              <div className="dhyaan-feed-list" aria-label="Extracted preview runtime feed">
                {dhyaanRuntime.runtimeFeed.map((item) => (
                  <span key={item.id}>
                    <strong>{item.label}</strong>
                    <small>{item.extractedLatencyLabel}</small>
                  </span>
                ))}
              </div>
            ) : (
              <div className="hero-metrics">
                <GlowMetric label="Scripts" value="426+" />
                <GlowMetric label="Languages" value="700+" />
                <GlowMetric label="Timeline" value="10K+" />
              </div>
            )}
            <div className="runtime-mini-strip" aria-label="Operational runtime state">
              <span>Offline queue {offline.queue.pending} pending</span>
              <span>{offline.media.availableOffline} media cached</span>
              <span>{offline.queue.conflicts} conflicts</span>
            </div>
          </MotionPanel>
        </div>
      </section>

      {dhyaanRuntime ? <DhyaanRuntimeExtraction runtime={dhyaanRuntime} /> : null}

      <section className="sovereign-section" id="start-here">
        <SectionHeader
          eyebrow="Start here"
          title="What do you want to do?"
          description="Choose one simple path first. Deeper system details stay available after you begin."
        />
        <div className="featured-system-grid">
          {startActions.map((action) => (
            <HoverDepth className="system-card-wrap" key={action.label}>
              <a className="system-card system-card-live" href={action.href}>
                <span className="system-status">Start</span>
                <h3>{action.label}</h3>
                <p>{action.detail}</p>
                <small>Clear first step</small>
              </a>
            </HoverDepth>
          ))}
        </div>
      </section>

      <section className="sovereign-section" id="ecosystem-operating-map">
        <SectionHeader
          eyebrow="Operational ecosystem"
          title="One runtime, six connected surfaces."
          description="This is the public alpha map: runtime, production, distribution, intelligence, ecosystem infrastructure, and community work together instead of acting like separate dashboards."
        />
        <div className="operational-ecosystem-grid">
          {ecosystemGroups.map((group) => (
            <HoverDepth className="system-card-wrap" key={group.title}>
              <a className="operational-ecosystem-card" href={group.href}>
                <span>{group.eyebrow}</span>
                <h3>{group.title}</h3>
                <p>{group.summary}</p>
                <div>
                  {group.signals.map((signal) => (
                    <small key={signal}>{signal}</small>
                  ))}
                </div>
              </a>
            </HoverDepth>
          ))}
        </div>
      </section>

      <section className="sovereign-section" id="runtime-topology">
        <SectionHeader
          eyebrow="Runtime topology"
          title="How work becomes trusted."
          description="The visible path from offline field work to reviewed memory, production sessions, radio distribution, and public status."
        />
        <div className="runtime-topology-panel">
          <div className="runtime-flow-line" aria-hidden="true" />
          {topologyNodes.map((node, index) => (
            <article className="runtime-topology-node" key={node.label}>
              <span>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
              <h3>{node.label}</h3>
              <strong>{node.state}</strong>
              <p>{node.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sovereign-section" id="ingestion-kbm-flow">
        <SectionHeader
          eyebrow="Ingestion + KBM"
          title="Evidence is reviewed before it becomes memory."
          description="The trust boundary is intentionally visible. Imported material stays uncertain until reviewed, accepted, and promoted."
        />
        <div className="ingestion-flow-grid">
          {ingestionFlow.map((step, index) => (
            <article className="ingestion-flow-step" key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sovereign-section operational-readiness-grid">
        <MotionPanel className="operational-readiness-card">
          <SectionHeader
            eyebrow="TLP field mode"
            title="Production work stays visible."
            description="Projects, studios, approvals, tasks, assets, timelines, and deliverables need to survive field conditions."
          />
          <div className="runtime-signal-list">
            <span>Active shoots: review in TLP</span>
            <span>Approvals: human-reviewed</span>
            <span>Assets: offline/sync-aware contract</span>
            <span>Studios: sound, video, VFX routes live</span>
          </div>
        </MotionPanel>
        <MotionPanel className="operational-readiness-card" delay={0.08}>
          <SectionHeader
            eyebrow="Radio distribution"
            title="Playback has access state."
            description="Radio shows preview, unlock, metadata, lyrics, cached playback contracts, and download state without faking payments."
          />
          <div className="runtime-signal-list">
            <span>Preview: free first listen</span>
            <span>Unlock: real payment only</span>
            <span>Offline: cached playback contract</span>
            <span>Metadata: artist, lyricist, producer</span>
          </div>
        </MotionPanel>
      </section>

      <section className="sovereign-section" id="live-systems">
        <SectionHeader
          eyebrow="Live systems"
          title="What is alive right now."
          description="The main places you can use today, with clear labels and direct actions."
        />
        <div className="featured-system-grid">
          {composition.featured.map((item, index) => (
            <HoverDepth className="system-card-wrap" key={item.id}>
              <a className={`system-card system-card-${item.status}`} href={item.href}>
                <span className="system-status">{item.status}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="system-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <small>{index + 1 < 10 ? `0${index + 1}` : index + 1} / live map</small>
              </a>
            </HoverDepth>
          ))}
        </div>
      </section>

      <section className="sovereign-section intelligence-grid-section">
        <SectionHeader
          eyebrow="Useful paths"
          title="Find what fits your intent."
          description="A simple ordering of live pages by freshness, activity, and likely usefulness."
        />
        <div className="intelligence-grid">
          <RankingPanel title="Trending" items={composition.trending} />
          <RankingPanel title="Recent" items={composition.recent} />
          <RankingPanel title="Top" items={composition.top} />
          <RankingPanel title="Recommended" items={composition.recommended} />
        </div>
      </section>

      <section className="sovereign-section graph-status-grid">
        <div>
          <SectionHeader
            eyebrow="Ecosystem map"
            title="How the main places connect."
            description="A lightweight map of domains, products, and knowledge paths."
          />
          <EcosystemGraph items={composition.featured} />
        </div>
        <div id="status-matrix">
          <SectionHeader
            eyebrow="Live status"
            title="What is working now."
            description="Public health checks for the systems that expose them."
          />
          <LiveStatusMatrix
            apiBaseUrl={apiBaseUrl}
            activeSystemCount={composition.featured.length}
            liveDomainCount={liveDomainCount}
          />
        </div>
      </section>

      <section className="sovereign-section knowledge-trust-grid">
        <MotionPanel className="knowledge-stream-panel">
          <SectionHeader
            eyebrow="Knowledge streams"
            title="Explore culture, language, and media."
            description="Start with sound, scripts, languages, access records, and the domain map."
          />
          <div className="stream-list">
            {knowledgeStreams.map((stream) => (
              <span key={stream}>{stream}</span>
            ))}
          </div>
        </MotionPanel>
        <MotionPanel className="trust-layer-panel" delay={0.08}>
          <SectionHeader
            eyebrow="Trust"
            title="Built carefully, shown honestly."
            description="Security and transparency signals are shown only where they are actually available."
          />
          <div className="trust-signal-grid">
            {trustSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </MotionPanel>
      </section>

      <section className="sovereign-footer sovereign-closing-panel">
        <div>
          <p className="section-label">Vaigyaaniq ecosystem</p>
          <h2>One place to listen, learn, create, and verify.</h2>
          <p>
            Domains, products, access records, scripts, radio, and live status are connected without forcing you to
            learn the internal architecture first.
          </p>
        </div>
        <nav aria-label="Ecosystem footer">
          <a href="/domains">Domains</a>
          <a href="/radio">Radio</a>
          <a href="/scripts">Scripts</a>
          <a href="/brahmini">Brahmini</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </nav>
      </section>
    </main>
  );
}

function DhyaanRuntimeExtraction({ runtime }: { runtime: NonNullable<CinematicHomepageProps["dhyaanRuntime"]> }) {
  return (
    <section className="dhyaan-runtime-extraction" aria-labelledby="dhyaan-runtime-title">
      <div className="dhyaan-runtime-copy">
        <p className="section-label">Dhyaan theme extraction</p>
        <h2 id="dhyaan-runtime-title">Vaigyaaniq.com sovereign intelligence board absorbed.</h2>
        <p>{runtime.evidenceNote}</p>
        <div className="dhyaan-nav-strip" aria-label="Extracted navigation labels">
          {runtime.navItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="dhyaan-device-grid" aria-label="Extracted responsive device targets">
          {runtime.deviceBands.map((device) => (
            <span key={device.id}>
              <strong>{device.label}</strong>
              <small>{device.breakpoint}</small>
            </span>
          ))}
        </div>
      </div>
      <BrandAsset
        alt="Extracted Vaigyaaniq Dhyaan runtime board"
        aspectRatio="3 / 2"
        className="dhyaan-board-image"
        sizes="(min-width: 980px) 42vw, 100vw"
        src={runtime.boardImage}
      />
      <div className="dhyaan-domain-grid" aria-label="Extracted runtime domains">
        {runtime.runtimeDomains.map((domain) => (
          <a href={domain.href} key={domain.id}>
            <strong>{domain.title}</strong>
            <span>{domain.subtitle}</span>
            <small>{domain.description}</small>
          </a>
        ))}
      </div>
      <div className="dhyaan-pillar-strip" aria-label="Extracted Dhyaan feature pillars">
        {runtime.featurePillars.map((pillar) => (
          <span key={pillar.id}>
            <strong>{pillar.title}</strong>
            <small>{pillar.description}</small>
          </span>
        ))}
      </div>
      <div className="dhyaan-trust-strip" aria-label="Extracted trust and status labels">
        {runtime.trustSignals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>
      <p className="dhyaan-mission">{runtime.mission}</p>
    </section>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="sovereign-section-header">
      <p className="section-label">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function GlowMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="glow-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function RankingPanel({ title, items }: { title: string; items: EcosystemItem[] }) {
  return (
    <MotionPanel className="ranking-panel">
      <h3>{title}</h3>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={item.href}>
              <span>{item.title}</span>
              <small>{item.status}</small>
            </a>
          </li>
        ))}
      </ol>
    </MotionPanel>
  );
}
