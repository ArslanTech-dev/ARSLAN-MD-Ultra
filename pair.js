// pair.js – resilient WhatsApp pairing-code flow

const chalk = require('chalk');
const { fancyLog } = require('./utils/logger');

const INITIAL_DELAY_MS = 1500;
const MAX_ATTEMPTS = 3;

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
    if (/passkey|webauthn|challenge/i.test(message)) {
        return `${message} — WhatsApp returned a passkey/WebAuthn challenge. Retry after the socket is ready or link this device from WhatsApp Linked Devices.`;
    }
    if (/401|logged.?out|bad.?auth/i.test(message)) {
        return `${message} — the saved WhatsApp session is invalid and must be paired again.`;
    }
    if (/408|timeout|timed? ?out|connection.?closed|428|515/i.test(message)) {
        return `${message} — WhatsApp socket is not ready yet; retrying pairing after reconnect.`;
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
    const maxAttempts = Number.isInteger(options.maxAttempts)
        ? Math.max(1, options.maxAttempts)
        : MAX_ATTEMPTS;

    await wait(initialDelay);
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
            const code = await sock.requestPairingCode(normalizedNumber);
            if (!code) throw new Error('WhatsApp returned an empty pairing code.');

            console.log(chalk.yellow('\n========== PAIRING CODE =========='));
            console.log(chalk.green(`Code: ${code}`));
            console.log(chalk.yellow('Enter this code on your WhatsApp phone.\n'));
            fancyLog('SUCCESS', `Pairing code sent to ${normalizedNumber}`);
            return code;
        } catch (error) {
            lastError = error;
            const formatted = formatPairingError(error);
            const retryable = /passkey|webauthn|challenge|401|logged.?out|bad.?auth|408|timeout|connection.?closed|428|515/i.test(formatted);
            if (attempt >= maxAttempts || !retryable) {
                fancyLog('ERROR', `Pairing failed: ${formatted}`);
                throw new Error(formatted);
            }

            const backoff = attempt * 1200;
            fancyLog('WARN', `Pairing attempt ${attempt}/${maxAttempts} needs a ready WhatsApp socket. Retrying in ${backoff}ms...`);
            await wait(backoff);
        }
    }

    throw lastError || new Error('Pairing failed without a reported error.');
}

module.exports = { normalizePhoneNumber, requestPairingCode };