const test = require('node:test');
const assert = require('node:assert/strict');
const { loadBotLogoMedia } = require('../utils/bot-logo');

test('loads the uploaded square logo as JPEG media from the assets folder', () => {
    const logo = loadBotLogoMedia('assets/IMG-20260805-WA0005.jpg');

    assert.ok(Buffer.isBuffer(logo));
    assert.deepEqual([...logo.subarray(0, 3)], [0xff, 0xd8, 0xff]);
});

test('keeps HTTP(S) logo overrides supported', () => {
    assert.deepEqual(
        loadBotLogoMedia('https://example.com/logo.jpg'),
        { url: 'https://example.com/logo.jpg' },
    );
});
