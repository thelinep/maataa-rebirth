//! Bounded, provenance-labelled spacecraft-clock correlation primitives.
//!
//! This module implements the arithmetic for a NAIF/SPICE Type 1 piecewise
//! linear correlation. It is deliberately not a general SPICE kernel reader:
//! callers must provide a provenance-identified, integrity-checked mission kernel's decoded
//! coefficients, coverage, partition and scale. Out-of-coverage times fail
//! closed. The included Mars 2020 profile is archival and covers only the
//! first two published coefficient intervals; it is a demonstration, never flight
//! software or an operational clock product.

const RATE_SCALE: i128 = 10_000_000_000_000;
const NANOS_PER_SECOND: i128 = 1_000_000_000;
const M2020_TICKS_PER_SECOND: u64 = 65_536;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SclkError {
    InvalidClockString,
    ClockFieldOutOfRange,
    InvalidCorrelation,
    OutsideCorrelationCoverage,
    ArithmeticOverflow,
}

impl std::fmt::Display for SclkError {
    fn fmt(&self, formatter: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let message = match self {
            Self::InvalidClockString => "invalid Mars 2020 SCLK format",
            Self::ClockFieldOutOfRange => "Mars 2020 SCLK field is outside its encoded range",
            Self::InvalidCorrelation => "SCLK correlation table is invalid",
            Self::OutsideCorrelationCoverage => {
                "SCLK is outside the embedded archival correlation interval"
            }
            Self::ArithmeticOverflow => "SCLK correlation arithmetic overflowed",
        };
        formatter.write_str(message)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ParallelTimeScale {
    Tdt,
    Tdb,
}

impl ParallelTimeScale {
    pub const fn id(self) -> &'static str {
        match self {
            Self::Tdt => "TDT",
            Self::Tdb => "TDB",
        }
    }
}

/// Parsed count for the Mars 2020 `SSSSSSSSSS-FFFFF` clock format.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Mars2020Sclk {
    pub seconds: u32,
    pub fraction: u16,
    pub encoded_ticks: u64,
}

pub fn parse_mars2020_sclk(input: &str) -> Result<Mars2020Sclk, SclkError> {
    let Some((seconds, fraction)) = input.split_once('-') else {
        return Err(SclkError::InvalidClockString);
    };
    if seconds.len() != 10
        || fraction.len() != 5
        || !seconds.bytes().all(|b| b.is_ascii_digit())
        || !fraction.bytes().all(|b| b.is_ascii_digit())
    {
        return Err(SclkError::InvalidClockString);
    }
    let seconds = seconds
        .parse::<u32>()
        .map_err(|_| SclkError::ClockFieldOutOfRange)?;
    let fraction = fraction
        .parse::<u16>()
        .map_err(|_| SclkError::ClockFieldOutOfRange)?;
    let encoded_ticks = u64::from(seconds)
        .checked_mul(M2020_TICKS_PER_SECOND)
        .and_then(|whole| whole.checked_add(u64::from(fraction)))
        .ok_or(SclkError::ArithmeticOverflow)?;
    Ok(Mars2020Sclk {
        seconds,
        fraction,
        encoded_ticks,
    })
}

/// One decoded NAIF Type 1 coefficient row. `rate_scaled` is the rate in
/// seconds per most-significant SCLK field, scaled by 10^13. The target
/// anchor is integer nanoseconds past the selected target epoch.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Type1Coefficient {
    pub sclk_ticks: u64,
    pub parallel_nanos: i128,
    pub rate_scaled: i128,
}

/// A caller-supplied, versioned Type 1 correlation table.
#[derive(Debug, Clone, Copy)]
pub struct Type1Correlation<'a> {
    pub ticks_per_most_significant_field: u64,
    pub coverage_start_ticks: u64,
    /// Exclusive upper bound, following the next coefficient row.
    pub coverage_stop_ticks: u64,
    pub scale: ParallelTimeScale,
    pub coefficients: &'a [Type1Coefficient],
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct CorrelatedTime {
    pub parallel_nanos_past_j2000: i128,
    pub scale: ParallelTimeScale,
    pub coefficient_index: usize,
}

pub fn correlate_type1(
    encoded_ticks: u64,
    table: &Type1Correlation<'_>,
) -> Result<CorrelatedTime, SclkError> {
    if table.ticks_per_most_significant_field == 0
        || table.coverage_start_ticks >= table.coverage_stop_ticks
        || table.coefficients.is_empty()
        || table.coefficients.len() > 100_000
        || table.coefficients[0].sclk_ticks > table.coverage_start_ticks
    {
        return Err(SclkError::InvalidCorrelation);
    }
    if encoded_ticks < table.coverage_start_ticks || encoded_ticks >= table.coverage_stop_ticks {
        return Err(SclkError::OutsideCorrelationCoverage);
    }
    let mut previous = None;
    for row in table.coefficients {
        if row.rate_scaled <= 0
            || row.sclk_ticks > table.coverage_stop_ticks
            || previous.is_some_and(|p| row.sclk_ticks <= p)
        {
            return Err(SclkError::InvalidCorrelation);
        }
        previous = Some(row.sclk_ticks);
    }
    let (index, row) = table
        .coefficients
        .iter()
        .enumerate()
        .rev()
        .find(|(_, row)| row.sclk_ticks <= encoded_ticks)
        .ok_or(SclkError::OutsideCorrelationCoverage)?;
    let delta_ticks = i128::from(encoded_ticks - row.sclk_ticks);
    let denominator = i128::from(table.ticks_per_most_significant_field)
        .checked_mul(RATE_SCALE)
        .ok_or(SclkError::ArithmeticOverflow)?;
    let numerator = delta_ticks
        .checked_mul(row.rate_scaled)
        .and_then(|v| v.checked_mul(NANOS_PER_SECOND))
        .ok_or(SclkError::ArithmeticOverflow)?;
    let rounded_numerator = numerator
        .checked_add(denominator / 2)
        .ok_or(SclkError::ArithmeticOverflow)?;
    let delta_nanos = rounded_numerator / denominator;
    let parallel_nanos_past_j2000 = row
        .parallel_nanos
        .checked_add(delta_nanos)
        .ok_or(SclkError::ArithmeticOverflow)?;
    Ok(CorrelatedTime {
        parallel_nanos_past_j2000,
        scale: table.scale,
        coefficient_index: index,
    })
}

/// Demonstration subset from NAIF M2020 SCLK refit V19, only its first two
/// coefficient intervals [0, 1.8614849830912e13) ticks. The full kernel is
/// required outside that interval. The archive labels this product as an
/// archival refit not used during operations.
pub const M2020_V19_FIRST_INTERVAL: [Type1Coefficient; 3] = [
    Type1Coefficient {
        sclk_ticks: 0,
        parallel_nanos: 0,
        rate_scaled: RATE_SCALE,
    },
    Type1Coefficient {
        sclk_ticks: 12_408_957_566_976,
        parallel_nanos: 189_345_666_000_000_000,
        rate_scaled: RATE_SCALE,
    },
    Type1Coefficient {
        sclk_ticks: 18_614_849_830_912,
        parallel_nanos: 284_040_067_000_000_000,
        rate_scaled: RATE_SCALE,
    },
];

pub const M2020_V19_FIRST_INTERVAL_TABLE: Type1Correlation<'static> = Type1Correlation {
    ticks_per_most_significant_field: 65_536,
    coverage_start_ticks: 0,
    coverage_stop_ticks: 18_614_849_830_912,
    scale: ParallelTimeScale::Tdt,
    coefficients: &M2020_V19_FIRST_INTERVAL,
};

/// Machine-readable result shared by the native shell and Wasm boundary.
pub fn mars2020_v19_demo_json(input: &str) -> Result<String, SclkError> {
    let parsed = parse_mars2020_sclk(input)?;
    let converted = correlate_type1(parsed.encoded_ticks, &M2020_V19_FIRST_INTERVAL_TABLE)?;
    let reference_utc = if parsed.seconds == 189_345_666 && parsed.fraction == 0 {
        crate::json::Json::s("2006-001T00:00:00.816Z")
    } else {
        crate::json::Json::Null
    };
    Ok(crate::json::Json::Obj(vec![
        ("schema", crate::json::Json::s("hemant.spacecraft-clock/1")),
        ("mission", crate::json::Json::s("Mars 2020")),
        ("spacecraft_id", crate::json::Json::Int(-168)),
        (
            "sclk_seconds",
            crate::json::Json::Int(i128::from(parsed.seconds)),
        ),
        (
            "sclk_fraction",
            crate::json::Json::Int(i128::from(parsed.fraction)),
        ),
        (
            "encoded_ticks",
            crate::json::Json::s(parsed.encoded_ticks.to_string()),
        ),
        ("parallel_scale", crate::json::Json::s(converted.scale.id())),
        (
            "tdt_nanoseconds_past_j2000",
            crate::json::Json::s(converted.parallel_nanos_past_j2000.to_string()),
        ),
        ("reference_utc_from_source_sclk_scet", reference_utc),
        (
            "kernel",
            crate::json::Json::s(
                "m2020_168_sclkscet_refit_v19.tsc (archival refit; not used during operations)",
            ),
        ),
        (
            "verification",
            crate::json::Json::s("unverified-reference-demonstration"),
        ),
        (
            "limitations",
            crate::json::Json::strs(&[
                "embedded first two coefficient intervals only",
                "UTC/TDB conversion not performed",
                "not flight-qualified",
            ]),
        ),
    ])
    .render())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_documented_mars2020_format_and_exact_tick_count() {
        let parsed = parse_mars2020_sclk("0189345666-00000").unwrap();
        assert_eq!(parsed.seconds, 189_345_666);
        assert_eq!(parsed.fraction, 0);
        assert_eq!(parsed.encoded_ticks, 12_408_957_566_976);
    }

    #[test]
    fn rejects_wrong_format_and_fraction_range() {
        for bad in [
            "1/0690471234.12345",
            "189345666-00000",
            "0189345666-65536",
            "018934566x-00000",
        ] {
            assert!(parse_mars2020_sclk(bad).is_err(), "accepted {bad}");
        }
    }

    #[test]
    fn published_mars2020_v19_anchor_correlates_to_tdt_j2000() {
        let parsed = parse_mars2020_sclk("0189345666-00000").unwrap();
        let converted =
            correlate_type1(parsed.encoded_ticks, &M2020_V19_FIRST_INTERVAL_TABLE).unwrap();
        assert_eq!(converted.scale, ParallelTimeScale::Tdt);
        assert_eq!(converted.parallel_nanos_past_j2000, 189_345_666_000_000_000);
        assert_eq!(converted.coefficient_index, 1);
    }

    #[test]
    fn interpolates_only_within_the_selected_piecewise_segment() {
        let one_second = correlate_type1(65_536, &M2020_V19_FIRST_INTERVAL_TABLE).unwrap();
        assert_eq!(one_second.parallel_nanos_past_j2000, 1_000_000_000);
        assert_eq!(
            correlate_type1(18_614_849_830_912, &M2020_V19_FIRST_INTERVAL_TABLE),
            Err(SclkError::OutsideCorrelationCoverage)
        );
    }

    #[test]
    fn rejects_malformed_tables_and_overflow() {
        let empty = Type1Correlation {
            coefficients: &[],
            ..M2020_V19_FIRST_INTERVAL_TABLE
        };
        assert_eq!(
            correlate_type1(0, &empty),
            Err(SclkError::InvalidCorrelation)
        );
        let huge = [Type1Coefficient {
            sclk_ticks: 0,
            parallel_nanos: i128::MAX,
            rate_scaled: RATE_SCALE,
        }];
        let table = Type1Correlation {
            coverage_stop_ticks: u64::MAX,
            coefficients: &huge,
            ..M2020_V19_FIRST_INTERVAL_TABLE
        };
        assert_eq!(
            correlate_type1(u64::MAX - 1, &table),
            Err(SclkError::ArithmeticOverflow)
        );
        let unsorted = [
            Type1Coefficient {
                sclk_ticks: 0,
                parallel_nanos: 0,
                rate_scaled: RATE_SCALE,
            },
            Type1Coefficient {
                sclk_ticks: 2,
                parallel_nanos: 0,
                rate_scaled: RATE_SCALE,
            },
            Type1Coefficient {
                sclk_ticks: 1,
                parallel_nanos: 0,
                rate_scaled: RATE_SCALE,
            },
        ];
        let malformed = Type1Correlation {
            coverage_stop_ticks: 10,
            coefficients: &unsorted,
            ..M2020_V19_FIRST_INTERVAL_TABLE
        };
        assert_eq!(
            correlate_type1(0, &malformed),
            Err(SclkError::InvalidCorrelation)
        );
    }
}
