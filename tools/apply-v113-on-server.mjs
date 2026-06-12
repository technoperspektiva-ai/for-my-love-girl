import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(process.argv[2] || '.');
const workerPath = resolve(projectRoot, 'src/index.js');
const wranglerPath = resolve(projectRoot, 'wrangler.jsonc');
const KV_ID = '31636d7d6b7444a1a7f2f22e0a2fa251';
const TARGET_VERSION = 'v113-ios-aware-device-presets-server-ready';

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}
function replaceOnce(text, from, to, label) {
  if (!text.includes(from)) throw new Error(`Patch point not found: ${label}`);
  return text.replace(from, to);
}
function ensureFile(path, label) {
  if (!existsSync(path)) fail(`${label} not found: ${path}`);
}
ensureFile(workerPath, 'Worker source');
ensureFile(wranglerPath, 'wrangler.jsonc');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
copyFileSync(workerPath, `${workerPath}.before-v113-${timestamp}`);
copyFileSync(wranglerPath, `${wranglerPath}.before-v113-${timestamp}`);

let source = readFileSync(workerPath, 'utf8');
let wrangler = readFileSync(wranglerPath, 'utf8');

// ---------- Cloudflare KV binding ----------
if (!/"binding"\s*:\s*"PRESETS_KV"/.test(wrangler)) {
  const kvBlock = `"kv_namespaces": [\n    { "binding": "PRESETS_KV", "id": "${KV_ID}" }\n  ],\n  `;
  if (/"vars"\s*:\s*\{/.test(wrangler)) {
    wrangler = wrangler.replace(/"vars"\s*:\s*\{/, `${kvBlock}"vars": {`);
  } else {
    const lastBrace = wrangler.lastIndexOf('}');
    if (lastBrace < 0) throw new Error('wrangler.jsonc has no closing brace.');
    const head = wrangler.slice(0, lastBrace).replace(/\s*$/, '');
    const comma = head.endsWith('{') || head.endsWith(',') ? '' : ',';
    wrangler = `${head}${comma}\n  ${kvBlock.replace(/,\n  $/, '\n')}\n}`;
  }
  console.log('Added PRESETS_KV binding to wrangler.jsonc.');
} else {
  console.log('PRESETS_KV binding already exists; left unchanged.');
}

// ---------- Backend: server presets separated by device ----------
if (!source.includes('HYM_DEVICE_PRESETS_PATCH_V113')) {
  source = replaceOnce(
    source,
    '      const record = { id, name, profile: JSON.parse(serializedProfile), savedAt: now, updatedAt: now, savedByTelegramId: String(user.telegramId || "") };',
    '      const device = body.device === "mobile" ? "mobile" : "desktop";\n      const record = { id, name, device, profile: JSON.parse(serializedProfile), savedAt: now, updatedAt: now, savedByTelegramId: String(user.telegramId || "") };',
    'server preset record device'
  );
  source = replaceOnce(
    source,
    '      const presets = items.filter(Boolean).sort((a, b) => Number(b.updatedAt || b.savedAt || 0) - Number(a.updatedAt || a.savedAt || 0));',
    '      const requestedDevice = url.searchParams.get("device");\n      const presets = items.filter(Boolean).filter((item) => !requestedDevice || (item.device === "mobile" ? "mobile" : "desktop") === requestedDevice).sort((a, b) => Number(b.updatedAt || b.savedAt || 0) - Number(a.updatedAt || a.savedAt || 0));',
    'server preset GET device filter'
  );
}

// ---------- Decode embedded HTML ----------
const htmlMatch = source.match(/const HTML = ("(?:\\.|[^"\\])*");\n\nexport default/s);
if (!htmlMatch) throw new Error('Embedded HTML string was not found in src/index.js.');
let html = JSON.parse(htmlMatch[1]);

// ---------- Frontend: local and server presets separated by device ----------
if (!html.includes('HYM_DEVICE_PRESETS_PATCH_V113')) {
  html = replaceOnce(
    html,
    'function hymActiveProfileKey(){return hymIsMobileEditor()?HYM_MOBILE_PROFILE_KEY:HYM_PROFILE_KEY}\nfunction hymSavePersonal(){const profile=hymCaptureProfile();hymJsonWrite(hymActiveProfileKey(),profile);return profile}\nfunction hymPersonal(){return hymJsonRead(hymActiveProfileKey(),null)}\nfunction hymPresets(){return hymJsonRead(HYM_PRESETS_KEY,[])}\nfunction hymWritePresets(items){hymJsonWrite(HYM_PRESETS_KEY,items||[])}',
    'function hymActiveProfileKey(){return hymIsMobileEditor()?HYM_MOBILE_PROFILE_KEY:HYM_PROFILE_KEY}\nfunction hymDeviceKind(){return hymIsMobileEditor()?"mobile":"desktop"}\nfunction hymPresetDevice(preset){return preset?.device==="mobile"?"mobile":"desktop"}\nfunction hymSavePersonal(){const profile=hymCaptureProfile();hymJsonWrite(hymActiveProfileKey(),profile);return profile}\nfunction hymPersonal(){return hymJsonRead(hymActiveProfileKey(),null)}\nfunction hymAllPresets(){return hymJsonRead(HYM_PRESETS_KEY,[])}\nfunction hymPresets(){return hymAllPresets().filter(preset=>hymPresetDevice(preset)===hymDeviceKind())}\nfunction hymWritePresets(items){const device=hymDeviceKind(),other=hymAllPresets().filter(preset=>hymPresetDevice(preset)!==device);hymJsonWrite(HYM_PRESETS_KEY,[...(items||[]),...other])}',
    'local device preset helpers'
  );
  html = replaceOnce(
    html,
    'async function hymFetchServerPresets(){try{const response=await fetch("/api/layout-presets",{credentials:"include",cache:"no-store"});',
    'async function hymFetchServerPresets(){try{const response=await fetch("/api/layout-presets?device="+encodeURIComponent(hymDeviceKind()),{credentials:"include",cache:"no-store"});',
    'server preset fetch device'
  );
  html = replaceOnce(
    html,
    'body:JSON.stringify({name:name.trim(),profile:hymSavePersonal()})',
    'body:JSON.stringify({name:name.trim(),device:hymDeviceKind(),profile:hymSavePersonal()})',
    'server preset save device'
  );
  html = html.replaceAll('hymJsonWrite(HYM_PROFILE_KEY,preset.profile)', 'hymJsonWrite(hymActiveProfileKey(),preset.profile)');
  html = replaceOnce(html, 'title.textContent="HYM presets";', 'title.textContent="HYM presets · "+hymDeviceKind().toUpperCase();', 'preset modal device title');
  html = replaceOnce(
    html,
    'items.unshift({name:name.trim(),profile:hymSavePersonal(),savedAt:Date.now()});',
    'items.unshift({name:name.trim(),device:hymDeviceKind(),profile:hymSavePersonal(),savedAt:Date.now()});',
    'local preset save device'
  );
  html += '\n<!-- HYM_DEVICE_PRESETS_PATCH_V113 -->';
}

// ---------- Frontend: OS-aware Facebook / PhonePe / Paytm ----------
if (!html.includes('IOS_AWARE_REDIRECTS_PATCH_V113')) {
  const oldArrays = `const upiApps=[\n["PhonePe UPI","phonepe://pay?pa=test%40upi&pn=QATest&am=1.00&cu=INR"],\n["Paytm UPI","paytmmp://pay?pa=test%40upi&pn=QATest&am=1.00&cu=INR"]\n];\nconst apps=[["Telegram","tg://resolve?domain=nsqmarket"],["Viber","viber://"],["WhatsApp","whatsapp://send?text=hello"],["Instagram","instagram://app"],["TikTok","snssdk1233://"],["Facebook","fb://profile"],["Дія","diia://"]];`;
  const newArrays = `// IOS_AWARE_REDIRECTS_PATCH_V113\nconst QA_UPI_PAYLOAD="pa=test%40upi&pn=QATest&am=1.00&cu=INR";\nfunction detectRedirectOs(){const ua=navigator.userAgent||"",platform=(navigator.userAgentData&&navigator.userAgentData.platform)||navigator.platform||"",maxTouch=navigator.maxTouchPoints||0,source=(ua+" "+platform).toLowerCase();if(/android/.test(source))return"android";if(/iphone|ipad|ipod/.test(source)||(/mac/.test(source)&&maxTouch>1))return"ios";if(/win/.test(source))return"windows";if(/mac/.test(source))return"macos";return"other"}\nconst IOS_APP_STORE={phonepe:"https://apps.apple.com/in/app/phonepe-secure-payments-app/id1170055821",paytm:"https://apps.apple.com/in/app/paytm-secure-upi-payments/id473941634"};\nconst PLATFORM_REDIRECTS={facebook:{android:"fb://profile",ios:"https://www.facebook.com/",windows:"https://www.facebook.com/",macos:"https://www.facebook.com/",other:"https://www.facebook.com/"},phonepeUpi:{android:phonepe://pay?\${QA_UPI_PAYLOAD},ios:phonepe://pay?\${QA_UPI_PAYLOAD},windows:"https://www.phonepe.com/",macos:"https://www.phonepe.com/",other:upi://pay?\${QA_UPI_PAYLOAD}},paytmUpi:{android:paytmmp://pay?\${QA_UPI_PAYLOAD},ios:paytmmp://pay?\${QA_UPI_PAYLOAD},windows:"https://paytm.com/",macos:"https://paytm.com/",other:upi://pay?\${QA_UPI_PAYLOAD}}};\nfunction openIosSchemeWithSilentFallback(primaryUrl,fallbackUrl){let pageHidden=false;const onVisibility=()=>{if(document.hidden)pageHidden=true};document.addEventListener("visibilitychange",onVisibility,{once:true});window.location.href=primaryUrl;window.setTimeout(()=>{document.removeEventListener("visibilitychange",onVisibility);if(!pageHidden&&document.visibilityState==="visible"&&fallbackUrl)window.location.href=fallbackUrl},1400)}\nfunction openPlatformRedirect(key,label){const os=detectRedirectOs(),config=PLATFORM_REDIRECTS[key],target=config&&(config[os]||config.other);if(!target)return;try{logEvent("INFO",label,os+" → "+target)}catch{}if(os==="ios"&&key==="phonepeUpi")return openIosSchemeWithSilentFallback(target,IOS_APP_STORE.phonepe);if(os==="ios"&&key==="paytmUpi")return openIosSchemeWithSilentFallback(target,IOS_APP_STORE.paytm);window.location.href=target}\nconst upiApps=[["PhonePe UPI","phonepeUpi"],["Paytm UPI","paytmUpi"]];\nconst apps=[["Telegram","tg://resolve?domain=nsqmarket"],["Viber","viber://"],["WhatsApp","whatsapp://send?text=hello"],["Instagram","instagram://app"],["TikTok","snssdk1233://"],["Facebook","facebook"],["Дія","diia://"]];`.replaceAll('\u0001','`');
  html = replaceOnce(html, oldArrays, newArrays, 'static UPI/apps arrays');
  html = replaceOnce(
    html,
    'upiApps.forEach(a=>{const b=document.createElement("button");b.className="btn green";b.textContent=a[0];b.onclick=()=>app(a[0],a[1]);el("payments").appendChild(b)});\napps.forEach(a=>{const b=document.createElement("button");b.className="btn red";b.textContent=a[0];b.onclick=()=>app(a[0],a[1]);el("apps").appendChild(b)});',
    'upiApps.forEach(([label,key])=>{const b=document.createElement("button");b.className="btn green";b.textContent=label;b.onclick=()=>openPlatformRedirect(key,label);el("payments").appendChild(b)});\napps.forEach(([label,target])=>{const b=document.createElement("button");b.className="btn red";b.textContent=label;b.onclick=()=>label==="Facebook"?openPlatformRedirect("facebook",label):app(label,target);el("apps").appendChild(b)});',
    'UPI/apps renderer'
  );
}

source = source.replace(htmlMatch[1], JSON.stringify(html));
source = source.replace(/version: "v[^"]+"/, `version: "${TARGET_VERSION}"`);
source += '\n// HYM_DEVICE_PRESETS_PATCH_V113\n// IOS_AWARE_REDIRECTS_PATCH_V113\n';

writeFileSync(workerPath, source, 'utf8');
writeFileSync(wranglerPath, wrangler, 'utf8');
console.log(`Applied ${TARGET_VERSION}.`);
console.log(`Backups created next to src/index.js and wrangler.jsonc.`);
console.log('Run: npm install && npm run check && npx wrangler deploy');
