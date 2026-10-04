# MAATAA UI Demo Identities — Alpha 7.4

The demo uses symbolic personas instead of anonymous placeholder users. These software roles are product metaphors only; they are not theological claims.

## Core identities

- **Brahmini** — MAATAA Intelligence · orchestration & system stewardship
- **Shiv** — Architecture Steward · architecture & transformation
- **Parvati** — Experience Steward · design, care & experience

## Saptarishi identities

- **Atri** — Research Rishi · research & observation
- **Bharadvaja** — Engineering Rishi · engineering & systems
- **Gautama** — Evidence Rishi · evidence, logic & evaluation
- **Jamadagni** — Operations Rishi · operations & discipline
- **Kashyapa** — Ecosystem Rishi · ecosystem & relationships
- **Vashistha** — Governance Rishi · governance & guidance
- **Vishvamitra** — Innovation Rishi · innovation & expansion

## Panchtatva identities

- **Prithvi** — Earth Element · infrastructure & stability
- **Varuna** — Water Element · data & flow
- **Agni** — Fire Element · compute & execution
- **Vayu** — Air Element · messaging & movement
- **Akasha** — Space Element · context, network & spatial field

## Imports

```tsx
import { IdentityAvatar } from "@maataa/ui/identity/IdentityAvatar";
import { IdentityBadge } from "@maataa/ui/identity/IdentityBadge";

<IdentityAvatar identity="IDENTITY.BRAHMINI" size={48} />
<IdentityBadge identity="IDENTITY.SAPTARISHI.GAUTAMA" showRole />
```
