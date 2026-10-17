CREATE TABLE tlps_entities (
  project_id TEXT NOT NULL REFERENCES projects(project_id),
  entity_id TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('profiles','onboarding','workplace-records','budget-items','crew-assignments','locations','schedule-items','evidence','circles','membership-plans','investment-interests','escrow-reviews')),
  version INTEGER NOT NULL CHECK(version > 0),
  data_json TEXT NOT NULL CHECK(json_valid(data_json) AND json_type(data_json)='object'),
  deleted INTEGER NOT NULL DEFAULT 0 CHECK(deleted IN (0,1)),
  created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL,
  PRIMARY KEY(project_id,entity_id)
);
CREATE INDEX tlps_entity_listing ON tlps_entities(project_id,kind,deleted,entity_id);
CREATE UNIQUE INDEX tlps_singleton ON tlps_entities(project_id,kind) WHERE kind IN ('profiles','onboarding') AND deleted=0;
CREATE TABLE tlps_links (
  project_id TEXT NOT NULL, source_id TEXT NOT NULL, target_id TEXT NOT NULL,
  relation TEXT NOT NULL,
  PRIMARY KEY(project_id,source_id,relation),
  FOREIGN KEY(project_id,source_id) REFERENCES tlps_entities(project_id,entity_id),
  FOREIGN KEY(project_id,target_id) REFERENCES tlps_entities(project_id,entity_id),
  CHECK(source_id <> target_id)
);
CREATE INDEX tlps_link_target ON tlps_links(project_id,target_id);
CREATE TABLE tlps_events (
  sequence INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL REFERENCES projects(project_id),
  entity_id TEXT NOT NULL, kind TEXT NOT NULL, version INTEGER NOT NULL,
  operation TEXT NOT NULL CHECK(operation IN ('created','updated','deleted')),
  actor TEXT NOT NULL REFERENCES principals(principal_id),
  data_digest TEXT NOT NULL, recorded_at INTEGER NOT NULL,
  FOREIGN KEY(project_id,entity_id) REFERENCES tlps_entities(project_id,entity_id)
);
CREATE INDEX tlps_event_listing ON tlps_events(project_id,sequence);
CREATE TRIGGER tlps_events_no_update BEFORE UPDATE ON tlps_events BEGIN SELECT RAISE(ABORT,'append only'); END;
CREATE TRIGGER tlps_events_no_delete BEFORE DELETE ON tlps_events BEGIN SELECT RAISE(ABORT,'append only'); END;
CREATE TABLE tlps_idempotency (
  project_id TEXT NOT NULL, principal_id TEXT NOT NULL REFERENCES principals(principal_id),
  request_key TEXT NOT NULL, request_digest TEXT NOT NULL, response_json TEXT NOT NULL CHECK(json_valid(response_json)),
  PRIMARY KEY(project_id,principal_id,request_key),
  FOREIGN KEY(project_id) REFERENCES projects(project_id)
);
CREATE TABLE tlps_skus (
  sku TEXT PRIMARY KEY, data_json TEXT NOT NULL CHECK(json_valid(data_json)),
  CHECK(COALESCE(json_extract(data_json,'$.commercialStatus'),'missing')='draft'),
  CHECK(COALESCE(json_type(data_json,'$.checkoutEnabled'),'missing')='false'),
  CHECK(COALESCE(json_type(data_json,'$.fulfillmentEnabled'),'missing')='false'),
  CHECK(COALESCE(json_type(data_json,'$.priceMinor'),'missing')='null')
);
