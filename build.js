const fs = require('fs');

const b64 = fs.readFileSync('public/logo_thumb_b64.txt', 'utf8').trim();

// Cargar metadatos dinámicos de versión oficial de la App TV desde version.json
let tvVersionName = '1.3.5';
let tvDownloadUrl = `https://cdn.jsdelivr.net/gh/tdavid1515-bot/apks-aridamotec@main/ARIDAMOTEC_TV_${tvVersionName}.apk`;

try {
  if (fs.existsSync('version.json')) {
    const vInfo = JSON.parse(fs.readFileSync('version.json', 'utf8'));
    if (vInfo.latestVersionName) tvVersionName = vInfo.latestVersionName;
    if (vInfo.downloadUrl) tvDownloadUrl = vInfo.downloadUrl;
  }
} catch (e) {
  console.warn('Aviso: no se pudo leer version.json en build.js:', e.message);
}

// 1. COMPILAR VISTA DE INVITADOS (CATÁLOGO PÚBLICO)
const guestTemplate = fs.readFileSync('template_guest.html', 'utf8');
const guestOutput = guestTemplate
  .split('{{LOGO_B64}}').join(b64)
  .split('{{TV_APP_VERSION}}').join(tvVersionName)
  .split('{{TV_APP_DOWNLOAD_URL}}').join(tvDownloadUrl);

fs.writeFileSync('index.html', guestOutput, 'utf8');
fs.writeFileSync('invitado.html', guestOutput, 'utf8');
fs.writeFileSync('gas/Index.html', guestOutput, 'utf8');
fs.writeFileSync('public/index.html', guestOutput, 'utf8');
console.log(`Catálogo de Invitados generado (TV App v${tvVersionName}):`);
console.log(' - index.html (GitHub Pages raíz):', guestOutput.length, 'bytes');
console.log(' - invitado.html (GitHub Pages alias):', guestOutput.length, 'bytes');
console.log(' - gas/Index.html (Google Apps Script):', guestOutput.length, 'bytes');
console.log(' - public/index.html (Servidor local):', guestOutput.length, 'bytes');

// 2. COMPILAR PANEL DE ADMINISTRADOR
const adminTemplate = fs.readFileSync('template_admin.html', 'utf8');
const adminOutput = adminTemplate
  .split('{{LOGO_B64}}').join(b64)
  .split('{{TV_APP_VERSION}}').join(tvVersionName)
  .split('{{TV_APP_DOWNLOAD_URL}}').join(tvDownloadUrl);

fs.writeFileSync('admin.html', adminOutput, 'utf8');
fs.writeFileSync('gas/Admin.html', adminOutput, 'utf8');
fs.writeFileSync('public/admin.html', adminOutput, 'utf8');
console.log('\nPanel de Administrador generado:');
console.log(' - admin.html (GitHub Pages):', adminOutput.length, 'bytes');
console.log(' - gas/Admin.html (Google Apps Script):', adminOutput.length, 'bytes');
console.log(' - public/admin.html (Servidor local):', adminOutput.length, 'bytes');
