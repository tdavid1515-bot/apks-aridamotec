/**
 * CLOUDFLARE WORKER: ARIDAMOTEC SECURE EDGE CDN & PROXY
 * 
 * 100% Gratuito (Cloudflare Workers Free Plan: 100,000 peticiones/día).
 * 
 * Propósito:
 * 1. Enmascarar y ocultar totalmente el repositorio GitHub (tdavid1515-bot/apks-aridamotec).
 * 2. Ninguna URL, IP ni encabezado HTTP revelará jamás a GitHub.
 * 3. Cachear las APKs en los más de 300 centros de datos de Cloudflare para descargas a máxima velocidad.
 * 4. Streaming directo de archivos sin límites de tamaño.
 * 5. Soporte opcional para firmas / tokens anti-robo de enlaces.
 */

const CONFIG = {
  // Configuración privada interna (oculta en el servidor edge)
  GITHUB_OWNER: 'tdavid1515-bot',
  GITHUB_REPO: 'apks-aridamotec',
  RELEASE_TAG: 'v1.0.0',
  DEFAULT_BRANCH: 'main',
  
  // Nombre público y marca
  BRAND_NAME: 'ARIDAMOTEC CDN Gateway',
  SERVER_HEADER: 'Aridamotec-Edge-Vault/1.0',
  
  // URL de la API de Google Apps Script (Single Source of Truth para descripciones y metadatos editados en Web Admin)
  GAS_API_URL: 'https://script.google.com/macros/s/AKfycbx_z7mqkuftzUnC8a4cHRfuApHsoMoqQDT6kC85yDCeuf7H6YUw2gbehvU0jSdwOmKenA/exec',

  // Cache TTL en segundos (7 días para APKs inmutables)
  CACHE_TTL: 604800,
  
  // Token de seguridad opcional (dejar vacío si es público para clientes de la app)
  // Si se define un token, se requerirá ?auth=<TOKEN> en la URL
  OPTIONAL_ACCESS_TOKEN: ''
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Manejar CORS para la Web Admin y Web Visitantes
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Range, Authorization',
          'Access-Control-Max-Age': '86400',
        }
      });
    }

    // Ruta de estado / Ping
    if (pathname === '/status' || pathname === '/health' || pathname === '/ping' || pathname === '/api') {
      return new Response(JSON.stringify({
        status: 'online',
        service: CONFIG.BRAND_NAME,
        version: '1.0.0',
        timestamp: new Date().toISOString()
      }, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Server': CONFIG.SERVER_HEADER,
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Redirección definitiva: Eliminación de Web Visitante (El sistema opera exclusivamente con Web Admin y Android TV)
    // Ejemplo: / o /index.html o /catalogo o /cliente o /invitado.html
    if (pathname === '/' || pathname === '/index.html' || pathname === '/catalogo' || pathname === '/cliente' || pathname === '/invitado.html') {
      const hostBase = `${url.protocol}//${url.host}`;
      return Response.redirect(`${hostBase}/admin`, 302);
    }

    // Ruta Web Administrador / Panel de Control Maestro
    // Ejemplo: /admin o /admin.html o /panel
    if (pathname === '/admin' || pathname === '/admin.html' || pathname === '/panel') {
      return handleServeHtml(request, 'admin.html');
    }

    // Validar token de acceso si está configurado
    if (CONFIG.OPTIONAL_ACCESS_TOKEN) {
      const auth = url.searchParams.get('auth');
      if (auth !== CONFIG.OPTIONAL_ACCESS_TOKEN) {
        return new Response(JSON.stringify({ error: 'Acceso no autorizado' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json', 'Server': CONFIG.SERVER_HEADER }
        });
      }
    }

    // Ruta 1: Descarga directa de APK por nombre de archivo
    // Ejemplo: /apk/ARIDAMOTEC_TV_1.4.1.apk o /download/Projectivy_Launcher.apk
    if (pathname.startsWith('/apk/') || pathname.startsWith('/download/')) {
      const rawFileName = pathname.replace(/^\/(apk|download)\//, '').trim();
      const fileName = decodeURIComponent(rawFileName);

      if (!fileName) {
        return new Response(JSON.stringify({ error: 'Nombre de archivo no especificado' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return handleApkDownload(request, fileName, ctx);
    }

    // Ruta 2: Consulta del catálogo sanitizado (sin enlaces de GitHub)
    // Ejemplo: /catalog o /api/catalog
    if (pathname === '/catalog' || pathname === '/api/catalog') {
      return handleSanitizedCatalog(request, url);
    }

    // Ruta 3: Consulta de la última versión de la TV App
    // Ejemplo: /version o /version.json
    if (pathname === '/version' || pathname === '/version.json') {
      return handleVersionCheck(request);
    }

    // Ruta 4: Consulta de Releases enmascarada (para sincronización de Web Admin)
    // Ejemplo: /releases o /api/releases
    if (pathname === '/releases' || pathname === '/api/releases') {
      return handleSanitizedReleases(request, url);
    }

    // Ruta 5: Iconos enmascarados
    // Ejemplo: /icons/ak47sports_v1_6.png
    if (pathname.startsWith('/icons/')) {
      const rawIconName = pathname.replace(/^\/icons\//, '').trim();
      const iconName = decodeURIComponent(rawIconName);
      const iconUrl = `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${CONFIG.DEFAULT_BRANCH}/icons/${encodeURIComponent(iconName)}`;
      try {
        const iconRes = await fetch(iconUrl, {
          cf: { cacheEverything: true, cacheTtl: 2592000 }
        });
        if (iconRes.ok) {
          const cleanH = new Headers();
          cleanH.set('Content-Type', iconRes.headers.get('content-type') || 'image/png');
          const cl = iconRes.headers.get('content-length');
          if (cl) cleanH.set('Content-Length', cl);
          cleanH.set('Server', CONFIG.SERVER_HEADER);
          cleanH.set('Access-Control-Allow-Origin', '*');
          cleanH.set('Cache-Control', 'public, max-age=2592000, immutable');
          return new Response(iconRes.body, { status: 200, headers: cleanH });
        }
      } catch (e) {}
    }

    // 404 para cualquier otra ruta
    return new Response(JSON.stringify({ error: 'Recurso no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', 'Server': CONFIG.SERVER_HEADER }
    });
  }
};

/**
 * Descarga y streaming de APK enmascarado
 */
async function handleApkDownload(request, fileName, ctx) {
  const hostBase = `${new URL(request.url).protocol}//${new URL(request.url).host}`;
  const candidates = [fileName];
  if (fileName.includes(' ')) {
    candidates.push(fileName.replace(/ /g, '.'));
    candidates.push(fileName.replace(/ /g, '_'));
  }
  if (fileName.includes('.')) {
    candidates.push(fileName.replace(/\./g, ' ').replace(/ apk$/i, '.apk'));
  }

  let originResponse = null;
  let matchedName = fileName;

  // 1. Probar en releases por tag configurado (v1.0.0)
  for (const cand of candidates) {
    const rUrl = `https://github.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/releases/download/${CONFIG.RELEASE_TAG}/${encodeURIComponent(cand)}`;
    try {
      const res = await fetch(rUrl, {
        method: request.method,
        headers: { 'User-Agent': 'Aridamotec-CDN-Client/1.0', 'Accept': '*/*' },
        redirect: 'follow',
        cf: { cacheEverything: true, cacheTtl: CONFIG.CACHE_TTL }
      });
      if (res.ok) {
        originResponse = res;
        matchedName = cand;
        break;
      }
    } catch (e) {}
  }

  // 2. Probar en releases/latest
  if (!originResponse || !originResponse.ok) {
    for (const cand of candidates) {
      const latestUrl = `https://github.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/releases/latest/download/${encodeURIComponent(cand)}`;
      try {
        const res = await fetch(latestUrl, {
          method: request.method,
          headers: { 'User-Agent': 'Aridamotec-CDN-Client/1.0', 'Accept': '*/*' },
          redirect: 'follow',
          cf: { cacheEverything: true, cacheTtl: CONFIG.CACHE_TTL }
        });
        if (res.ok) {
          originResponse = res;
          matchedName = cand;
          break;
        }
      } catch (e) {}
    }
  }

  // 3. Fallback a rama principal raw
  if (!originResponse || !originResponse.ok) {
    for (const cand of candidates) {
      const rawUrl = `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${CONFIG.DEFAULT_BRANCH}/${encodeURIComponent(cand)}`;
      try {
        const res = await fetch(rawUrl, {
          method: request.method,
          headers: { 'User-Agent': 'Aridamotec-CDN-Client/1.0', 'Accept': '*/*' },
          cf: { cacheEverything: true, cacheTtl: CONFIG.CACHE_TTL }
        });
        if (res.ok) {
          originResponse = res;
          matchedName = cand;
          break;
        }
      } catch (e) {}
    }
  }

  if (!originResponse || !originResponse.ok) {
    return new Response(JSON.stringify({
      error: 'Archivo APK no encontrado',
      file: fileName,
      status: originResponse ? originResponse.status : 404
    }), {
      status: originResponse ? originResponse.status : 404,
      headers: {
        'Content-Type': 'application/json',
        'Server': CONFIG.SERVER_HEADER
      }
    });
  }

  // Clonar y limpiar cabeceras de respuesta para eliminar CUALQUIER rastro de GitHub
  const cleanHeaders = new Headers();
  
  // Establecer cabeceras MIME y de descarga limpia
  cleanHeaders.set('Content-Type', 'application/vnd.android.package-archive');
  cleanHeaders.set('Content-Disposition', `attachment; filename="${fileName}"`);
  cleanHeaders.set('Server', CONFIG.SERVER_HEADER);
  cleanHeaders.set('Cache-Control', `public, max-age=${CONFIG.CACHE_TTL}, s-maxage=${CONFIG.CACHE_TTL}, immutable`);
  cleanHeaders.set('Access-Control-Allow-Origin', '*');

  // Conservar tamaño de contenido si existe
  const contentLength = originResponse.headers.get('content-length');
  if (contentLength) {
    cleanHeaders.set('Content-Length', contentLength);
  }

  // Conservar ETag o Last-Modified si están presentes
  const etag = originResponse.headers.get('etag');
  if (etag) cleanHeaders.set('ETag', etag);

  // Retornar stream directo de bytes (sin buffer intermedio, ultra rápido y sin límite de RAM)
  return new Response(originResponse.body, {
    status: originResponse.status,
    statusText: originResponse.statusText,
    headers: cleanHeaders
  });
}

// Caché en memoria perimetral para ultra-alta velocidad y resiliencia (TTL 10 segundos)
let edgeCatalogCache = {
  data: null,
  timestamp: 0
};

/**
 * Retorna el catálogo sanitizado con URLs enmascaradas, sincronización en tiempo real
 * con Google Sheets (descripciones y categorías editadas en Web Admin) y GitHub Releases.
 */
async function handleSanitizedCatalog(request, currentUrl) {
  const hostBase = `${currentUrl.protocol}//${currentUrl.host}`;
  const now = Date.now();

  // Si la caché perimetral está fresca (menos de 10 segundos), retornarla de inmediato (0ms de latencia)
  if (edgeCatalogCache.data && (now - edgeCatalogCache.timestamp < 10000)) {
    return new Response(JSON.stringify(edgeCatalogCache.data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Server': CONFIG.SERVER_HEADER,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'
      }
    });
  }

  const originGasUrl = `${CONFIG.GAS_API_URL}?action=guest&_t=${now}`;
  const originReleasesUrl = `https://api.github.com/repos/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/releases`;
  const originCatalogUrl = `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${CONFIG.DEFAULT_BRANCH}/catalog.json?t=${now}`;

  try {
    // Consultar GAS (Google Sheets SSOT), GitHub Releases y catalog.json en paralelo
    const [resGas, resReleases, resCatalog] = await Promise.all([
      fetch(originGasUrl, {
        headers: { 'User-Agent': 'Aridamotec-CDN/1.0' },
        cf: { cacheTtl: 0, cacheEverything: false }
      }).catch(e => { console.warn('Aviso: GAS timeout o error:', e); return null; }),
      fetch(originReleasesUrl, {
        headers: {
          'User-Agent': 'Aridamotec-CDN/1.0',
          'Accept': 'application/vnd.github.v3+json'
        },
        cf: { cacheTtl: 0, cacheEverything: false }
      }).catch(e => { console.warn('Aviso: Releases error:', e); return null; }),
      fetch(originCatalogUrl, {
        headers: { 'User-Agent': 'Aridamotec-CDN/1.0' },
        cf: { cacheTtl: 0, cacheEverything: false }
      }).catch(e => { console.warn('Aviso: Catalog fallback error:', e); return null; })
    ]);

    let baseItems = [];
    let gasCatalogWorked = false;

    // 1. Intentar primero con GAS (contiene las descripciones y categorías reales de Google Sheets)
    if (resGas && resGas.ok) {
      try {
        const gasData = await resGas.json();
        if (gasData && Array.isArray(gasData.catalog) && gasData.catalog.length > 0) {
          baseItems = gasData.catalog;
          gasCatalogWorked = true;
        }
      } catch (eGas) {
        console.warn('Error parseando JSON de GAS:', eGas);
      }
    }

    // 2. Respaldo a catalog.json si GAS no respondió o falló
    if (!gasCatalogWorked && resCatalog && resCatalog.ok) {
      try {
        const catData = await resCatalog.json();
        if (catData && Array.isArray(catData.catalog)) {
          baseItems = catData.catalog;
        }
      } catch (eCat) {
        console.warn('Error parseando catalog.json:', eCat);
      }
    }

    // 3. Crear mapa base indexado por nombre de archivo minúscula
    const catalogMap = new Map();
    for (const item of baseItems) {
      if (!item || !item.fileName) continue;
      const lower = String(item.fileName).trim().toLowerCase();
      const cleanItem = { ...item };

      // Enmascarar URLs de descarga y de iconos a través de este CDN
      const directUrl = `${hostBase}/apk/${encodeURIComponent(cleanItem.fileName)}`;
      cleanItem.downloadUrl = directUrl;
      cleanItem.directUrl = directUrl;
      cleanItem.directDownloadUrl = directUrl;

      const rawIcon = cleanItem.iconUrl || cleanItem.icon || '';
      if (rawIcon && String(rawIcon).includes('github')) {
        const parts = String(rawIcon).split('/');
        cleanItem.iconUrl = `${hostBase}/icons/${parts[parts.length - 1]}`;
        if (cleanItem.icon) cleanItem.icon = cleanItem.iconUrl;
      } else if (!cleanItem.iconUrl) {
        const iconName = lower.replace(/\.(apk|xapk)$/i, '').replace(/[^a-z0-9_]/g, '_') + '.png';
        cleanItem.iconUrl = `${hostBase}/icons/${iconName}`;
      }

      catalogMap.set(lower, cleanItem);
    }

    // 4. Sincronización en vivo contra GitHub Releases (SSOT de archivos binarios reales)
    let liveReleaseSet = new Set();
    if (resReleases && resReleases.ok) {
      try {
        const releases = await resReleases.json();
        const releaseList = Array.isArray(releases) ? releases : [releases];
        for (const rel of releaseList) {
          if (rel && Array.isArray(rel.assets)) {
            for (const a of rel.assets) {
              const fname = (a.name || '').trim();
              const lower = fname.toLowerCase();
              if ((lower.endsWith('.apk') || lower.endsWith('.xapk')) && !lower.startsWith('aridamotec_tv')) {
                liveReleaseSet.add(lower);

                if (!catalogMap.has(lower)) {
                  // Nueva APK en Releases que aún no estaba en el catálogo: incorporarla de inmediato
                  const cleanName = fname.replace(/\.(apk|xapk)$/i, '').replace(/[-_.]+/g, ' ').replace(/\b(v?\d+(\.\d+)+)\b/gi, '').trim() || fname;
                  const directUrl = `${hostBase}/apk/${encodeURIComponent(fname)}`;
                  const iconName = lower.replace(/\.(apk|xapk)$/i, '').replace(/[^a-z0-9_]/g, '_') + '.png';
                  catalogMap.set(lower, {
                    id: String(a.id || Date.now()),
                    cleanName: cleanName,
                    fileName: fname,
                    iconUrl: `${hostBase}/icons/${iconName}`,
                    downloadUrl: directUrl,
                    directUrl: directUrl,
                    directDownloadUrl: directUrl,
                    size: a.size || 0,
                    sizeFormatted: a.size ? (a.size / 1048576).toFixed(1) + ' MB' : '0 MB',
                    status: 'active',
                    createdAt: a.updated_at || new Date().toISOString(),
                    aiDescription: `${cleanName}: Aplicación oficial disponible en catálogo.`,
                    category: '🎮 Juegos',
                    author: 'Oficial'
                  });
                } else {
                  // Actualizar tamaño exacto de bytes desde GitHub Releases
                  const existing = catalogMap.get(lower);
                  if (a.size) {
                    existing.size = a.size;
                    existing.sizeFormatted = (a.size / 1048576).toFixed(1) + ' MB';
                  }
                  if (a.updated_at && !existing.createdAt) {
                    existing.createdAt = a.updated_at;
                  }
                }
              }
            }
          }
        }

        // Si tenemos un set confiable de releases en vivo, excluir las APKs que fueron borradas de GitHub Releases
        if (liveReleaseSet.size > 0) {
          for (const [key] of catalogMap) {
            if (!liveReleaseSet.has(key)) {
              catalogMap.delete(key);
            }
          }
        }
      } catch (eRel) {
        console.warn('Error fusionando releases en catálogo edge:', eRel);
      }
    }

    const finalCatalog = Array.from(catalogMap.values());
    const finalData = {
      success: true,
      count: finalCatalog.length,
      total: finalCatalog.length,
      catalog: finalCatalog
    };

    // Actualizar caché perimetral fresca
    edgeCatalogCache = {
      data: finalData,
      timestamp: Date.now()
    };

    return new Response(JSON.stringify(finalData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Server': CONFIG.SERVER_HEADER,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'
      }
    });
  } catch (err) {
    if (edgeCatalogCache.data) {
      return new Response(JSON.stringify(edgeCatalogCache.data, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Server': CONFIG.SERVER_HEADER,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'
        }
      });
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

/**
 * Consulta de versión sanitizada
 */
async function handleVersionCheck(request) {
  const originVersionUrl = `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${CONFIG.DEFAULT_BRANCH || 'main'}/version.json?t=${Date.now()}`;
  
  try {
    const res = await fetch(originVersionUrl, {
      headers: { 'User-Agent': 'Aridamotec-CDN/1.0' },
      cf: { cacheTtl: 0, cacheEverything: false }
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Error verificando versión' }), { status: 502 });
    }

    const data = await res.json();
    const hostBase = `${new URL(request.url).protocol}//${new URL(request.url).host}`;
    if (data.downloadUrl) {
      const parts = data.downloadUrl.split('/');
      const apkName = parts[parts.length - 1];
      data.downloadUrl = `${hostBase}/apk/${apkName}`;
    }

    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Server': CONFIG.SERVER_HEADER,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

/**
 * Consulta de releases sanitizada (elimina URLs de GitHub para sincronización en Web Admin)
 * Sincronización en tiempo real directo con GitHub Releases API
 */
async function handleSanitizedReleases(request, currentUrl) {
  const originReleasesUrl = `https://api.github.com/repos/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/releases`;
  
  try {
    const res = await fetch(originReleasesUrl, {
      headers: {
        'User-Agent': 'Aridamotec-CDN/1.0',
        'Accept': 'application/vnd.github.v3+json'
      },
      cf: { cacheTtl: 0, cacheEverything: false }
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Error consultando releases' }), { status: 502 });
    }

    const releases = await res.json();
    const hostBase = `${currentUrl.protocol}//${currentUrl.host}`;

    const sanitized = (Array.isArray(releases) ? releases : [releases]).map(rel => {
      const cleanRel = {
        id: rel.id,
        tag_name: rel.tag_name,
        name: rel.name,
        published_at: rel.published_at,
        assets: (rel.assets || []).map(a => ({
          id: a.id,
          name: a.name,
          size: a.size,
          updated_at: a.updated_at,
          browser_download_url: `${hostBase}/apk/${encodeURIComponent(a.name)}`
        }))
      };
      return cleanRel;
    });

    return new Response(JSON.stringify(sanitized, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Server': CONFIG.SERVER_HEADER,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

/**
 * Sirve páginas web HTML completas directamente desde el CDN Gateway de Cloudflare
 */
async function handleServeHtml(request, filename) {
  const originHtmlUrl = `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${CONFIG.DEFAULT_BRANCH}/${filename}?t=${Date.now()}`;
  try {
    const res = await fetch(originHtmlUrl, {
      headers: {
        'User-Agent': 'Aridamotec-CDN/1.0',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      },
      cf: {
        cacheTtl: 0,
        cacheEverything: false
      }
    });
    if (!res.ok) {
      return new Response('Error cargando página web desde origen', { status: 502 });
    }
    const html = await res.text();
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Server': CONFIG.SERVER_HEADER,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (e) {
    return new Response('Error interno al servir página: ' + e.message, { status: 500 });
  }
}
