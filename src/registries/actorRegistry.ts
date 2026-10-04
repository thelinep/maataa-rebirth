import { DEMO_IDENTITY_REGISTRY } from "../identity/identityRegistry";

export const ACTOR_REGISTRY = DEMO_IDENTITY_REGISTRY.map((identity) => ({
  id: identity.id,
  name: identity.name,
  kind: "demo-identity" as const,
  family: identity.family,
  title: identity.title,
  role: identity.demoRole,
  motif: identity.motif,
}));
