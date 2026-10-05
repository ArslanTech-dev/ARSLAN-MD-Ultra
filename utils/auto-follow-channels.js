const AUTO_FOLLOW_CHANNELS = [
    {
        name: 'Channel 1',
        inviteUrl: 'https://whatsapp.com/channel/0029VbDu9GHB4hdY2mcGCH0u',
    },
    {
        name: 'Channel 2',
        inviteUrl: 'https://whatsapp.com/channel/0029VbDCycsAYlUGNvDTtK2F',
    },
];

const processedFollows = new Set();
const FOLLOWED_ROLES = new Set(['ADMIN', 'OWNER', 'SUBSCRIBER']);

function getChannelInviteCode(inviteUrl) {
    const url = new URL(inviteUrl);
    if (!['whatsapp.com', 'www.whatsapp.com'].includes(url.hostname.toLowerCase())) {
        throw new Error('Channel invite must use whatsapp.com.');
    }

    const match = /^\/channel\/([A-Za-z0-9_-]+)\/?$/.exec(url.pathname);
    if (!match) {
        throw new Error('Channel invite URL is invalid.');
    }

    return match[1];
}

function getAccountKey(socket) {
    return String(socket?.user?.id || '').split(':')[0];
}

async function autoFollowChannels(socket, logger = () => {}) {
    const accountKey = getAccountKey(socket);
    if (!accountKey) {
        logger('WARN', 'Could not auto-follow channels because the connected WhatsApp account ID is unavailable.');
        return [];
    }

    const results = [];
    for (const channel of AUTO_FOLLOW_CHANNELS) {
        const inviteCode = getChannelInviteCode(channel.inviteUrl);
        const processedKey = `${accountKey}:${inviteCode}`;
        if (processedFollows.has(processedKey)) {
            results.push({ channel: channel.name, status: 'already-processed' });
            continue;
        }

        try {
            const metadata = await socket.newsletterMetadata('invite', inviteCode);
            if (!metadata?.id) {
                throw new Error('WhatsApp did not return channel details for this invite.');
            }

            const role = metadata.viewer_metadata?.role || metadata.viewerMetadata?.role;
            if (FOLLOWED_ROLES.has(role)) {
                processedFollows.add(processedKey);
                logger('INFO', `${channel.name} is already followed by the linked WhatsApp account.`);
                results.push({ channel: channel.name, status: 'already-following' });
                continue;
            }

            await socket.newsletterFollow(metadata.id);
            processedFollows.add(processedKey);
            logger('SUCCESS', `Followed ${channel.name} from the linked WhatsApp account.`);
            results.push({ channel: channel.name, status: 'followed' });
        } catch (error) {
            const detail = String(error?.message || error).replace(/\s+/g, ' ').slice(0, 160);
            logger('WARN', `Could not auto-follow ${channel.name}: ${detail}`);
            results.push({ channel: channel.name, status: 'failed', error: detail });
        }
    }

    return results;
}

module.exports = {
    AUTO_FOLLOW_CHANNELS,
    autoFollowChannels,
    getChannelInviteCode,
};
