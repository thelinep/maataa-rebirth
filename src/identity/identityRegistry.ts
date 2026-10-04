import type { DemoIdentityDefinition } from "./types";

/**
 * Symbolic demo personas used only by the MAATAA UI deterministic demo.
 * Titles and software responsibilities are product metaphors, not theological claims.
 */
export const DEMO_IDENTITY_REGISTRY = [
  { id:"IDENTITY.BRAHMINI", name:"Brahmini", family:"maataa", title:"MAATAA Intelligence", demoRole:"Orchestration & system stewardship", motif:"lotus", accent:"#e0b52f", surface:"#17140b", glyph:"ब्रा", description:"Foundational demo identity for orchestration, synthesis and system-wide context." },
  { id:"IDENTITY.SHIV", name:"Shiv", family:"deva", title:"Architecture Steward", demoRole:"Architecture & transformation", motif:"trishul", accent:"#aeb8c7", surface:"#10141a", glyph:"शि", description:"Demo identity for architecture, transformation, technical boundaries and simplification." },
  { id:"IDENTITY.PARVATI", name:"Parvati", family:"deva", title:"Experience Steward", demoRole:"Design, care & experience", motif:"mountain-lotus", accent:"#d993a8", surface:"#191015", glyph:"पा", description:"Demo identity for product experience, visual coherence, hospitality and user-centered composition." },

  { id:"IDENTITY.SAPTARISHI.ATRI", name:"Atri", family:"saptarishi", title:"Research Rishi", demoRole:"Research & observation", motif:"star", accent:"#c2a8ff", surface:"#15111f", glyph:"अ", description:"Saptarishi demo identity for research, observation and discovery." },
  { id:"IDENTITY.SAPTARISHI.BHARADVAJA", name:"Bharadvaja", family:"saptarishi", title:"Engineering Rishi", demoRole:"Engineering & systems", motif:"book", accent:"#74b9ff", surface:"#0d1720", glyph:"भ", description:"Saptarishi demo identity for engineering systems, implementation and developer tooling." },
  { id:"IDENTITY.SAPTARISHI.GAUTAMA", name:"Gautama", family:"saptarishi", title:"Evidence Rishi", demoRole:"Evidence, logic & evaluation", motif:"evidence", accent:"#73d7b3", surface:"#0e1a16", glyph:"गौ", description:"Saptarishi demo identity for evidence, reasoning quality, evaluation and provenance." },
  { id:"IDENTITY.SAPTARISHI.JAMADAGNI", name:"Jamadagni", family:"saptarishi", title:"Operations Rishi", demoRole:"Operations & discipline", motif:"flame-staff", accent:"#f2a65a", surface:"#1c130c", glyph:"ज", description:"Saptarishi demo identity for operational discipline, execution and production readiness." },
  { id:"IDENTITY.SAPTARISHI.KASHYAPA", name:"Kashyapa", family:"saptarishi", title:"Ecosystem Rishi", demoRole:"Ecosystem & relationships", motif:"leaf", accent:"#87c56a", surface:"#11190d", glyph:"क", description:"Saptarishi demo identity for ecosystems, vendors, relationships and connected resources." },
  { id:"IDENTITY.SAPTARISHI.VASHISTHA", name:"Vashistha", family:"saptarishi", title:"Governance Rishi", demoRole:"Governance & guidance", motif:"lamp", accent:"#e7c66b", surface:"#1c180c", glyph:"व", description:"Saptarishi demo identity for governance, policy, guidance and review gates." },
  { id:"IDENTITY.SAPTARISHI.VISHVAMITRA", name:"Vishvamitra", family:"saptarishi", title:"Innovation Rishi", demoRole:"Innovation & expansion", motif:"bow-star", accent:"#8ed3e8", surface:"#0d181c", glyph:"वि", description:"Saptarishi demo identity for innovation, expansion, experimentation and new capabilities." },

  { id:"IDENTITY.PANCHTATVA.PRITHVI", name:"Prithvi", family:"panchtatva", title:"Earth Element", demoRole:"Infrastructure & stability", motif:"earth", accent:"#b38b57", surface:"#19140e", glyph:"पृ", description:"Panchtatva demo identity for infrastructure, durability, storage and stable foundations." },
  { id:"IDENTITY.PANCHTATVA.VARUNA", name:"Varuna", family:"panchtatva", title:"Water Element", demoRole:"Data & flow", motif:"water", accent:"#5bb8e8", surface:"#0b151c", glyph:"व", description:"Panchtatva demo identity for data flow, continuity, finance streams and synchronization." },
  { id:"IDENTITY.PANCHTATVA.AGNI", name:"Agni", family:"panchtatva", title:"Fire Element", demoRole:"Compute & execution", motif:"fire", accent:"#ff8a4c", surface:"#1d100b", glyph:"अ", description:"Panchtatva demo identity for compute, execution, build, processing and transformation." },
  { id:"IDENTITY.PANCHTATVA.VAYU", name:"Vayu", family:"panchtatva", title:"Air Element", demoRole:"Messaging & movement", motif:"air", accent:"#a8d7df", surface:"#10191b", glyph:"वा", description:"Panchtatva demo identity for communication, transport, messaging and movement." },
  { id:"IDENTITY.PANCHTATVA.AKASHA", name:"Akasha", family:"panchtatva", title:"Space Element", demoRole:"Context, network & spatial field", motif:"space", accent:"#a69cff", surface:"#11101b", glyph:"आ", description:"Panchtatva demo identity for context, network relationships, spatial fields and knowledge space." }
] as const satisfies readonly DemoIdentityDefinition[];

export type DemoIdentity = (typeof DEMO_IDENTITY_REGISTRY)[number];
export const DEMO_IDENTITY_BY_ID = Object.fromEntries(DEMO_IDENTITY_REGISTRY.map((identity) => [identity.id, identity])) as Record<DemoIdentity["id"], DemoIdentity>;
export const SAPTARISHI_IDENTITIES = DEMO_IDENTITY_REGISTRY.filter((identity) => identity.family === "saptarishi");
export const PANCHTATVA_IDENTITIES = DEMO_IDENTITY_REGISTRY.filter((identity) => identity.family === "panchtatva");
