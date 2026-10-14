import {AutoTokenizer,AutoModelForSequenceClassification,env} from '@huggingface/transformers';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {analyzeNLI,MODEL_ID,MODEL_REVISION,MODEL_BYTES,CUES,THRESHOLDS} from '../src/ai.worker.js';
env.cacheDir=new URL('../.cache/',import.meta.url).pathname;
env.allowLocalModels=true;
const allowDownload=process.argv.includes("--download");
console.log(allowDownload ? "Downloading pinned public model assets if absent (about 87 MB plus dependencies); synthetic fixtures only." : "Cache-only run. Pass --download to allow the pinned public model download.");
await mkdir(new URL("../model-artifacts/",import.meta.url),{recursive:true});
const start=performance.now();const [tokenizer,model]=await Promise.all([AutoTokenizer.from_pretrained(MODEL_ID,{revision:MODEL_REVISION,local_files_only:!allowDownload}),AutoModelForSequenceClassification.from_pretrained(MODEL_ID,{revision:MODEL_REVISION,dtype:'q8',device:'cpu',local_files_only:!allowDownload,session_options:{intraOpNumThreads:2}})]);const loadMs=performance.now()-start;
const fixtures=[
'My fridge broke. My budget is at most 4500 yuan and the width cannot exceed 60 cm. I need delivery before Friday. Tell me on WeChat tomorrow at 2pm which model can arrive. Do not call me.',
'I like this three-seat sofa, but I am worried it will not fit through the doorway and the living room might be too cramped. My budget is around 8000 yuan. Remind me to measure on WeChat Wednesday evening. I cannot take calls.',
'I like this washer-dryer set. Another store is 500 yuan cheaper. I care about delivery, installation and warranty too. You promised to send the detailed breakdown Monday on WeChat. That promised date has passed and it has not been sent.',
'I planned to buy a dining table this week, but my renovation is delayed. Do not contact me. Wait until I contact you. The 10000 yuan budget was only an old idea.',
'I am just looking at mattresses. The two feel different and I do not know which one to choose. I did not say I would buy this month, and I have not set a budget. Send me a comparison of firmness and materials on WeChat Saturday afternoon. Do not ask me every day.',
'I have already ordered the dining table. Delivery is October 16. Please confirm the delivery time on WeChat Thursday.'
];

const adversarial=JSON.parse(await readFile(new URL('../model-artifacts/english-adversarial-cases.json',import.meta.url),'utf8'));
const cases=[...fixtures.map((text,i)=>({id:'demo-'+(i+1),text})),...adversarial.map(c=>({id:c.id,text:c.input}))];const results=[];
for(const c of cases){const t=performance.now();const result=await analyzeNLI(c.text,tokenizer,model);results.push({...c,ms:performance.now()-t,result});console.log(c.id,result.strategyId,result.analysisStatus,Math.round(performance.now()-t));}
await writeFile(new URL('../model-artifacts/nli-rerun-'+Date.now()+'.json',import.meta.url),JSON.stringify({model:MODEL_ID,revision:MODEL_REVISION,modelBytes:MODEL_BYTES,runtime:'Node CPU q8 two threads; not browser timing',loadMs,cues:CUES,thresholds:THRESHOLDS,results},null,2));
