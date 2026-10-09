# MAATAA roadmap (0–13) — status against evidence

**Updated:** 2026-10-09 · Status vocabulary: **implemented/verified**, **partial**, **unverified**, **blocked**, **not started**. Verification applies only to the exact local scope and evidence named; it does not imply production or hardware readiness.
Detailed engineering status: `PHASES-1-5-INTEGRATION-STATUS.md`. Evidence: `evidence/`.

## मौजूद चीज़ों का सही स्थान

Brahmini repo (`/Users/vesahe/Documents/Repos/brahmini`, `a875589f`, branch `codex/absorb-tlps-locations`, clean) को read-only देखा गया। `nova-console/data/nova.db` की copy पढ़ी गई; सिर्फ़ job/model metadata, prompts नहीं। यह repo का dev data dir है; packaged app का data dir अलग हो सकता है।

| चीज़ | स्थिति | प्रमाण |
| --- | --- | --- |
| LTX video generation | **implemented/verified** | `store_generationJobs`: 11 `video-ltx` jobs `done` (हर एक का 1 media output), 2 `failed` ("NOVA restarted during generation")। Model `dgrauet/ltx-2.3-mlx-q4`, engine `ltx-2-mlx`, 704×480, 97–121 frames, 2026-09-26 से 09-30। |
| Gemma | **implemented/verified** | `lib/video-ltx.js`: `GEMMA = 'mlx-community/gemma-3-12b-it-4bit'` LTX का **text encoder** है। Record में role `text-encoder`। |
| Local model registry | **implemented/verified** | `store_models`: 4 असली Ollama models (`llama3`, `llama3.2`, `maataa`, `llama3.2-vision`) digest सहित। सभी का `codePlanningQualification.qualified = []` — **कोई भी code planning के लिए qualified नहीं**। |
| Qwen coder evaluation | **unverified** | `m_qwen` (Qwen2.5 Coder 7B) और `eval025` (और `m_llama`, `m_mistral`, `m_phi`, `m_remote`, `eval018`, `eval024`) `public/index.html` में hard-coded demo seed हैं। इन्हें evaluation evidence नहीं माना जाएगा; mapping इन्हें reject करता है। एक असली run (`NOVA Bench 10`) में grounded/citation 0 दर्ज है। |
| ComfyUI failed attempt | **unverified** | 2 `image-generation` jobs failed हैं; वे ComfyUI थे या नहीं, यह अभी जाँचा नहीं गया। |
| TLPS local workflow/demo | **implemented/locally tested** | Idea → Script: LIVE run `20261009T052822Z` में असली local Ollama model (`qwen2.5-coder:7b`) ने draft लिखा, format check pass हुआ (scenes 4, cues 5), मानव ने v2 approve किया। Model **unqualified** है; format pass quality claim नहीं। Tauri registry v3 से `prj:` ID/version Desktop तक जाता है (cargo test 14/14 macOS); native round trip अभी नहीं चलाया। |
| ALLB runtime | **implemented/verified locally** | `de82c369` + uncommitted tree: tests pass; live local handshake, capabilities endpoint, tokenize/sutra probes और integration gate PASS। Deploy/production नहीं। |
| maataa-os | **implemented/verified QEMU alpha** | `50fce492`: host tests, build, QEMU boot pass। Hardware-ready नहीं। |
| K7 | **unverified** | कोई source, interface या boot binding नहीं मिला। |
| Hemant Samvat | **partial** | सीमित no_std primitive; सभी event times अब भी `host-unix-clock-unverified`। |

## क्रम और स्थिति

| क्रम | स्थिति | अभी का प्रमाण / अगला gate |
| --- | --- | --- |
| 0. आधार और अधिकार | **partial** — integration gate local **PASS** | Phase Zero + fresh evidence; authority layers are classified. ALLB capability endpoint and local gate are verified, but dirty-tree local evidence is not production proof; runtime/UI integration stays incomplete. |
| 1. साझा project record | **partial** | `project-record.ts` contract has stable `prj:` ID, versions and digest-bound approval. TLPS registers the record ID/version with Tauri registry v3 (locally tested, macOS cargo test). Electron cannot hold record links yet. Next: native Desktop ↔ TLPS round-trip smoke and Workbench visibility. |
| 2. एक product entry | **partial** | Desktop launcher + metadata project list exist. The Idea → Script project is browser-local only. `currentView()` with one ID/version across Desktop, Brahmini and TLPS remains not started. |
| 3. भाषा और input | **partial** | ALLB Brahmi tokenizer ran locally; Lipi/voice/transcription integration remains not started. |
| 4. ज्ञान और memory | **not started** | Knowledge/source provenance and known/assumed/unknown flow not wired end-to-end. |
| 5. Model registry | **partial** | Real local model digests can be mapped role-wise; current script draft records the model as **unqualified**. No model has passed a script-writing task evaluation. |
| 6. Planner | **implemented/verified locally** | Idea → preview → explicit approval, plus provider-draft proposal path; contract checks pass. |
| 7. Tools और action | **partial** | One allowlisted, digest-bound, single-use action; diff and rollback record are not started. Budget remains deterministic application code. |
| 8. जाँच और feedback | **partial** | Independent deterministic screenplay-shape check is exercised and re-run at approval. It checks format only, not story quality. |
| 9. Specialist agents | **not started for product flow** | Keep agent team as proposal/demo until the one-agent, one-project loop is connected end-to-end. |
| 10. TLPS पहले | **implemented/verified locally** | Idea → Script UI runs with local Brahmini/Ollama. Run `20261009T020051Z`: typechecks/build pass, 4 mocked E2E pass, 1 live local-model E2E pass; the local test harness saved v2 after 3-scene/9-cue format check. Same `prj:` ID and local storage, model unqualified, test browser only. Workbench browser regression is also 10/10 on a rebuilt isolated preview. Next: shared Desktop/Brahmini record and manual user flow; quality evaluation is separate. |
| 11. NEVO | **not started** | Start only after shared TLPS project flow is connected. |
| 12. Controlled learning | **not started** | Rights, evaluator, compute and exact-model qualification gates first. |
| 13. Siddham / hardware | **partial** | RTL + simulation are present; NPU unavailable and no physical hardware claim. Separate track; does not block TLPS rehearsal. |

## तुरंत के तीन काम

1. **Next: shared project record** — add the v3 event-envelope writer and expose the same record ID/version in Desktop, Brahmini and TLPS; verify stale-copy conflict and preserve existing TLPS plan data.
2. **TLPS quality/evaluation gate** — keep the current Ollama model unqualified; define a human-reviewed screenplay evaluation before any qualification claim.
3. **Workbench regression** — full browser spec now passes 10/10 against a rebuilt isolated preview; keep it as a regression gate for future pointer-context changes.
