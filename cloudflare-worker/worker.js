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
    if (pathname === '/' || pathname === '/status' || pathname === '/health') {
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
  // URLs internas de origen (GitHub Releases y GitHub Raw Fallback)
  // El cliente NUNCA ve estas URLs
  const releaseUrl = `https://github.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/releases/download/${CONFIG.RELEASE_TAG}/${encodeURIComponent(fileName)}`;
  const rawUrl = `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${CONFIG.DEFAULT_BRANCH}/${encodeURIComponent(fileName)}`;

  // Intentar primero desde GitHub Releases
  let originResponse = await fetch(releaseUrl, {
    method: request.method,
    headers: {
      'User-Agent': 'Aridamotec-CDN-Client/1.0',
      'Accept': '*/*'
    },
    redirect: 'follow',
    cf: {
      cacheEverything: true,
      cacheTtl: CONFIG.CACHE_TTL
    }
  });

  // Si no está en Release, intentar en el repositorio raw
  if (!originResponse.ok && originResponse.status === 404) {
    originResponse = await fetch(rawUrl, {
      method: request.method,
      headers: {
        'User-Agent': 'Aridamotec-CDN-Client/1.0',
        'Accept': '*/*'
      },
      cf: {
        cacheEverything: true,
        cacheTtl: CONFIG.CACHE_TTL
      }
    });
  }

  if (!originResponse.ok) {
    return new Response(JSON.stringify({
      error: 'Archivo APK no encontrado',
      file: fileName,
      status: originResponse.status
    }), {
      status: originResponse.status,
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

/**
 * Retorna el catálogo sanitizado con URLs enmascaradas
 */
async function handleSanitizedCatalog(request, currentUrl) {
  const originCatalogUrl = `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${CONFIG.DEFAULT_BRANCH}/catalog.json`;
  
  try {
    const res = await fetch(originCatalogUrl, {
      headers: { 'User-Agent': 'Aridamotec-CDN/1.0' },
      cf: { cacheTtl: 300 } // Cachear 5 minutos
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Error cargando catálogo' }), { status: 502 });
    }

    const data = await res.json();
    const hostBase = `${currentUrl.protocol}//${currentUrl.host}`;

    // Sanitizar URLs en el catálogo para que apunten al Worker
    if (data.catalog && Array.isArray(data.catalog)) {
      data.catalog = data.catalog.map(item => {
        const cleanItem = { ...item };
        // Enmascarar URL de descarga
        if (cleanItem.fileName) {
          cleanItem.downloadUrl = `${hostBase}/apk/${encodeURIComponent(cleanItem.fileName)}`;
        }
        // Enmascarar URL de icono si apunta a GitHub
        if (cleanItem.icon && cleanItem.icon.includes('github')) {
          cleanItem.icon = cleanItem.icon.replace(/https:\/\/(raw\.githubusercontent\.com|cdn\.jsdelivr\.net\/gh)\/[^/]+\/[^/]+(@[^/]+|\/[^/]+)?/, hostBase);
        }
        return cleanItem;
      });
    }

    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Server': CONFIG.SERVER_HEADER,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

/**
 * Consulta de versión sanitizada
 */
async function handleVersionCheck(request) {
  const originVersionUrl = `https://raw.githubusercontent.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/${CONFIG.DEFAULTBRANCH || 'main'}/version.json`;
  
  try {
    const res = await fetch(originVersionUrl, {
      headers: { 'User-Agent': 'Aridamotec-CDN/1.0' },
      cf: { cacheTtl: 60 } // Cachear 1 minuto
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Error verificando versión' }), { status: 502 });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Server': CONFIG.SERVER_HEADER,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
