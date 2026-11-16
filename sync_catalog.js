const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GITHUB_OWNER = 'tdavid1515-bot';
const GITHUB_REPO = 'apks-aridamotec';
const RELEASE_TAG = 'v1.0.0';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanApkName(fileName) {
  let name = fileName.replace(/\.(apk|xapk)$/i, '');
  name = name.replace(/[-_.]+/g, ' ');
  name = name.replace(/\b(v?\d+(\.\d+)+)\b/gi, '').trim();
  name = name.replace(/\s+/g, ' ');
  return name || fileName;
}

function detectAuthor(cleanName, fileName) {
  const norm = (str) => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const combined = norm(cleanName) + ' ' + norm(fileName);
  if (combined.includes('modbynf')) return 'ModByNF';
  if (combined.includes('original')) return 'Oficial';
  if (combined.includes('xuper')) return 'Xuper Dev';
  if (combined.includes('wolf')) return 'Wolf Dev';
  if (combined.includes('wireguard')) return 'WireGuard LLC';
  if (combined.includes('weather')) return 'Weather XL Dev';
  if (combined.includes('tizentube')) return 'TizenTube Project';
  if (combined.includes('projjectivy')) return 'Spocky / Projectivy';
  if (combined.includes('downloader')) return 'AFTVnews.com';
  if (combined.includes('animxl')) return 'AnimXL Team';
  if (combined.includes('clipbox')) return 'ClipBox Media';
  if (combined.includes('mxl')) return 'MXL Tech';
  if (combined.includes('sportv') || combined.includes('cricz')) return 'Sports Network Live';
  if (combined.includes('surfshark')) return 'Surfshark B.V.';
  if (combined.includes('wiwy')) return 'WiWy TV Corp';
  if (combined.includes('zuper')) return 'Züper Tech';
  if (combined.includes('tsuzuku')) return 'Tsuzuku Team';
  if (combined.includes('bixplus')) return 'BixPlus Dev';
  if (combined.includes('flystream')) return 'FlyStream Live';
  if (combined.includes('watched')) return 'Watched Project';
  return 'Oficial';
}

function classifyCategory(cleanName, fileName) {
  const norm = (str) => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const combined = norm(cleanName) + ' ' + norm(fileName);

  if (combined.includes('sport') || combined.includes('deport') || combined.includes('futbol') || combined.includes('cricz') || combined.includes('geesports')) {
    return '⚽ Deportes';
  }
  if (combined.includes('animxl') || combined.includes('anime') || combined.includes('tsuzuku') || combined.includes('clipbox') || combined.includes('movie') || combined.includes('cine') || combined.includes('series')) {
    return '🎬 Películas y Series';
  }
  if (combined.includes('launcher') || combined.includes('vpn') || combined.includes('wireguard') || combined.includes('surfshark') || combined.includes('weather') || combined.includes('downloader') || combined.includes('tizentube') || combined.includes('browsy') || combined.includes('util')) {
    return '🛠️ Utilitarios';
  }
  return '📺 TV en Vivo';
}

async function requestBrowsyCode(directUrl) {
  try {
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

    if (res.status === 200 || res.status === 201) {
      const data = await res.json();
      if (data && data.ok && data.code) {
        return {
          code: String(data.code),
          shortUrl: data.shortUrl || ('https://browsy.app/' + data.code),
          editKey: data.editKey || '',
          manageUrl: data.manageUrl || ''
        };
      }
    }
  } catch (err) {
    console.error('Error llamando a Browsy API:', err.message);
  }
  return null;
}

async function runSync() {
  console.log('🔄 Sincronizando catálogo con GitHub Releases...');
  const releasesUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=100`;
  
  const headers = { 'User-Agent': 'ARIDAMOTEC-Sync-Engine' };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  let rawAssets = [];
  try {
    const res = await fetch(releasesUrl, { headers });
    if (res.ok) {
      const releasesData = await res.json();
      const releases = Array.isArray(releasesData) ? releasesData : [releasesData];
      for (const rel of releases) {
        if (rel && Array.isArray(rel.assets)) {
          rawAssets.push(...rel.assets);
        }
      }
    } else {
      console.warn(`Aviso: Error listando todos los releases (${res.status}), intentando tag ${RELEASE_TAG}...`);
      const fallbackUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/tags/${RELEASE_TAG}`;
      const fbRes = await fetch(fallbackUrl, { headers });
      if (fbRes.ok) {
        const fbData = await fbRes.json();
        rawAssets = fbData.assets || [];
      }
    }
  } catch (errRel) {
    console.error('Error consultando GitHub Releases:', errRel.message);
  }

  // Deduplicar assets por nombre
  const assetMap = new Map();
  for (const a of rawAssets) {
    if (a && a.name) {
      const lower = a.name.toLowerCase();
      if (!assetMap.has(lower)) {
        assetMap.set(lower, a);
      }
    }
  }
  const allUniqueAssets = Array.from(assetMap.values());

  // Extraer posibles APKs de la propia app Android TV tanto de Releases como del repo local
  let latestTvName = null;
  let latestTvUrl = null;
  let latestTvCreatedAt = null;

  for (const a of allUniqueAssets) {
    const m = (a.name || '').match(/ARIDAMOTEC_TV_(\d+\.\d+\.\d+)\.apk/i);
    if (m) {
      latestTvName = m[1];
      latestTvUrl = a.browser_download_url;
      latestTvCreatedAt = a.created_at;
    }
  }

  try {
    const rootFiles = fs.readdirSync(__dirname);
    const localTvApks = rootFiles.filter(f => f.startsWith('ARIDAMOTEC_TV_') && f.endsWith('.apk')).sort();
    if (localTvApks.length > 0) {
      const localLatest = localTvApks[localTvApks.length - 1];
      const mLocal = localLatest.match(/ARIDAMOTEC_TV_(\d+\.\d+\.\d+)\.apk/i);
      if (mLocal) {
        // Si no había en release o si el local es igual o superior
        if (!latestTvName || localLatest >= (latestTvName || '')) {
          latestTvName = mLocal[1];
          latestTvUrl = `https://${GITHUB_OWNER}.github.io/${GITHUB_REPO}/${localLatest}`;
        }
      }
    }
  } catch (eLocal) {}

  // Filtrar solo APKs del catálogo de contenidos (excluyendo el instalador propio de la app)
  const apkAssets = allUniqueAssets.filter(a => {
    const fn = (a.name || '').toLowerCase();
    return (fn.endsWith('.apk') || fn.endsWith('.xapk')) && !fn.startsWith('aridamotec_tv');
  });

  console.log(`📦 Encontrados ${apkAssets.length} archivos APK de catálogo en GitHub Release.`);

  const catalogFile = path.join(__dirname, 'catalog.json');
  let currentCatalog = [];
  if (fs.existsSync(catalogFile)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));
      currentCatalog = parsed.catalog || [];
    } catch (e) {}
  }

  const catalogMap = new Map();
  currentCatalog.forEach(item => {
    catalogMap.set(item.fileName.toLowerCase(), item);
  });

  let newItemsCount = 0;
  let codesGenerated = 0;
  const updatedCatalog = [];

  for (const asset of apkAssets) {
    const fnLower = asset.name.toLowerCase();
    const existing = catalogMap.get(fnLower);
    const downloadUrl = asset.browser_download_url;

    if (existing && existing.browsyCode && existing.browsyCode !== 'Pendiente') {
      // Ya tiene código válido
      existing.id = String(asset.id);
      existing.directDownloadUrl = downloadUrl;
      existing.directUrl = downloadUrl;
      if (!existing.author) existing.author = detectAuthor(existing.cleanName, asset.name);
      updatedCatalog.push(existing);
    } else {
      // Es una APK nueva o carece de código Browsy -> Invocar API de Browsy
      console.log(`⚡ Generando código Browsy automático para: ${asset.name}`);
      const browsy = await requestBrowsyCode(downloadUrl);
      
      const cleanName = existing && existing.cleanName ? existing.cleanName : cleanApkName(asset.name);
      const category = existing && existing.category ? existing.category : classifyCategory(cleanName, asset.name);
      const author = existing && existing.author ? existing.author : detectAuthor(cleanName, asset.name);
      const desc = existing && existing.aiDescription ? existing.aiDescription : `Con esta aplicación podrás disfrutar de contenido y funciones optimizadas en tu Android TV.`;

      const item = {
        id: String(asset.id),
        cleanName: cleanName,
        fileName: asset.name,
        browsyCode: browsy ? browsy.code : (existing ? existing.browsyCode : 'Pendiente'),
        shortUrl: browsy ? browsy.shortUrl : (existing && existing.shortUrl ? existing.shortUrl : ''),
        browsyShortUrl: browsy ? browsy.shortUrl : (existing && existing.browsyShortUrl ? existing.browsyShortUrl : ''),
        directUrl: downloadUrl,
        directDownloadUrl: downloadUrl,
        editKey: browsy ? browsy.editKey : '',
        manageUrl: browsy ? browsy.manageUrl : '',
        status: 'active',
        createdAt: asset.created_at || new Date().toISOString(),
        aiDescription: desc,
        category: category,
        author: author
      };

      updatedCatalog.push(item);
      if (browsy) codesGenerated++;
      newItemsCount++;

      await sleep(1000); // Pausa prudente para la API de Browsy
    }
  }

  // Guardar catálogo unificado
  const finalJson = {
    success: true,
    count: updatedCatalog.length,
    total: updatedCatalog.length,
    catalog: updatedCatalog
  };

  fs.writeFileSync(catalogFile, JSON.stringify(finalJson, null, 2), 'utf8');
  
  const dataCatalog = path.join(__dirname, 'data', 'catalog.json');
  if (fs.existsSync(path.dirname(dataCatalog))) {
    fs.writeFileSync(dataCatalog, JSON.stringify(finalJson, null, 2), 'utf8');
  }

  const tvAppSeed = 'd:/ARIDAMOTEC-TV-APP/app/src/main/assets/catalog_seed.json';
  if (fs.existsSync(path.dirname(tvAppSeed))) {
    fs.writeFileSync(tvAppSeed, JSON.stringify(finalJson, null, 2), 'utf8');
  }

  console.log(`✅ Catálogo actualizado: ${updatedCatalog.length} APKs indexadas (${codesGenerated} códigos generados).`);

  // Reconstruir páginas HTML (index.html y admin.html)
  try {
    console.log('🔨 Recompilando páginas web...');
    execSync('node build.js', { stdio: 'inherit', cwd: __dirname });
  } catch (errBuild) {
    console.error('Error ejecutando build.js:', errBuild.message);
  }

  // Sincronizar automáticamente version.json si hay un nuevo instalador oficial de la app
  try {
    if (latestTvName) {
      const verPath = path.join(__dirname, 'version.json');
      let currentVer = {};
      if (fs.existsSync(verPath)) {
        try { currentVer = JSON.parse(fs.readFileSync(verPath, 'utf8')); } catch (e) {}
      }
      let vCode = currentVer.latestVersionCode || 7;
      if (currentVer.latestVersionName && currentVer.latestVersionName !== latestTvName) {
        vCode = (currentVer.latestVersionCode || 7) + 1;
      }
      const versionData = {
        success: true,
        latestVersionCode: vCode,
        latestVersionName: latestTvName,
        downloadUrl: latestTvUrl || `https://${GITHUB_OWNER}.github.io/${GITHUB_REPO}/ARIDAMOTEC_TV_${latestTvName}.apk`,
        changelog: currentVer.changelog || "Actualización oficial automática con mejoras de rendimiento, catálogo y foco D-Pad.",
        minSupportedVersionCode: 1,
        mandatory: false,
        updatedAt: latestTvCreatedAt || new Date().toISOString()
      };
      fs.writeFileSync(verPath, JSON.stringify(versionData, null, 2), 'utf8');
      const dataVerPath = path.join(__dirname, 'data', 'version.json');
      if (fs.existsSync(path.dirname(dataVerPath))) {
        fs.writeFileSync(dataVerPath, JSON.stringify(versionData, null, 2), 'utf8');
      }
      console.log(`📡 version.json sincronizado para OTA: v${latestTvName} (código ${vCode})`);
    }
  } catch (eVer) {
    console.error('Error sincronizando version.json:', eVer.message);
  }
}

runSync().catch(err => {
  console.error('Error durante la sincronización:', err);
  process.exit(1);
});
