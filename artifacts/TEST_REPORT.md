# Followup Desk — final beta verification

Date: 2026-10-13. Public fictional-data beta: https://followup-desk.yjbao2008.chatgpt.site/

## Exact published version

- Original deployed-source fingerprint (not a commit in this fresh public repository): fa82452894fa87d28fa6bfa108fa29715b184b1b
- Application: index-Cb2iDSWC.js
- Worker: ai.worker-C-aRRH2A.js
- CSS: index-BGzuLumj.css
- App SHA-256: e36a0a34a6d6785124c73cd4632d10e791f4d55ac97051a425a001b6938744c9
- Worker SHA-256: 7a8e3193e189f5471112502a8b8a1f2cb2d021212658014800dac34ba9930209

## Automated checks

58/58 tests pass on the final source. UTC and America/Los_Angeles runs pass. Production build passes. Largest packaged file is the 527 KB worker; model and WASM are pinned external assets, not over-limit static files.

Coverage includes six fictional customer workflows, overdue/today/future dates, date boundaries, no-contact and channel gates, purchased-service override, single-action replacement after outcomes, no-reply not changing stage, record edits invalidating plans, backup validation, inert malicious text, numeric/quote validation, NLI contract abstention, no truncation, and resolved/retracted-note manual-review gates.

NLI contract tests use mocks only to test software behavior. Model-quality claims below come from actual inference, not these mocks.

## Public-source reproducibility check

A fresh dependency installation using `npm ci --ignore-scripts` and a clean cache completed with 63 packages. All 58 tests and the production build passed. Dependency lifecycle scripts were intentionally skipped. The rebuilt app and worker SHA-256 hashes match the deployed fingerprints above. This does not establish Node model-inference functionality on every platform.

## Actual model verification

Model: Xenova/nli-deberta-v3-xsmall, ONNX revision 2a4f614a701367a02d51389039afc998faeda637, q8, 87,246,587 model bytes. Upstream cross-encoder model is Apache-2.0. The model is a learned entailment classifier, not a generative LLM and not an embedding nearest-template search.

The frozen 16-note evaluation produced 7 supported preparation-cue suggestions and 9 abstentions, independently reviewed. This is not a statistical accuracy estimate or comprehensive needs-extraction pass. Abstentions include real misses.

Four supplemental retraction cases exposed two stale historical cues. The app now pauses AI on conservative explicit resolution/retraction markers, and every suggested strategy requires the associate to confirm current relevance. These rules do not solve arbitrary paraphrases; the full note must still be reviewed.

## Hosted browser verification

Hosted-browser verification recorded the following on the real public app:

- Real opt-in download and browser WASM inference completed.
- Jordan Lee: model setup 4,985 ms and inference 1,557 ms; abstained. Exact-note Node parity confirms the same result: a high sentence-fit score is vetoed by the full-note check. No threshold was loosened to force a result.
- Casey Brooks: 1,535 ms inference; exact-source comfort/material cue displayed.
- Sam Rivera: 1,182 ms inference; exact-source competitor-price cue displayed.
- Casey's current-relevance checkbox → Use strategy → plan review → save → reload retained the changed goal while preserving date and channel.
- Taylor's no-contact state disabled the AI action.
- No application console error was observed; extension metadata messages were separate.

Earlier English workflow QA also verified: create fictional customer, record explicit text permission, confirm a future plan, copy actual confirmed clipboard text, reschedule the same task, reload persistent records, and immediate opt-out blocking. Backup export worked.

## Explicitly incomplete checks

- Import reached the correct seven-record replacement confirmation; final restore was not performed. Core JSON round-trip and merge-related validation were tested, but do not substitute for a completed browser restore.
- 390 px/mobile layout was not browser-verified. Responsive CSS was implemented and inspected; mobile-width behavior still needs browser verification.
- Complete network/no-POST privacy auditing was not verified. App source has no remote-inference or messaging API, and inference ran locally, but that is not a comprehensive network audit or production privacy certification.
- Offline cold-start/cache behavior was not verified.

## Honest completion boundary

The reception → confirmed facts → reviewable plan → action queue → outcome timeline workflow is functional, with actual local AI preparation-cue review as an opt-in beta. AI suggests relevant passages and uses fixed, disclosed templates for questions and strategy. It does not automatically extract all customer facts, judge current purchase readiness, predict conversion, infer wealth, assign contact priority, send messages, or prove a sales lift.

The demo uses fictional people and local browser storage. It is not a production CRM, shared team database, encrypted vault, or automatic marketing system.
