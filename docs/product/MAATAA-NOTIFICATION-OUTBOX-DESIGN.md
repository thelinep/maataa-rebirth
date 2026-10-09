# MAATAA Notification Transactional Outbox Design

**Status:** implementation-ready design draft; no outbox service or production notification delivery is claimed to exist.
**Scope:** reliable handoff from committed MAATAA/TLPS domain changes to authorized event consumers and notification delivery.
**Related gates:** service-roadmap Gates 2, 4, 8, 9 and 10.

## Goals and boundaries

- A committed domain mutation must not be lost because a process crashes before publishing its event.
- A retry or duplicate delivery must not repeat a consumer side effect.
- Notification preferences and authorization are evaluated before delivery is created.
- Event and notification payloads carry only the minimum permitted data; sensitive message bodies and credentials are excluded.
- Domain services remain authoritative for their records. The outbox records a durable event intent, not a second copy of the domain database.
- Delivery is **at least once**. The design does not promise exactly-once network delivery; idempotent effects provide effectively-once processing at a consumer boundary.

## Transaction boundary

The service that owns the mutation writes both the domain change and its outbox event in one database transaction:

1. Authenticate and authorize the requested mutation against current policy.
2. Validate the command and idempotency key.
3. Update the owning aggregate and increment its aggregate version/sequence.
4. Insert an outbox row with a stable event ID, schema version, aggregate key, privacy class and minimal payload/reference.
5. Commit once. If any write fails, roll back both the domain change and event intent.
6. Return the domain result after commit; asynchronous delivery status is observable separately.

Do not publish to a broker or invoke email/push/network delivery inside the domain transaction. The outbox may be polled initially; add a self-hosted broker only after measured throughput or fanout warrants it.

## Event envelope

The versioned envelope should include:

| Field | Rule |
|---|---|
| `event_id` | Random stable identifier created once; unique across producer authority. |
| `event_type`, `schema_version` | Explicit allowlisted type and immutable version. Unknown versions are quarantined, not guessed. |
| `producer`, `tenant_id`, `project_id` | Typed authority context; no client-supplied tenant is trusted without server authorization. |
| `aggregate_type`, `aggregate_id`, `aggregate_sequence` | Identifies the changed record and ordering within that aggregate only. |
| `occurred_at`, `recorded_at`, `time_basis` | Separate event time from server record time; retain source/verification state and do not label host time verified without evidence. |
| `correlation_id`, `causation_id` | Trace relationships without putting secrets or user content in logs. |
| `privacy_class` | Determines which consumers/channels may receive the event and what fields may be exposed. |
| `payload` or `payload_ref` | Small typed event data or an authorized reference; never a full film script or private message by default. |

An event is not an authorization grant. Consumers must authorize reads against the owning service when dereferencing protected content.

## Durable records and state transitions

Minimum logical records:

- **Outbox event:** immutable event envelope plus delivery state (`pending`, `leased`, `delivered`, `dead`), attempt count, next-attempt time, lease expiry, last safe error category and timestamps.
- **Consumer inbox:** unique `(consumer_id, event_id)` receipt committed atomically with consumer side effects.
- **Notification intent:** recipient, notification type, event reference, selected channel, preference decision revision, minimal rendered payload/reference, dedupe key and expiry.
- **Delivery attempt:** channel, attempt number, outcome category, retry time and provider receipt when applicable. Do not store credentials or unrestricted provider responses.

Schema constraints must enforce unique event IDs, unique consumer receipts, nonnegative attempts, valid state transitions and tenant/aggregate consistency. Retention and deletion are policy-controlled; dead-letter rows are reviewable and must not be silently discarded.

## Dispatcher and consumer algorithm

1. Dispatcher claims a bounded batch of due rows in a short transaction, using a lease so another worker cannot claim them concurrently. In PostgreSQL, row-level `SKIP LOCKED` is one candidate implementation; keep the repository contract independent of that SQL choice.
2. Dispatcher commits the lease before performing network I/O.
3. It sends the versioned event to an allowlisted consumer or notification worker.
4. Consumer validates schema, producer, tenant/project scope, privacy class and supported event type.
5. Consumer inserts `(consumer_id, event_id)` into its inbox and applies the side effect in the same transaction. A uniqueness conflict means the event was already applied; return an idempotent acknowledgement.
6. Dispatcher marks delivery complete after acknowledgement. If the worker crashes after consumer commit but before acknowledgement, the retry is harmless because the inbox deduplicates it.
7. Transient failures use bounded exponential backoff with jitter and a maximum retry policy chosen in Gate 1. Permanent/schema/policy failures go to a dead-letter review state with a redacted reason.
8. Expired leases become claimable again. Manual replay requires an operator audit record and preserves original event identity.

Ordering is guaranteed only per aggregate if consumers require it; global ordering is explicitly not promised. An aggregate sequence gap is retried or quarantined according to the contract rather than silently reordered.

## Notification privacy and delivery

- Start with in-app notifications stored by the Notifications service.
- Evaluate recipient membership, current access, user preferences, quiet hours, expiry and suppression immediately before creating a delivery intent.
- Notifications should say that an authorized item changed and carry an opaque reference; opening the item triggers a fresh authorization check.
- Do not place scripts, private message text, access tokens, recovery links or sensitive identifiers in push/email payloads or telemetry.
- Email is gated on sender ownership, SPF/DKIM/DMARC alignment, unsubscribe/consent rules, delivery tests and incident ownership. Zone-file presence is not delivery evidence.
- Apple/Google push remains an optional external delivery dependency. Use opaque minimal payloads; never claim provider-independent delivery.

## Security and operations

- Outbox writes happen only after the owning service authorizes the domain command. Worker identity is service-scoped and least-privilege.
- Encrypt stored data and backups according to the approved classification; isolate service credentials and rotate them.
- Bound event size, batch size, worker concurrency, attempt duration and payload retention.
- Logs contain event ID or a privacy-safe correlation value, state transition, timing and error category—not full payloads, credentials, emails or message contents.
- Monitor pending age, oldest event, attempt distribution, dead-letter count, consumer lag, lease expiry and delivery latency. Assign alert thresholds from the approved SLO.
- Provide a kill switch per consumer/channel, rate cap, pause/resume and audited replay. A channel outage must not block the source transaction.

## Required acceptance tests

1. Domain transaction rollback leaves neither a mutation nor an outbox row.
2. Successful commit always leaves both the mutation and its outbox event.
3. Crash after commit/before publish is recovered by dispatcher polling.
4. Crash after consumer side effect/before acknowledgement causes a duplicate delivery but only one consumer effect.
5. Concurrent dispatchers do not hold duplicate active leases for the same row.
6. Lease expiry recovers work after worker death.
7. Transient failures retry within bounded policy; permanent failures are quarantined with no data leak.
8. Per-aggregate sequence gaps follow the declared policy; no global ordering assumption is made.
9. Revoked membership or changed preferences prevent delivery/dereference as specified.
10. Cross-tenant event, unsupported schema, oversized payload and forged producer are rejected.
11. Email/push outage does not roll back the committed domain mutation and does not create unbounded retries.
12. Restore drill preserves pending events, consumer inbox dedupe and audit state.

## Rollout order

1. Freeze event envelope, event ownership, privacy classes, idempotency and retention in Gate 2.
2. Add schema and transaction helper to one owning service using synthetic data.
3. Implement polling dispatcher and inbox in the same test environment; pass crash/duplicate tests.
4. Add in-app Notifications consumer and preference controls.
5. Add dashboards, lag alerts, dead-letter review and replay audit.
6. Run load, outage and restore drills; measure SLOs.
7. Add email or mobile push only after their respective domain/provider gates close.

**Open decisions before implementation:** event retention period; numeric retry/backoff and expiry limits; per-event privacy classification; which domain events may notify; notification preferences/quiet-hour semantics; message encryption model; expected throughput; and whether a broker is justified. Until those are approved, keep this as a design and do not invent production defaults.
