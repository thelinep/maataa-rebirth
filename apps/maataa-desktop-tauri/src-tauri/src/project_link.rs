//! Links a Desktop registry entry to a shared project record
//! (`maataa.project-record/1.0.0`, apps/shared/contracts/project-record.ts).
//!
//! The registry stores only the record's ID and current version — never its
//! content. Versions may only move forward; replaying the same version is an
//! idempotent no-op; an older version is rejected as stale.

pub const RECORD_LINK_SCHEMA: &str = "maataa.project-record/1.0.0";
pub const MAX_RECORD_VERSION: u32 = 200;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum VersionChange {
    Created,
    Advanced,
    Unchanged,
}

/// `prj:` followed by a lowercase 8-4-4-4-12 hexadecimal UUID.
pub fn is_record_id(id: &str) -> bool {
    let Some(uuid) = id.strip_prefix("prj:") else {
        return false;
    };
    let groups: Vec<&str> = uuid.split('-').collect();
    groups.len() == 5
        && groups
            .iter()
            .zip([8usize, 4, 4, 4, 12])
            .all(|(group, len)| {
                group.len() == len
                    && group
                        .bytes()
                        .all(|b| b.is_ascii_digit() || (b'a'..=b'f').contains(&b))
            })
}

pub fn validate_link(
    product: &str,
    entry_id: &str,
    record_id: &str,
    record_version: u32,
    schema: &str,
) -> Result<(), String> {
    if product != "tlps" {
        return Err("Only TLPS can register a shared project record.".into());
    }
    if schema != RECORD_LINK_SCHEMA {
        return Err("Unsupported project record schema.".into());
    }
    if !is_record_id(record_id) || entry_id != record_id {
        return Err("The project record identifier is invalid.".into());
    }
    if record_version == 0 || record_version > MAX_RECORD_VERSION {
        return Err("The project record version is out of range.".into());
    }
    Ok(())
}

pub fn check_version_transition(
    existing: Option<u32>,
    incoming: u32,
) -> Result<VersionChange, String> {
    match existing {
        None => Ok(VersionChange::Created),
        Some(current) if incoming > current => Ok(VersionChange::Advanced),
        Some(current) if incoming == current => Ok(VersionChange::Unchanged),
        Some(current) => Err(format!(
            "A newer version (v{current}) of this project is already registered; v{incoming} was not applied."
        )),
    }
}

/// Bundled entry page for opening one shared project record in a product
/// window. Only the validated record ID and version are added to the URL;
/// never titles or content.
pub fn record_context_entry(
    product: &str,
    record_id: &str,
    record_version: u32,
) -> Result<(String, &'static str), String> {
    if !is_record_id(record_id) {
        return Err("The project record identifier is invalid.".into());
    }
    if record_version == 0 || record_version > MAX_RECORD_VERSION {
        return Err("The project record version is out of range.".into());
    }
    let query = format!("project={record_id}&version={record_version}");
    match product {
        "maataa-ui" => Ok((
            format!("products/maataa-ui/index.html#/brahmini?{query}"),
            "MAATAA UI",
        )),
        "tlps" => Ok((format!("products/tlps/idea-to-script.html?{query}"), "TLPS")),
        _ => Err("This app cannot open a shared project record.".into()),
    }
}

/// A product window may only be opened on the version Desktop has registered.
pub fn check_registered_context(registered: Option<u32>, requested: u32) -> Result<(), String> {
    match registered {
        None => Err("MAATAA Desktop has no shared project with this ID.".into()),
        Some(current) if current == requested => Ok(()),
        Some(current) if current > requested => Err(format!(
            "This project is now at v{current}; v{requested} is out of date. Refresh and open the current version."
        )),
        Some(current) => Err(format!(
            "MAATAA Desktop has v{current} of this project; v{requested} is unknown."
        )),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const ID: &str = "prj:11111111-2222-4333-8444-555555555555";

    #[test]
    fn record_ids_must_be_lowercase_prefixed_uuids() {
        assert!(is_record_id(ID));
        for bad in [
            "tlps:workspace",
            "prj:11111111-2222-4333-8444-55555555555",
            "prj:11111111-2222-4333-8444-55555555555G",
            "PRJ:11111111-2222-4333-8444-555555555555",
            "prj:11111111222243338444555555555555",
            "prj:../../etc",
        ] {
            assert!(!is_record_id(bad), "accepted {bad}");
        }
    }

    #[test]
    fn links_are_tlps_only_schema_pinned_and_bounded() {
        assert!(validate_link("tlps", ID, ID, 1, RECORD_LINK_SCHEMA).is_ok());
        assert!(validate_link("tlp-film", ID, ID, 1, RECORD_LINK_SCHEMA).is_err());
        assert!(validate_link("tlps", "tlps:workspace", ID, 1, RECORD_LINK_SCHEMA).is_err());
        assert!(validate_link("tlps", ID, ID, 0, RECORD_LINK_SCHEMA).is_err());
        assert!(validate_link("tlps", ID, ID, 201, RECORD_LINK_SCHEMA).is_err());
        assert!(validate_link("tlps", ID, ID, 1, "maataa.project-record/2.0.0").is_err());
    }

    #[test]
    fn versions_only_move_forward_and_replay_is_idempotent() {
        assert_eq!(
            check_version_transition(None, 1),
            Ok(VersionChange::Created)
        );
        assert_eq!(
            check_version_transition(Some(1), 2),
            Ok(VersionChange::Advanced)
        );
        assert_eq!(
            check_version_transition(Some(2), 2),
            Ok(VersionChange::Unchanged)
        );
        assert!(check_version_transition(Some(3), 2)
            .unwrap_err()
            .contains("v3"));
    }

    #[test]
    fn record_context_entries_carry_only_validated_id_and_version() {
        assert_eq!(
            record_context_entry("maataa-ui", ID, 2).unwrap(),
            (
                format!("products/maataa-ui/index.html#/brahmini?project={ID}&version=2"),
                "MAATAA UI"
            )
        );
        assert_eq!(
            record_context_entry("tlps", ID, 1).unwrap().0,
            format!("products/tlps/idea-to-script.html?project={ID}&version=1")
        );
        assert!(record_context_entry("tlp-film", ID, 1).is_err());
        assert!(record_context_entry("tlps", "prj:not-a-uuid", 1).is_err());
        assert!(
            record_context_entry("tlps", "prj:11111111-2222-4333-8444-555555555555&x=1", 1)
                .is_err()
        );
        assert!(record_context_entry("tlps", ID, 0).is_err());
        assert!(record_context_entry("tlps", ID, MAX_RECORD_VERSION + 1).is_err());
    }

    #[test]
    fn product_windows_open_only_the_registered_version() {
        assert!(check_registered_context(Some(3), 3).is_ok());
        assert!(check_registered_context(None, 1)
            .unwrap_err()
            .contains("no shared project"));
        assert!(check_registered_context(Some(3), 2)
            .unwrap_err()
            .contains("out of date"));
        assert!(check_registered_context(Some(3), 4)
            .unwrap_err()
            .contains("unknown"));
    }
}
