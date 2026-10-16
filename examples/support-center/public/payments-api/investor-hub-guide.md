# Investor Hub: circles, subscriptions and escrow reviews

## Separate flows

| Flow | What it records | What it does not do |
| --- | --- | --- |
| Circles | Group purpose, coordinator reference and draft membership rules | Verify investors, pool capital or create an investment vehicle |
| Membership subscriptions | Proposed platform benefits and monthly/yearly/undecided billing period | Create mandates, charge membership fees or confer investment rights |
| Investment interests | Project, party, circle references and open terms/questions | Bind a commitment, allocate securities or collect capital |
| Escrow milestone reviews | Proposed release conditions, evidence, reviewers and dispute terms | Hold, freeze, release or refund money |

The user requested membership subscriptions and investment commitments as separate flows. Until suitable agreements and provider services exist, the second flow is explicitly non-binding investment interest. No promise of return, allocation or acceptance is made.

## Use the local registers

Open the MAATAA preview at `/#/tlps/investor-hub`, or Investor Hub inside the separate TLPS application. Select a register, add a record or load labelled synthetic samples, and move its local review label forward. The four separate lists share one versioned browser-storage record, with a limit of 100 records per list. If device storage is unavailable, keep the page open and export the handover before leaving. Export Investor Hub handover to save all four lists with disabled financial capabilities and a null escrow balance. A proposed membership billing period is retained as a note; it does not configure a provider plan or recurring billing.

References are free-text notes rather than verified links. Local coordinator/reviewer names and status labels do not enforce authorization. There is no member invitation, data-room hosting, identity verification, executed agreement or provider message. Existing funding-opportunity records remain in their original independent register.

## Draft SKUs

- `TLPS-INVESTOR-HUB-ACCESS`: existing area access candidate.
- `TLPS-INVESTOR-CIRCLE-ACCESS`: circle-access candidate.
- `TLPS-INVESTOR-CIRCLE-MEMBERSHIP`: membership service candidate, with price/period/provider plan unassigned.
- `TLPS-INVESTOR-CIRCLE-ADMIN`: circle-coordination tools candidate.
- `TLPS-INVESTOR-DATA-ROOM-ACCESS`: future document-review-access candidate; no data-room service or server permissions are implemented.
- `TLPS-ESCROW-WORKFLOW-ACCESS`: review-tool access candidate; no custody fee or escrow deposit is implied.

Capital contributions and escrow balances are separate financial records, not SKUs. Buying a tool must not be treated as making an investment. No requested price tier has been assigned to these entries. Saptdhatu has no configured denomination or settlement conversion.

## Provider work still required

The current Shree source supports one-time Razorpay test orders only; it does not implement recurring Investor Hub billing. A real membership adapter needs a configured provider plan, mandate authorization, recurring-event reconciliation, failure/cancellation handling and entitlement rules. Razorpay's official subscription documentation describes plan-based billing: https://razorpay.com/docs/payments/subscriptions/.

Actual escrow requires a specifically selected custody provider and account structure, signed terms, authority checks, evidence conditions, dispute/refund handling and provider-verified transaction receipts. A local review label and a general payment gateway integration do not establish these. Razorpay Route advertises payment splitting/distribution; this repository has not connected it or established that it satisfies a project escrow arrangement: https://razorpay.com/route/.

`investor-hub.contract.json` is the current planning capability contract, not a deployed investment or escrow API.
