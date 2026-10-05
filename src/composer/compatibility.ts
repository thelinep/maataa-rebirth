import {
  COMPOSITION_COMPATIBILITY_REGISTRY,
  type CompositionCompatibilityRecord,
} from "../registries/compositionCompatibilityRegistry";

export interface CompositionCompatibilityIdentity {
  workspaceTypeId: string;
  pageTypeId: string;
  layoutTypeId: string;
  deviceId?: string;
}

export type CompositionCompatibilityStatus =
  | "verified"
  | "unverified";

export interface CompositionCompatibilityEvaluation {
  status: CompositionCompatibilityStatus;
  match?: CompositionCompatibilityRecord;
  candidateEvidence:
    readonly CompositionCompatibilityRecord[];
}

function structuralMatch(
  record: CompositionCompatibilityRecord,
  identity: CompositionCompatibilityIdentity,
) {
  return (
    record.workspaceTypeId ===
      identity.workspaceTypeId &&
    record.pageTypeId ===
      identity.pageTypeId &&
    record.layoutTypeId ===
      identity.layoutTypeId
  );
}

export function evaluateCompositionCompatibility(
  identity: CompositionCompatibilityIdentity,
): CompositionCompatibilityEvaluation {
  const candidates =
    COMPOSITION_COMPATIBILITY_REGISTRY.filter(
      (record) =>
        structuralMatch(record, identity),
    );

  const match =
    candidates.find(
      (record) =>
        !identity.deviceId ||
        record.deviceIds.length === 0 ||
        record.deviceIds.includes(
          identity.deviceId,
        ),
    );

  if (match) {
    return {
      status: "verified",
      match,
      candidateEvidence: candidates,
    };
  }

  return {
    status: "unverified",
    candidateEvidence: candidates,
  };
}

export function getVerifiedPageIdsForWorkspace(
  workspaceTypeId: string,
): readonly string[] {
  return [
    ...new Set(
      COMPOSITION_COMPATIBILITY_REGISTRY
        .filter(
          (record) =>
            record.workspaceTypeId ===
            workspaceTypeId,
        )
        .map(
          (record) =>
            record.pageTypeId,
        ),
    ),
  ];
}

export function getVerifiedLayoutIdsForComposition(
  workspaceTypeId: string,
  pageTypeId: string,
): readonly string[] {
  return [
    ...new Set(
      COMPOSITION_COMPATIBILITY_REGISTRY
        .filter(
          (record) =>
            record.workspaceTypeId ===
              workspaceTypeId &&
            record.pageTypeId ===
              pageTypeId,
        )
        .map(
          (record) =>
            record.layoutTypeId,
        ),
    ),
  ];
}
