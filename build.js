const fs = require('fs');

const b64 = fs.readFileSync('public/logo_thumb_b64.txt', 'utf8').trim();

// 1. COMPILAR VISTA DE INVITADOS (CATÁLOGO PÚBLICO)
const guestTemplate = fs.readFileSync('template_guest.html', 'utf8');
const guestOutput = guestTemplate.split('{{LOGO_B64}}').join(b64);

fs.writeFileSync('index.html', guestOutput, 'utf8');
fs.writeFileSync('invitado.html', guestOutput, 'utf8');
fs.writeFileSync('gas/Index.html', guestOutput, 'utf8');
fs.writeFileSync('public/index.html', guestOutput, 'utf8');
console.log('Catálogo de Invitados generado:');
console.log(' - index.html (GitHub Pages raíz):', guestOutput.length, 'bytes');
console.log(' - invitado.html (GitHub Pages alias):', guestOutput.length, 'bytes');
console.log(' - gas/Index.html (Google Apps Script):', guestOutput.length, 'bytes');
console.log(' - public/index.html (Servidor local):', guestOutput.length, 'bytes');

// 2. COMPILAR PANEL DE ADMINISTRADOR
const adminTemplate = fs.readFileSync('template_admin.html', 'utf8');
const adminOutput = adminTemplate.split('{{LOGO_B64}}').join(b64);

fs.writeFileSync('admin.html', adminOutput, 'utf8');
fs.writeFileSync('gas/Admin.html', adminOutput, 'utf8');
fs.writeFileSync('public/admin.html', adminOutput, 'utf8');
console.log('\nPanel de Administrador generado:');
console.log(' - admin.html (GitHub Pages):', adminOutput.length, 'bytes');
console.log(' - gas/Admin.html (Google Apps Script):', adminOutput.length, 'bytes');
console.log(' - public/admin.html (Servidor local):', adminOutput.length, 'bytes');
