const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
let ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Ariadna1528.';
const FOLDER_URL = 'https://drive.google.com/drive/folders/1DWm6fqt-SsB9xShKcOg7y7B24hN8BSPl?usp=sharing';

const DATA_DIR = path.join(__dirname, 'data');
const JSON_FILE = path.join(DATA_DIR, 'apks.json');
const CSV_FILE = path.join(DATA_DIR, 'apks.csv');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/gas_test', (req, res) => {
  const gasHtml = fs.readFileSync(path.join(__dirname, 'gas', 'Index.html'), 'utf8');
  const mockScript = `<script>
window.google = {
  script: {
    run: {
      withSuccessHandler(cb) { this._s = cb; return this; },
      withFailureHandler(cb) { this._f = cb; return this; },
      getApksList(pwd) {
        fetch('/api/apks', { headers: { 'Authorization': 'Bearer ' + pwd } })
          .then(r => r.json())
          .then(d => { if (this._s) this._s(d); })
          .catch(e => { if (this._f) this._f(e); });
      },
      getGuestCatalog() {
        fetch('/api/guest/catalog')
          .then(r => r.json())
          .then(d => { if (this._s) this._s(d); })
          .catch(e => { if (this._f) this._f(e); });
      }
    }
  }
};
</` + 'script>';
  const withMock = gasHtml.replace('<script>', mockScript + '\n<script>');
  res.send(withMock);
});

function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'No autorizado' });
  }
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (token !== ADMIN_PASSWORD) {
    return res.status(403).json({ success: false, error: 'Contraseña incorrecta' });
  }
  next();
}

function readApks() {
  if (!fs.existsSync(JSON_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function saveApks(records) {
  fs.writeFileSync(JSON_FILE, JSON.stringify(records, null, 2), 'utf8');
  const csvHeaders = 'Nombre,Código Browsy,Enlace Corto,Enlace Descarga Directa,Drive File ID,Clave Edición,Estado,Fecha Creación,Descripción IA\n';
  const csvRows = records.map(r => {
    return `"${(r.cleanName || '').replace(/"/g, '""')}","${r.browsyCode || ''}","${r.browsyShortUrl || ''}","${r.directDownloadUrl || ''}","${r.driveFileId}","${r.browsyEditKey || ''}","${r.status}","${r.createdAt || ''}","${(r.aiDescription || '').replace(/"/g, '""')}"`;
  }).join('\n');
  fs.writeFileSync(CSV_FILE, csvHeaders + csvRows, 'utf8');
}

function cleanApkName(rawName) {
  return rawName
    .replace(/\.apk$/i, '')
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getSemanticDescription(cleanName) {
  const n = (cleanName || '').toLowerCase();
  if (n.includes('player') || n.includes('iptv') || n.includes('xtreme') || n.includes('mxl') || n.includes('xuper') || n.includes('zuper') || n.includes('wiwy') || n.includes('xtv') || n.includes('luma') || n.includes('playtv') || n.includes('live tv')) {
    return 'Con esta aplicación podrás disfrutar de televisión en vivo, películas y series con servicio IPTV estable y su propio servidor integrado.';
  }
  if (n.includes('app release') || n.includes('sport') || n.includes('futbol') || n.includes('deporte') || n.includes('cricz') || n.includes('rbtv')) {
    return 'Con esta aplicación podrás sintonizar eventos deportivos en directo como fútbol internacional, béisbol, baloncesto y boxeo.';
  }
  if (n.includes('movie') || n.includes('cine') || n.includes('pelicula') || n.includes('clipbox')) {
    return 'Con esta aplicación podrás ver estrenos de cine y series completas en alta calidad y sin cortes comerciales.';
  }
  if (n.includes('anim') || n.includes('manga') || n.includes('otaku')) {
    return 'Con esta aplicación podrás ver tus series y películas de anime favoritas en excelente resolución en tu pantalla.';
  }
  if (n.includes('launcher') || n.includes('wolf') || n.includes('atv')) {
    return 'Con esta aplicación podrás personalizar y acelerar la pantalla de inicio de tu Android TV sin anuncios.';
  }
  if (n.includes('download') || n.includes('descarga')) {
    return 'Con esta aplicación podrás descargar e instalar aplicaciones directamente en tu Android TV mediante códigos o enlaces.';
  }
  if (n.includes('vpn') || n.includes('surfshark')) {
    return 'Con esta aplicación podrás navegar con máxima seguridad, privacidad y desbloquear contenidos de otros países.';
  }
  if (n.includes('tube') || n.includes('youtube')) {
    return 'Con esta aplicación podrás ver YouTube en tu televisor con tema oscuro y sin publicidad que interrumpa tus videos.';
  }
  if (n.includes('weather') || n.includes('clima')) {
    return 'Con esta aplicación podrás consultar el pronóstico del clima con radares y animaciones en pantalla grande.';
  }
  return 'Con esta aplicación podrás disfrutar de televisión en vivo, películas y series con excelente estabilidad en tu TV.';
}

async function requestBrowsy(directUrl) {
  const res = await fetch('https://browsy.app/api/shorten', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Origin': 'https://browsy.app',
      'Referer': 'https://browsy.app/'
    },
    body: JSON.stringify({ url: directUrl })
  });
  const data = await res.json();
  if (res.status >= 200 && res.status < 300 && data && data.code) {
    return data;
  }
  throw new Error(data.error || 'Error al conectar con Browsy');
}

let localSyncMinutes = 5;
let syncTimer = null;

function resetLocalSyncTimer(mins) {
  if (syncTimer) clearInterval(syncTimer);
  localSyncMinutes = mins;
  const intervalMs = mins * 60 * 1000;
  syncTimer = setInterval(() => {
    console.log(`[${new Date().toISOString()}] ⏰ Ejecutando sincronización programada cada ${mins} minutos...`);
  }, intervalMs);
}
resetLocalSyncTimer(5);

// Rutas API
// ================= ENDPOINTS PÚBLICOS Y MODO INVITADO =================
app.get('/api/guest/catalog', (req, res) => {
  try {
    const all = readApks();
    const active = all.filter(a => a.status !== 'deleted_from_drive');
    const catalog = active.map(a => ({
      cleanName: a.cleanName,
      fileName: a.fileName || a.name || '',
      browsyCode: a.browsyCode ? String(a.browsyCode).trim() : 'Pendiente',
      browsyShortUrl: a.browsyShortUrl || a.shortUrl || (a.browsyCode ? ('https://browsy.site/' + a.browsyCode) : ''),
      directDownloadUrl: a.directDownloadUrl || a.directUrl || ('https://github.com/tdavid1515-bot/apks-aridamotec/releases/download/v1.0.0/' + encodeURIComponent(a.fileName || a.name || '')),
      aiDescription: a.aiDescription || getSemanticDescription(a.cleanName),
      createdAt: a.createdAt || ''
    }));
    res.json({
      success: true,
      total: catalog.length,
      catalog: catalog
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error cargando catálogo' });
  }
});

let serverRecovery = {
  otp: null,
  expiry: 0,
  attempts: 0,
  lastReq: 0,
  resetToken: null,
  resetExpiry: 0
};

app.post('/api/recovery/request', (req, res) => {
  const now = Date.now();
  if (now - serverRecovery.lastReq < 60000) {
    const waitSec = Math.ceil((60000 - (now - serverRecovery.lastReq)) / 1000);
    return res.status(429).json({ success: false, error: 'Espera ' + waitSec + ' segundos antes de solicitar otro código.' });
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  serverRecovery.otp = otp;
  serverRecovery.expiry = now + 15 * 60 * 1000;
  serverRecovery.attempts = 0;
  serverRecovery.lastReq = now;

  console.log('🔐 [RECOVERY LOCAL OTP]: ' + otp);
  const email = process.env.ADMIN_RECOVERY_EMAIL || 'aridamotec@gmail.com';
  const masked = email.substring(0, 2) + '*****' + email.slice(-10);

  res.json({
    success: true,
    maskedEmail: masked,
    message: 'Código enviado a ' + masked + ' (En servidor local el código es: ' + otp + ')'
  });
});

app.post('/api/recovery/verify', (req, res) => {
  const { otp } = req.body;
  const now = Date.now();

  if (!serverRecovery.otp || now > serverRecovery.expiry) {
    return res.status(400).json({ success: false, error: 'El código ha expirado o no es válido.' });
  }

  serverRecovery.attempts++;
  if (serverRecovery.attempts > 3) {
    serverRecovery.otp = null;
    return res.status(400).json({ success: false, error: 'Límite de 3 intentos superado. Código invalidado.' });
  }

  if (String(otp).trim() !== serverRecovery.otp) {
    return res.status(400).json({ success: false, error: 'Código incorrecto. Intentos restantes: ' + (3 - serverRecovery.attempts) });
  }

  const resetToken = 'RST_' + Math.random().toString(36).substring(2);
  serverRecovery.resetToken = resetToken;
  serverRecovery.resetExpiry = now + 600000;
  serverRecovery.otp = null;

  res.json({
    success: true,
    resetToken: resetToken,
    currentPassword: ADMIN_PASSWORD,
    message: 'Código verificado con éxito.'
  });
});

app.post('/api/recovery/reset', (req, res) => {
  const { resetToken, newPassword } = req.body;
  const now = Date.now();

  if (!serverRecovery.resetToken || now > serverRecovery.resetExpiry || resetToken !== serverRecovery.resetToken) {
    return res.status(400).json({ success: false, error: 'Token de restablecimiento inválido o expirado.' });
  }

  if (!newPassword || newPassword.trim().length < 6) {
    return res.status(400).json({ success: false, error: 'La nueva contraseña debe tener mínimo 6 caracteres.' });
  }

  ADMIN_PASSWORD = newPassword.trim();
  serverRecovery.resetToken = null;

  res.json({
    success: true,
    message: 'Contraseña actualizada con éxito a: ' + ADMIN_PASSWORD
  });
});

app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: ADMIN_PASSWORD });
  }
  return res.status(401).json({ success: false, error: 'Contraseña incorrecta' });
});

app.get('/api/apks', requireAuth, (req, res) => {
  const all = readApks().map((a, idx) => ({
    ...a,
    orderIndex: idx,
    aiDescription: a.aiDescription || getSemanticDescription(a.cleanName)
  }));
  const active = all.filter(a => a.status !== 'deleted_from_drive');
  const deleted = all.filter(a => a.status === 'deleted_from_drive');
  res.json({
    success: true,
    active,
    deleted,
    total: all.length,
    currentInterval: localSyncMinutes
  });
});

app.post('/api/interval', requireAuth, (req, res) => {
  const { interval } = req.body;
  const mins = parseInt(interval, 10) || 5;
  resetLocalSyncTimer(mins);
  res.json({
    success: true,
    interval: mins,
    message: `Sincronización configurada cada ${mins} minutos.`
  });
});

app.post('/api/describe', requireAuth, (req, res) => {
  const { name } = req.body;
  const clean = cleanApkName(name || '');
  const desc = getSemanticDescription(clean);
  res.json({ success: true, description: desc });
});

// Endpoint OTA de versión oficial de la APK de TV
app.get('/api/app/version', (req, res) => {
  const versionFile = path.join(__dirname, 'version.json');
  if (fs.existsSync(versionFile)) {
    try {
      const vData = JSON.parse(fs.readFileSync(versionFile, 'utf8'));
      return res.json(vData);
    } catch (e) {}
  }
  res.json({
    success: true,
    latestVersionCode: 9,
    latestVersionName: '1.3.5',
    downloadUrl: 'https://cdn.jsdelivr.net/gh/tdavid1515-bot/apks-aridamotec@main/ARIDAMOTEC_TV_1.3.5.apk',
    changelog: 'Descargas directas ultra-rápidas, botón cancelar descarga y optimizaciones de rendimiento.',
    minSupportedVersionCode: 1
  });
});

const MAC_FILE = path.join(DATA_DIR, 'mac_devices.json');
function readMacDevices() {
  if (!fs.existsSync(MAC_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(MAC_FILE, 'utf8')); } catch (e) { return []; }
}
function saveMacDevices(list) {
  fs.writeFileSync(MAC_FILE, JSON.stringify(list, null, 2), 'utf8');
}

app.get('/api/mac/check', (req, res) => {
  const mac = (req.query.mac || '').trim().toUpperCase();
  const model = req.query.model || 'Desconocido';
  if (!mac) return res.json({ success: false, authorized: false, error: 'MAC requerida' });
  const list = readMacDevices();
  const found = list.find(d => (d.mac || '').toUpperCase() === mac);
  if (found) {
    found.lastCheck = new Date().toISOString();
    saveMacDevices(list);
    const isAct = (found.status || '').toUpperCase() === 'ACTIVO';
    return res.json({ success: true, authorized: isAct, status: found.status, client: found.client, mac });
  }
  const newDev = { mac, client: 'Cliente Nuevo (Pendiente)', model, status: 'PENDIENTE', registerDate: new Date().toISOString(), lastCheck: new Date().toISOString(), notes: 'Auto-registrado' };
  list.push(newDev);
  saveMacDevices(list);
  res.json({ success: true, authorized: false, status: 'PENDIENTE', client: newDev.client, mac });
});

app.get('/api/mac/list', requireAuth, (req, res) => {
  const list = readMacDevices();
  res.json({ success: true, total: list.length, devices: list });
});

app.post('/api/mac/save', requireAuth, (req, res) => {
  const { mac, client, model, status, notes } = req.body;
  if (!mac) return res.status(400).json({ success: false, error: 'MAC requerida' });
  const list = readMacDevices();
  const idx = list.findIndex(d => (d.mac || '').toUpperCase() === mac.trim().toUpperCase());
  if (idx !== -1) {
    list[idx] = { ...list[idx], client, model, status: status || list[idx].status, notes };
  } else {
    list.push({ mac: mac.trim().toUpperCase(), client, model, status: status || 'ACTIVO', registerDate: new Date().toISOString(), lastCheck: '-', notes });
  }
  saveMacDevices(list);
  res.json({ success: true, mac });
});

app.post('/api/mac/toggle', requireAuth, (req, res) => {
  const { mac, status } = req.body;
  const list = readMacDevices();
  const dev = list.find(d => (d.mac || '').toUpperCase() === (mac || '').trim().toUpperCase());
  if (!dev) return res.status(404).json({ success: false, error: 'Dispositivo no encontrado' });
  dev.status = status;
  saveMacDevices(list);
  res.json({ success: true, mac: dev.mac, status });
});

app.delete('/api/mac/:mac', requireAuth, (req, res) => {
  const mac = (req.params.mac || '').trim().toUpperCase();
  let list = readMacDevices();
  list = list.filter(d => (d.mac || '').toUpperCase() !== mac);
  saveMacDevices(list);
  res.json({ success: true, mac });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 SERVIDOR ARIDAMOTEC ACTIVO`);
  console.log(`🌐 Acceso local: http://localhost:${PORT}`);
  console.log(`🔐 Contraseña de acceso: ${ADMIN_PASSWORD}`);
  console.log(`⏰ Sincronización automática: cada ${localSyncMinutes} minutos`);
  console.log(`======================================================\n`);
});
