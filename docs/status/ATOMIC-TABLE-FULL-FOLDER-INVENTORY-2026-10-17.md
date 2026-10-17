# Atomic Table archive: full folder inventory

Prepared 2026-10-17 from the supplied `MAATAA_Atomic_Table_Mobile_Extraction (1).zip`. The archive contains 19 files (5,343,379 compressed bytes; 5,470,812 bytes uncompressed). SHA-256 values below are for each file's uncompressed contents. No files were extracted to the app, installed, or executed.

## Folder map

The supplied archive is located at `~/Downloads/MAATAA_Atomic_Table_Mobile_Extraction (1).zip`; its filesystem parent is `~/Downloads/`. The archive's top-level (root) folder is `atomic-table-mobile-extraction/`. This inventory covers that root and all of its child folders. The report itself is saved at `~/Downloads/maataa-ui-full-alpha7/docs/status/`.

```text
atomic-table-mobile-extraction/
├── README.md
├── ASSET_MANIFEST.md
├── TYPE_CATALOG.md
├── dataframes.json
├── index.html
├── package.json
├── tsconfig.json
├── public/
│   ├── asset-note.txt
│   └── icons.svg
├── reference-images/
│   ├── board-1.png
│   └── board-2.png
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── style.css
│   ├── types.ts
│   ├── components/AtomicScene.tsx
│   └── data/
│       ├── board-transcription.ts
│       └── periodic-elements.json
└── tests/reconstruction.test.mjs
```

## Every file

| File | Bytes | What it is for | SHA-256 |
|---|---:|---|---|
| `README.md` | 2,906 | Explains the prototype, how it is intended to run, its eight screen concepts, and the boundary between reconstructed demo data and verified science. | `ab97b237f810fc0b952de2e174f21f81ea89920f29e7de5dec7591de0cc5447c` |
| `ASSET_MANIFEST.md` | 2,361 | Lists the two reference boards and describes which UI pieces, icons and 3D geometry were reconstructed. | `195944827924f942c7184f20273e0a97b9d0756c5bcd919032a109a3adf39a59` |
| `TYPE_CATALOG.md` | 2,159 | Index of the TypeScript data types for screens, scientific records, evidence and people. | `8bebc02ef98e74453c76d894b74c8d351eba52da4bbd949670b0a20468736438` |
| `dataframes.json` | 4,194 | Lists data fields shown by each screen and screenshot-transcribed sample rows, with a notice that those examples are not authoritative scientific facts. | `984b20676b3efc6498481cc954d164bfd6c98208bb5494cae21f93d24d21f190` |
| `index.html` | 335 | Browser entry page; mounts the app and sets its title and mobile viewport. | `007446c7ee970090a658aaec3d57168d095f6758fb9aed05153aa949a8d590c4` |
| `package.json` | 490 | Names the prototype and lists React, Vite, TypeScript and Three.js dependencies plus local run/build/test commands. Dependency versions use `latest`; no lockfile is included. | `0baa0a64dd1143295a780ee0c986fa39ec89102597ebb5b27168c59fa4941f5d` |
| `tsconfig.json` | 361 | TypeScript compiler settings for the app. | `0872ee3496196a8f85a6659c37d94d160fdff89fc6dd9f76006824cc3f4c437b` |
| `public/asset-note.txt` | 132 | Says the 3D geometry is generated in code and the boards did not provide original extractable assets. | `f81aaad368255e10f5d486ae24c98674c80bd2d5358d21f84cc96b8a3cffb37d` |
| `public/icons.svg` | 2,852 | A newly made SVG symbol sheet for atom, chemistry, history, people and settings icons. | `97ac9a7ab776f3e4ff84343f25e0d27edf89e4496a9c5e77a9982bf2e87982a7` |
| `reference-images/board-1.png` | 2,693,557 | First supplied design board, 1536 × 1024 pixels. It is a visual reference image, not source code or layered design data. | `d7463057c3720b257586df420f934630cdb0dba5c293f33e7b2ef98888ffdd8a` |
| `reference-images/board-2.png` | 2,616,937 | Second supplied design board, 1536 × 1024 pixels. It is a visual reference image, not source code or layered design data. | `be4f3fb279c0f1ec3231be4070ea67e282367d104caa1653fabb25e55036e852` |
| `src/App.tsx` | 12,808 | Main reconstructed screen UI and navigation for Explore, 3D Atom, Atoms & Compounds, Scientific Helper, All Labs, Evidence & History, People & Roles, and Profile & Settings. | `754fbabf94b4cda463102bad6af541cd0922f641a13fa3ceea1a3fc1b513a11e` |
| `src/main.tsx` | 210 | Starts the React app and attaches it to the page. | `698be53ce307f6be02c197ffa5e30216ff03ca73708cb37b38890fa6b783cbcb` |
| `src/style.css` | 10,633 | Visual styling for the mobile app prototype. | `6a4b1d61c7f9f008161aba2c4d5f90b71606bc685b9535176a9ed0d60fdecbce` |
| `src/types.ts` | 10,871 | Reconstructed TypeScript shapes for scientific records, sources, evidence, people and screen state. These are prototype contracts, not types recovered from the images. | `d4ed0a3b52b94d7b79a981fd3a6abc1bc2ca50a5391dd4552632e921388a484b` |
| `src/components/AtomicScene.tsx` | 3,885 | Builds the interactive-looking atom scene from generated Three.js shapes; it is a visual model, not a measured scientific simulation. | `07e4df9dd500d859801da2120b2d68280bd352782d12fd37112d8238e83ecb27` |
| `src/data/board-transcription.ts` | 5,583 | Stores text and example data transcribed from the two boards, including stated uncertainties and differences. | `5cfebe83ee8321da9b7e38c7002f74f3cf87d32811d01ac19ee4ab3b7ecb6378` |
| `src/data/periodic-elements.json` | 97,056 | Contains 118 element identities and table positions. It cites IUPAC for core identities; Hindi labels are flagged for language review and many detailed chemical properties are absent. | `df010be5f6e53d97b8792bb449be6f3f1a2475dfe28095a8df7c41ec28381daa` |
| `tests/reconstruction.test.mjs` | 3,482 | Automated checks for the reconstruction and its data. They were not run for this inventory. | `e159c6a4430f4ee380841384e65b88eedced6e870a789f658aea5d17c9c5d1e2` |

## Plain-language assessment

This folder is a **demo made by rebuilding what the two pictures appear to show**. It is not the original app source recovered from those pictures. It has an interface, example data, one periodic-table identity list, a generated 3D illustration, reconstructed icons, documentation and a test file.

The folder itself warns that screenshot examples—including compounds, crystal details, reactions, sample people and history—need checking against trustworthy sources before real use. The 118 element names are the most complete supplied dataset, but their localized labels still need review and the file does not provide all scientific properties. The scene does not calculate or simulate atomic behavior.

## Practical readiness

- **Useful now:** screen concept, visual reference, navigation sketch, initial data-field proposal and element identity list.
- **Needs work before a repeatable build:** choose and pin dependency versions, add a lockfile, then install and run the checks in an isolated project copy.
- **Needs review before production:** product ownership/routing, accessibility and localization, asset rights, data source citations, scientific validation, and persistence/security design.
- **Not demonstrated by this archive:** deployed app status, live database, verified chemistry data beyond the identity claims recorded in the file, a scientific solver, access control, or production readiness.
