const fs = require('fs');

const b64 = fs.readFileSync('public/logo_thumb_b64.txt', 'utf8').trim();

// Cargar metadatos dinámicos de versión oficial de la App TV desde version.json
let tvVersionName = '1.4.6';
let tvDownloadUrl = `https://aridamotec-cdn.aridamotec.workers.dev/apk/ARIDAMOTEC_TV_${tvVersionName}.apk`;

try {
  if (fs.existsSync('version.json')) {
    const vInfo = JSON.parse(fs.readFileSync('version.json', 'utf8'));
    if (vInfo.latestVersionName) tvVersionName = vInfo.latestVersionName;
    if (vInfo.downloadUrl) tvDownloadUrl = vInfo.downloadUrl;
  }
} catch (e) {
  console.warn('Aviso: no se pudo leer version.json en build.js:', e.message);
}

// 1. ELIMINACIÓN DE WEB VISITANTE: REDIRECCIÓN INSTANTÁNEA A WEB ADMIN
const redirectHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=admin.html">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ARIDAMOTEC | Redirigiendo a Administración...</title>
  <script>window.location.replace("admin.html" + window.location.hash);</script>
</head>
<body style="background:#05070e;color:#00e5ff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
  <p style="font-size:1.1rem;letter-spacing:0.5px;">Redirigiendo al Panel de Administración ARIDAMOTEC...</p>
</body>
</html>`;

fs.writeFileSync('index.html', redirectHtml, 'utf8');
fs.writeFileSync('public/index.html', redirectHtml, 'utf8');

// Eliminar archivos obsoletos de modo invitado
if (fs.existsSync('invitado.html')) {
  fs.unlinkSync('invitado.html');
  console.log(' - invitado.html eliminado.');
}
if (fs.existsSync('gas/Index.html')) {
  fs.unlinkSync('gas/Index.html');
  console.log(' - gas/Index.html eliminado.');
}
console.log('Web Visitante eliminada exitosamente. index.html configurado como redirección a admin.html.');

// 2. COMPILAR PANEL DE ADMINISTRADOR
const adminTemplate = fs.readFileSync('template_admin.html', 'utf8');
const adminOutput = adminTemplate
  .split('{{LOGO_B64}}').join(b64)
  .split('{{TV_APP_VERSION}}').join(tvVersionName)
  .split('{{TV_APP_DOWNLOAD_URL}}').join(tvDownloadUrl);

fs.writeFileSync('admin.html', adminOutput, 'utf8');
fs.writeFileSync('gas/Admin.html', adminOutput, 'utf8');
fs.writeFileSync('public/admin.html', adminOutput, 'utf8');
console.log('\nPanel de Administrador generado (TV App v' + tvVersionName + '):');
console.log(' - admin.html (GitHub Pages):', adminOutput.length, 'bytes');
console.log(' - gas/Admin.html (Google Apps Script):', adminOutput.length, 'bytes');
console.log(' - public/admin.html (Servidor local):', adminOutput.length, 'bytes');
