const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizePhoneNumber, requestPairingCode } = require('../pair');
const { Browsers, getPairingCodePlatform } = require('@whiskeysockets/baileys');

test('normalizes a WhatsApp number to digits with country code', () => {
    assert.equal(normalizePhoneNumber('+92 300 1234567'), '923001234567');
});

test('rejects numbers without a plausible country-code format', () => {
    assert.throws(() => normalizePhoneNumber('12345'), /country code/);
});

test('requests exactly one pairing code using the normalized number', async () => {
    const calls = [];
    const socket = {
        async requestPairingCode(number) {
            calls.push(number);
            return 'AB12CD34';
        },
    };

    assert.equal(await requestPairingCode(socket, '+92 300 1234567', { initialDelayMs: 0 }), 'AB12CD34');
    assert.deepEqual(calls, ['923001234567']);
});

test('surfaces WhatsApp handshake rejection without retrying', async () => {
    let attempts = 0;
    const socket = {
        async requestPairingCode() {
            attempts += 1;
            const error = new Error('bad-request');
            error.output = { statusCode: 400 };
            throw error;
        },
    };

    await assert.rejects(
        requestPairingCode(socket, '923001234567', { initialDelayMs: 0 }),
        /WhatsApp rejected the pairing request/,
    );
    assert.equal(attempts, 1);
});

test('maps custom OS/browser strings to a supported pairing platform', () => {
    assert.deepEqual(
        getPairingCodePlatform(['Replit', 'Chrome', '20.0.04']),
        { id: '1', display: 'Chrome (Mac OS)' },
    );
    assert.deepEqual(
        getPairingCodePlatform(Browsers.ubuntu('Chrome')),
        { id: '1', display: 'Chrome (Ubuntu)' },
    );
});