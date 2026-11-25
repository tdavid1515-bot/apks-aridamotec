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
  if (fileName.toLowerCase().includes('epictv')) return 'Epic+ TV';
  let name = fileName.replace(/\.(apk|xapk)$/i, '');
  name = name.replace(/[-_.]+/g, ' ');
  name = name.replace(/\b(v?\d+(\.\d+)+)\b/gi, '').trim();
  name = name.replace(/\s+/g, ' ');
  return name || fileName;
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function detectAuthor(cleanName, fileName) {
  const norm = (str) => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const combined = norm(cleanName) + ' ' + norm(fileName);
  if (combined.includes('modbynf')) return 'ModByNF';
  if (combined.includes('original')) return 'Oficial';
  if (combined.includes('focuz')) return 'Xuper Focuz Dev';
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
  if (combined.includes('epic')) return 'Epic Stream Dev';
  if (combined.includes('flystream')) return 'FlyStream Live';
  if (combined.includes('watched')) return 'Watched Project';
  return 'Oficial';
}

function classifyCategory(cleanName, fileName) {
  const norm = (str) => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const combined = norm(cleanName) + ' ' + norm(fileName);

  if (combined.includes('sport') || combined.includes('deport') || combined.includes('futbol') || combined.includes('cricz') || combined.includes('geesports') || combined.includes('ak47') || combined.includes('epic')) {
    return '⚽ Deportes';
  }
  if (combined.includes('animxl') || combined.includes('anime') || combined.includes('tsuzuku') || combined.includes('clipbox') || combined.includes('movie') || combined.includes('cine') || combined.includes('series') || combined.includes('cinehax') || combined.includes('watched')) {
    return '🎬 Películas y Series';
  }
  if (combined.includes('smarttube') || combined.includes('tizentube') || combined.includes('youtube') || combined.includes('music') || combined.includes('musica') || combined.includes('spotify') || combined.includes('radio')) {
    return '🎵 Música';
  }
  if (combined.includes('juego') || combined.includes('game') || combined.includes('retro') || combined.includes('arcade') || combined.includes('emulador')) {
    return '🎮 Juegos';
  }
  if (combined.includes('launcher') || combined.includes('vpn') || combined.includes('wireguard') || combined.includes('surfshark') || combined.includes('weather') || combined.includes('downloader') || combined.includes('browsy') || combined.includes('button mapper') || combined.includes('tvquickactions') || combined.includes('explorer') || combined.includes('x-plore') || combined.includes('xplore') || combined.includes('developer tools') || combined.includes('util')) {
    return '🛠️ Utilitarios';
  }
  return '📺 TV en Vivo';
}

function getContextualDescription(cleanName, fileName, category) {
  const norm = (str) => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const combined = norm(cleanName) + ' ' + norm(fileName);

  if (combined.includes('smarttube')) return 'Reproductor prémium de YouTube para Android TV sin anuncios, con soporte 4K/HDR y reproducción en segundo plano.';
  if (combined.includes('tizentube')) return 'Cliente ligero de YouTube para Android TV sin publicidad molesta y con soporte para alta resolución 4K.';
  if (combined.includes('projectivy')) return 'Lanzador prémium y minimalista para Android TV que sustituye la pantalla principal con una interfaz rápida, limpia y sin anuncios.';
  if (combined.includes('wolf') && combined.includes('launcher')) return 'Lanzador ultra ligero y personalizable que optimiza la pantalla de inicio eliminando lentitud y publicidad.';
  if (combined.includes('atv') && combined.includes('launcher')) return 'Lanzador ágil y configurable para Android TV con navegación fluida y bajo consumo de memoria del sistema.';
  if (combined.includes('x_plore') || combined.includes('xplore')) return 'Potente explorador de archivos de doble panel para Android TV con soporte para almacenamiento interno, USB, redes LAN y nube.';
  if (combined.includes('cx') && (combined.includes('explorer') || combined.includes('file'))) return 'Gestor de archivos intuitivo y visual para explorar carpetas, liberar almacenamiento y organizar tu televisor.';
  if (combined.includes('surfshark')) return 'Red privada virtual (VPN) de alta velocidad para proteger tu privacidad, cifrar tu conexión y desbloquear contenidos globales.';
  if (combined.includes('wireguard')) return 'Protocolo VPN moderno, ultra rápido y de bajo consumo para conexiones cifradas y seguras en Android TV.';
  if (combined.includes('button') && combined.includes('mapper')) return 'Herramienta para reasignar y personalizar las funciones de los botones de tu control remoto con atajos y combinaciones.';
  if (combined.includes('tvquickactions')) return 'Menú de acciones rápidas para tu control remoto con accesos directos, panel lateral y optimizaciones del televisor.';
  if (combined.includes('downloader')) return 'Navegador web y gestor de descargas para buscar, descargar e instalar archivos APK directamente en tu televisor.';
  if (combined.includes('browsy')) return 'Navegador ligero para abrir enlaces y descargar paquetes APK mediante códigos numéricos cortos directamente en tu televisor.';
  if (combined.includes('developer') && combined.includes('tools')) return 'Suite de herramientas técnicas para desarrolladores con análisis de hardware, permisos y depuración en Android TV.';
  if (combined.includes('retrojuegos')) return 'Centro de emulación retro para revivir clásicos de consolas de Arcade, Nintendo y Sega directamente con tu mando.';
  if (combined.includes('crexify')) return 'Plataforma deportiva para ver eventos en directo, partidos de fútbol internacional y canales en alta definición.';
  if (combined.includes('ak47')) return 'Señales deportivas en directo para seguir partidos de fútbol internacional, eventos de combate y torneos mundiales.';
  if (combined.includes('epic')) return 'Plataforma prémium de televisión en vivo y eventos deportivos internacionales en alta definición, con transmisión fluida de fútbol, ligas mundiales y canales en directo optimizada para Android TV.';
  if (combined.includes('cricz')) return 'Transmisiones deportivas en directo de ligas internacionales y eventos deportivos globales en alta calidad.';
  if (combined.includes('geesports')) return 'Cobertura y streaming en vivo de eventos deportivos internacionales, fútbol y canales prémium.';
  if (combined.includes('sportv')) return 'Canales deportivos prémium en directo para disfrutar de ligas de fútbol, campeonatos y torneos en tu televisor.';
  if (combined.includes('sportz')) return 'Plataforma multideportiva para disfrutar de transmisiones en directo de fútbol, baloncesto y eventos deportivos.';
  if (combined.includes('x_sports') || combined.includes('xsports') || (combined.includes('sports') && combined.includes('x-'))) return 'Plataforma deportiva prémium para Android TV con transmisiones en directo de fútbol internacional, boxeo, UFC, baloncesto y las mejores disciplinas.';
  if (combined.includes('ltscore') || combined.includes('lt_score') || combined.includes('latin_events')) return 'Centro deportivo en vivo y marcador interactivo para Android TV con resultados en tiempo real, canales deportivos y coberturas de fútbol latino e internacional.';
  if (combined.includes('goplus')) return 'Plataforma de canales de televisión en vivo con amplia programación de entretenimiento, cine y eventos en directo con señal estable.';
  if (combined.includes('lokuratv')) return 'Servicio completo de televisión en vivo con canales latinos, señales prémium, cine y servidor integrado de alta estabilidad.';
  if (combined.includes('focuz')) return 'Xuper Focuz v5.2.0 es una plataforma avanzada de televisión y streaming optimizada para pantallas grandes, con interfaz ultra ágil, categorización dinámica de canales en vivo y servidor de alto rendimiento.';
  if (combined.includes('xuper') || combined.includes('zuper')) return 'Televisión en directo y entretenimiento con amplia selección de canales nacionales e internacionales y servidor dedicado.';
  if (combined.includes('wiwy')) return 'Acceso a canales de televisión en directo, transmisiones en vivo y contenido variado para toda la familia.';
  if (combined.includes('bixplus')) return 'Plataforma de canales de televisión en vivo, series y películas con excelente estabilidad y reproductor integrado.';
  if (combined.includes('flystream')) return 'Transmisión de televisión en directo y canales familiares con servidor optimizado para Android TV.';
  if (combined.includes('xtreme')) return 'Reproductor de IPTV con acceso a canales de televisión en vivo, señales prémium y eventos en directo.';
  if (combined.includes('mxl')) return 'Potente reproductor de streaming multimedia para listas M3U, canales en vivo y contenidos bajo demanda.';
  if (combined.includes('animxl')) return 'Plataforma especializada en anime con episodios completos, estrenos de temporada y reproducción en alta resolución.';
  if (combined.includes('tsuzuku')) return 'Aplicación dedicada a series y películas de anime japonés con catálogo actualizado y subtítulos en español.';
  if (combined.includes('cinehax')) return 'Catálogo bajo demanda de películas de estreno, cine taquillero y series completas sin cortes publicitarios.';
  if (combined.includes('clipbox')) return 'Servicio de películas y series en streaming con variedad de géneros y calidad Full HD para disfrutar en familia.';
  if (combined.includes('movieplus')) return 'Centro de cine y series bajo demanda con estrenos taquilleros, sagas completas y títulos en 4K.';
  if (combined.includes('watched')) return 'Reproductor multimedia universal para cargar paquetes de contenidos y disfrutar de cine y series en streaming.';

  // Generación dinámica de descripción contextual y única para cualquier nueva APK futura
  const appClean = cleanName || 'Aplicación';
  const authorClean = detectAuthor(cleanName, fileName) || 'Oficial';
  const catClean = (category || 'TV en Vivo').replace(/^[^\w\s]+/, '').trim();

  let verStr = '';
  const m = (fileName || '').match(/[v_\-]?(\d+(\.\d+)+)/i);
  if (m) {
    verStr = ` (v${m[1]})`;
  }

  return `${appClean}${verStr} por ${authorClean}: Aplicación prémium de ${catClean.toLowerCase()} optimizada para Android TV con navegación ágil mediante control remoto y reproducción fluida.`;
}

function isGenericDescription(d) {
  if (!d) return true;
  return d.includes("contenido multimedia y entretenimiento") ||
         d.includes("Televisión en directo y entretenimiento con amplia selección") ||
         d.includes("Con esta aplicación podrás disfrutar") ||
         d.includes("Servicio de televisión en vivo con señales en directo") ||
         d.includes("Herramienta de sistema diseñada para optimizar");
}

async function requestBrowsyCode(directUrl) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch('https://browsy.app/api/shorten', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://browsy.app',
        'Referer': 'https://browsy.app/'
      },
      body: JSON.stringify({ url: directUrl })
    });
    clearTimeout(timeoutId);

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

  const CDN_HOST = 'https://aridamotec-cdn.aridamotec.workers.dev';

  for (const asset of apkAssets) {
    const fnLower = asset.name.toLowerCase();
    const existing = catalogMap.get(fnLower);
    const rawDownloadUrl = asset.browser_download_url;
    const maskedDownloadUrl = `${CDN_HOST}/apk/${encodeURIComponent(asset.name)}`;

    const sanitizedFn = asset.name.replace(/\.apk$/i, '').replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase().replace(/_+/g, '_').replace(/^_+|_+$/g, '');
    const defaultIconUrl = `${CDN_HOST}/icons/${sanitizedFn}.png`;

    if (existing && existing.browsyCode && existing.browsyCode !== 'Pendiente') {
      // Ya tiene código válido
      existing.id = String(asset.id);
      existing.directDownloadUrl = maskedDownloadUrl;
      existing.directUrl = maskedDownloadUrl;
      existing.downloadUrl = maskedDownloadUrl;
      if (asset.size) {
        existing.size = asset.size;
        existing.sizeFormatted = formatBytes(asset.size);
      }
      existing.author = detectAuthor(existing.cleanName, asset.name);
      if (!existing.iconUrl || existing.iconUrl.includes('github')) existing.iconUrl = defaultIconUrl;
      if (isGenericDescription(existing.aiDescription)) {
        existing.aiDescription = getContextualDescription(existing.cleanName, asset.name, existing.category || classifyCategory(existing.cleanName, asset.name));
      }
      updatedCatalog.push(existing);
    } else {
      // Es una APK nueva o carece de código Browsy -> Invocar API de Browsy
      console.log(`⚡ Generando código Browsy automático para: ${asset.name}`);
      const browsy = await requestBrowsyCode(maskedDownloadUrl);
      
      const cleanName = existing && existing.cleanName ? existing.cleanName : cleanApkName(asset.name);
      const category = existing && existing.category ? existing.category : classifyCategory(cleanName, asset.name);
      const author = detectAuthor(cleanName, asset.name);
      const desc = existing && existing.aiDescription && !isGenericDescription(existing.aiDescription) ? existing.aiDescription : getContextualDescription(cleanName, asset.name, category);

      const item = {
        id: String(asset.id),
        cleanName: cleanName,
        fileName: asset.name,
        iconUrl: existing && existing.iconUrl && !existing.iconUrl.includes('github') ? existing.iconUrl : defaultIconUrl,
        browsyCode: browsy ? browsy.code : (existing ? existing.browsyCode : 'Pendiente'),
        shortUrl: browsy ? browsy.shortUrl : (existing && existing.shortUrl ? existing.shortUrl : ''),
        browsyShortUrl: browsy ? browsy.shortUrl : (existing && existing.browsyShortUrl ? existing.browsyShortUrl : ''),
        directUrl: maskedDownloadUrl,
        directDownloadUrl: maskedDownloadUrl,
        downloadUrl: maskedDownloadUrl,
        size: asset.size || (existing && existing.size) || null,
        sizeFormatted: asset.size ? formatBytes(asset.size) : ((existing && existing.sizeFormatted) || null),
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

  // Enriquecer catálogo con las descripciones y categorías personalizadas de Google Sheets
  try {
    const gasGuestUrl = 'https://script.google.com/macros/s/AKfycbx_z7mqkuftzUnC8a4cHRfuApHsoMoqQDT6kC85yDCeuf7H6YUw2gbehvU0jSdwOmKenA/exec?action=guest';
    const gasRes = await fetch(gasGuestUrl, { headers: { 'User-Agent': 'ARIDAMOTEC-Sync-Engine' } });
    if (gasRes.ok) {
      const gasJson = await gasRes.json();
      if (gasJson && Array.isArray(gasJson.catalog)) {
        const gasMap = new Map();
        gasJson.catalog.forEach(g => {
          if (g.fileName) gasMap.set(g.fileName.toLowerCase(), g);
          if (g.id) gasMap.set(String(g.id), g);
        });
        for (const item of updatedCatalog) {
          const matched = (item.fileName && gasMap.get(item.fileName.toLowerCase())) || gasMap.get(String(item.id));
          if (matched) {
            if (matched.aiDescription && matched.aiDescription.trim() && !isGenericDescription(matched.aiDescription)) {
              item.aiDescription = matched.aiDescription.trim();
            }
            if (matched.category && matched.category.trim()) {
              item.category = matched.category.trim();
            }
            if (matched.iconUrl || matched.logo || matched.icon) {
              item.iconUrl = (matched.iconUrl || matched.logo || matched.icon).trim();
            }
          }
          if (isGenericDescription(item.aiDescription)) {
            item.aiDescription = getContextualDescription(item.cleanName, item.fileName, item.category || classifyCategory(item.cleanName, item.fileName));
          }
        }
        console.log('📑 Metadatos y descripciones de Google Sheets fusionados exitosamente en catalog.json.');
      }
    }
  } catch (errGas) {
    console.warn('Aviso: No se pudo consultar Google Sheets para enriquecer descripciones:', errGas.message);
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

  // Sincronizar automáticamente version.json si hay un nuevo instalador oficial de la app
  try {
    if (latestTvName) {
      const verPath = path.join(__dirname, 'version.json');
      let currentVer = {};
      if (fs.existsSync(verPath)) {
        try { currentVer = JSON.parse(fs.readFileSync(verPath, 'utf8')); } catch (e) {}
      }
      let vCode = currentVer.latestVersionCode || 9;
      if (currentVer.latestVersionName && currentVer.latestVersionName !== latestTvName) {
        vCode = (currentVer.latestVersionCode || 9) + 1;
      }
      const defaultCasualChangelog = "• Mejoras visuales en la pantalla y tarjetas de aplicaciones.\n• Mayor rapidez y fluidez al navegar con tu control remoto.\n• Nuevas aplicaciones y contenidos disponibles en el catálogo.\n• Optimizaciones generales de estabilidad y funcionamiento.";
      let casualChangelog = defaultCasualChangelog;
      if (currentVer && currentVer.changelog) {
        const lower = currentVer.changelog.toLowerCase();
        const techTerms = ["anr", "o(1)", "asíncron", "asincron", "código", "codigo", "token", "clave", "hashing", "sha", "arquitectura", "falsos positivos", "socket", "http", "api", "merge", "commit", "ipv4", "fastly", "timeout"];
        const isTech = techTerms.some(t => lower.includes(t));
        if (!isTech) {
          casualChangelog = currentVer.changelog;
        }
      }

      const versionData = {
        success: true,
        latestVersionCode: vCode,
        latestVersionName: latestTvName,
        downloadUrl: `${CDN_HOST}/apk/ARIDAMOTEC_TV_${latestTvName}.apk`,
        changelog: casualChangelog,
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

  // Reconstruir páginas HTML (index.html y admin.html) con la versión recién sincronizada
  try {
    console.log('🔨 Recompilando páginas web con versión actualizada...');
    execSync('node build.js', { stdio: 'inherit', cwd: __dirname });
  } catch (errBuild) {
    console.error('Error ejecutando build.js:', errBuild.message);
  }
}

runSync().catch(err => {
  console.error('Error durante la sincronización:', err);
  process.exit(1);
});
