# Static demo data

Static data is deterministic and deliberately non-production. It includes demo organisations, users, projects, events, vendors, bookings, finance transactions/KPIs, tasks, AI models/agents/evaluations/messages, notifications/activity, film production records, and aliases for all canonical UI catalogs.

Import from `@maataa/ui/static-data`. No network, database, model provider, payment provider, email provider, identity provider or secrets are required.

## Identity dataset

Alpha 7.4 adds a twelfth static dataset, `DEMO_IDENTITIES`, containing 15 symbolic personas: Brahmini, Shiv, Parvati, the seven Saptarishis and five Panchtatva identities. `DEMO_USERS` references these records through `identityId`; the same identities are reused by project ownership, tasks, activity and AI agents.
