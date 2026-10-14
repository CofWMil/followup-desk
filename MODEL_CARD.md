# Follow-up Desk: local English NLI

## What the model actually does
This app uses a natural-language-inference (NLI) cross-encoder to compare each original customer sentence with five fixed preparation hypotheses: physical fit, delivery requirements, another store's price, service terms, and comfort/materials. It returns evidence-backed preparation cues. This is genuine model inference, not embedding retrieval, a keyword classifier, or generative writing.

Questions, suggested strategy, plan fields and draft messages come from explicit, editable templates. The model does not generate them. It does not infer budget amounts, dates, contact consent, purchase readiness, customer value, or a probability of buying. The associate retains the stage and all confirmed fields. Model output never authorizes contacting someone.

## Model and provenance
- Original model: [cross-encoder/nli-deberta-v3-xsmall](https://huggingface.co/cross-encoder/nli-deberta-v3-xsmall/tree/a150876415327c80daeff35ca6f68f5ed8cf5c24), Apache-2.0, English; trained with MNLI and SNLI according to its model card.
- ONNX conversion: [Xenova/nli-deberta-v3-xsmall](https://huggingface.co/Xenova/nli-deberta-v3-xsmall/tree/2a4f614a701367a02d51389039afc998faeda637), pinned revision `2a4f614a701367a02d51389039afc998faeda637`.
- q8 ONNX model: **87,246,587 bytes**. Tokenizer, configuration, and WASM runtime are additional downloads.
- Transformers.js 4.3.1. Browser uses single-thread WASM with ONNX Runtime `1.31.0-dev.20260914-8d85527a0` from pinned jsDelivr assets.
- No account, API key, paid model service, or hosted inference endpoint.
- Downloaded model hash: `model-artifacts/nli-model-sha256.txt`. Model metadata and size evidence are in `nli-deberta-base.json` and `nli-deberta-files.json`.
- MobileBERT was considered but not selected because its fine-tuned model card did not provide a clear license.

## Evidence and abstention
The code uses all three NLI labels (entailment, neutral, contradiction), not a two-label confidence shortcut.

A cue is admitted only when:
1. A complete original sentence has entailment score at least 0.80.
2. Its entailment score exceeds the larger neutral/contradiction score by at least 0.30.
3. The full-note contradiction score for that hypothesis is below 0.50.

These exploratory thresholds are not calibrated accuracy guarantees. Scores are internal model support values, never purchase probabilities. Exact source sentences are retained. A matching quote and score do not prove a correct interpretation, especially for historical/retracted statements. The full note must remain available for human review. An abstention means the model did not find sufficient evidence; it does not mean the customer has no need.

Fit cues appear only in blockers; other cues appear in needs. The fixed strategy preference is measurement, comparison, comfort, then delivery. That ordering is a transparent template choice, not model-generated prioritization. Consent, channel, date, do-not-contact, and purchased-state handling remain separate deterministic/manual controls. Conditional consent must be verified before any proposed contact.

## Input and runtime limits
At most 1,800 characters, 20 sentences and 400 source tokens per analysis. Exceeding a limit produces an error; input is not silently truncated. All processing uses the browser worker. Model/runtime asset downloads require network access initially. Customer text is passed to local inference, not included in model download URLs. Browser network verification is recorded separately. Offline availability is not guaranteed; caches and runtime access vary.

## Actual verification
### Node CPU evidence
- Exact-worker run: `model-artifacts/nli-final-v1.json`, including full hypotheses, thresholds, per-cue distributions, original sentences and runtime. Six translated workflow fixtures plus ten independently supplied adversarial notes.
- First six results: delivery, measurement, comparison, abstain for paused record, comfort, abstain for purchased record. Paused/purchased workflow behavior belongs to the app's separate safety controls.
- Adversarial notes: admitted fit, comfort, and unresolved-measurement cues. Missing facts, conditional contact, silence, retracted budget/no-contact, already purchased, and copied prompt injection abstained.
- A paraphrased urgent-fridge case was missed because the full-note contradiction veto fired. This is a documented false negative. Do not claim complete understanding or a six-case AI pass.
- Node CPU per-note inference: roughly **100–421 ms** on this environment, using two native ONNX Runtime threads. These are not browser timings.
- Previous generative experiments were rejected for fabrication and unreliable schema handling. They are not the shipped method.

### Browser status
Hosted-browser WASM loading and actual inference completed on the public beta. Casey and Sam produced source-supported cues; Jordan abstained under the full-note contradiction check. The current-relevance and separate plan-confirmation flow persisted after reload. See [TEST_REPORT.md](artifacts/TEST_REPORT.md) for bundle fingerprints, timings, and scope. Complete network auditing, mobile-width browser QA, final browser backup restore, and offline/cache verification remain incomplete. Node CPU results do not substitute for these checks.

Run `node scripts/nli-benchmark.mjs --download` to opt in to downloading the pinned model (about 87 MB plus runtime/tokenizer assets), or omit `--download` to use an existing local cache. This repeats the exact worker's synthetic evaluation. The independent adversarial input fixture is an evaluation artifact; no real customer information was used.
