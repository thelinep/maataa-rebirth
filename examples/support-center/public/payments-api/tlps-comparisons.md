# TLPS access, competitor and price-tier comparisons

Checked: 15 October 2026. Local files were inspected; competitor information comes from official public pages. Recommendations are proposals, not configured products, validated willingness-to-pay or commercial commitments.

## Access comparison

| Draft SKU | Meaning | Suggested access boundary | Current checkout |
| --- | --- | --- | --- |
| `TLPS-HOD-ACCESS` | Role: Head of Department | Department-scoped team, resource and review work; explicit approvals need implementation | Disabled |
| `TLPS-CREW-ACCESS` | Existing crew work-area identifier | Own assignments and production instructions; avoid assuming team-administration rights | Disabled |
| `TLPS-CASTING-ACCESS` | Existing casting work-area identifier | Casting roles, shortlist and audition planning; not automatically performer self-service | Disabled |
| `TLPS-PRODUCTION-OS-ACCESS` | Production planning area | Project schedule, people, places, estimates and handover | Disabled |

Observed source facts: `apps/tlps/src/types.ts` declares 13 HOD categories, 22 crew categories and 8 cast categories. These are taxonomy counts, not paid seats or enforced permissions. The categories overlap: Costume Designer appears in HOD and crew. `apps/tlps/src/operatingSystems.ts` maps the head-of-department role to production, film, crew, casting, location, equipment/logistics and evidence areas. Its crew and cast role suggestions differ. These UI mappings do not establish server authorization or purchased entitlements.

HOD is a role, while Production/Crew/Casting SKUs were derived from work areas. Treat commercial plan, project membership, role permissions and paid add-ons as separate dimensions. Do not assume that buying a work-area SKU grants all associated role powers. Proposed architecture: plan -> project membership -> role -> scoped actions; add workspace features separately.

## Official competitor comparison

| Product | Verified pricing basis | Advertised coverage relevant to TLPS | Comparison limit |
| --- | --- | --- | --- |
| StudioBinder | Starter $29/month, Indie $49/month, Professional $99/month; monthly billing. Pricing comparison shows 1/2/4 included users respectively. | Scripts, breakdowns, shooting schedules, call sheets, shot planning and collaboration | Actual vendor product, compared against TLPS local demos and draft SKU concepts; not feature parity |
| Yamdu | India-country pricing page shows Flex $29/month, 1 user/1 project; +$15/additional user/month. Studio $139/month billed annually, 10 users/unlimited projects. Signature on request. | Breakdown, scheduling, budgeting, cast/crew and department workflows, distribution | Annual-billed Studio figure is not monthly cancellation pricing; add-ons and account terms can change totals |
| Celtx | Writer, Writer Pro and Team plans; Team lists 3–15 members. Exact numeric prices did not render in the inspected official page/browser. | Writing/story tools plus production-planning tools in Team; individual add-ons listed | Do not substitute third-party or remembered prices; request account-specific pricing |
| TLPS current checkout | No enabled paid SKU; prices and recurring plans unassigned | Browser-local planning/review demos, work-area registers and a Razorpay test adapter | No demonstrated paid fulfillment, recurring billing or production feature parity |

Official sources checked:

- [StudioBinder pricing](https://app.studiobinder.com/pricing) — browser-rendered comparison confirms $29/$49/$99 per month billed monthly; initial animated digits were ignored.
- [StudioBinder plan details](https://support.studiobinder.com/en/articles/10106468-choosing-the-right-studiobinder-plan).
- [Yamdu India pricing selector](https://app.yamdu.com/Account/selectSubscription?country=IN&embed=true&language=en) — inspected rendered page.
- [Yamdu public pricing](https://www.yamdu.com/en/pricing/).
- [Celtx official pricing/features](https://www.celtx.com/pricing/).

Prices are advertised USD subscription amounts, not INR merchant quotes. Taxes, add-ons, billing term and user/project allowance must be compared before calculating savings. No trial signup, purchase or account change was performed.

## Eight requested tiers

USD is assumed from the supplied dollar symbol, pending confirmation. These are frozen viewing equivalents at 1 USD = INR95.0317, dated14 October2026. The [MSE reference archive](https://www.msei.in/markets/currency/historical-data/rbireferenceratearchives) restricts its disseminated reference rates to viewing; this is not a checkout quote. Fees and taxes are excluded. Saptdhatu has no defined conversion.

| Requested USD | Indicative INR | Possible positioning (proposal only) |
| ---: | ---: | --- |
| $0.90 | INR 85.53 | Single article or small digital item |
| $9.00 | INR 855.29 | Individual access candidate |
| $99.00 | INR 9,408.14 | Small team candidate |
| $499.00 | INR 47,420.82 | Project bundle or assisted setup candidate |
| $4,999.00 | INR 475,063.47 | Managed production or enterprise contract candidate |
| $49,999.00 | INR 4,751,489.97 | Large managed programme candidate |
| $499,999.00 | INR 47,515,754.97 | Studio-wide contract candidate |
| $4,999,999.00 | INR 475,158,404.97 | Strategic multi-year programme candidate |

A price without a billing unit is incomplete. Define per-user/month, per-team/month, per-project, per-item or contract total before assigning any tier. $9/month per seat could be compared with monthly SaaS plans; a $499 project bundle cannot be compared directly without team size and project duration. The upper tiers are proposals for service/programme contracts, not supported checkout amounts or validated demand.

## Suggested launch decisions

1. Keep Crew and performer participation distinct from paid editing/admin seats; consider project invitations rather than charging every collaborator. This is a proposed packaging decision.
2. Position HOD as department-scoped permissions within a plan, or a clearly defined paid department seat. Do not make all HOD taxonomy labels independently purchasable by default.
3. Use $0.90 for an identified one-off item, $9 for an individual candidate and $99 for a team candidate only after defining their deliverables and billing basis. These are proposed tests, not merchant prices.
4. Use $499 and above for scoped project/service/enterprise discussions until deliverables, seats, billing, provider acceptance and support terms are defined.
5. Validate current local workflow value with pilot users before claiming to replace StudioBinder, Yamdu or Celtx.

No SKU price, permission, payment route or fulfillment rule was changed by this research.
