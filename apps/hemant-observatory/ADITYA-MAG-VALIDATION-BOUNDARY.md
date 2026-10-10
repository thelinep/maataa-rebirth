# Aditya-L1 MAG validation boundary

**Status: importer decoding has a local sample check; independent scientific validation is still open.** This note records the evidence and blockers without copying the product file or publishing measurements derived from it.

## Evidence found

- A locally supplied PRADAN MAG Level-2 NetCDF-4 product and its MAG user manual are available outside the repository. The existing progress note records the sample identity, file-integrity check, and browser-import observations. The raw file is not checked in.
- The PRADAN FAQ describes MAG Level-2 as averaged data with a minimum ten-second cadence, distinguishes it from Level-1, and defines the binary quality flag semantics. The parser's current preview is consistent with that documented shape of the product.
- The official MAG manual's Level-2 variable table describes `x_gsm` as the **Z coordinate** in the GSM frame. The sample's NetCDF metadata repeats this text. The variable name and description disagree, but repetition is not an independent correction. Keep the warning visible; do not reinterpret this field as X or Z until the instrument team or an authoritative erratum resolves it.
- PRADAN's MAG FAQ says its SPICE area contains Aditya spacecraft clock and ephemeris/attitude kernels, with current daily products and previous-month products. No such kernel, independent expected MAG value series, or tutorial reference output was found in this checkout. A kernel could support a future frame/time reconstruction; its existence alone does not validate MAG field values or this importer.

## What a separate parser would and would not prove

Reading the same NetCDF file with a second library (for example, Python/h5py or the NetCDF reference tools) and comparing timestamps, selected samples, summary statistics, and quality-flag counts against the browser importer would be a useful **parser implementation cross-check**. It would not be an independent scientific value reference: both readers consume the same delivered bytes, calibration, and metadata. It also would not resolve the `x_gsm` semantic conflict, validate the MAG calibration, or qualify the timestamp against a mission clock.

No independent tutorial output for this exact product was available in the checked materials. The public 2026 ISRO–ESA workshop repository lists an Aditya MAG tutorial, but repository landing material alone does not establish that it uses this product, provides expected values, or grants rights to redistribute derived output. It has not been treated as a reference vector.

## Data-use restriction relevant to an enterprise product

PRADAN's official Aditya-L1 disclaimer says the data are supplied for non-profit scientific use, remain ISRO property/copyright, and may not be used for commercial purposes; it defines commercial use to include sale/resale of data and data derived from it. It also says users do not have the right to copy, lease, or loan the satellite data without prior ISRO/DoS permission. Therefore:

- Do not commit the MAG product or sample-derived expected-value fixtures to this repository.
- Do not ship MAG data or MAG-derived numerical outputs as part of a commercial offer on the basis of the current portal terms.
- A local parser test using the user's sample can be run as non-commercial scientific software validation only if that use is consistent with the applicable account/data terms; it is not a commercial-use authorization.
- Before commercial use, obtain written permission/license from ISRO/DoS covering the data and derived values, and record the scope and required acknowledgements.

## Remaining atomic evidence tasks

1. Obtain an explicit data-use permission suitable for the intended commercial product, or keep Aditya-derived outputs outside commercial scope.
2. Ask the MAG instrument team to resolve the `x_gsm` description and state the authoritative variable semantics; preserve the response or published erratum as evidence.
3. For parser conformance only, add a separate-reader comparison that reads the local product at test time and compares its timestamps, selected fields, units, uncertainty values, and quality flags to the browser parser. Keep the product and its derived measurements out of Git; require a local sample path and disclose the data-use condition.
4. For science validation, identify an official/tutorial expected output for the same product and version, or derive a separately documented MAG result through an independent pipeline using appropriate clock, ephemeris, attitude, and frame kernels. Freeze comparison cases and tolerances from the reference's declared precision and uncertainty before asserting a pass.
5. Keep calibration validation, mission time-correlation qualification, and live telemetry as separate gates.

## Primary sources

- [PRADAN Aditya-L1 disclaimer](https://pradan1.issdc.gov.in/al1/disclaimer.xhtml): ownership, allowed non-profit use, restrictions on commercial use and copying.
- [PRADAN Aditya-L1 FAQ, MAGNETOMETER](https://pradan1.issdc.gov.in/al1/faq.xhtml): Level-1 and Level-2 cadence, averaging, format, and official note that SPICE archive products include clock, ephemeris, and attitude kernels.
- [PRADAN Aditya-L1 acknowledgement requirements](https://pradan1.issdc.gov.in/al1/ack.xhtml): required mission/data acknowledgements and ISRO copyright mark for printed data products.
- [ISRO–ESA Heliophysics Workshop schedule](https://events.iist.ac.in/ISRO-ESA/handsonSchedule.php) and [public hands-on materials](https://github.com/ISRO-ESA-Heliophysics-Workshop/hands-on-materials): evidence that a MAG tutorial exists, but not of a matching reference output for this product.
