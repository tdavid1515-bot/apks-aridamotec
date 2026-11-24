const http = require('http');
const https = require('https');

const GITHUB_OWNER = 'tdavid1515-bot';
const GITHUB_REPO = 'apks-aridamotec';
const RELEASE_TAG = 'v1.0.0';

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(`[LOCAL WORKER PROXY] ${req.method} ${url.pathname}`);

  if (url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Server': 'Aridamotec-Edge-Vault/1.0' });
    res.end(JSON.stringify({ status: 'ok', service: 'Aridamotec CDN Proxy' }));
    return;
  }

  if (url.pathname.startsWith('/apk/')) {
    const fileName = decodeURIComponent(url.pathname.replace('/apk/', '').trim());
    const targetUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/download/${RELEASE_TAG}/${encodeURIComponent(fileName)}`;

    console.log(`[PROXY] Fetching: ${targetUrl}`);
    
    // Follow redirects from GitHub release to AWS S3 storage backend
    function fetchWithRedirect(target, depth = 0) {
      if (depth > 5) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Too many redirects' }));
        return;
      }

      https.get(target, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (ghRes) => {
        if (ghRes.statusCode >= 300 && ghRes.statusCode < 400 && ghRes.headers.location) {
          fetchWithRedirect(ghRes.headers.location, depth + 1);
          return;
        }

        if (ghRes.statusCode !== 200) {
          res.writeHead(ghRes.statusCode, { 'Content-Type': 'application/json', 'Server': 'Aridamotec-Edge-Vault/1.0' });
          res.end(JSON.stringify({ error: 'File not found', code: ghRes.statusCode }));
          return;
        }

        // Return stripped clean headers - ZERO GITHUB REFERENCES
        const headers = {
          'Content-Type': 'application/vnd.android.package-archive',
          'Content-Disposition': `attachment; filename="${fileName}"`,
          'Server': 'Aridamotec-Edge-Vault/1.0',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=604800'
        };
        if (ghRes.headers['content-length']) {
          headers['Content-Length'] = ghRes.headers['content-length'];
        }

        res.writeHead(200, headers);
        ghRes.pipe(res);
      }).on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      });
    }

    fetchWithRedirect(targetUrl);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = 8089;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`[LOCAL WORKER PROXY] Running on http://127.0.0.1:${PORT}`);
});
