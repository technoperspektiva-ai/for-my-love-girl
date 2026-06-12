import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const target = resolve(process.argv[2] || 'src/index.js');
if (!existsSync(target)) {
  console.error(`File not found: ${target}`);
  process.exit(1);
}

let source = readFileSync(target, 'utf8');
if (source.includes('HYM_DEVICE_PRESETS_PATCH_V112')) {
  console.log('v112 device-specific presets patch is already applied.');
  process.exit(0);
}

const backup = target.replace(/\.js$/, '.before-v112.js');
copyFileSync(target, backup);

function replaceOnce(text, from, to, label) {
  if (!text.includes(from)) {
    throw new Error(`Patch point not found: ${label}`);
  }
  return text.replace(from, to);
}

// Backend: store device type with new server presets.
source = replaceOnce(
  source,
  '      const record = { id, name, profile: JSON.parse(serializedProfile), savedAt: now, updatedAt: now, savedByTelegramId: String(user.telegramId || "") };',
  '      const device = body.device === "mobile" ? "mobile" : "desktop";\n      const record = { id, name, device, profile: JSON.parse(serializedProfile), savedAt: now, updatedAt: now, savedByTelegramId: String(user.telegramId || "") };',
  'server preset record'
);

// Backend: list only requested device. Legacy presets without device are desktop.
source = replaceOnce(
  source,
  '      const presets = items.filter(Boolean).sort((a, b) => Number(b.updatedAt || b.savedAt || 0) - Number(a.updatedAt || a.savedAt || 0));',
  '      const requestedDevice = url.searchParams.get("device");\n      const presets = items.filter(Boolean).filter((item) => !requestedDevice || (item.device === "mobile" ? "mobile" : "desktop") === requestedDevice).sort((a, b) => Number(b.updatedAt || b.savedAt || 0) - Number(a.updatedAt || a.savedAt || 0));',
  'server preset filter'
);

const htmlMatch = source.match(/const HTML = ("(?:\\.|[^"\\])*");\n\nexport default/s);
if (!htmlMatch) throw new Error('HTML string not found in Worker source.');
let html = JSON.parse(htmlMatch[1]);

html = replaceOnce(
  html,
  'function hymActiveProfileKey(){return hymIsMobileEditor()?HYM_MOBILE_PROFILE_KEY:HYM_PROFILE_KEY}\nfunction hymSavePersonal(){const profile=hymCaptureProfile();hymJsonWrite(hymActiveProfileKey(),profile);return profile}\nfunction hymPersonal(){return hymJsonRead(hymActiveProfileKey(),null)}\nfunction hymPresets(){return hymJsonRead(HYM_PRESETS_KEY,[])}\nfunction hymWritePresets(items){hymJsonWrite(HYM_PRESETS_KEY,items||[])}',
  'function hymActiveProfileKey(){return hymIsMobileEditor()?HYM_MOBILE_PROFILE_KEY:HYM_PROFILE_KEY}\nfunction hymDeviceKind(){return hymIsMobileEditor()?"mobile":"desktop"}\nfunction hymPresetDevice(preset){return preset?.device==="mobile"?"mobile":"desktop"}\nfunction hymSavePersonal(){const profile=hymCaptureProfile();hymJsonWrite(hymActiveProfileKey(),profile);return profile}\nfunction hymPersonal(){return hymJsonRead(hymActiveProfileKey(),null)}\nfunction hymAllPresets(){return hymJsonRead(HYM_PRESETS_KEY,[])}\nfunction hymPresets(){return hymAllPresets().filter(preset=>hymPresetDevice(preset)===hymDeviceKind())}\nfunction hymWritePresets(items){const device=hymDeviceKind(),other=hymAllPresets().filter(preset=>hymPresetDevice(preset)!==device);hymJsonWrite(HYM_PRESETS_KEY,[...(items||[]),...other])}',
  'local preset helpers'
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

html = replaceOnce(
  html,
  'title.textContent="HYM presets";',
  'title.textContent="HYM presets · "+hymDeviceKind().toUpperCase();',
  'preset modal title'
);

html = replaceOnce(
  html,
  'items.unshift({name:name.trim(),profile:hymSavePersonal(),savedAt:Date.now()});',
  'items.unshift({name:name.trim(),device:hymDeviceKind(),profile:hymSavePersonal(),savedAt:Date.now()});',
  'local preset save device'
);

html = html.replace(
  'Редагування: три кліки по HYM. На комп’ютері доступний drag-and-resize. На телефоні торкнись об’єкта й використовуй нижню панель зі стрілками та кнопками W/H. Іконка ✎ відкриває лише пресети.',
  'Редагування: три кліки по HYM. Пресети розділені за пристроями: desktop показуються лише на комп’ютері, mobile — лише на телефоні. Іконка ✎ відкриває пресети поточного пристрою.'
);

html += '\n<!-- HYM_DEVICE_PRESETS_PATCH_V112 -->';
source = source.replace(htmlMatch[1], JSON.stringify(html));
source = source.replace(/version: "v[^"]+"/, 'version: "v112-device-specific-presets"');
source += '\n// HYM_DEVICE_PRESETS_PATCH_V112\n';

writeFileSync(target, source, 'utf8');
console.log('Applied v112 device-specific HYM presets patch.');
console.log(`Backup created: ${backup}`);
console.log('Next: npm run check && npx wrangler deploy');
