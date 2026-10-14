# Third-party components

- @huggingface/transformers 4.3.1: Apache-2.0, https://github.com/huggingface/transformers.js
- onnxruntime-web 1.31.0-dev.20260914-8d85527a0: MIT, https://github.com/microsoft/onnxruntime
- Vite 7.3.7 (development/build): MIT, https://github.com/vitejs/vite
- cross-encoder/nli-deberta-v3-xsmall: Apache-2.0, https://huggingface.co/cross-encoder/nli-deberta-v3-xsmall . Community ONNX conversion: Xenova/nli-deberta-v3-xsmall pinned revision 2a4f614a701367a02d51389039afc998faeda637. Model weights are downloaded only after opt-in, not packaged with the site. See MODEL_CARD.md.

The current public test app uses system fonts, no external font loading, no remote inference API, and no advertising or analytics integration. Dependency packages retain their license files through normal installation.
