import {defineConfig} from 'vite';

// ONNX's pinned WebAssembly asset exceeds the static host's 25 MiB/file limit.
// Keep its standard CDN location instead of copying that binary into dist.
// This rewrites only ONNX's fallback URL; the worker also sets wasmPaths explicitly.
const ortVersion='1.31.0-dev.20260914-8d85527a0';
const ortBase=`https://cdn.jsdelivr.net/npm/onnxruntime-web@${ortVersion}/dist/`;
const externalWasm={
  name:'pinned-onnx-wasm-cdn',
  enforce:'pre',
  transform(code,id){
    if(!id.includes('/onnxruntime-web/')||!id.endsWith('.mjs'))return null;
    const updated=code.replace(/new URL\((["'])(ort-wasm[^"']+\.wasm)\1,\s*import\.meta\.url\)/g,(_,quote,file)=>`new URL(${JSON.stringify(ortBase+file)})`);
    return updated===code?null:{code:updated,map:null};
  },
};
export default defineConfig({plugins:[externalWasm],worker:{plugins:()=>[externalWasm]}});
