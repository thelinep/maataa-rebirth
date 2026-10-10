use hemant_core::{
    find_method, format_unix_utc, registry_json, time_result_json, units_convention,
    ClockReadError, ElapsedUnits, WallClockSnapshot, ASTRONOMY_METHOD_ID, CIVIL_METHOD_ID,
    EPOCH_METHOD_ID, HEMANT_EPOCH_LOCAL_DESCRIPTION, MAX_SUPPORTED_UNIX_NANOS,
    MIN_SUPPORTED_UNIX_NANOS, PANCHANGA_METHOD_ID, UNITS_METHOD_ID,
};
use std::env;
use std::process::ExitCode;

fn main() -> ExitCode {
    match run(env::args().skip(1).collect()) {
        Ok(output) => {
            println!("{output}");
            ExitCode::SUCCESS
        }
        Err(error) => {
            eprintln!("error: {error}");
            ExitCode::FAILURE
        }
    }
}

#[derive(Debug, PartialEq, Eq)]
enum Mode {
    Help,
    Text,
    Json,
    Methods,
    Mars2020Sclk,
}

fn parse(args: &[String]) -> Result<(Mode, Option<i128>, Option<String>), String> {
    let mut supplied = None;
    let mut sclk = None;
    let mut mode = Mode::Text;
    let mut i = 0;
    while i < args.len() {
        match args[i].as_str() {
            "--help" | "-h" => return Ok((Mode::Help, None, None)),
            "--json" => mode = Mode::Json,
            "--methods-json" => mode = Mode::Methods,
            "--mars2020-sclk" => {
                if sclk.is_some() {
                    return Err("--mars2020-sclk may be given only once".into());
                }
                i += 1;
                sclk = Some(
                    args.get(i)
                        .ok_or("--mars2020-sclk requires a clock string")?
                        .clone(),
                );
                mode = Mode::Mars2020Sclk;
            }
            "--unix-nanos" => {
                if supplied.is_some() {
                    return Err("--unix-nanos may be given only once".into());
                }
                i += 1;
                let value = args
                    .get(i)
                    .ok_or("--unix-nanos requires a signed integer")?;
                supplied = Some(
                    value
                        .parse::<i128>()
                        .map_err(|_| "--unix-nanos must be a signed integer")?,
                );
            }
            unknown => return Err(format!("unknown argument `{unknown}`; use --help")),
        }
        i += 1;
    }
    if mode == Mode::Methods && supplied.is_some() {
        return Err("--methods-json does not take a time value".into());
    }
    if sclk.is_some()
        && (supplied.is_some()
            || args
                .iter()
                .any(|arg| arg == "--json" || arg == "--methods-json"))
    {
        return Err("--mars2020-sclk cannot be combined with another output mode".into());
    }
    Ok((mode, supplied, sclk))
}

fn run(args: Vec<String>) -> Result<String, String> {
    let (mode, supplied, sclk) = parse(&args)?;
    if mode == Mode::Help {
        return Ok(help());
    }
    if mode == Mode::Methods {
        return Ok(registry_json());
    }
    if mode == Mode::Mars2020Sclk {
        return hemant_core::sclk::mars2020_v19_demo_json(
            sclk.as_deref().ok_or("missing Mars 2020 SCLK")?,
        )
        .map_err(|error| format!("Mars 2020 SCLK conversion failed: {error}"));
    }
    let snapshot = match supplied {
        Some(value) => WallClockSnapshot::from_supplied_unix_nanos(value),
        None => WallClockSnapshot::from_host_clock(),
    }
    .map_err(describe)?;
    if mode == Mode::Json {
        return time_result_json(&snapshot).map_err(describe);
    }
    text(&snapshot).map_err(describe)
}

fn describe(error: ClockReadError) -> String {
    match error {
        ClockReadError::BeforeUnixEpoch => "host clock is before the Unix epoch".into(),
        ClockReadError::OutOfRange => format!(
            "time value is outside the supported range {MIN_SUPPORTED_UNIX_NANOS}..={MAX_SUPPORTED_UNIX_NANOS} (0001-01-01 to 9999-12-31 UTC)"
        ),
    }
}

fn text(snapshot: &WallClockSnapshot) -> Result<String, ClockReadError> {
    let utc = format_unix_utc(snapshot.unix_nanos)?;
    let units = ElapsedUnits::try_from_unix_nanos(snapshot.unix_nanos)?;
    let pending = |id: &'static str| find_method(id).map_or(id, |m| m.title);
    Ok([
        "HEMANT SAMWAT OBSERVATORY · TIME SHELL".to_string(),
        format!("UTC representation : {utc}  [{CIVIL_METHOD_ID}]"),
        format!("Time scale         : {}", snapshot.scale.label()),
        format!("Clock source       : {}", snapshot.source.label()),
        format!("Verification       : {}", snapshot.verification.label()),
        format!("Uncertainty        : {} (not zero)", snapshot.uncertainty.label()),
        format!("Epoch reference    : {HEMANT_EPOCH_LOCAL_DESCRIPTION}  [{EPOCH_METHOD_ID}]"),
        format!("Units convention   : {}  [{UNITS_METHOD_ID}]", units_convention()),
        format!(
            "Elapsed            : {} ahoratra, {} muhurta, {} kala, {} kastha, {} nimesha (Unix difference; leap seconds not counted)",
            units.signed_ahoratra, units.muhurta, units.kala, units.kastha, units.nimesha
        ),
        format!("Residual           : {} ns below the next whole nimesha", units.residual_nanoseconds),
        format!("Pending            : {}; {}", pending(ASTRONOMY_METHOD_ID), pending(PANCHANGA_METHOD_ID)),
        String::new(),
        "LIMIT: host-time conversion under a named traditional-units convention.".into(),
        "Not a verified clock, Panchanga, ephemeris, or spacecraft-navigation result.".into(),
    ]
    .join("\n"))
}

fn help() -> String {
    "Hemant Samwat Observatory time shell\n\nUSAGE:\n  hemant-shell [--unix-nanos <signed-integer>] [--json]\n  hemant-shell --methods-json\n  hemant-shell --mars2020-sclk <SSSSSSSSSS-FFFFF>\n\nWithout --unix-nanos, reads the host wall clock and labels it unverified.\n--json prints hemant.time-result/2; --methods-json prints hemant.method-registry/1.\n--mars2020-sclk returns a bounded archival TDT demonstration, not a flight conversion.\nSupported range: 0001-01-01 to 9999-12-31 UTC (Unix nanoseconds; leap seconds not counted).".into()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn args(list: &[&str]) -> Vec<String> {
        list.iter().map(|s| s.to_string()).collect()
    }

    #[test]
    fn help_is_available_without_reading_the_clock() {
        let output = run(args(&["--help"])).unwrap();
        assert!(output.contains("--methods-json"));
        assert!(output.contains("--mars2020-sclk"));
    }

    #[test]
    fn supplied_epoch_json_is_unverified_caller_input() {
        let out = run(args(&["--unix-nanos", "285148740000000000", "--json"])).unwrap();
        assert!(out.contains("\"source\":\"caller-supplied-unix-nanoseconds\""));
        assert!(out.contains("\"verification\":\"unverified\""));
        assert!(out.contains("\"ahoratra\":0"));
    }

    #[test]
    fn methods_json_is_the_registry() {
        assert!(run(args(&["--methods-json"]))
            .unwrap()
            .starts_with("{\"schema\":\"hemant.method-registry/1\""));
        assert!(run(args(&["--methods-json", "--unix-nanos", "1"])).is_err());
    }

    #[test]
    fn spacecraft_clock_cli_uses_the_shared_rust_result_contract() {
        let output = run(args(&["--mars2020-sclk", "0189345666-00000"])).unwrap();
        assert!(output.contains("\"parallel_scale\":\"TDT\""));
        assert!(output.contains("\"tdt_nanoseconds_past_j2000\":\"189345666000000000\""));
        assert!(run(args(&["--mars2020-sclk", "1/0690471234.12345"])).is_err());
        assert!(run(args(&["--mars2020-sclk", "0189345666-00000", "--json"])).is_err());
    }

    #[test]
    fn invalid_arguments_fail_closed() {
        for bad in [
            vec!["--unix-nanos"],
            vec!["--unix-nanos", "abc"],
            vec!["--unix-nanos", "1", "--unix-nanos", "2"],
            vec!["--unix-nanos", "999999999999999999999999999999"],
            vec!["--shell", "rm"],
        ] {
            assert!(run(args(&bad)).is_err(), "accepted {bad:?}");
        }
    }

    #[test]
    fn text_output_names_methods_and_limits() {
        let out = run(args(&["--unix-nanos", "0"])).unwrap();
        assert!(out.contains("1970-01-01 00:00:00.000000000 UTC"));
        assert!(out.contains("leap seconds not counted"));
        assert!(out.contains("Panchanga ruleset"));
    }
}
