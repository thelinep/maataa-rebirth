// Panchanga field definitions. These state what each field MEASURES in the
// commonly described astronomical form. Exact boundaries, conventions and
// source editions depend on the tradition, which is not yet selected.
// No values are computed anywhere in this app.

export type PanchangaField = {
  key: string;
  name: string;
  devanagari: string;
  measures: string;
  inputs: string[];
  conventionDependent: string;
};

export const panchangaFields: PanchangaField[] = [
  { key: "tithi", name: "Tithi", devanagari: "तिथि", measures: "Moon–Sun elongation in 12° steps (30 per lunar month)", inputs: ["Sun longitude", "Moon longitude"], conventionDependent: "Which tithi is assigned to a civil day (usually the one at local sunrise)" },
  { key: "paksha", name: "Paksha", devanagari: "पक्ष", measures: "Waxing half (elongation 0°–180°) or waning half (180°–360°)", inputs: ["Sun longitude", "Moon longitude"], conventionDependent: "Day assignment at sunrise" },
  { key: "nakshatra", name: "Nakshatra", devanagari: "नक्षत्र", measures: "Moon's sidereal longitude in 27 divisions of 13°20′", inputs: ["Moon longitude", "ayanamsha"], conventionDependent: "Ayanamsha choice; 27 vs 28 nakshatra schemes" },
  { key: "yoga", name: "Yoga", devanagari: "योग", measures: "Sum of Sun and Moon sidereal longitudes in 27 divisions of 13°20′", inputs: ["Sun longitude", "Moon longitude", "ayanamsha"], conventionDependent: "Ayanamsha choice" },
  { key: "karana", name: "Karana", devanagari: "करण", measures: "Half a tithi (6° of elongation); 60 per lunar month from 11 named karanas", inputs: ["Sun longitude", "Moon longitude"], conventionDependent: "Naming sequence edition" },
  { key: "vara", name: "Vara", devanagari: "वार", measures: "Weekday", inputs: ["civil date", "local sunrise"], conventionDependent: "Day boundary: local sunrise (most traditions) vs midnight" },
  { key: "maasa", name: "Maasa", devanagari: "मास", measures: "Lunar month", inputs: ["new/full moon instants", "solar sign"], conventionDependent: "Amanta vs purnimanta; adhika-maasa rules" },
  { key: "ritu", name: "Ritu", devanagari: "ऋतु", measures: "Season (six per year)", inputs: ["maasa or solar sign"], conventionDependent: "Solar vs lunar mapping" },
  { key: "ayana", name: "Ayana", devanagari: "अयन", measures: "Northward or southward half-year of the Sun", inputs: ["Sun longitude"], conventionDependent: "Tropical solstice vs sidereal Makara Sankranti" },
];

export const panchangaDecisions = [
  { key: "tradition", question: "Which calculation tradition and source edition (e.g. a drik/observational school or a named siddhantic text)?", status: "open" },
  { key: "location", question: "Observer location policy: fixed Kashi (Varanasi) coordinates, or user-selected location?", status: "open" },
  { key: "ayanamsha", question: "Which ayanamsha, with its definition and epoch?", status: "open" },
  { key: "sunrise", question: "Sunrise definition (upper limb or centre; refraction; altitude) and day boundary.", status: "open" },
  { key: "month", question: "Month system: amanta or purnimanta; adhika/kshaya rules.", status: "open" },
  { key: "vectors", question: "Independent reference cases (a published panchang for named dates and place) to test against.", status: "open" },
] as const;

/** Sidereal sign boundaries used by the Sankranti page (0° … 330°). */
export const rashis = [
  ["Mesha", "मेष"], ["Vrishabha", "वृषभ"], ["Mithuna", "मिथुन"], ["Karka", "कर्क"],
  ["Simha", "सिंह"], ["Kanya", "कन्या"], ["Tula", "तुला"], ["Vrishchika", "वृश्चिक"],
  ["Dhanu", "धनु"], ["Makara", "मकर"], ["Kumbha", "कुम्भ"], ["Meena", "मीन"],
].map(([name, devanagari], index) => ({ name, devanagari, startDegrees: index * 30 }));
