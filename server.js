const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const { createPairingCode, getBotStatus, startBot } = require('./index');
const { fancyLog } = require('./utils/logger');

const PORT = Number(process.env.PORT || 5000);
const publicDir = path.join(__dirname, 'public');
const indexPage = fs.readFileSync(path.join(publicDir, 'index.html'));
const recentRequests = new Map();

function sendJson(res, status, body) {
    res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'same-origin',
    });
    res.end(JSON.stringify(body));
}

function sendPage(res) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'same-origin',
    });
    res.end(indexPage);
}

function getClientKey(req) {
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.socket.remoteAddress || 'unknown';
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
            if (body.length > 2048) {
                reject(new Error('Request body is too large.'));
                req.destroy();
            }
        });
        req.on('end', () => resolve(body));
        req.on('error', reject);
    });
}

const server = http.createServer(async (req, res) => {
    try {
        if (req.method === 'GET' && req.url === '/') {
            return sendPage(res);
        }

        if (req.method === 'GET' && req.url === '/favicon.ico') {
            res.writeHead(204);
            return res.end();
        }

        if (req.method === 'GET' && req.url === '/status') {
            return sendJson(res, 200, getBotStatus());
        }

        if (req.method === 'GET' && req.url === '/health') {
            const status = getBotStatus();
            return sendJson(res, 200, {
                ok: true,
                service: 'arslan-md-ultra',
                state: status.state,
                connected: status.connected,
                publicPairing: status.publicPairing,
                uptimeSeconds: status.uptimeSeconds,
            });
        }

        if (req.method === 'POST' && req.url === '/pair') {
            const key = getClientKey(req);
            const lastRequest = recentRequests.get(key) || 0;
            if (Date.now() - lastRequest < 15000) {
                return sendJson(res, 429, {
                    success: false,
                    error: 'Please wait 15 seconds before requesting another code.',
                });
            }
            recentRequests.set(key, Date.now());

            const body = JSON.parse(await readBody(req));
            const phone = String(body.phone || '').replace(/\D/g, '');
            const configuredPhone = String(config.PAIRING_NUMBER || '').replace(/\D/g, '');

            if (!/^\d{10,15}$/.test(phone)) {
                return sendJson(res, 400, {
                    success: false,
                    error: 'Enter a valid WhatsApp number with country code.',
                });
            }
            if (!config.PUBLIC_PAIRING && (!configuredPhone || phone !== configuredPhone)) {
                return sendJson(res, 403, {
                    success: false,
                    error: 'Pairing is restricted to the configured owner number.',
                });
            }
            if (getBotStatus().state === 'disconnected') {
                return sendJson(res, 503, {
                    success: false,
                    error: 'The WhatsApp session is logged out. Restart the bot to request a fresh code.',
                });
            }

            const code = await createPairingCode(phone);
            return sendJson(res, 200, { success: true, code });
        }

        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
    } catch (err) {
        fancyLog('ERROR', `Web request failed: ${err.message}`);
        const status = err.code === 'PAIRING_BUSY' || /already connected/i.test(err.message)
            ? 409
            : 500;
        return sendJson(res, status, {
            success: false,
            error: status === 409 ? err.message : 'The pairing service is temporarily unavailable.',
        });
    }
});

server.listen(PORT, '0.0.0.0', () => {
    fancyLog('SUCCESS', `Pairing website available on port ${PORT}.`);
});

startBot().catch((err) => {
    fancyLog('ERROR', `Start failed: ${err.message}`);
});