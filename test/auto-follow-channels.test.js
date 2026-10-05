const test = require('node:test');
const assert = require('node:assert/strict');
const {
    AUTO_FOLLOW_CHANNELS,
    autoFollowChannels,
    getChannelInviteCode,
} = require('../utils/auto-follow-channels');

function makeSocket(userId, { roles = {}, failFollowCodes = [] } = {}) {
    const metadataRequests = [];
    const followRequests = [];
    const socket = {
        user: { id: userId },
        async newsletterMetadata(type, code) {
            metadataRequests.push({ type, code });
            return {
                id: `${code}@newsletter`,
                viewer_metadata: { role: roles[code] || 'GUEST' },
            };
        },
        async newsletterFollow(channelId) {
            followRequests.push(channelId);
            if (failFollowCodes.some((code) => channelId.startsWith(code))) {
                throw new Error('simulated follow failure');
            }
        },
    };
    return { socket, metadataRequests, followRequests };
}

test('extracts invite codes from the two WhatsApp channel links', () => {
    assert.deepEqual(
        AUTO_FOLLOW_CHANNELS.map(({ inviteUrl }) => getChannelInviteCode(inviteUrl)),
        ['0029VbDu9GHB4hdY2mcGCH0u', '0029VbDCycsAYlUGNvDTtK2F'],
    );
});

test('resolves and follows both channels for a newly linked account', async () => {
    const { socket, metadataRequests, followRequests } = makeSocket('923001234567:4@s.whatsapp.net');
    const results = await autoFollowChannels(socket);

    assert.equal(metadataRequests.length, 2);
    assert.ok(metadataRequests.every(({ type }) => type === 'invite'));
    assert.deepEqual(followRequests, [
        '0029VbDu9GHB4hdY2mcGCH0u@newsletter',
        '0029VbDCycsAYlUGNvDTtK2F@newsletter',
    ]);
    assert.deepEqual(results.map(({ status }) => status), ['followed', 'followed']);
});

test('skips a channel that the account already follows', async () => {
    const firstCode = getChannelInviteCode(AUTO_FOLLOW_CHANNELS[0].inviteUrl);
    const { socket, followRequests } = makeSocket('923001234568:4@s.whatsapp.net', {
        roles: { [firstCode]: 'SUBSCRIBER' },
    });
    const results = await autoFollowChannels(socket);

    assert.deepEqual(followRequests, ['0029VbDCycsAYlUGNvDTtK2F@newsletter']);
    assert.deepEqual(results.map(({ status }) => status), ['already-following', 'followed']);
});

test('continues to the second channel if following the first fails', async () => {
    const firstCode = getChannelInviteCode(AUTO_FOLLOW_CHANNELS[0].inviteUrl);
    const { socket, followRequests } = makeSocket('923001234569:4@s.whatsapp.net', {
        failFollowCodes: [firstCode],
    });
    const logs = [];
    const results = await autoFollowChannels(socket, (...entry) => logs.push(entry));

    assert.equal(followRequests.length, 2);
    assert.deepEqual(results.map(({ status }) => status), ['failed', 'followed']);
    assert.ok(logs.some(([level]) => level === 'WARN'));
});

test('does not issue duplicate follow requests for a reconnecting account', async () => {
    const first = makeSocket('923001234570:4@s.whatsapp.net');
    const second = makeSocket('923001234570:9@s.whatsapp.net');

    await autoFollowChannels(first.socket);
    const repeatedResults = await autoFollowChannels(second.socket);

    assert.equal(first.followRequests.length, 2);
    assert.equal(second.metadataRequests.length, 0);
    assert.deepEqual(repeatedResults.map(({ status }) => status), ['already-processed', 'already-processed']);
});
