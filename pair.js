// pair.js – resilient WhatsApp pairing-code flow

const { fancyLog } = require('./utils/logger');

const INITIAL_DELAY_MS = 500;

function normalizePhoneNumber(phoneNumber) {
    const normalized = String(phoneNumber || '').replace(/\D/g, '');
    if (!/^\d{10,15}$/.test(normalized)) {
        throw new Error('PAIRING_NUMBER must include a valid country code and 10-15 digits.');
    }
    return normalized;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formatPairingError(error) {
    const message = String(error?.message || error || 'Unknown pairing error');
    const statusCode = error?.output?.statusCode || error?.statusCode;
    if (/passkey|webauthn|challenge/i.test(message)) {
        return `${message} — WhatsApp rejected the pairing handshake. Try the QR option, or wait before requesting a new code.`;
    }
    if (statusCode === 429 || /rate.?overlimit|too many requests/i.test(message)) {
        return `${message} — WhatsApp is rate-limiting pairing attempts. Stop retrying and wait before trying again.`;
    }
    if (statusCode === 401 || /401|logged.?out|bad.?auth/i.test(message)) {
        return `${message} — WhatsApp rejected this link request. If it repeats, try QR linking and check the deployment logs.`;
    }
    if (statusCode === 400 || /400.*bad.?request/i.test(message)) {
        return `${message} — WhatsApp rejected the pairing request before the code was accepted. Try QR linking.`;
    }
    if (/408|timeout|timed? ?out|connection.?closed|428|515/i.test(message)) {
        return `${message} — the WhatsApp connection closed during pairing. Wait for the bot to reconnect, then request one fresh code.`;
    }
    return message;
}

async function requestPairingCode(sock, phoneNumber, options = {}) {
    const normalizedNumber = normalizePhoneNumber(phoneNumber);
    if (!sock || typeof sock.requestPairingCode !== 'function') {
        throw new Error('This Baileys socket does not support pairing codes.');
    }

    const initialDelay = Number.isFinite(options.initialDelayMs)
        ? Math.max(0, options.initialDelayMs)
        : INITIAL_DELAY_MS;

    await wait(initialDelay);
    try {
        const code = await sock.requestPairingCode(normalizedNumber);
        if (!code) throw new Error('WhatsApp returned an empty pairing code.');

        fancyLog('SUCCESS', 'Pairing code generated and returned to the browser.');
        return code;
    } catch (error) {
        const formatted = formatPairingError(error);
        fancyLog('ERROR', `Pairing request failed: ${formatted}`);
        const pairingError = new Error(formatted, { cause: error });
        pairingError.statusCode = error?.output?.statusCode || error?.statusCode;
        throw pairingError;
    }
}

module.exports = { normalizePhoneNumber, requestPairingCode };