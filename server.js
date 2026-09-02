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
    });
    res.end(JSON.stringify(body));
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
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-store',
            });
            return res.end(indexPage);
        }

        if (req.method === 'GET' && req.url === '/favicon.ico') {
            res.writeHead(204);
            return res.end();
        }

        if (req.method === 'GET' && req.url === '/status') {
            return sendJson(res, 200, getBotStatus());
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
            if (!configuredPhone || phone !== configuredPhone) {
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
        return sendJson(res, 500, {
            success: false,
            error: 'The pairing service is temporarily unavailable.',
        });
    }
});

server.listen(PORT, '0.0.0.0', () => {
    fancyLog('SUCCESS', `Pairing website available on port ${PORT}.`);
});

startBot().catch((err) => {
    fancyLog('ERROR', `Start failed: ${err.message}`);
});