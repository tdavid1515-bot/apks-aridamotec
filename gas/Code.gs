/**
 * ============================================================================
 * ARIDAMOTEC - SISTEMA GESTOR DE APKS Y CÓDIGOS BROWSY (v2.7)
 * - Repositorio Principal en GitHub Releases (Descarga directa sin restricciones)
 * - Enlace directo de Códigos Browsy a GitHub Releases v1.0.0
 * - Sincronización Automática con GitHub Releases API y Hoja de Google Sheets
 * - Creador de Mensajes WhatsApp con Selección Múltiple y Mini-descripciones IA
 * - Motor Dual de IA (Gemini Flash + Analizador Semántico Integrado)
 * - Modo Invitado Seguro y Panel de Administrador con Protección Criptográfica OTP
 * ============================================================================
 */

const CONFIG = {
  GITHUB_OWNER: 'tdavid1515-bot',
  GITHUB_REPO: 'apks-aridamotec',
  GITHUB_RELEASE_TAG: 'v1.0.0',
  GITHUB_API_RELEASE: 'https://api.github.com/repos/tdavid1515-bot/apks-aridamotec/releases/latest',
  GITHUB_REPO_URL: 'https://github.com/tdavid1515-bot/apks-aridamotec',
  ADMIN_PASSWORD: 'Ariadna1528.',
  SHEET_NAME: 'Control APKs y Códigos Browsy',
  APP_TITLE: 'ARIDAMOTEC - Gestor de APKs',
  GEMINI_API_KEY: '',
  TV_APP_VERSION: '1.4.3',
  TV_APP_VERSION_CODE: 27,
  TV_APP_DOWNLOAD_URL: 'https://aridamotec-cdn.aridamotec.workers.dev/apk/ARIDAMOTEC_TV_1.4.3.apk',
  TV_APP_CHANGELOG: 'Asistente interactivo guiado de Patch NF, deduplicación MAC y mejoras de compatibilidad.'
};

const SEED_APKS = [
  {
    "id": "753516957",
    "fileName": "ANIMXL.apk",
    "cleanName": "ANIMXL (Anime)",
    "category": "🎬 Películas y Series",
    "author": "AnimXL Team",
    "aiDescription": "Con esta aplicación podrás ver tus series y películas de anime favoritas en excelente resolución.",
    "browsyCode": "2943",
    "browsyShortUrl": "https://browsy.app/2943",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/ANIMXL.apk",
    "size": 33064720,
    "sizeFormatted": "31.5 MB",
    "createdAt": "2026-11-16T04:58:59Z",
    "updatedAt": "2026-11-16T04:59:06Z",
    "status": "active",
    "shortUrl": "https://browsy.app/2943",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/ANIMXL.apk"
  },
  {
    "id": "753501528",
    "fileName": "ATV.LAUNCHER.v0.1.42-pro.apk",
    "cleanName": "ATV Launcher Pro",
    "category": "🛠️ Utilitarios",
    "author": "DStudio / ATV",
    "aiDescription": "Con esta aplicación podrás personalizar la interfaz de tu Android TV con un inicio rápido, limpio y sin publicidad.",
    "browsyCode": "7346",
    "browsyShortUrl": "https://browsy.app/7346",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/ATV.LAUNCHER.v0.1.42-pro.apk",
    "size": 8982550,
    "sizeFormatted": "8.6 MB",
    "createdAt": "2026-11-16T04:52:13Z",
    "updatedAt": "2026-11-16T04:52:23Z",
    "status": "active",
    "shortUrl": "https://browsy.app/7346",
    "editKey": "rCPb9e6uMhHP",
    "manageUrl": "https://browsy.app/manage?code=7346&key=rCPb9e6uMhHP",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/ATV.LAUNCHER.v0.1.42-pro.apk"
  },
  {
    "id": "753559487",
    "fileName": "BIXPLUS_V2.apk",
    "cleanName": "BixPlus V2 (IPTV)",
    "category": "📺 TV en Vivo",
    "author": "BixPlus Stream",
    "aiDescription": "Con esta aplicación podrás disfrutar de canales de televisión en vivo, señales internacionales y entretenimiento continuo.",
    "browsyCode": "4368",
    "browsyShortUrl": "https://browsy.app/4368",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/BIXPLUS_V2.apk",
    "size": 30296295,
    "sizeFormatted": "28.9 MB",
    "createdAt": "2026-11-16T05:16:13Z",
    "updatedAt": "2026-11-16T05:16:21Z",
    "status": "active",
    "shortUrl": "https://browsy.app/4368",
    "editKey": "86qKjauK6FAB",
    "manageUrl": "https://browsy.app/manage?code=4368&key=86qKjauK6FAB",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/BIXPLUS_V2.apk"
  },
  {
    "id": "745633982",
    "fileName": "Browsy_1.5.0_APKPure.xapk",
    "cleanName": "Browsy Links (App TV)",
    "category": "🛠️ Utilitarios",
    "author": "Oficial / Desarrollador",
    "aiDescription": "Con esta aplicación podrás abrir códigos numéricos directos en tu televisor Android TV o Fire TV.",
    "browsyCode": "2461",
    "browsyShortUrl": "https://browsy.app/2461",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Browsy_1.5.0_APKPure.xapk",
    "size": 4748428,
    "sizeFormatted": "4.5 MB",
    "createdAt": "2026-11-13T23:53:30Z",
    "updatedAt": "2026-11-13T23:53:32Z",
    "status": "active",
    "shortUrl": "https://browsy.app/2461",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Browsy_1.5.0_APKPure.xapk"
  },
  {
    "id": "745634088",
    "fileName": "ClipBox.apk",
    "cleanName": "ClipBox (Cine & Series)",
    "category": "🎬 Películas y Series",
    "author": "ClipBox Media",
    "aiDescription": "Con esta aplicación podrás ver estrenos de cine y series completas en alta calidad y sin cortes comerciales.",
    "browsyCode": "9594",
    "browsyShortUrl": "https://browsy.app/9594",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/ClipBox.apk",
    "size": 35155514,
    "sizeFormatted": "33.5 MB",
    "createdAt": "2026-11-13T23:53:32Z",
    "updatedAt": "2026-11-13T23:53:41Z",
    "status": "active",
    "shortUrl": "https://browsy.app/9594",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/ClipBox.apk"
  },
  {
    "id": "745640371",
    "fileName": "com.wireguard.android-1.0.20260315.apk",
    "cleanName": "WireGuard VPN",
    "category": "🛠️ Utilitarios",
    "author": "WireGuard LLC",
    "aiDescription": "Con esta aplicación podrás proteger tu conexión y navegar de forma segura y privada.",
    "browsyCode": "9813",
    "browsyShortUrl": "https://browsy.app/9813",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/com.wireguard.android-1.0.20260315.apk",
    "size": 16943472,
    "sizeFormatted": "16.2 MB",
    "createdAt": "2026-11-13T23:55:51Z",
    "updatedAt": "2026-11-13T23:56:02Z",
    "status": "active",
    "shortUrl": "https://browsy.app/9813",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/com.wireguard.android-1.0.20260315.apk"
  },
  {
    "id": "745634574",
    "fileName": "CricZ.TV.v7.3.apk",
    "cleanName": "CricZ TV Deportes",
    "category": "⚽ Deportes",
    "author": "Sports Network Live",
    "aiDescription": "Con esta aplicación podrás seguir eventos deportivos internacionales y partidos en vivo.",
    "browsyCode": "9985",
    "browsyShortUrl": "https://browsy.app/9985",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/CricZ.TV.v7.3.apk",
    "size": 12787278,
    "sizeFormatted": "12.2 MB",
    "createdAt": "2026-11-13T23:53:41Z",
    "updatedAt": "2026-11-13T23:53:45Z",
    "status": "active",
    "shortUrl": "https://browsy.app/9985",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/CricZ.TV.v7.3.apk"
  },
  {
    "id": "745634804",
    "fileName": "Downloader.by.AFTVnews_1.5.0-ForGoogleAndroidDevices_APKPure.apk",
    "cleanName": "Downloader by AFTVnews",
    "category": "🛠️ Utilitarios",
    "author": "AFTVnews.com",
    "aiDescription": "Con esta aplicación podrás gestionar descargas directas e instalar apps de forma rápida y segura.",
    "browsyCode": "3959",
    "browsyShortUrl": "https://browsy.app/3959",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Downloader.by.AFTVnews_1.5.0-ForGoogleAndroidDevices_APKPure.apk",
    "size": 5995174,
    "sizeFormatted": "5.7 MB",
    "createdAt": "2026-11-13T23:53:45Z",
    "updatedAt": "2026-11-13T23:53:47Z",
    "status": "active",
    "shortUrl": "https://browsy.app/3959",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Downloader.by.AFTVnews_1.5.0-ForGoogleAndroidDevices_APKPure.apk"
  },
  {
    "id": "753529004",
    "fileName": "FlyStream.apk",
    "cleanName": "FlyStream (TV en Vivo)",
    "category": "📺 TV en Vivo",
    "author": "FlyStream Media",
    "aiDescription": "Con esta aplicación podrás disfrutar de canales de televisión en vivo, señales internacionales y entretenimiento continuo.",
    "browsyCode": "5866",
    "browsyShortUrl": "https://browsy.app/5866",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/FlyStream.apk",
    "size": 8577095,
    "sizeFormatted": "8.2 MB",
    "createdAt": "2026-11-16T05:04:25Z",
    "updatedAt": "2026-11-16T05:04:28Z",
    "status": "active",
    "shortUrl": "https://browsy.app/5866",
    "editKey": "rCdbKULSZE58",
    "manageUrl": "https://browsy.app/manage?code=5866&key=rCdbKULSZE58",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/FlyStream.apk"
  },
  {
    "id": "753507081",
    "fileName": "GeeSports_.v3.9.apk",
    "cleanName": "GeeSports Deportes",
    "category": "⚽ Deportes",
    "author": "Oficial / Desarrollador",
    "aiDescription": "Con esta aplicación podrás ver todos los deportes en vivo que te gustan y sus repeticiones.",
    "browsyCode": "4584",
    "browsyShortUrl": "https://browsy.app/4584",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/GeeSports_.v3.9.apk",
    "size": 14519985,
    "sizeFormatted": "13.8 MB",
    "createdAt": "2026-11-16T04:54:53Z",
    "updatedAt": "2026-11-16T04:54:56Z",
    "status": "active",
    "shortUrl": "https://browsy.app/4584",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/GeeSports_.v3.9.apk"
  },
  {
    "id": "745635705",
    "fileName": "LokuraTv.apk",
    "cleanName": "LokuraTv Oficial",
    "category": "🛠️ Utilitarios",
    "author": "Lokura TV Dev",
    "aiDescription": "Con esta aplicación podrás disfrutar de canales de televisión en vivo, series y películas.",
    "browsyCode": "7827",
    "browsyShortUrl": "https://browsy.app/7827",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/LokuraTv.apk",
    "size": 79560318,
    "sizeFormatted": "75.9 MB",
    "createdAt": "2026-11-13T23:54:06Z",
    "updatedAt": "2026-11-13T23:54:59Z",
    "status": "active",
    "shortUrl": "https://browsy.app/7827",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/LokuraTv.apk"
  },
  {
    "id": "745638099",
    "fileName": "LokuraTv_Pro_Ultra.apk",
    "cleanName": "LokuraTv Pro Ultra",
    "category": "🛠️ Utilitarios",
    "author": "Lokura TV Dev",
    "aiDescription": "Con esta aplicación podrás disfrutar de canales de televisión en vivo, series y películas.",
    "browsyCode": "7827",
    "browsyShortUrl": "https://browsy.app/7827",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/LokuraTv_Pro_Ultra.apk",
    "size": 47971108,
    "sizeFormatted": "45.7 MB",
    "createdAt": "2026-11-13T23:54:59Z",
    "updatedAt": "2026-11-13T23:55:18Z",
    "status": "active",
    "shortUrl": "https://browsy.app/7827",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/LokuraTv_Pro_Ultra.apk"
  },
  {
    "id": "745639055",
    "fileName": "luma-tv.apk",
    "cleanName": "Luma TV (Canales)",
    "category": "📺 TV en Vivo",
    "author": "Luma TV",
    "aiDescription": "Con esta aplicación podrás disfrutar de televisión latina en vivo, cine y contenido familiar.",
    "browsyCode": "2360",
    "browsyShortUrl": "https://browsy.app/2360",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/luma-tv.apk",
    "size": 6978135,
    "sizeFormatted": "6.7 MB",
    "createdAt": "2026-11-13T23:55:18Z",
    "updatedAt": "2026-11-13T23:55:23Z",
    "status": "active",
    "shortUrl": "https://browsy.app/2360",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/luma-tv.apk"
  },
  {
    "id": "755470039",
    "cleanName": "MoviePlus armeabi v7a",
    "fileName": "MoviePlus.armeabi-v7a.apk",
    "browsyCode": "7887",
    "shortUrl": "https://browsy.app/7887",
    "browsyShortUrl": "https://browsy.app/7887",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/MoviePlus.armeabi-v7a.apk",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/MoviePlus.armeabi-v7a.apk",
    "editKey": "Bjcns8kDDU79",
    "manageUrl": "https://browsy.app/manage?code=7887&key=Bjcns8kDDU79",
    "status": "active",
    "createdAt": "2026-11-16T15:59:52Z",
    "aiDescription": "Con esta aplicación podrás disfrutar de contenido y funciones optimizadas en tu Android TV.",
    "category": "🎬 Películas y Series",
    "author": "Oficial"
  },
  {
    "id": "753516469",
    "fileName": "MXL.IPTV.apk",
    "cleanName": "MXL IPTV Player",
    "category": "📺 TV en Vivo",
    "author": "MXL Tech",
    "aiDescription": "Con esta aplicación podrás disfrutar de canales de televisión en vivo, señales internacionales y entretenimiento continuo.",
    "browsyCode": "8524",
    "browsyShortUrl": "https://browsy.app/8524",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/MXL.IPTV.apk",
    "size": 37363644,
    "sizeFormatted": "35.6 MB",
    "createdAt": "2026-11-16T04:58:42Z",
    "updatedAt": "2026-11-16T04:58:51Z",
    "status": "active",
    "shortUrl": "https://browsy.app/8524",
    "editKey": "ydBgN8fDqPmY",
    "manageUrl": "https://browsy.app/manage?code=8524&key=ydBgN8fDqPmY",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/MXL.IPTV.apk"
  },
  {
    "id": "753516744",
    "fileName": "MXL.MOVIES.apk",
    "cleanName": "MXL Movies (Cine)",
    "category": "🎬 Películas y Series",
    "author": "MXL Tech",
    "aiDescription": "Con esta aplicación podrás acceder a un completo catálogo de cine, estrenos exclusivos y temporadas de series.",
    "browsyCode": "4225",
    "browsyShortUrl": "https://browsy.app/4225",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/MXL.MOVIES.apk",
    "size": 40372693,
    "sizeFormatted": "38.5 MB",
    "createdAt": "2026-11-16T04:58:51Z",
    "updatedAt": "2026-11-16T04:58:59Z",
    "status": "active",
    "shortUrl": "https://browsy.app/4225",
    "editKey": "awGbdN5hBKGb",
    "manageUrl": "https://browsy.app/manage?code=4225&key=awGbdN5hBKGb",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/MXL.MOVIES.apk"
  },
  {
    "id": "745643533",
    "fileName": "PLayer_Pro_base.2.apk",
    "cleanName": "Player Pro (IPTV)",
    "category": "📺 TV en Vivo",
    "author": "Oficial / Desarrollador",
    "aiDescription": "Con esta aplicación podrás disfrutar de televisión en vivo, películas y series con servicio IPTV estable y su propio servidor integrado.",
    "browsyCode": "2270",
    "browsyShortUrl": "https://browsy.app/2270",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/PLayer_Pro_base.2.apk",
    "size": 35098925,
    "sizeFormatted": "33.5 MB",
    "createdAt": "2026-11-13T23:57:18Z",
    "updatedAt": "2026-11-13T23:57:26Z",
    "status": "active",
    "shortUrl": "https://browsy.app/2270",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/PLayer_Pro_base.2.apk"
  },
  {
    "id": "745643792",
    "fileName": "PlayTV_Premium_20.1.apk",
    "cleanName": "PlayTV Premium 20.1",
    "category": "📺 TV en Vivo",
    "author": "PlayTV Stream",
    "aiDescription": "Con esta aplicación podrás disfrutar de una gran variedad de canales en vivo y entretenimiento prémium.",
    "browsyCode": "3114",
    "browsyShortUrl": "https://browsy.app/3114",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/PlayTV_Premium_20.1.apk",
    "size": 12213247,
    "sizeFormatted": "11.6 MB",
    "createdAt": "2026-11-13T23:57:26Z",
    "updatedAt": "2026-11-13T23:57:42Z",
    "status": "active",
    "shortUrl": "https://browsy.app/3114",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/PlayTV_Premium_20.1.apk"
  },
  {
    "id": "745644418",
    "fileName": "PROJJECTIVY.launcher.v4.72.Premium.apk",
    "cleanName": "Projectivy Launcher",
    "category": "🛠️ Utilitarios",
    "author": "Spocky / Projectivy",
    "aiDescription": "Con esta aplicación podrás personalizar y acelerar la pantalla de inicio de tu Android TV.",
    "browsyCode": "7624",
    "browsyShortUrl": "https://browsy.app/7624",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/PROJJECTIVY.launcher.v4.72.Premium.apk",
    "size": 12779842,
    "sizeFormatted": "12.2 MB",
    "createdAt": "2026-11-13T23:57:42Z",
    "updatedAt": "2026-11-13T23:57:53Z",
    "status": "active",
    "shortUrl": "https://browsy.app/7624",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/PROJJECTIVY.launcher.v4.72.Premium.apk"
  },
  {
    "id": "745644814",
    "fileName": "RBTV.apk",
    "cleanName": "RBTV Canales & Deportes",
    "category": "⚽ Deportes",
    "author": "Oficial / Desarrollador",
    "aiDescription": "Con esta aplicación podrás sintonizar eventos deportivos en directo como fútbol internacional, béisbol, baloncesto y boxeo.",
    "browsyCode": "7812",
    "browsyShortUrl": "https://browsy.app/7812",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/RBTV.apk",
    "size": 26868995,
    "sizeFormatted": "25.6 MB",
    "createdAt": "2026-11-13T23:57:53Z",
    "updatedAt": "2026-11-13T23:58:01Z",
    "status": "active",
    "shortUrl": "https://browsy.app/7812",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/RBTV.apk"
  },
  {
    "id": "745645044",
    "fileName": "SPORTV_3.9.VIP.apk",
    "cleanName": "SPORTV 3.9 VIP (Deportes)",
    "category": "⚽ Deportes",
    "author": "Sports Network Live",
    "aiDescription": "Con esta aplicación podrás vivir la pasión del fútbol internacional y los mejores canales deportivos.",
    "browsyCode": "4065",
    "browsyShortUrl": "https://browsy.app/4065",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/SPORTV_3.9.VIP.apk",
    "size": 15771573,
    "sizeFormatted": "15.0 MB",
    "createdAt": "2026-11-13T23:58:01Z",
    "updatedAt": "2026-11-13T23:58:06Z",
    "status": "active",
    "shortUrl": "https://browsy.app/4065",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/SPORTV_3.9.VIP.apk"
  },
  {
    "id": "745645208",
    "fileName": "Sportz.X.VERSION.3.2.apk",
    "cleanName": "Sportz X Deportes",
    "category": "⚽ Deportes",
    "author": "Oficial / Desarrollador",
    "aiDescription": "Con esta aplicación podrás sintonizar transmisiones deportivas de todo el mundo en tiempo real.",
    "browsyCode": "5280",
    "browsyShortUrl": "https://browsy.app/5280",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Sportz.X.VERSION.3.2.apk",
    "size": 20929342,
    "sizeFormatted": "20.0 MB",
    "createdAt": "2026-11-13T23:58:06Z",
    "updatedAt": "2026-11-13T23:58:15Z",
    "status": "active",
    "shortUrl": "https://browsy.app/5280",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Sportz.X.VERSION.3.2.apk"
  },
  {
    "id": "745645628",
    "fileName": "Surfshark.apk",
    "cleanName": "Surfshark VPN",
    "category": "🛠️ Utilitarios",
    "author": "Surfshark B.V.",
    "aiDescription": "Con esta aplicación podrás navegar seguro, proteger tu privacidad y desbloquear contenidos globales.",
    "browsyCode": "2915",
    "browsyShortUrl": "https://browsy.app/2915",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Surfshark.apk",
    "size": 156381378,
    "sizeFormatted": "149.1 MB",
    "createdAt": "2026-11-13T23:58:15Z",
    "updatedAt": "2026-11-13T23:59:02Z",
    "status": "active",
    "shortUrl": "https://browsy.app/2915",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Surfshark.apk"
  },
  {
    "id": "753500137",
    "fileName": "TizenTube_v2.03_YouTube_arm.apk",
    "cleanName": "TizenTube (YouTube arm)",
    "category": "🛠️ Utilitarios",
    "author": "TizenTube Project",
    "aiDescription": "Con esta aplicación podrás ver YouTube en tu televisor con tema oscuro y sin interrupciones.",
    "browsyCode": "9360",
    "browsyShortUrl": "https://browsy.app/9360",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/TizenTube_v2.03_YouTube_arm.apk",
    "size": 80570825,
    "sizeFormatted": "76.8 MB",
    "createdAt": "2026-11-16T04:51:31Z",
    "updatedAt": "2026-11-16T05:18:31Z",
    "status": "active",
    "shortUrl": "https://browsy.app/9360",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/TizenTube_v2.03_YouTube_arm.apk"
  },
  {
    "id": "753498273",
    "fileName": "TizenTube_v2.03_YouTube_arm64.apk",
    "cleanName": "TizenTube (YouTube arm64)",
    "category": "🛠️ Utilitarios",
    "author": "TizenTube Project",
    "aiDescription": "Con esta aplicación podrás ver YouTube en tu televisor con tema oscuro y sin interrupciones.",
    "browsyCode": "9360",
    "browsyShortUrl": "https://browsy.app/9360",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/TizenTube_v2.03_YouTube_arm64.apk",
    "size": 153048724,
    "sizeFormatted": "146.0 MB",
    "createdAt": "2026-11-16T04:50:38Z",
    "updatedAt": "2026-11-16T05:18:31Z",
    "status": "active",
    "shortUrl": "https://browsy.app/9360",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/TizenTube_v2.03_YouTube_arm64.apk"
  },
  {
    "id": "753517643",
    "fileName": "Tsuzuku.v4.1.4.Android.TV.apk",
    "cleanName": "Tsuzuku TV (Anime)",
    "category": "🎬 Películas y Series",
    "author": "Tsuzuku Project",
    "aiDescription": "Con esta aplicación podrás disfrutar de estrenos de anime en máxima calidad, series completas y películas animadas.",
    "browsyCode": "3893",
    "browsyShortUrl": "https://browsy.app/3893",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Tsuzuku.v4.1.4.Android.TV.apk",
    "size": 11438058,
    "sizeFormatted": "10.9 MB",
    "createdAt": "2026-11-16T04:59:20Z",
    "updatedAt": "2026-11-16T04:59:23Z",
    "status": "active",
    "shortUrl": "https://browsy.app/3893",
    "editKey": "U7NsoPTqYkfQ",
    "manageUrl": "https://browsy.app/manage?code=3893&key=U7NsoPTqYkfQ",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Tsuzuku.v4.1.4.Android.TV.apk"
  },
  {
    "id": "753528905",
    "fileName": "Watched.apk",
    "cleanName": "Watched Media Player",
    "category": "🎬 Películas y Series",
    "author": "Watched AG",
    "aiDescription": "Con esta aplicación podrás acceder a un completo catálogo de cine, estrenos exclusivos y temporadas de series.",
    "browsyCode": "6015",
    "browsyShortUrl": "https://browsy.app/6015",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Watched.apk",
    "size": 3163906,
    "sizeFormatted": "3.0 MB",
    "createdAt": "2026-11-16T05:04:23Z",
    "updatedAt": "2026-11-16T05:04:25Z",
    "status": "active",
    "shortUrl": "https://browsy.app/6015",
    "editKey": "z6HQ2KCpjNZR",
    "manageUrl": "https://browsy.app/manage?code=6015&key=z6HQ2KCpjNZR",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Watched.apk"
  },
  {
    "id": "745652066",
    "fileName": "WiwyXuper.apk",
    "cleanName": "WiwyXuper (TV en Vivo)",
    "category": "📺 TV en Vivo",
    "author": "ModByNF",
    "aiDescription": "Con esta aplicación podrás disfrutar de canales de televisión en vivo, series y películas.",
    "browsyCode": "9290",
    "browsyShortUrl": "https://browsy.app/9290",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/WiwyXuper.apk",
    "size": 41462808,
    "sizeFormatted": "39.5 MB",
    "createdAt": "2026-11-14T00:00:55Z",
    "updatedAt": "2026-11-14T00:01:51Z",
    "status": "active",
    "shortUrl": "https://browsy.app/9290",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/WiwyXuper.apk"
  },
  {
    "id": "745656986",
    "fileName": "Wolf.Launcher.0.1.9.apk",
    "cleanName": "Wolf Launcher TV",
    "category": "🛠️ Utilitarios",
    "author": "Wolf Dev",
    "aiDescription": "Con esta aplicación podrás transformar el menú de tu TV con un diseño elegante, limpio y veloz.",
    "browsyCode": "7242",
    "browsyShortUrl": "https://browsy.app/7242",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Wolf.Launcher.0.1.9.apk",
    "size": 3272501,
    "sizeFormatted": "3.1 MB",
    "createdAt": "2026-11-14T00:02:53Z",
    "updatedAt": "2026-11-14T00:02:55Z",
    "status": "active",
    "shortUrl": "https://browsy.app/7242",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/Wolf.Launcher.0.1.9.apk"
  },
  {
    "id": "753545640",
    "fileName": "XTREMETV.apk",
    "cleanName": "XTREMETV (IPTV)",
    "category": "📺 TV en Vivo",
    "author": "Xtreme TV Mod",
    "aiDescription": "Con esta aplicación podrás ver televisión prémium, eventos especiales y contenido bajo demanda.",
    "browsyCode": "6603",
    "browsyShortUrl": "https://browsy.app/6603",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/XTREMETV.apk",
    "size": 5777641,
    "sizeFormatted": "5.5 MB",
    "createdAt": "2026-11-16T05:11:11Z",
    "updatedAt": "2026-11-16T05:11:17Z",
    "status": "active",
    "shortUrl": "https://browsy.app/6603",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/XTREMETV.apk"
  },
  {
    "id": "745659301",
    "fileName": "XUPER.TV.v4.99.20.Android.TV.Original.apk",
    "cleanName": "Xuper TV v4.99.20 Original",
    "category": "📺 TV en Vivo",
    "author": "Oficial",
    "aiDescription": "Con esta aplicación podrás ver TV en vivo, series, películas y anime que te gustan.",
    "browsyCode": "9249",
    "browsyShortUrl": "https://browsy.app/9249",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/XUPER.TV.v4.99.20.Android.TV.Original.apk",
    "size": 35705638,
    "sizeFormatted": "34.1 MB",
    "createdAt": "2026-11-14T00:03:53Z",
    "updatedAt": "2026-11-16T05:18:31Z",
    "status": "active",
    "shortUrl": "https://browsy.app/9249",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/XUPER.TV.v4.99.20.Android.TV.Original.apk"
  },
  {
    "id": "747488097",
    "fileName": "XuperTv-NF-v4.35.1-ModByNF.apk",
    "cleanName": "XuperTV NF v4.35 ModByNF",
    "category": "📺 TV en Vivo",
    "author": "ModByNF",
    "aiDescription": "Con esta aplicación podrás ver TV en vivo, películas, series y anime con carga ultrarrápida.",
    "browsyCode": "7522",
    "browsyShortUrl": "https://browsy.app/7522",
    "directDownloadUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/XuperTv-NF-v4.35.1-ModByNF.apk",
    "size": 51374730,
    "sizeFormatted": "49.0 MB",
    "createdAt": "2026-11-14T12:53:29Z",
    "updatedAt": "2026-11-14T12:56:25Z",
    "status": "active",
    "shortUrl": "https://browsy.app/7522",
    "directUrl": "https://aridamotec-cdn.aridamotec.workers.dev/apk/XuperTv-NF-v4.35.1-ModByNF.apk"
  }
];

function doPost(e) {
  let postData = null;
  try {
    if (e && e.postData && e.postData.contents) {
      postData = JSON.parse(e.postData.contents);
    }
  } catch (err) {
    Logger.log('Error parseando JSON en doPost: ' + err);
  }

  // Reporte de aplicaciones instaladas desde Android TV
  if (postData && (postData.action === 'reportInstalledApps' || postData.act === 'reportInstalledApps')) {
    const res = saveInstalledApps(postData.mac, postData.apps, postData.storage_free_mb, postData.storage_total_mb);
    return ContentService.createTextOutput(JSON.stringify(res))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Despacho de orden remota desde el Panel de Administración
  if (postData && (postData.action === 'sendRemoteCommand' || postData.act === 'sendRemoteCommand')) {
    let cmdObj = postData.command || postData.cmd;
    if (!cmdObj && (postData.cmdAction || postData.remoteAction)) {
      cmdObj = {
        action: postData.cmdAction || postData.remoteAction,
        fileName: postData.cmdFile || postData.fileName || '',
        packageName: postData.cmdPackage || postData.packageName || '',
        downloadUrl: postData.cmdUrl || postData.downloadUrl || ''
      };
    }
    const res = sendRemoteCommand(postData.pwd, postData.mac, cmdObj);
    return ContentService.createTextOutput(JSON.stringify(res))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Manejar Webhooks de GitHub (Releases, assets, push o ping)
  if (postData) {
    Logger.log('GitHub Webhook recibido en doPost. Acción: ' + (postData.action || 'evento'));
    try {
      // 1. Ejecutar sincronización instantánea con GitHub Releases y actualizar la hoja
      const syncResult = syncApks(CONFIG.ADMIN_PASSWORD, true);

      // 2. Invalidar cachés para que las próximas consultas entreguen los datos frescos en el acto
      const cache = CacheService.getScriptCache();
      cache.remove('guest_catalog_cache_v4');
      cache.remove('guest_catalog_cache_v3');
      cache.remove('gh_repo_assets_v1');

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        source: 'github_webhook',
        action: postData.action || 'release_event',
        sync: syncResult,
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    } catch (eSync) {
      Logger.log('Error procesando Webhook en syncApks: ' + eSync);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: eSync.message
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: 'Payload vacío o no reconocido'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action) {
    const act = e.parameter.action;
    let res = null;

    if (act === 'guest') {
      res = getGuestCatalog();
    } else if (act === 'apks') {
      res = getApksList(e.parameter.pwd);
    } else if (act === 'scan') {
      const files = getRepositoryFilesList();
      res = { count: files.length, files: files };
    } else if (act === 'sheet') {
      const sheet = getOrCreateSheet();
      res = sheet.getDataRange().getValues();
    } else if (act === 'sheetInfo') {
      const ss = getSpreadsheet();
      res = {
        success: true,
        id: ss.getId(),
        name: ss.getName(),
        url: ss.getUrl()
      };
    } else if (act === 'sync') {
      res = syncApks(e.parameter.pwd, true);
    } else if (act === 'emptyTrash') {
      res = emptyTrash(e.parameter.pwd);
    } else if (act === 'restore') {
      res = restoreApk(e.parameter.pwd, e.parameter.fileId);
    } else if (act === 'restoreAll') {
      res = restoreAllDeleted(e.parameter.pwd);
    } else if (act === 'generateCode') {
      res = generateCodeForSingleApk(e.parameter.pwd, e.parameter.fileId);
    } else if (act === 'deletePermanent') {
      res = deletePermanently(e.parameter.pwd, e.parameter.fileId);
    } else if (act === 'updateCategory') {
      res = updateApkCategory(e.parameter.pwd, e.parameter.fileId, e.parameter.category, e.parameter.fileName);
    } else if (act === 'deduplicate') {
      res = deduplicateSheetRows(e.parameter.pwd);
    } else if (act === 'updateDesc' || act === 'updateDescription') {
      res = updateApkDescription(e.parameter.pwd, e.parameter.fileId, e.parameter.desc || e.parameter.description, e.parameter.fileName);
    } else if (act === 'interval') {
      res = setSyncInterval(e.parameter.pwd, e.parameter.mins);
    } else if (act === 'describe') {
      res = generateApkDescription(e.parameter.pwd, e.parameter.name);
    } else if (act === 'appVersion' || act === 'checkUpdate' || act === 'ota') {
      res = getLatestTvAppInfo();
    } else if (act === 'checkMac') {
      res = checkDeviceMac(e.parameter.mac, e.parameter.model, e.parameter.storage_free || e.parameter.storage_free_mb, e.parameter.storage_total || e.parameter.storage_total_mb);
    } else if (act === 'reportInstalledApps') {
      res = saveInstalledApps(e.parameter.mac, e.parameter.apps, e.parameter.storage_free_mb || e.parameter.storage_free, e.parameter.storage_total_mb || e.parameter.storage_total);
    } else if (act === 'sendRemoteCommand') {
      let cmdParam = e.parameter.cmd || e.parameter.command;
      let cmdObj = null;
      if (cmdParam) {
        try { cmdObj = (typeof cmdParam === 'string') ? JSON.parse(cmdParam) : cmdParam; } catch (eParse) { cmdObj = cmdParam; }
      }
      if (!cmdObj) {
        const rAct = e.parameter.cmdAction || e.parameter.action;
        if (rAct && rAct !== 'sendRemoteCommand') {
          cmdObj = {
            action: rAct,
            fileName: e.parameter.cmdFile || e.parameter.fileName || '',
            packageName: e.parameter.cmdPackage || e.parameter.packageName || '',
            downloadUrl: e.parameter.cmdUrl || e.parameter.downloadUrl || ''
          };
        } else if (e.parameter.cmdAction) {
          cmdObj = {
            action: e.parameter.cmdAction,
            fileName: e.parameter.cmdFile || '',
            packageName: e.parameter.cmdPackage || '',
            downloadUrl: e.parameter.cmdUrl || ''
          };
        }
      }
      res = sendRemoteCommand(e.parameter.pwd, e.parameter.mac, cmdObj);
    } else if (act === 'macList') {
      res = getMacDevicesList(e.parameter.pwd);
    } else if (act === 'saveMac') {
      res = saveOrUpdateMac(e.parameter.pwd, e.parameter);
    } else if (act === 'toggleMac') {
      res = toggleMacStatus(e.parameter.pwd, e.parameter.mac, e.parameter.status);
    } else if (act === 'deleteMac') {
      res = deleteMacDevice(e.parameter.pwd, e.parameter.mac);
    } else if (act === 'recoveryRequest') {
      res = requestPasswordRecovery();
    } else if (act === 'recoveryVerify') {
      res = verifyRecoveryCode(e.parameter.otp);
    } else if (act === 'recoveryReset') {
      res = resetAdminPassword(e.parameter.token, e.parameter.newPwd);
    }

    if (res !== null) {
      return ContentService.createTextOutput(JSON.stringify(res))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  const isModeAdmin = (e && e.parameter && (e.parameter.mode === 'admin' || e.parameter.view === 'admin' || e.parameter.admin !== undefined));
  const fileToServe = isModeAdmin ? 'Admin' : 'Index';

  return HtmlService.createHtmlOutputFromFile(fileToServe)
    .setTitle(isModeAdmin ? 'ARIDAMOTEC | Panel de Administración' : 'ARIDAMOTEC | Catálogo Oficial de Aplicaciones')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getAdminPassword() {
  try {
    const props = PropertiesService.getScriptProperties();
    const custom = props.getProperty('ADMIN_PASSWORD');
    if (custom && custom.trim() !== '') return custom.trim();
  } catch (e) {
    Logger.log('Error leyendo PropertiesService para ADMIN_PASSWORD: ' + e);
  }
  return CONFIG.ADMIN_PASSWORD;
}

function verifyAuth(password) {
  return password === getAdminPassword();
}

function getAuthorizedEmail() {
  try {
    const props = PropertiesService.getScriptProperties();
    const custom = props.getProperty('ADMIN_RECOVERY_EMAIL');
    if (custom && custom.trim() !== '') return custom.trim();
  } catch (e) {}

  try {
    const userEmail = Session.getEffectiveUser().getEmail();
    if (userEmail && userEmail.trim() !== '') return userEmail.trim();
  } catch (e) {}

  try {
    const ownerEmail = DriveApp.getRootFolder().getOwner().getEmail();
    if (ownerEmail && ownerEmail.trim() !== '') return ownerEmail.trim();
  } catch (e) {}

  return 'administrador@aridamotec.com';
}

function maskEmail(email) {
  if (!email || !email.includes('@')) return 'tu***@correo.com';
  const parts = email.split('@');
  const user = parts[0];
  const domain = parts[1];
  if (user.length <= 2) {
    return user[0] + '***@' + domain;
  }
  const prefix = user.substring(0, Math.min(2, Math.floor(user.length / 2)));
  const suffix = user.slice(-1);
  return prefix + '*****' + suffix + '@' + domain;
}

// ================= RECUPERACIÓN SEGURA DE CONTRASEÑA =================
function requestPasswordRecovery() {
  const props = PropertiesService.getScriptProperties();
  const now = Date.now();

  const lastReq = parseInt(props.getProperty('RECOVERY_LAST_REQ') || '0', 10);
  if (now - lastReq < 120000) {
    const waitSec = Math.ceil((120000 - (now - lastReq)) / 1000);
    return {
      success: false,
      error: 'Por seguridad, debes esperar ' + waitSec + ' segundos antes de solicitar otro código.'
    };
  }

  const dailyKey = 'RECOVERY_DAILY_' + new Date().toISOString().slice(0, 10);
  const dailyCount = parseInt(props.getProperty(dailyKey) || '0', 10);
  if (dailyCount >= 5) {
    return {
      success: false,
      error: 'Has alcanzado el límite máximo diario de solicitudes de recuperación (5). Intenta más tarde.'
    };
  }

  const email = getAuthorizedEmail();
  if (!email) {
    return { success: false, error: 'No se encontró un correo autorizado configurado.' };
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expiry = now + (15 * 60 * 1000);

  props.setProperty('RECOVERY_OTP', otp);
  props.setProperty('RECOVERY_EXPIRY', String(expiry));
  props.setProperty('RECOVERY_ATTEMPTS', '0');
  props.setProperty('RECOVERY_LAST_REQ', String(now));
  props.setProperty(dailyKey, String(dailyCount + 1));

  const subject = '🔐 [ARIDAMOTEC] Código de Recuperación de Administrador: ' + otp;
  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #060914; color: #f8fafc; border: 1px solid #00e5ff; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.7);">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #00e5ff; margin: 0 0 6px 0; font-size: 22px; letter-spacing: 0.5px;">⚡ ARIDAMOTEC SECURITY</h2>
        <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Gestor de APKs & Códigos Browsy</span>
      </div>

      <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; margin: 0 0 18px 0;">
        Se ha solicitado la <strong>recuperación de la contraseña de Administrador</strong> para la plataforma ARIDAMOTEC.
      </p>

      <div style="background: rgba(0, 229, 255, 0.08); border: 2px dashed #00e5ff; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
        <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; margin-bottom: 8px;">Tu código de seguridad temporal</span>
        <span style="display: block; font-size: 38px; font-weight: 800; color: #00e5ff; letter-spacing: 8px; font-family: monospace;">${otp}</span>
      </div>

      <div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 12px 14px; border-radius: 6px; margin-bottom: 20px;">
        <p style="margin: 0; color: #fcd34d; font-size: 12px; line-height: 1.5;">
          ⏱️ Este código expira en <strong>15 minutos</strong> y tiene un máximo de <strong>3 intentos</strong> permitidos.
        </p>
      </div>

      <p style="color: #64748b; font-size: 11px; line-height: 1.5; margin: 0; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px;">
        🔒 Si no solicitaste este código, puedes ignorar este mensaje con total seguridad. Nadie puede acceder a la administración sin este código de verificación.
      </p>
    </div>
  `;

  let sent = false;
  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });
    sent = true;
  } catch (e1) {
    Logger.log('MailApp falló, probando GmailApp: ' + e1);
    try {
      GmailApp.sendEmail(email, subject, 'Tu código de verificación es: ' + otp, { htmlBody: htmlBody });
      sent = true;
    } catch (e2) {
      Logger.log('GmailApp falló: ' + e2);
    }
  }

  if (!sent) {
    return { success: false, error: 'No se pudo enviar el correo de verificación. Verifica los permisos de tu cuenta de Google.' };
  }

  return {
    success: true,
    maskedEmail: maskEmail(email),
    message: 'Código de verificación enviado exitosamente a ' + maskEmail(email)
  };
}

function verifyRecoveryCode(otpInput) {
  const props = PropertiesService.getScriptProperties();
  const storedOtp = props.getProperty('RECOVERY_OTP');
  const expiry = parseInt(props.getProperty('RECOVERY_EXPIRY') || '0', 10);
  let attempts = parseInt(props.getProperty('RECOVERY_ATTEMPTS') || '0', 10);
  const now = Date.now();

  if (!storedOtp || !expiry) {
    return { success: false, error: 'No hay ninguna solicitud de recuperación activa o ya expiró.' };
  }

  if (now > expiry) {
    props.deleteProperty('RECOVERY_OTP');
    props.deleteProperty('RECOVERY_EXPIRY');
    props.deleteProperty('RECOVERY_ATTEMPTS');
    return { success: false, error: 'El código ha expirado (límite de 15 minutos). Solicita uno nuevo.' };
  }

  attempts++;
  props.setProperty('RECOVERY_ATTEMPTS', String(attempts));

  if (String(otpInput).trim() !== storedOtp.trim()) {
    if (attempts >= 3) {
      props.deleteProperty('RECOVERY_OTP');
      props.deleteProperty('RECOVERY_EXPIRY');
      props.deleteProperty('RECOVERY_ATTEMPTS');
      return { success: false, error: 'Has superado el límite de 3 intentos fallidos. Por seguridad, el código fue invalidado.' };
    }
    return { success: false, error: 'Código incorrecto. Te quedan ' + (3 - attempts) + ' intento(s).' };
  }

  const resetToken = 'RST_' + Utilities.getUuid();
  props.setProperty('RESET_TOKEN', resetToken);
  props.setProperty('RESET_TOKEN_EXPIRY', String(now + 600000));

  props.deleteProperty('RECOVERY_OTP');
  props.deleteProperty('RECOVERY_EXPIRY');
  props.deleteProperty('RECOVERY_ATTEMPTS');

  const currentPassword = getAdminPassword();

  return {
    success: true,
    resetToken: resetToken,
    currentPassword: currentPassword,
    message: 'Código verificado con éxito.'
  };
}

function resetAdminPassword(resetToken, newPassword) {
  const props = PropertiesService.getScriptProperties();
  const storedToken = props.getProperty('RESET_TOKEN');
  const expiry = parseInt(props.getProperty('RESET_TOKEN_EXPIRY') || '0', 10);
  const now = Date.now();

  if (!storedToken || !expiry || now > expiry || resetToken !== storedToken) {
    return { success: false, error: 'Token de restablecimiento inválido o expirado. Inicia el proceso nuevamente.' };
  }

  if (!newPassword || newPassword.trim().length < 6) {
    return { success: false, error: 'La nueva contraseña debe tener al menos 6 caracteres.' };
  }

  props.setProperty('ADMIN_PASSWORD', newPassword.trim());
  props.deleteProperty('RESET_TOKEN');
  props.deleteProperty('RESET_TOKEN_EXPIRY');

  return {
    success: true,
    message: '¡Contraseña de Administrador actualizada exitosamente!'
  };
}

// ================= CATÁLOGO SEGURO PARA MODO INVITADO =================
function overlaySheetMetadata(items) {
  if (!items || !items.length) return items;
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return items;

    const metaMap = new Map();
    for (let i = 1; i < data.length; i++) {
      const rowId = String(data[i][0] || '').trim();
      const rowFile = String(data[i][2] || '').trim().toLowerCase();
      const rowCode = String(data[i][3] || '').trim();
      const rowShort = String(data[i][4] || '').trim();
      const rowDirect = String(data[i][5] || '').trim();
      const rowDesc = String(data[i][11] || '').trim();
      const rowCat = String(data[i][12] || '').trim();
      if (rowFile || rowId) {
        const meta = {};
        if (rowDesc) meta.aiDescription = rowDesc;
        if (rowCat) meta.category = rowCat;
        if (rowCode) meta.browsyCode = rowCode;
        if (rowShort) meta.browsyShortUrl = rowShort;
        if (rowDirect) meta.directDownloadUrl = rowDirect;
        if (rowFile) metaMap.set(rowFile, meta);
        if (rowId) metaMap.set(rowId, meta);
      }
    }

    items.forEach(it => {
      const idKey = String(it.id || '');
      const fnKey = String(it.fileName || '').toLowerCase();
      const meta = metaMap.get(fnKey) || (idKey ? metaMap.get(idKey) : null);
      if (meta) {
        if (meta.aiDescription) it.aiDescription = meta.aiDescription;
        if (meta.category) it.category = meta.category;
        if (meta.browsyCode && !it.browsyCode) it.browsyCode = meta.browsyCode;
        if (meta.browsyShortUrl && !it.browsyShortUrl) it.browsyShortUrl = meta.browsyShortUrl;
        if (meta.directDownloadUrl && !it.directDownloadUrl) it.directDownloadUrl = meta.directDownloadUrl;
      }
    });

    // Sanitización hermética de Cloudflare Worker CDN (cero exposición de GitHub)
    items.forEach(it => {
      const fn = it.fileName || '';
      if (fn) {
        it.directDownloadUrl = 'https://aridamotec-cdn.aridamotec.workers.dev/apk/' + encodeURIComponent(fn);
        it.directUrl = it.directDownloadUrl;
        it.downloadUrl = it.directDownloadUrl;
      } else if (it.directDownloadUrl) {
        it.directDownloadUrl = it.directDownloadUrl.replace(/https:\/\/github\.com\/[^/]+\/[^/]+\/releases\/download\/[^/]+\//, 'https://aridamotec-cdn.aridamotec.workers.dev/apk/');
        it.directUrl = it.directDownloadUrl;
        it.downloadUrl = it.directDownloadUrl;
      }
      if (it.iconUrl && String(it.iconUrl).includes('github')) {
        const parts = String(it.iconUrl).split('/');
        it.iconUrl = 'https://aridamotec-cdn.aridamotec.workers.dev/icons/' + parts[parts.length - 1];
      }
    });
  } catch (eM) {
    Logger.log('Error superponiendo metadatos de hoja: ' + eM);
  }
  return items;
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// ÚNICA FUENTE DE VERDAD (SSOT) UNIFICADA PARA WEB ADMIN, VISITANTES Y APP ANDROID TV
function getUnifiedCatalogList() {
  let catalog = [];
  try {
    const url = 'https://raw.githubusercontent.com/' + CONFIG.GITHUB_OWNER + '/' + CONFIG.GITHUB_REPO + '/main/catalog.json?t=' + Date.now();
    const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (resp.getResponseCode() === 200) {
      const parsed = JSON.parse(resp.getContentText());
      if (parsed && Array.isArray(parsed.catalog)) {
        catalog = parsed.catalog;
      }
    }
  } catch (err) {
    Logger.log('Error getUnifiedCatalogList desde GitHub: ' + err);
  }

  if (!catalog || catalog.length === 0) {
    catalog = SEED_APKS.slice();
  }

  // Filtrado estricto en tiempo real contra los archivos existentes en GitHub Releases (SSOT)
  try {
    const liveFiles = getRepositoryFilesList(false);
    if (liveFiles && liveFiles.length > 0) {
      const liveSet = new Set(liveFiles.map(f => (f.name || f.fileName || '').toLowerCase()));
      catalog = catalog.filter(item => item.fileName && liveSet.has(item.fileName.toLowerCase()));
    }
  } catch (errLive) {
    Logger.log('Aviso: Falló filtrado live de releases en getUnifiedCatalogList: ' + errLive);
  }

  // 1. Superponer metadatos de Google Sheets (categoría, descripción, códigos)
  const enriched = overlaySheetMetadata(catalog);

  // 2. Normalizar todas las fechas createdAt a formato estricto ISO 8601 UTC y garantizar CDN sanitizado
  enriched.forEach(item => {
    if (item.createdAt) {
      try {
        const d = new Date(item.createdAt);
        if (!isNaN(d.getTime())) {
          item.createdAt = d.toISOString();
        }
      } catch (e) {}
    }
    // Salvaguarda final: CDN Cloudflare Worker
    const fn = item.fileName || '';
    if (fn) {
      item.directDownloadUrl = 'https://aridamotec-cdn.aridamotec.workers.dev/apk/' + encodeURIComponent(fn);
      item.directUrl = item.directDownloadUrl;
      item.downloadUrl = item.directDownloadUrl;
    } else if (item.directDownloadUrl && String(item.directDownloadUrl).includes('github')) {
      item.directDownloadUrl = item.directDownloadUrl.replace(/https:\/\/github\.com\/[^/]+\/[^/]+\/releases\/download\/[^/]+\//, 'https://aridamotec-cdn.aridamotec.workers.dev/apk/');
      item.directUrl = item.directDownloadUrl;
      item.downloadUrl = item.directDownloadUrl;
    }
    if (item.iconUrl && String(item.iconUrl).includes('github')) {
      const parts = String(item.iconUrl).split('/');
      item.iconUrl = 'https://aridamotec-cdn.aridamotec.workers.dev/icons/' + parts[parts.length - 1];
    }
  });

  return enriched;
}

function getGuestCatalog() {
  const cache = CacheService.getScriptCache();
  try {
    const cached = cache.get('guest_catalog_cache_v4');
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (eC) {
    Logger.log('Error leyendo caché de catálogo: ' + eC);
  }

  const catalog = getUnifiedCatalogList();

  const result = {
    success: true,
    count: catalog.length,
    total: catalog.length,
    catalog: catalog
  };

  try {
    cache.put('guest_catalog_cache_v4', JSON.stringify(result), 15); // 15 segundos
  } catch (ePut) {}

  return result;
}

function getSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  let ssId = props.getProperty('SPREADSHEET_ID');
  let spreadsheet = null;

  if (ssId) {
    try {
      spreadsheet = SpreadsheetApp.openById(ssId);
    } catch (e) {
      Logger.log('Aviso: No se pudo abrir Spreadsheet por ID guardado (' + ssId + '): ' + e);
      spreadsheet = null;
    }
  }

  if (!spreadsheet) {
    const files = DriveApp.getFilesByName(CONFIG.SHEET_NAME);
    if (files.hasNext()) {
      const file = files.next();
      spreadsheet = SpreadsheetApp.open(file);
      try {
        props.setProperty('SPREADSHEET_ID', file.getId());
      } catch (eP) {}
    } else {
      spreadsheet = SpreadsheetApp.create(CONFIG.SHEET_NAME);
      try {
        props.setProperty('SPREADSHEET_ID', spreadsheet.getId());
      } catch (eP) {}
    }
  }

  return spreadsheet;
}

function getOrCreateSheet() {
  const spreadsheet = getSpreadsheet();

  let sheet = spreadsheet.getSheetByName('APKs');
  if (!sheet) {
    sheet = spreadsheet.getActiveSheet();
    sheet.setName('APKs');
    sheet.appendRow([
      'ID Archivo',
      'Nombre Limpio',
      'Archivo Original',
      'Código Browsy',
      'URL Corta Browsy',
      'Enlace Descarga Directa',
      'Clave Edición Browsy',
      'URL Gestión Browsy',
      'Estado',
      'Fecha Creación',
      'Última Sincronización',
      'Descripción IA',
      'Categoría',
      'Autor / Origen'
    ]);
    sheet.getRange(1, 1, 1, 14).setFontWeight('bold').setBackground('#0f172a').setFontColor('#00e5ff');
    sheet.setFrozenRows(1);
  } else {
    if (sheet.getLastColumn() < 12) {
      sheet.getRange(1, 12).setValue('Descripción IA').setFontWeight('bold').setBackground('#0f172a').setFontColor('#00e5ff');
    }
    if (sheet.getLastColumn() < 13) {
      sheet.getRange(1, 13).setValue('Categoría').setFontWeight('bold').setBackground('#0f172a').setFontColor('#00e5ff');
    }
    if (sheet.getLastColumn() < 14) {
      sheet.getRange(1, 14).setValue('Autor / Origen').setFontWeight('bold').setBackground('#0f172a').setFontColor('#00e5ff');
    }
  }

  return sheet;
}

function cleanApkName(rawName) {
  return rawName
    .replace(/\.apk$/i, '')
    .replace(/\.xapk$/i, '')
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function detectApkAuthor(cleanName, fileName) {
  const s = ((cleanName || '') + ' ' + (fileName || '')).toLowerCase();
  if (s.includes('modbynf') || s.includes('bynf')) return 'ModByNF';
  if (s.includes('wireguard')) return 'WireGuard LLC';
  if (s.includes('surfshark')) return 'Surfshark B.V.';
  if (s.includes('weather xl') || s.includes('exovoid')) return 'Exovoid SRL';
  if (s.includes('wolf')) return 'Wolf Development';
  if (s.includes('atv launcher')) return 'D Studio';
  if (s.includes('browsy')) return 'Browsy TV';
  if (s.includes('downloader')) return 'AFTVnews';
  if (s.includes('tizentube')) return 'TizenTube Project';
  if (s.includes('projectivy')) return 'Spocky';
  if (s.includes('xuper') || s.includes('zuper')) return 'Comunidad Xuper';
  if (s.includes('playtv')) return 'PlayTV Team';
  if (s.includes('rbtv') || s.includes('redbox')) return 'RedBox TV';
  if (s.includes('mxl')) return 'MXL Team';
  if (s.includes('cricz')) return 'CricZ Sports';
  if (s.includes('clipbox') || s.includes('animxl')) return 'MediaBox Project';
  if (s.includes('luma')) return 'Luma Interactive';
  if (s.includes('xtreme')) return 'XTREME Team';
  return 'Desarrollador / Comunidad';
}

function getSemanticDescription(cleanName, fileName) {
  const n = ((cleanName || '') + ' ' + (fileName || '')).toLowerCase();

  // 1. Películas, Series y Anime específicos
  if (n.includes('animxl')) {
    return 'Con esta aplicación podrás disfrutar de series y películas de anime japonés en alta calidad con subtítulos.';
  }
  if (n.includes('clipbox')) {
    return 'Con esta aplicación podrás ver estrenos de cine, películas en cartelera y series completas en alta resolución.';
  }
  if (n.includes('movie') || n.includes('cine') || n.includes('pelicula')) {
    return 'Con esta aplicación podrás disfrutar de estrenos cinematográficos y series bajo demanda sin cortes comerciales.';
  }

  // 2. Deportes específicos (variados y diferenciados)
  if (n.includes('cricz')) {
    return 'Con esta aplicación podrás sintonizar torneos internacionales de cricket, tenis, eventos de contacto y deportes mundiales.';
  }
  if (n.includes('sportv')) {
    return 'Con esta aplicación podrás ver fútbol sudamericano en vivo, ligas europeas, Conmebol y programación deportiva prémium.';
  }
  if (n.includes('app release') || n.includes('deportes en vivo') || n.includes('sports tv') || n.includes('geesports')) {
    return 'Con esta aplicación podrás acceder a canales deportivos 24/7 con cobertura de fútbol internacional, NBA, boxeo y UFC.';
  }

  // 3. TV en Vivo, Canales e IPTV específicos
  if (n.includes('rbtv') || n.includes('redbox')) {
    return 'Con esta aplicación podrás sintonizar más de 1000 canales de televisión internacional y señales deportivas de todo el mundo.';
  }
  if (n.includes('peruano')) {
    return 'Con esta aplicación podrás ver canales nacionales y regionales de televisión abierta y por cable de Perú y Latinoamérica.';
  }
  if (n.includes('luma')) {
    return 'Con esta aplicación podrás disfrutar de televisión latina en vivo, cine familiar y canales de entretenimiento variado.';
  }
  if (n.includes('mxl')) {
    return 'Con esta aplicación podrás cargar y sintonizar canales de televisión en vivo mediante listas IPTV M3U y protocolos avanzados.';
  }
  if (n.includes('playtv')) {
    return 'Con esta aplicación podrás disfrutar de una gran variedad de canales prémium en vivo y entretenimiento continuo para toda la familia.';
  }
  if (n.includes('xtreme')) {
    return 'Con esta aplicación podrás ver señales deportivas de ESPN, DirecTV Sports y canales de televisión en vivo con excelente estabilidad.';
  }
  if (n.includes('xuper') || n.includes('zuper') || n.includes('wiwy') || n.includes('player pro')) {
    return 'Con esta aplicación podrás acceder a televisión en directo, señales exclusivas y entretenimiento con servidor integrado.';
  }

  // 4. Utilitarios, Launchers, VPN y Herramientas
  if (n.includes('wolf')) {
    return 'Con esta aplicación podrás transformar el escritorio de tu Android TV con un launcher limpio, rápido y sin anuncios.';
  }
  if (n.includes('atv launcher')) {
    return 'Con esta aplicación podrás personalizar la pantalla de inicio con soporte de widgets, accesos rápidos y cuadrícula adaptable.';
  }
  if (n.includes('wireguard')) {
    return 'Con esta aplicación podrás navegar con máxima velocidad, cifrado de datos de nueva generación y privacidad absoluta.';
  }
  if (n.includes('surfshark')) {
    return 'Con esta aplicación podrás proteger tu red, desbloquear catálogos globales de streaming y navegar con VPN segura.';
  }
  if (n.includes('weather')) {
    return 'Con esta aplicación podrás consultar el pronóstico del tiempo en pantalla completa con mapas satelitales y radares.';
  }
  if (n.includes('browsy')) {
    return 'Con esta aplicación podrás abrir enlaces web y descargar paquetes mediante códigos numéricos cortos en tu televisor.';
  }
  if (n.includes('downloader')) {
    return 'Con esta aplicación podrás navegar e instalar aplicaciones directamente en tu televisor desde cualquier dirección web.';
  }
  if (n.includes('tizentube') || n.includes('youtube')) {
    return 'Con esta aplicación podrás ver videos de YouTube en tu televisor con soporte 4K y sin anuncios molestos.';
  }

  return 'Con esta aplicación podrás disfrutar de contenido multimedia y entretenimiento en tu televisor Android TV.';
}

function generateApkDescription(password, apkName) {
  if (password !== undefined && !verifyAuth(password)) {
    return { success: false, error: 'Acceso no autorizado' };
  }

  const cleanName = cleanApkName(apkName || '');
  let apiKey = CONFIG.GEMINI_API_KEY || '';
  try {
    const propKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (propKey) apiKey = propKey;
  } catch (e) {}

  if (apiKey) {
    try {
      const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;
      const prompt = 'Eres un experto técnico en aplicaciones para Android TV, Fire TV y servicios de streaming/IPTV para clientes de ARIDAMOTEC. Escribe una mini descripción publicitaria en español para la aplicación "' + cleanName + '". IMPORTANTE: En este ecosistema, nombres como "Player Pro", "TV Box", "XTREME" o archivos compilados son servicios de IPTV (televisión en vivo con servidor integrado, cine y series) o deportes, NO reproductores de música ni archivos genéricos. REGLAS: 1) Longitud de entre 12 y 18 palabras. 2) Debe comenzar estrictamente con la frase "Con esta aplicación podrás...". 3) Explica para qué sirve de forma atractiva y comercial para el cliente. Responde únicamente con la frase, sin comillas ni texto adicional.';
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 60 }
      };
      const res = UrlFetchApp.fetch(url, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      });
      if (res.getResponseCode() === 200) {
        const json = JSON.parse(res.getContentText());
        const text = json.candidates && json.candidates[0] && json.candidates[0].content && json.candidates[0].content.parts && json.candidates[0].content.parts[0] && json.candidates[0].content.parts[0].text;
        if (text && text.trim()) {
          let cleanDesc = text.trim().replace(/^["']|["']$/g, '');
          if (!cleanDesc.toLowerCase().startsWith('con esta aplicaci')) {
            cleanDesc = 'Con esta aplicación podrás ' + cleanDesc;
          }
          return { success: true, description: cleanDesc, source: 'gemini' };
        }
      }
    } catch (err) {
      Logger.log('Gemini API call fallback: ' + err);
    }
  }

  return {
    success: true,
    description: getSemanticDescription(cleanName),
    source: 'semantic_ai'
  };
}

function requestBrowsyCode(directUrl) {
  const url = 'https://browsy.app/api/shorten';
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ url: directUrl }),
    muteHttpExceptions: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Origin': 'https://browsy.app',
      'Referer': 'https://browsy.app/'
    }
  };

  try {
    const res = UrlFetchApp.fetch(url, options);
    const code = res.getResponseCode();
    const text = res.getContentText();
    
    if (code >= 200 && code < 300) {
      const data = JSON.parse(text);
      if (data && data.code) {
        return {
          code: String(data.code),
          shortUrl: data.shortUrl || ('https://browsy.app/' + data.code),
          editKey: data.editKey || '',
          manageUrl: data.manageUrl || ('https://browsy.app/manage?code=' + data.code + '&key=' + (data.editKey || ''))
        };
      }
    }
  } catch (err) {
    Logger.log('Error conectando a Browsy API: ' + err);
  }
  return null;
}

function getRepositoryFilesList(forceRefresh) {
  const cache = CacheService.getScriptCache();
  if (!forceRefresh) {
    try {
      const cached = cache.get('gh_repo_assets_v1');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (eCache) {
      Logger.log('CacheService error: ' + eCache);
    }
  }

  const items = new Map();

  // 1. Intento primario: API REST de GitHub Releases (iterando todas las versiones para capturar todos los APKs)
  try {
    const allReleasesUrl = 'https://api.github.com/repos/' + CONFIG.GITHUB_OWNER + '/' + CONFIG.GITHUB_REPO + '/releases?per_page=100';
    const res = UrlFetchApp.fetch(allReleasesUrl, {
      method: 'get',
      headers: {
        'User-Agent': 'ARIDAMOTEC-App',
        'Accept': 'application/vnd.github.v3+json'
      },
      muteHttpExceptions: true
    });

    if (res.getResponseCode() === 200) {
      const releases = JSON.parse(res.getContentText());
      if (Array.isArray(releases)) {
        releases.forEach(rel => {
          if (rel.assets && Array.isArray(rel.assets)) {
            rel.assets.forEach(asset => {
              const name = asset.name || '';
              const lowerName = name.toLowerCase();
              if (lowerName.startsWith('aridamotec_tv') || lowerName.startsWith('aridamotec-tv') || lowerName.includes('aridamotectv')) return;
              if (name.toLowerCase().endsWith('.apk') || name.toLowerCase().endsWith('.xapk')) {
                if (!items.has(lowerName)) {
                  items.set(lowerName, {
                    id: String(asset.id),
                    name: name,
                    downloadUrl: asset.browser_download_url,
                    size: asset.size
                  });
                }
              }
            });
          }
        });
      }
    } else {
      Logger.log('GitHub API error status: ' + res.getResponseCode() + ' - usando endpoint HTML expanded_assets');
    }
  } catch (errGithub) {
    Logger.log('GitHub Releases API error: ' + errGithub);
  }

  // 2. Si la API REST devolvió 403 (Rate Limit) o falló, consultar el endpoint HTML público (sin límite de API)
  if (items.size === 0) {
    try {
      const htmlUrl = 'https://github.com/' + CONFIG.GITHUB_OWNER + '/' + CONFIG.GITHUB_REPO + '/releases/expanded_assets/' + CONFIG.GITHUB_RELEASE_TAG;
      const htmlRes = UrlFetchApp.fetch(htmlUrl, {
        method: 'get',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        muteHttpExceptions: true
      });
      if (htmlRes.getResponseCode() === 200) {
        const text = htmlRes.getContentText();
        const prefix = '/' + CONFIG.GITHUB_OWNER + '/' + CONFIG.GITHUB_REPO + '/releases/download/' + CONFIG.GITHUB_RELEASE_TAG + '/';
        const regex = new RegExp(prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^"]+)', 'g');
        let m;
        let syntheticId = 745600000;
        while ((m = regex.exec(text)) !== null) {
          const decoded = decodeURIComponent(m[1]);
          const dLower = decoded.toLowerCase();
          if ((dLower.endsWith('.apk') || dLower.endsWith('.xapk')) && !items.has(dLower)) {
            items.set(dLower, {
              id: String(syntheticId++),
              name: decoded,
              downloadUrl: 'https://github.com/' + CONFIG.GITHUB_OWNER + '/' + CONFIG.GITHUB_REPO + '/releases/download/' + CONFIG.GITHUB_RELEASE_TAG + '/' + encodeURIComponent(decoded),
              size: 0
            });
          }
        }
      }
    } catch (errHtml) {
      Logger.log('GitHub Expanded Assets HTML error: ' + errHtml);
    }
  }

  // Si se obtuvieron archivos reales de GitHub, cachear por 60 segundos
  if (items.size > 0) {
    const list = Array.from(items.values());
    try {
      cache.put('gh_repo_assets_v1', JSON.stringify(list), 60);
    } catch (eC) {}
    return list;
  }

  // Si falló toda conexión con GitHub, NO sobreescribir con SEED_APKS. Retornar null para proteger la hoja.
  Logger.log('No se pudieron obtener archivos de GitHub. No se alterará la hoja de cálculo.');
  return null;
}

function getDriveFilesList() {
  return getRepositoryFilesList();
}

function syncApks(password, forceRefresh) {
  if (password !== undefined && typeof password === 'string' && !verifyAuth(password)) {
    return { success: false, error: 'Acceso no autorizado' };
  }

  const currentRepoFiles = getRepositoryFilesList(forceRefresh);
  if (!currentRepoFiles || currentRepoFiles.length === 0) {
    Logger.log('No se pudieron obtener archivos de GitHub. No se alterará la hoja de cálculo.');
    return { success: false, error: 'No se pudo conectar a GitHub Releases' };
  }

  // Ejecutar deduplicación previa para limpiar la hoja y restaurar items válidos
  try { deduplicateSheetRows(); } catch (eDedup) {}

  const sheet = getOrCreateSheet();

  const data = sheet.getDataRange().getValues();
  const existingMapByFileName = new Map();
  const existingMapById = new Map();

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const fileId = String(row[0] || '').trim();
    const fileName = String(row[2] || '').trim().toLowerCase();
    const entry = {
      rowIndex: i + 1,
      id: fileId,
      fileName: String(row[2] || '').trim(),
      cleanName: String(row[1] || '').trim(),
      browsyCode: String(row[3] || '').trim(),
      shortUrl: String(row[4] || '').trim(),
      directUrl: String(row[5] || '').trim(),
      editKey: String(row[6] || '').trim(),
      manageUrl: String(row[7] || '').trim(),
      status: String(row[8] || '').trim(),
      aiDesc: String(row[11] || '').trim()
    };
    if (fileId) existingMapById.set(fileId, entry);
    if (fileName) existingMapByFileName.set(fileName, entry);
  }

  const seedByFileName = new Map();
  const seedById = new Map();
  if (typeof SEED_APKS !== 'undefined' && Array.isArray(SEED_APKS)) {
    SEED_APKS.forEach(s => {
      if (s.fileName) seedByFileName.set(s.fileName.toLowerCase(), s);
      if (s.id) seedById.set(String(s.id), s);
    });
  }

  let addedCount = 0;
  let updatedCount = 0;
  let codesGenerated = 0;
  const nowStr = Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd HH:mm:ss');
  const repoNamesSet = new Set();

  for (let i = 0; i < currentRepoFiles.length; i++) {
    const rf = currentRepoFiles[i];
    const rfNameLower = (rf.name || '').toLowerCase();
    if (rfNameLower.startsWith('aridamotec_tv') || rfNameLower.startsWith('aridamotec-tv') || rfNameLower.includes('aridamotectv')) continue;
    repoNamesSet.add(rfNameLower);

    const seed = seedByFileName.get(rfNameLower) || seedById.get(rf.id);
    const cleanName = (seed && seed.cleanName) ? seed.cleanName : cleanApkName(rf.name);
    const directUrl = rf.downloadUrl || (seed ? seed.directUrl : ('https://github.com/' + CONFIG.GITHUB_OWNER + '/' + CONFIG.GITHUB_REPO + '/releases/download/' + CONFIG.GITHUB_RELEASE_TAG + '/' + encodeURIComponent(rf.name)));
    const aiDesc = (seed && seed.aiDescription) ? seed.aiDescription : getSemanticDescription(cleanName);

    const existing = existingMapByFileName.get(rfNameLower) || existingMapById.get(rf.id);

    if (!existing) {
      let browsy = null;
      if (seed && seed.browsyCode) {
        browsy = {
          code: seed.browsyCode,
          shortUrl: seed.shortUrl,
          editKey: seed.editKey || '',
          manageUrl: seed.manageUrl || ''
        };
      } else if (codesGenerated < 20) {
        browsy = requestBrowsyCode(directUrl);
        if (browsy) codesGenerated++;
      }

      sheet.appendRow([
        rf.id,
        cleanName,
        rf.name,
        browsy ? browsy.code : '',
        browsy ? browsy.shortUrl : '',
        directUrl,
        browsy ? browsy.editKey : '',
        browsy ? browsy.manageUrl : '',
        'active',
        (seed && seed.createdAt) ? seed.createdAt : nowStr,
        nowStr,
        aiDesc
      ]);
      addedCount++;
    } else {
      const rIdx = existing.rowIndex;
      let rowUpdated = false;

      if (rf.id && existing.id !== rf.id) {
        sheet.getRange(rIdx, 1).setValue(rf.id);
        rowUpdated = true;
      }

      if (cleanName && existing.cleanName !== cleanName && (existing.cleanName === 'app release(1)' || existing.cleanName === 'tv box' || existing.cleanName === 'PLayer Pro base(2)' || !existing.cleanName)) {
        sheet.getRange(rIdx, 2).setValue(cleanName);
        rowUpdated = true;
      }

      if (directUrl && existing.directUrl !== directUrl) {
        sheet.getRange(rIdx, 6).setValue(directUrl);
        rowUpdated = true;
      }

      if ((!existing.browsyCode || existing.browsyCode === 'Pendiente') && seed && seed.browsyCode) {
        sheet.getRange(rIdx, 4).setValue(seed.browsyCode);
        sheet.getRange(rIdx, 5).setValue(seed.shortUrl);
        sheet.getRange(rIdx, 7).setValue(seed.editKey || '');
        sheet.getRange(rIdx, 8).setValue(seed.manageUrl || '');
        rowUpdated = true;
      } else if (!existing.browsyCode && codesGenerated < 20) {
        const browsy = requestBrowsyCode(directUrl);
        if (browsy && browsy.code) {
          codesGenerated++;
          sheet.getRange(rIdx, 4).setValue(browsy.code);
          sheet.getRange(rIdx, 5).setValue(browsy.shortUrl);
          sheet.getRange(rIdx, 7).setValue(browsy.editKey || '');
          sheet.getRange(rIdx, 8).setValue(browsy.manageUrl || '');
          rowUpdated = true;
        }
      }

      if (existing.status && existing.status.toLowerCase().includes('del')) {
        sheet.getRange(rIdx, 9).setValue('active');
        rowUpdated = true;
      }

      if (!existing.aiDesc) {
        if (seed && seed.aiDescription) {
          sheet.getRange(rIdx, 12).setValue(seed.aiDescription);
          existing.aiDesc = seed.aiDescription;
        } else {
          const autoDesc = getSemanticDescription(cleanName);
          sheet.getRange(rIdx, 12).setValue(autoDesc);
          existing.aiDesc = autoDesc;
        }
      }

      sheet.getRange(rIdx, 11).setValue(nowStr);
      if (rowUpdated) updatedCount++;
    }
  }

  // NOTA: Se desactiva el marcado automático a 'deleted_from_repository' para proteger APKs válidas recién subidas.
  let markedDeletedCount = 0;

  return {
    success: true,
    total: currentRepoFiles.length,
    totalRepo: currentRepoFiles.length,
    totalDrive: currentRepoFiles.length,
    added: addedCount,
    updated: updatedCount,
    codesGenerated: codesGenerated,
    markedDeleted: markedDeletedCount,
    timestamp: nowStr
  };
}

function getApksList(password) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'Contraseña incorrecta' };
  }
  const catalog = getUnifiedCatalogList();
  return {
    success: true,
    total: catalog.length,
    active: catalog,
    deleted: []
  };
}

function deletePermanently(password, driveFileId) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'Acceso no autorizado' };
  }

  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(driveFileId)) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }

  return { success: false, error: 'Registro no encontrado' };
}

function emptyTrash(password) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'Acceso no autorizado' };
  }

  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  let deletedCount = 0;

  // Recorrer de abajo hacia arriba para eliminar filas de forma segura sin desfasar índices
  for (let i = data.length - 1; i >= 1; i--) {
    const status = String(data[i][8] || '').toLowerCase();
    if (status.includes('del') || status.includes('eliminad')) {
      sheet.deleteRow(i + 1);
      deletedCount++;
    }
  }

  return {
    success: true,
    count: deletedCount,
    message: 'Papelera vaciada correctamente'
  };
}

function restoreApk(password, driveFileId) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'Acceso no autorizado' };
  }

  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  const nowStr = Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd HH:mm:ss');

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(driveFileId)) {
      sheet.getRange(i + 1, 9).setValue('restored');
      sheet.getRange(i + 1, 11).setValue(nowStr);
      return { success: true, message: 'Aplicación restaurada al catálogo' };
    }
  }

  return { success: false, error: 'Registro no encontrado' };
}

function restoreAllDeleted(password) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'Acceso no autorizado' };
  }

  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  const nowStr = Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd HH:mm:ss');
  let restoredCount = 0;

  for (let i = 1; i < data.length; i++) {
    const status = String(data[i][8] || '').toLowerCase();
    if (status.includes('del') || status.includes('eliminad')) {
      sheet.getRange(i + 1, 9).setValue('restored');
      sheet.getRange(i + 1, 11).setValue(nowStr);
      restoredCount++;
    }
  }

  return {
    success: true,
    count: restoredCount,
    message: 'Se restauraron ' + restoredCount + ' aplicaciones al catálogo'
  };
}

function generateCodeForSingleApk(password, driveFileId) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'Acceso no autorizado' };
  }

  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();

  const seedById = new Map(SEED_APKS.map(s => [String(s.id), s]));
  const cached = seedById.get(String(driveFileId));

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(driveFileId)) {
      let codeToSet = null;
      let shortUrlToSet = null;
      let editKeyToSet = '';
      let manageUrlToSet = '';

      if (cached && cached.browsyCode) {
        codeToSet = cached.browsyCode;
        shortUrlToSet = cached.shortUrl;
        editKeyToSet = cached.editKey || '';
        manageUrlToSet = cached.manageUrl || '';
      } else {
        const directUrl = String(data[i][5]) || ('https://github.com/' + CONFIG.GITHUB_OWNER + '/' + CONFIG.GITHUB_REPO + '/releases/download/' + CONFIG.GITHUB_RELEASE_TAG + '/' + encodeURIComponent(data[i][2]));
        const browsy = requestBrowsyCode(directUrl);
        if (browsy && browsy.code) {
          codeToSet = browsy.code;
          shortUrlToSet = browsy.shortUrl;
          editKeyToSet = browsy.editKey || '';
          manageUrlToSet = browsy.manageUrl || '';
        }
      }

      if (codeToSet) {
        sheet.getRange(i + 1, 4).setValue(codeToSet);
        sheet.getRange(i + 1, 5).setValue(shortUrlToSet);
        sheet.getRange(i + 1, 7).setValue(editKeyToSet);
        sheet.getRange(i + 1, 8).setValue(manageUrlToSet);
        sheet.getRange(i + 1, 11).setValue(Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd HH:mm:ss'));
        return { success: true, newCode: codeToSet, shortUrl: shortUrlToSet };
      }

      return { success: false, error: 'Límite temporal de Browsy. Intenta en unos minutos.' };
    }
  }

  return { success: false, error: 'Archivo no encontrado' };
}

function updateApkDescription(password, fileId, newDescription, fileName) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'Acceso no autorizado' };
  }

  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  const nowStr = Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd HH:mm:ss');
  const targetId = String(fileId || '').trim();
  const targetFileName = String(fileName || '').trim().toLowerCase();
  const cleanDesc = String(newDescription || '').trim();

  let updated = false;
  for (let i = 1; i < data.length; i++) {
    const rowId = String(data[i][0] || '').trim();
    const rowFileName = String(data[i][2] || '').trim().toLowerCase();
    if ((targetId && (rowId === targetId || rowFileName === targetId.toLowerCase())) ||
        (targetFileName && rowFileName === targetFileName)) {
      sheet.getRange(i + 1, 12).setValue(cleanDesc);
      sheet.getRange(i + 1, 11).setValue(nowStr);
      updated = true;
      break;
    }
  }

  // Si no existía la fila en la hoja de cálculo, crearla y persistirla
  if (!updated) {
    let catItem = null;
    try {
      const url = 'https://raw.githubusercontent.com/' + CONFIG.GITHUB_OWNER + '/' + CONFIG.GITHUB_REPO + '/main/catalog.json?t=' + Date.now();
      const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      if (resp.getResponseCode() === 200) {
        const parsed = JSON.parse(resp.getContentText());
        if (parsed && Array.isArray(parsed.catalog)) {
          catItem = parsed.catalog.find(x => 
            (targetId && (String(x.id) === targetId || String(x.fileName).toLowerCase() === targetId.toLowerCase())) ||
            (targetFileName && String(x.fileName).toLowerCase() === targetFileName)
          );
        }
      }
    } catch (eCat) {}

    if (!catItem) {
      catItem = SEED_APKS.find(x => 
        (targetId && (String(x.id) === targetId || String(x.fileName).toLowerCase() === targetId.toLowerCase())) ||
        (targetFileName && String(x.fileName).toLowerCase() === targetFileName)
      );
    }

    const finalId = targetId || (catItem && catItem.id) || Utilities.getUuid();
    const finalFile = (catItem && catItem.fileName) || fileName || targetId;
    const finalClean = (catItem && catItem.cleanName) || cleanApkName(finalFile);
    const finalCategory = (catItem && catItem.category) || classifyCategory(finalClean, finalFile);

    sheet.appendRow([
      String(finalId),
      String(finalClean),
      String(finalFile),
      String((catItem && catItem.browsyCode) || ''),
      String((catItem && (catItem.browsyShortUrl || catItem.shortUrl)) || ''),
      String((catItem && (catItem.directDownloadUrl || catItem.directUrl)) || ''),
      (catItem && catItem.size) || 0,
      (catItem && catItem.sizeFormatted) || '',
      'active',
      (catItem && catItem.createdAt) || nowStr,
      nowStr,
      cleanDesc,
      finalCategory,
      (catItem && catItem.editKey) || '',
      (catItem && catItem.manageUrl) || ''
    ]);
    updated = true;
  }

  if (updated) {
    try {
      var cache = CacheService.getScriptCache();
      cache.remove('guest_catalog_cache_v4');
      cache.remove('guest_catalog_cache_v3');
      cache.remove('gh_repo_assets_v1');
    } catch (eC) {}
    return {
      success: true,
      fileId: fileId,
      description: cleanDesc,
      message: 'Descripción actualizada y persistida correctamente'
    };
  }

  return { success: false, error: 'Aplicación no encontrada en la base de datos' };
}

/**
 * ============================================================================
 * CONFIGURACIÓN DE DISPARADORES DE AUTO-SINCRONIZACIÓN EN LA NUBE (24/7)
 * ============================================================================
 */

function setSyncInterval(password, intervalMinutes) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'Acceso no autorizado' };
  }

  const mins = parseInt(intervalMinutes, 10);
  if (isNaN(mins) || mins <= 0) {
    return { success: false, error: 'Intervalo inválido' };
  }

  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    const t = triggers[i];
    if (t.getHandlerFunction() === 'syncApks') {
      ScriptApp.deleteTrigger(t);
    }
  }

  let tb = ScriptApp.newTrigger('syncApks').timeBased();

  if (mins < 60) {
    const allowed = [5, 10, 15, 30];
    const bestMin = allowed.reduce((prev, curr) => Math.abs(curr - mins) < Math.abs(prev - mins) ? curr : prev, 5);
    tb = tb.everyMinutes(bestMin);
    PropertiesService.getScriptProperties().setProperty('SYNC_INTERVAL_MINS', String(bestMin));
  } else {
    const hours = Math.round(mins / 60);
    const allowedHours = [1, 2, 4, 6, 8, 12];
    const bestHour = allowedHours.reduce((prev, curr) => Math.abs(curr - hours) < Math.abs(prev - hours) ? curr : prev, 1);
    tb = tb.everyHours(bestHour);
    PropertiesService.getScriptProperties().setProperty('SYNC_INTERVAL_MINS', String(bestHour * 60));
  }

  tb.create();

  return {
    success: true,
    message: 'Auto-sincronización en la nube configurada exitosamente cada ' + mins + ' minutos.',
    intervalMinutes: mins
  };
}

function getSyncInterval() {
  try {
    const prop = PropertiesService.getScriptProperties().getProperty('SYNC_INTERVAL_MINS');
    if (prop) return parseInt(prop, 10);
  } catch (e) {}

  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'syncApks') {
      return 5;
    }
  }
  return 5;
}

function setup5MinuteTrigger() { setSyncInterval(CONFIG.ADMIN_PASSWORD, 5); }
function setup10MinuteTrigger() { setSyncInterval(CONFIG.ADMIN_PASSWORD, 10); }
function setup15MinuteTrigger() { setSyncInterval(CONFIG.ADMIN_PASSWORD, 15); }
function setup30MinuteTrigger() { setSyncInterval(CONFIG.ADMIN_PASSWORD, 30); }
function setup1HourTrigger() { setSyncInterval(CONFIG.ADMIN_PASSWORD, 60); }
function setup6HourTrigger() { setSyncInterval(CONFIG.ADMIN_PASSWORD, 360); }
function setup12HourTrigger() { setSyncInterval(CONFIG.ADMIN_PASSWORD, 720); }

// ============================================================================
// CLASIFICADOR INTELIGENTE DE CATEGORÍAS (IDÉNTICO A LA APP ANDROID TV)
// ============================================================================
function classifyApkCategory(cleanName, fileName, desc) {
  const norm = function(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  };

  const cName = norm(cleanName);
  const fName = norm(fileName);
  const aDesc = norm(desc);
  const combined = cName + ' ' + fName + ' ' + aDesc;

  const hasAny = function(keywords) {
    for (let k = 0; k < keywords.length; k++) {
      if (combined.indexOf(keywords[k]) !== -1) return true;
    }
    return false;
  };

  // 1. Películas y Series (Prioridad para evitar solapamientos con IPTV)
  if (hasAny([
    'anime', 'estrenos de cine', 'series completas', 'cine', 'solo peliculas',
    'clipbox', 'animxl', 'movies', 'series y peliculas de anime', 'pelicula', 'peliculas', 'serie', 'series', 'vod'
  ])) {
    return '🎬 Películas y Series';
  }

  // 2. Deportes
  if (hasAny([
    'sportv', 'sportz', 'cricz', 'geesports', 'deport', 'futbol', 'soccer',
    'beisbol', 'baseball', 'baloncesto', 'boxeo', 'boxing', 'nba', 'ufc', 'partidos en directo'
  ])) {
    return '⚽ Deportes';
  }

  // 3. TV en Vivo, Canales e IPTV
  if (hasAny([
    'canales de television', 'television en vivo', 'tv en vivo', 'television latina',
    'senales exclusivas', 'canales familiares', 'iptv', 'm3u', 'servidor integrado', 'canales en vivo',
    'lokuratv', 'rbtv', 'redbox', 'xuper', 'zuper', 'wiwy', 'playtv', 'xtremetv', 'luma tv', 'player pro', 'peruano'
  ])) {
    return '📺 TV en Vivo';
  }

  // 4. Música
  if (hasAny([
    'musica', 'radio', 'cancion', 'canciones', 'audio', 'spotify',
    'deezer', 'sonido', 'podcast', 'mp3', 'emisora'
  ])) {
    return '🎵 Música';
  }

  // 5. Juegos
  if (hasAny(['juego', 'juegos', 'game', 'games', 'arcade', 'emulador', 'retro', 'consola'])) {
    return '🎮 Juegos';
  }

  // 6. Utilitarios, Launchers, VPN
  if (hasAny([
    'utilitar', 'herramienta', 'launcher', 'vpn', 'privacidad', 'segur',
    'clima', 'weather', 'downloader', 'browsy', 'codigos', 'tizentube', 'youtube', 'wolf',
    'projjectivy', 'personalizar y acelerar', 'acelerar la pantalla', 'transformar el menu',
    'navegar seguro', 'descargar e instalar'
  ])) {
    return '🛠️ Utilitarios';
  }

  // 7. Infantil
  if (hasAny(['infantil', 'ninos', 'caricaturas', 'dibujos animados'])) {
    return '👶 Infantil';
  }

  return '🛠️ Utilitarios';
}

// ============================================================================
// SISTEMA DE CONTROL DE ACCESO Y ACTIVACIÓN POR MAC (DISPOSITIVOS TV)
// ============================================================================
function getOrCreateMacSheet() {
  const spreadsheet = getSpreadsheet();

  let sheet = spreadsheet.getSheetByName('Dispositivos_MAC');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Dispositivos_MAC');
    sheet.appendRow([
      'Dirección MAC',
      'Cliente / Titular',
      'Modelo / Dispositivo',
      'Estado',
      'Fecha Registro',
      'Última Verificación',
      'Notas',
      'Apps_Instaladas',
      'Espacio_Libre_MB',
      'Espacio_Total_MB',
      'Comando_Pendiente'
    ]);
    sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#0f172a').setFontColor('#00e5ff');
    sheet.setFrozenRows(1);
  } else {
    // Si la hoja ya existe, asegurar cabeceras de columnas 8 a 11
    if (sheet.getLastColumn() < 8) {
      sheet.getRange(1, 8).setValue('Apps_Instaladas').setFontWeight('bold').setBackground('#0f172a').setFontColor('#00e5ff');
    }
    if (sheet.getLastColumn() < 9) {
      sheet.getRange(1, 9).setValue('Espacio_Libre_MB').setFontWeight('bold').setBackground('#0f172a').setFontColor('#00e5ff');
    }
    if (sheet.getLastColumn() < 10) {
      sheet.getRange(1, 10).setValue('Espacio_Total_MB').setFontWeight('bold').setBackground('#0f172a').setFontColor('#00e5ff');
    }
    if (sheet.getLastColumn() < 11) {
      sheet.getRange(1, 11).setValue('Comando_Pendiente').setFontWeight('bold').setBackground('#0f172a').setFontColor('#00e5ff');
    }
  }
  return sheet;
}

function normalizeMac(mac) {
  if (!mac) return '';
  return String(mac).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}

function saveInstalledApps(mac, appsJson, storageFree, storageTotal) {
  if (!mac) return { success: false, error: 'MAC requerida' };
  const cleanMac = String(mac).trim().toUpperCase();
  const targetNormMac = normalizeMac(cleanMac);
  const sheet = getOrCreateMacSheet();
  const nowStr = Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd HH:mm:ss');
  const strApps = (typeof appsJson === 'string') ? appsJson : JSON.stringify(appsJson || []);

  if (sheet.getLastRow() > 1) {
    const values = sheet.getDataRange().getValues();
    for (let i = 1; i < values.length; i++) {
      if (normalizeMac(values[i][0]) === targetNormMac) {
        sheet.getRange(i + 1, 6).setValue(nowStr);
        sheet.getRange(i + 1, 8).setValue(strApps);
        if (storageFree !== undefined && storageFree !== null && storageFree !== '') {
          sheet.getRange(i + 1, 9).setValue(Number(storageFree));
        }
        if (storageTotal !== undefined && storageTotal !== null && storageTotal !== '') {
          sheet.getRange(i + 1, 10).setValue(Number(storageTotal));
        }
        return { success: true, message: 'Apps y almacenamiento reportados correctamente', mac: cleanMac };
      }
    }
  }

  // Si el dispositivo aún no estaba en la hoja, agregarlo
  sheet.appendRow([
    cleanMac,
    'Cliente Nuevo',
    'Android TV',
    'PENDIENTE',
    nowStr,
    nowStr,
    'Auto-reporte de apps instaladas',
    strApps,
    Number(storageFree) || 0,
    Number(storageTotal) || 0,
    ''
  ]);
  return { success: true, message: 'Dispositivo y apps registradas', mac: cleanMac };
}

function checkDeviceMac(mac, model, storageFree, storageTotal) {
  if (!mac) {
    return { success: false, authorized: false, status: 'ERROR', message: 'MAC no especificada' };
  }
  const cleanMac = String(mac).trim().toUpperCase();
  const targetNormMac = normalizeMac(cleanMac);
  const cleanModel = String(model || 'Android TV').trim();

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (eLock) {
    Logger.log('Lock timeout en checkDeviceMac: ' + eLock);
  }

  try {
    const sheet = getOrCreateMacSheet();
    const nowStr = Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd HH:mm:ss');

    if (sheet.getLastRow() > 1) {
      const data = sheet.getDataRange().getValues();
      let matchedIndices = [];
      let activeIndex = -1;

      for (let i = 1; i < data.length; i++) {
        const rowNormMac = normalizeMac(data[i][0]);
        if (rowNormMac === targetNormMac) {
          matchedIndices.push(i);
          const st = String(data[i][3] || '').trim().toUpperCase();
          if ((st === 'ACTIVO' || st === 'ACTIVE') && activeIndex === -1) {
            activeIndex = i;
          }
        }
      }

      // Si hay registros duplicados para esta misma MAC, conservar solo el principal (preferir ACTIVO si existe)
      const primaryIndex = (activeIndex !== -1) ? activeIndex : (matchedIndices.length > 0 ? matchedIndices[0] : -1);
      if (matchedIndices.length > 1) {
        let toDelete = matchedIndices.filter(function(idx) { return idx !== primaryIndex; });
        toDelete.sort(function(a, b) { return b - a; });
        for (let d = 0; d < toDelete.length; d++) {
          sheet.deleteRow(toDelete[d] + 1);
        }
      }
      if (primaryIndex !== -1) {
        const row = primaryIndex + 1;
        sheet.getRange(row, 6).setValue(nowStr);
        if (!data[primaryIndex][2] && cleanModel) {
          sheet.getRange(row, 3).setValue(cleanModel);
        }
        if (storageFree !== undefined && storageFree !== null && storageFree !== '') {
          sheet.getRange(row, 9).setValue(Number(storageFree));
        }
        if (storageTotal !== undefined && storageTotal !== null && storageTotal !== '') {
          sheet.getRange(row, 10).setValue(Number(storageTotal));
        }
        const client = String(data[primaryIndex][1] || 'Cliente Aridamotec').trim();
        const status = String(data[primaryIndex][3] || 'PENDIENTE').trim().toUpperCase();
        const isAuth = (status === 'ACTIVO' || status === 'ACTIVE');

        // Consultar si hay orden remota pendiente para este dispositivo
        let pendingCommand = null;
        const rawCmd = data[primaryIndex][10];
        if (rawCmd && String(rawCmd).trim().length > 0) {
          try {
            pendingCommand = (typeof rawCmd === 'string') ? JSON.parse(rawCmd) : rawCmd;
            // Limpiar la orden consumida para que no se ejecute múltiples veces
            sheet.getRange(row, 11).setValue('');
          } catch (eCmd) {
            Logger.log('Error parseando orden pendiente: ' + eCmd);
          }
        }

        const resp = {
          success: true,
          authorized: isAuth,
          status: status,
          client: client,
          mac: cleanMac,
          message: isAuth ? 'Dispositivo autorizado' : ('Dispositivo en estado: ' + status)
        };
        if (pendingCommand) {
          resp.remote_command = pendingCommand;
        }
        return resp;
      }
    }

    // Si no está registrado en absoluto, se añade automáticamente con estado PENDIENTE
    sheet.appendRow([
      cleanMac,
      'Cliente Nuevo (Pendiente)',
      cleanModel,
      'PENDIENTE',
      nowStr,
      nowStr,
      'Auto-registrado al instalar APK',
      '[]',
      Number(storageFree) || 0,
      Number(storageTotal) || 0,
      ''
    ]);

    return {
      success: true,
      authorized: false,
      status: 'PENDIENTE',
      client: 'Cliente Nuevo (Pendiente)',
      mac: cleanMac,
      message: 'Dispositivo registrado como pendiente. Solicita la activación al Administrador.'
    };
  } finally {
    try { lock.releaseLock(); } catch (eRel) {}
  }
}

function sendRemoteCommand(password, mac, commandObj) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'No autorizado' };
  }
  if (!mac || !commandObj) {
    return { success: false, error: 'MAC y objeto de orden requeridos' };
  }
  const cleanMac = String(mac).trim().toUpperCase();
  const targetNormMac = normalizeMac(cleanMac);
  const sheet = getOrCreateMacSheet();

  if (sheet.getLastRow() > 1) {
    const values = sheet.getDataRange().getValues();
    for (let i = 1; i < values.length; i++) {
      if (normalizeMac(values[i][0]) === targetNormMac) {
        let queue = [];
        const existingRaw = values[i][10];
        if (existingRaw && String(existingRaw).trim().length > 0) {
          try {
            const parsed = JSON.parse(existingRaw);
            if (Array.isArray(parsed)) queue = parsed;
            else if (parsed && typeof parsed === 'object') queue = [parsed];
          } catch (eEx) {}
        }
        if (Array.isArray(commandObj)) {
          queue = queue.concat(commandObj);
        } else {
          queue.push(commandObj);
        }
        const finalStr = queue.length === 1 ? JSON.stringify(queue[0]) : JSON.stringify(queue);
        sheet.getRange(i + 1, 11).setValue(finalStr);
        return { success: true, message: 'Orden remota encolada para ' + cleanMac, mac: cleanMac, command: commandObj };
      }
    }
  }
  return { success: false, error: 'Dispositivo MAC no encontrado en la base de datos' };
}

function getMacDevicesList(password) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'No autorizado' };
  }
  const sheet = getOrCreateMacSheet();
  const list = [];
  const macMap = {};
  const duplicateRowsToDelete = [];

  if (sheet.getLastRow() > 1) {
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const mac = String(row[0] || '').trim().toUpperCase();
      if (!mac) continue;
      const norm = normalizeMac(mac);
      const status = String(row[3] || 'PENDIENTE').toUpperCase();

      const item = {
        mac: mac,
        client: String(row[1] || ''),
        model: String(row[2] || ''),
        status: status,
        registerDate: String(row[4] || ''),
        lastCheck: String(row[5] || ''),
        notes: String(row[6] || ''),
        installedApps: String(row[7] || '[]'),
        storageFreeMb: Number(row[8]) || 0,
        storageTotalMb: Number(row[9]) || 0,
        pendingCommand: String(row[10] || '')
      };

      if (!macMap[norm]) {
        macMap[norm] = { item: item, rowIndex: i + 1 };
      } else {
        // Si ya existía un registro para esta MAC:
        // Si el actual es ACTIVO y el guardado era PENDIENTE, conservamos el ACTIVO y marcamos el anterior para borrar
        const prevStatus = macMap[norm].item.status;
        if ((status === 'ACTIVO' || status === 'ACTIVE') && prevStatus !== 'ACTIVO' && prevStatus !== 'ACTIVE') {
          duplicateRowsToDelete.push(macMap[norm].rowIndex);
          macMap[norm] = { item: item, rowIndex: i + 1 };
        } else {
          duplicateRowsToDelete.push(i + 1);
        }
      }
    }

    // Purgar de abajo hacia arriba filas duplicadas físicas de la hoja
    if (duplicateRowsToDelete.length > 0) {
      duplicateRowsToDelete.sort(function(a, b) { return b - a; });
      for (let d = 0; d < duplicateRowsToDelete.length; d++) {
        try { sheet.deleteRow(duplicateRowsToDelete[d]); } catch (eDel) {}
      }
    }

    for (let k in macMap) {
      list.push(macMap[k].item);
    }
  }
  return { success: true, total: list.length, devices: list };
}

function saveOrUpdateMac(password, data) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'No autorizado' };
  }
  const mac = String(data.mac || '').trim().toUpperCase();
  if (!mac) return { success: false, error: 'MAC requerida' };
  const client = String(data.client || 'Cliente Aridamotec').trim();
  const model = String(data.model || 'Android TV').trim();
  const status = String(data.status || 'ACTIVO').trim().toUpperCase();
  const notes = String(data.notes || '').trim();
  const nowStr = Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd HH:mm:ss');

  const sheet = getOrCreateMacSheet();
  let foundRow = -1;
  const targetNormMac = normalizeMac(mac);
  if (sheet.getLastRow() > 1) {
    const values = sheet.getDataRange().getValues();
    for (let i = 1; i < values.length; i++) {
      if (normalizeMac(values[i][0]) === targetNormMac) {
        foundRow = i + 1;
        break;
      }
    }
  }

  if (foundRow > 0) {
    sheet.getRange(foundRow, 2).setValue(client);
    if (model) sheet.getRange(foundRow, 3).setValue(model);
    sheet.getRange(foundRow, 4).setValue(status);
    sheet.getRange(foundRow, 6).setValue(nowStr);
    sheet.getRange(foundRow, 7).setValue(notes);
  } else {
    sheet.appendRow([mac, client, model, status, nowStr, nowStr, notes]);
  }
  return { success: true, message: 'Dispositivo guardado correctamente', mac: mac, status: status };
}

function toggleMacStatus(password, mac, newStatus) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'No autorizado' };
  }
  const cleanMac = String(mac || '').trim().toUpperCase();
  const targetNormMac = normalizeMac(cleanMac);
  const status = String(newStatus || 'ACTIVO').trim().toUpperCase();
  const sheet = getOrCreateMacSheet();
  if (sheet.getLastRow() > 1) {
    const values = sheet.getDataRange().getValues();
    for (let i = 1; i < values.length; i++) {
      if (normalizeMac(values[i][0]) === targetNormMac) {
        sheet.getRange(i + 1, 4).setValue(status);
        const nowStr = Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd HH:mm:ss');
        sheet.getRange(i + 1, 6).setValue(nowStr);
        return { success: true, mac: cleanMac, status: status };
      }
    }
  }
  return { success: false, error: 'MAC no encontrada' };
}

function deleteMacDevice(password, mac) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'No autorizado' };
  }
  const cleanMac = String(mac || '').trim().toUpperCase();
  const targetNormMac = normalizeMac(cleanMac);
  const sheet = getOrCreateMacSheet();
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (eLock) {}

  try {
    if (sheet.getLastRow() > 1) {
      const values = sheet.getDataRange().getValues();
      let deleted = false;
      for (let i = values.length - 1; i >= 1; i--) {
        if (normalizeMac(values[i][0]) === targetNormMac) {
          sheet.deleteRow(i + 1);
          deleted = true;
        }
      }
      if (deleted) {
        return { success: true, mac: cleanMac };
      }
    }
    return { success: false, error: 'MAC no encontrada' };
  } finally {
    try { lock.releaseLock(); } catch (eRel) {}
  }
}

// ================= ALIAS DIRECTOS PARA GOOGLE.SCRIPT.RUN =================
function getMacList(password) {
  return getMacDevicesList(password);
}

function saveMac(password, data) {
  return saveOrUpdateMac(password, data);
}

function toggleMac(password, mac, newStatus) {
  return toggleMacStatus(password, mac, newStatus);
}

function deleteMac(password, mac) {
  return deleteMacDevice(password, mac);
}


function getLatestTvAppInfo() {
  try {
    const url = 'https://raw.githubusercontent.com/' + CONFIG.GITHUB_OWNER + '/' + CONFIG.GITHUB_REPO + '/main/version.json?t=' + Date.now();
    const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (resp.getResponseCode() === 200) {
      const parsed = JSON.parse(resp.getContentText());
      if (parsed && parsed.latestVersionCode) {
        return parsed;
      }
    }
  } catch (eVer) {
    Logger.log('Error leyendo version.json dinámico en GitHub: ' + eVer);
  }
  return {
    success: true,
    latestVersionCode: CONFIG.TV_APP_VERSION_CODE || 7,
    latestVersionName: CONFIG.TV_APP_VERSION || '1.3.3',
    downloadUrl: CONFIG.TV_APP_DOWNLOAD_URL || ('https://tdavid1515-bot.github.io/' + CONFIG.GITHUB_REPO + '/ARIDAMOTEC_TV_' + (CONFIG.TV_APP_VERSION || '1.3.3') + '.apk'),
    changelog: CONFIG.TV_APP_CHANGELOG || 'Mejoras de rendimiento y estabilidad.',
    minSupportedVersionCode: 1,
    mandatory: false
  };
}

function getTvAppInfo() {
  return getLatestTvAppInfo();
}

// ============================================================================
// REASIGNACIÓN DE CATEGORÍAS MANUAL Y DEDUPLICACIÓN DE HOJA
// ============================================================================
function updateApkCategory(password, fileId, newCategory, fileName) {
  if (!verifyAuth(password)) {
    return { success: false, error: 'Acceso no autorizado' };
  }
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  const nowStr = Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd HH:mm:ss');
  const targetId = String(fileId || '').trim();
  const targetFileName = String(fileName || '').trim().toLowerCase();
  const cleanCat = String(newCategory || '').trim();

  let updated = false;
  for (let i = 1; i < data.length; i++) {
    const rowId = String(data[i][0] || '').trim();
    const rowFileName = String(data[i][2] || '').trim().toLowerCase();
    if ((targetId && (rowId === targetId || rowFileName === targetId.toLowerCase())) ||
        (targetFileName && rowFileName === targetFileName)) {
      sheet.getRange(i + 1, 13).setValue(cleanCat);
      sheet.getRange(i + 1, 11).setValue(nowStr);
      updated = true;
      break;
    }
  }

  // Si no existía la fila en la hoja de cálculo, crearla y persistirla
  if (!updated) {
    let catItem = null;
    try {
      const url = 'https://raw.githubusercontent.com/' + CONFIG.GITHUB_OWNER + '/' + CONFIG.GITHUB_REPO + '/main/catalog.json?t=' + Date.now();
      const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      if (resp.getResponseCode() === 200) {
        const parsed = JSON.parse(resp.getContentText());
        if (parsed && Array.isArray(parsed.catalog)) {
          catItem = parsed.catalog.find(x => 
            (targetId && (String(x.id) === targetId || String(x.fileName).toLowerCase() === targetId.toLowerCase())) ||
            (targetFileName && String(x.fileName).toLowerCase() === targetFileName)
          );
        }
      }
    } catch (eCat) {}

    if (!catItem) {
      catItem = SEED_APKS.find(x => 
        (targetId && (String(x.id) === targetId || String(x.fileName).toLowerCase() === targetId.toLowerCase())) ||
        (targetFileName && String(x.fileName).toLowerCase() === targetFileName)
      );
    }

    const finalId = targetId || (catItem && catItem.id) || Utilities.getUuid();
    const finalFile = (catItem && catItem.fileName) || fileName || targetId;
    const finalClean = (catItem && catItem.cleanName) || cleanApkName(finalFile);
    const finalDesc = (catItem && catItem.aiDescription) || getSemanticDescription(finalClean, finalFile);

    sheet.appendRow([
      String(finalId),
      String(finalClean),
      String(finalFile),
      String((catItem && catItem.browsyCode) || ''),
      String((catItem && (catItem.browsyShortUrl || catItem.shortUrl)) || ''),
      String((catItem && (catItem.directDownloadUrl || catItem.directUrl)) || ''),
      (catItem && catItem.size) || 0,
      (catItem && catItem.sizeFormatted) || '',
      'active',
      (catItem && catItem.createdAt) || nowStr,
      nowStr,
      finalDesc,
      cleanCat,
      (catItem && catItem.editKey) || '',
      (catItem && catItem.manageUrl) || ''
    ]);
    updated = true;
  }

  if (updated) {
    try {
      var cache = CacheService.getScriptCache();
      cache.remove('guest_catalog_cache_v4');
      cache.remove('guest_catalog_cache_v3');
      cache.remove('gh_repo_assets_v1');
    } catch (eC) {}
    return {
      success: true,
      fileId: fileId,
      category: cleanCat,
      message: 'Categoría actualizada exitosamente a: ' + cleanCat
    };
  }
  return { success: false, error: 'Aplicación no encontrada en el catálogo' };
}

function deduplicateSheetRows(password) {
  if (password !== undefined && typeof password === 'string' && !verifyAuth(password)) {
    return { success: false, error: 'Acceso no autorizado' };
  }
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return { success: true, removedCount: 0 };

  const data = sheet.getDataRange().getValues();
  const seenMap = new Map();
  const rowsToDelete = [];
  const nowStr = Utilities.formatDate(new Date(), 'GMT-5', 'yyyy-MM-dd HH:mm:ss');

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const fileId = String(row[0] || '').trim();
    const fileName = String(row[2] || '').trim().toLowerCase();
    const status = String(row[8] || 'active').trim().toLowerCase();
    const key = fileName || fileId.toLowerCase();
    if (!key) continue;

    const rowIndex = i + 1;
    if (!seenMap.has(key)) {
      seenMap.set(key, { rowIndex: rowIndex, row: row });
      // Restaurar automáticamente a active si estaba erróneamente en papelera
      if (status.includes('deleted_from_repository')) {
        sheet.getRange(rowIndex, 9).setValue('active');
        sheet.getRange(rowIndex, 11).setValue(nowStr);
      }
    } else {
      const existing = seenMap.get(key);
      const existingHasCode = existing.row[3] && String(existing.row[3]).trim().length > 0;
      const currentHasCode = row[3] && String(row[3]).trim().length > 0;

      if (!existingHasCode && currentHasCode) {
        sheet.getRange(existing.rowIndex, 4).setValue(row[3]);
        sheet.getRange(existing.rowIndex, 5).setValue(row[4]);
      }
      if (!existing.row[11] && row[11]) {
        sheet.getRange(existing.rowIndex, 12).setValue(row[11]);
      }
      if (!existing.row[12] && row[12]) {
        sheet.getRange(existing.rowIndex, 13).setValue(row[12]);
      }
      rowsToDelete.push(rowIndex);
    }
  }

  rowsToDelete.sort((a, b) => b - a);
  for (let r = 0; r < rowsToDelete.length; r++) {
    sheet.deleteRow(rowsToDelete[r]);
  }

  return { success: true, removedCount: rowsToDelete.length, message: 'Deduplicación completada con éxito' };
}

function updateCategory(password, fileId, category, fileName) {
  return updateApkCategory(password, fileId, category, fileName);
}

function deduplicate(password) {
  return deduplicateSheetRows(password);
}
