# Shabdkosh selector catalogue

Preview: http://127.0.0.1:6007/iframe.html?id=selectors-shabdkosh--catalogue&viewMode=story

TLPS route: http://127.0.0.1:4177/#/tlps/selectors (run `pnpm demo:build`, then `pnpm demo:preview --port 4177`). The configured default preview port is 4173; 4177 is the verification-session override. The TLPS site navigation includes Selectors. Storybook also includes Languages, Countries, Space, Production and Talents entry variants.

## Scope and provenance

The catalogue is a local, read-only selector library. It combines the internal Shabdkosh intake, explicit app vocabulary and public reference snapshots. It is not a live Brahmini service, authentication system, translation engine, real-time sky map or satellite tracker. Snapshot date: 2026-10-16.

| Category | Coverage |
| --- | --- |
| Account types | Six app-defined setup categories; no account provisioning or permission assignment. |
| Industry | All 21 broad ISIC Rev.4 sections; chosen revision, not every detailed industry class or a latest-revision claim. |
| Departments | 18 app-defined project departments. |
| Designations | 49 entries: ten internal records plus 39 existing TLPS crew, cast and department-head labels. |
| Services | Five distinct internal service-pricing names. Historical prices are excluded from selectable descriptions. |
| Location | Eight app-defined location-planning labels; no access, availability or permit confirmation. |
| Equipment | Eight app-defined production equipment labels; no inventory or hire status. |
| Transport | Eight app-defined transport-planning labels; no dispatch or booking. |
| Accommodation | Eight app-defined lodging labels; no availability or reservation. |
| Catering | Eight app-defined catering labels; no order or dietary suitability confirmation. |
| Costume | Eight app-defined costume and wardrobe labels. |
| Makeup | Eight app-defined makeup planning labels. |
| Hair | Eight app-defined hair and wig labels. |
| Props | Eight app-defined props-planning labels. |
| VFX | Eight app-defined visual-effects labels. |
| SFX | Eight app-defined special-effects labels. |
| Others | Eight app-defined catch-all production-planning labels. |
| Talents | Sixteen app-defined talent types for production planning. Selection does not represent auditions, engagement, availability or employment decisions. |
| Features | All 26 original feature records, including source duplicates. Names do not establish working capability. |
| Other labels | All remaining 628 internal records. Service name extraction is an additional view; it does not delete original records. |
| Languages | 7,923 entries from the downloaded ISO 639-3 registry, including living, extinct, ancient, historical, constructed and special entries. Selection does not translate the UI. |
| Countries | All 249 ISO 3166-1 country and territory entries in the downloaded registry. They are not 249 sovereign states. India has Bharat/Bhaarat/भारत search aliases. |
| Continents | Seven-continent convention including Australia. Oceania is explicitly a wider-region search alias, not an eighth continent or a country. |
| Galaxies | 39 galaxy-classified Messier entries plus the Milky Way. HEASARC source table last modified 2022. Not all galaxies. |
| Stars | 502 distinct named entries in the WGSN NEC/faint-star CSV snapshots plus the Sun. Unnamed entries excluded. Later naming decisions may be absent. |
| Solar systems | Our Solar System plus 4,847 distinct host systems in the downloaded NASA confirmed-exoplanet snapshot. Other entries are correctly typed as exoplanetary systems. |
| Planets | Eight Solar System planets plus all 6,451 confirmed exoplanet rows in the NASA snapshot. Dwarf planets excluded from this category. |
| Satellites | All 460 rows in the JPL planetary/Pluto discovery table plus Earth’s Moon; eight selected ISRO Earth-satellite missions. Natural and artificial types remain separate. Not a complete global spacecraft or small-body moon registry. Pluto’s satellite parent is explicitly a dwarf planet. |

The 28 categories contain 21,363 selectable entries, including additional views and source duplicates; this is not a count of unique real-world entities. The thirteen Production & crew groups are app-defined planning vocabularies, not booking, dispatch, purchasing, safety or availability integrations. Talents is an illustrative type list, not a complete talent registry or audition/engagement system. Reference-group counts and downloaded source-byte SHA-256 hashes are in `catalogue/manifest.json`; app/internal group counts are computed by `catalogueModel.ts`. Manually curated NASA/ISRO additions have linked references rather than downloaded-byte hashes. All 664 original `label_rows.csv` IDs remain in their original internal views (Designations, Features, Other labels). The internal source is unreviewed historical MOM/Piccolo intake. No credentials or old Supabase application code are used. The separate translation CSV is not merged: its IDs do not establish an unambiguous join.

## Source references

- Internal: `label_rows.csv`, internal MOM intake; hash in `shabdkosh.snapshot.json`.
- Countries: [Debian iso-codes ISO 3166-1 JSON](https://salsa.debian.org/iso-codes-team/iso-codes/-/raw/main/data/iso_3166-1.json).
- Languages: [Debian iso-codes ISO 639-3 JSON](https://salsa.debian.org/iso-codes-team/iso-codes/-/raw/main/data/iso_639-3.json). Direct SIL table retrieval returned HTTP 403; the upstream registry mirror was used. Redistribution license is retained in `catalogue/licenses/LGPL-2.1-or-later.txt`; upstream source URLs and transformed import script are provided.
- Industry: [UN ISIC Rev.4](https://unstats.un.org/unsd/classifications/Family/Detail/27).
- Stars: [IAU WGSN catalogue page](https://exopla.net/iau-wgsn-catalogs/), specifically named entries in NEC.csv and wgsnFaints.csv, linked in the manifest. Source filenames dated 2025 do not establish current completeness of IAU names.
- Planets/systems: [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/), PSCompPars table query retained in the manifest.
- Natural satellites: [JPL satellite discovery table](https://ssd.jpl.nasa.gov/sats/discovery.html).
- Galaxies: [NASA HEASARC Messier catalogue](https://heasarc.gsfc.nasa.gov/W3Browse/general-catalog/messier.html), galaxy types S/E/E?/IR. The uncertain E? classification is retained.
- Solar System/Sun/Moon: [NASA Solar System](https://science.nasa.gov/solar-system/solar-system-facts/).
- Artificial satellite selection: eight names verified against [ISRO Spacecraft Missions](https://www.isro.gov.in/SpacecraftMissions.html). No operational status is imported or promised.

## Reproduction

From repository root:

```sh
python3 scripts/fetch-selector-reference-data.py /private/tmp/shabdkosh-reference-refresh
python3 scripts/import-selector-reference-data.py /private/tmp/shabdkosh-reference-refresh
python3 scripts/import-shabdkosh-selectors.py /path/to/internal/label_rows.csv
```

The public importer currently records the snapshot date above. Change it deliberately for a new reviewed snapshot. Upstream tables can change; inspect count/hash/diff changes before shipping an update. The JPL count assertion intentionally requires review if that source grows. Fetching does not run downloaded code. The eight manually curated ISRO entries and seven-continent convention are explicit in the importer/model.

## Behavior and design

All 28 categories are populated. Desktop uses a category sidebar; mobile uses a native category selector. Large reference lists load on demand in separate chunks and render 30 rows per page. Search matches names, codes, aliases, descriptions and parent IDs, ignores Latin diacritics, and ranks exact names/codes/aliases first. A type filter separates Solar System planets/exoplanets and natural/artificial satellites. System details can filter orbiting planets; Solar System planet details can filter their satellites. Clearing a relationship restores the category list.

Selection stays a draft until Use selected label. Cancel/Escape preserve the confirmed label; focus returns through the existing MAATAA Modal behavior. Selection is component-local and does not grant access, purchase services or mutate the upstream catalogue. Loading, retry and empty-filter states are provided.

Rows retain label, description, catalogue icon, image thumbnail with visible kind caption, and expandable provenance. Imported source image paths remain unverified legacy references and are not requested from the browser. Country flags, NASA visuals and talent references are sourced separately from the unchanged label snapshots. A visible Category artwork or Category reference caption distinguishes shared imagery from an exact-entry visual. Missing original descriptions remain marked. Catalogue icons extend the incumbent 24px stroke grid (rendered with a 1.8px stroke) with language, flag, continent, galaxy, star, orbit, planet, satellite, work and production-planning symbols; camera/audio/cast designations get related glyphs and talent labels receive role-specific actor, voice, music, dance, presenter, fashion, puppetry, athlete and creator symbols. This is an ordinary extension of the existing MAATAA modal system; design tokens and global theme preferences are preserved. CSS uses a selector-specific `:has(.shabd-browser)` scope to widen this modal without affecting others.

## Verification

Targeted catalogue tests cover every populated category/count, original-ID preservation, source attribution, ISO codes/aliases, astronomical parent relationships, natural/artificial separation, galaxy-only filtering and unavailable-image/historical-price boundaries. TLPS TypeScript checks and the Storybook/demo builds are required. Browser checks exercise selection/cancel, category/type/search/paging, relationships and mobile overflow; see current task evidence for observed results.

## Related images and icons

- All 249 country/territory rows use their ISO-alpha-2 flag from flag-icons v7.3.2; the MIT license is retained in `assets/FLAG-ICONS-LICENSE.txt`.
- Thirteen original NASA-hosted images cover eight Solar System planets, Sun, Moon, galaxies, Solar System and a Hubble spacecraft reference. The eight planets, Sun, Moon and our Solar System get exact-entry visuals; other astronomical rows use explicitly labelled category references. The Hubble image is a reference for artificial satellites, not a photograph of each ISRO spacecraft.
- Talents uses nine locally bundled Wikimedia Commons photographs matched by role (stage performance, singer, fashion runway, conference presenter, voice-over booth, music production, puppetry, athlete and bicycle stunt). Every image is captioned as a category reference, credits its photographer, links its Commons source, and exposes the applicable license; no image identifies the selected person or implies availability, engagement or endorsement. Files and SHA-256 hashes are recorded in `assets/talent-photo-provenance.json`.
- Work categories reuse six existing MAATAA Arcade Quest illustrations with their original prompt sidecars. Language rows use a MAATAA-authored SVG category graphic, not a claimed language-specific script sample. These are labelled Category artwork.
- `catalogueMedia.ts` resolves media independently of the unmodified source snapshot `image` field. Flag and NASA source-byte hashes, NASA final embedded-file hashes, URLs and credits are in `assets/media-provenance.json`. NASA image files embed their source origin; flag source files and license remain local. All runtime thumbnails are bundled local assets; no third-party image request is needed to browse.
- `python3 scripts/fetch-selector-media.py` restores the pinned flags and source NASA bytes with hash checks; it runs no downloaded code. It retains metadata with the available Impeccable embed utility or a source sidecar. Reused MAATAA artwork and the authored SVG already reside in the repository.
- `CatalogueThumbnail` uses lazy image loading and an explicit category fallback, then an unavailable state if both images fail. The expanded Image credit, license and source links follow the media actually displayed: a fallback replaces the original attribution, and complete failure removes the image-source links. Thumbnails and icons remain present at 320px; category thumbnails are visibly labelled.

Media validation adds six tests to the nine catalogue tests (15 total): all-group coverage, all-country flag mapping, exact Solar System planet mappings, prevention of generic Sun/Moon references being presented as exact Sirius/Phobos images, fallback-credit replacement, and removal of image attribution after complete image failure. The current task verification records all 15 passing, plus TLPS typecheck and Storybook/demo builds; browser observations are recorded separately in the media review evidence.
