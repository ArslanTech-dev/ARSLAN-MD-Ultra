'use strict';

// Temporary port of WhiskeySockets/Baileys PR #2559 for the pinned rc14 build.
// Keep the version guard; replace this patch after an official release includes it.
const fs = require('fs');
const path = require('path');

const packagePath = require.resolve('@whiskeysockets/baileys/package.json');
const baileysVersion = require(packagePath).version;
if (baileysVersion !== '7.0.0-rc14') {
    throw new Error(
        `The pairing patch targets @whiskeysockets/baileys 7.0.0-rc14; found ${baileysVersion}. Review upstream before changing versions.`,
    );
}

function replaceOnce(source, before, after, label) {
    const matches = source.split(before).length - 1;
    if (matches !== 1) {
        throw new Error(`Could not safely apply Baileys pairing patch to ${label}; expected one source match, found ${matches}.`);
    }
    return source.replace(before, after);
}

const packageDirectory = path.dirname(packagePath);
const helperPath = path.join(packageDirectory, 'lib/Utils/companion-reg-client-utils.js');
const socketPath = path.join(packageDirectory, 'lib/Socket/socket.js');
let helper = fs.readFileSync(helperPath, 'utf8');
let socket = fs.readFileSync(socketPath, 'utf8');

if (!helper.includes('getPairingCodePlatform')) {
    helper = replaceOnce(
        helper,
        `export const getCompanionPlatformId = (browser) => {
    return getCompanionWebClientType(browser).toString();
};
`,
        `export const getCompanionPlatformId = (browser) => {
    return getCompanionWebClientType(browser).toString();
};
const DEFAULT_PAIRING_CODE_BROWSER_PLATFORM = { id: '1', displayName: 'Chrome' };
const PAIRING_CODE_BROWSER_PLATFORM = {
    Chrome: DEFAULT_PAIRING_CODE_BROWSER_PLATFORM,
    Firefox: { id: '2', displayName: 'Firefox' },
    IE: { id: '3', displayName: 'IE' },
    Opera: { id: '4', displayName: 'Opera' },
    Safari: { id: '5', displayName: 'Safari' },
    Edge: { id: '6', displayName: 'Edge' }
};
const PAIRING_CODE_OS_DISPLAY = new Set(['Mac OS', 'Windows', 'Ubuntu']);
export const getPairingCodePlatform = ([os, browserName]) => {
    const browser = PAIRING_CODE_BROWSER_PLATFORM[browserName] || DEFAULT_PAIRING_CODE_BROWSER_PLATFORM;
    const osDisplay = PAIRING_CODE_OS_DISPLAY.has(os) ? os : 'Mac OS';
    return {
        id: browser.id,
        display: browser.displayName + ' (' + osDisplay + ')'
    };
};
`,
        helperPath,
    );
}

if (!socket.includes('let pairingReady = false;')) {
    socket = replaceOnce(
        socket,
        'getCompanionPlatformId,',
        'getPairingCodePlatform,',
        socketPath,
    );
    socket = replaceOnce(
        socket,
        '    let closed = false;\n',
        '    let closed = false;\n    let pairingReady = false;\n    let pairingInProgress = false;\n    let pendingPairingResolve;\n    let pendingPairingReject;\n',
        socketPath,
    );
    socket = replaceOnce(
        socket,
        `        clearInterval(keepAliveReq);
        clearTimeout(qrTimer);
        ws.removeAllListeners('close');`,
        `        clearInterval(keepAliveReq);
        clearTimeout(qrTimer);
        pairingReady = false;
        pairingInProgress = false;
        pendingPairingReject?.(error || new Boom('Connection closed before pairing completed', { statusCode: DisconnectReason.connectionClosed }));
        pendingPairingResolve = undefined;
        pendingPairingReject = undefined;
        ws.removeAllListeners('close');`,
        socketPath,
    );
    socket = replaceOnce(
        socket,
        `    const requestPairingCode = async (phoneNumber, customPairingCode) => {
        const pairingCode = customPairingCode ?? bytesToCrockford(randomBytes(5));
        if (customPairingCode && customPairingCode?.length !== 8) {
            throw new Error('Custom pairing code must be exactly 8 chars');
        }
        authState.creds.pairingCode = pairingCode;
        authState.creds.me = {
            id: jidEncode(phoneNumber, 's.whatsapp.net'),
            name: '~'
        };
        ev.emit('creds.update', authState.creds);
        await sendNode({
            tag: 'iq',
            attrs: {
                to: S_WHATSAPP_NET,
                type: 'set',
                id: generateMessageTag(),
                xmlns: 'md'
            },
            content: [
                {
                    tag: 'link_code_companion_reg',
                    attrs: {
                        jid: authState.creds.me.id,
                        stage: 'companion_hello',
                        should_show_push_notification: 'true'
                    },
                    content: [
                        {
                            tag: 'link_code_pairing_wrapped_companion_ephemeral_pub',
                            attrs: {},
                            content: await generatePairingKey()
                        },
                        {
                            tag: 'companion_server_auth_key_pub',
                            attrs: {},
                            content: authState.creds.noiseKey.public
                        },
                        {
                            tag: 'companion_platform_id',
                            attrs: {},
                            content: getCompanionPlatformId(browser)
                        },
                        {
                            tag: 'companion_platform_display',
                            attrs: {},
                            content: \`\${browser[1]} (\${browser[0]})\`
                        },
                        {
                            tag: 'link_code_pairing_nonce',
                            attrs: {},
                            content: '0'
                        }
                    ]
                }
            ]
        });
        return authState.creds.pairingCode;
    };`,
        `    const sendPairingCodeRequest = async (phoneNumber, customPairingCode) => {
        const pairingCode = customPairingCode ?? bytesToCrockford(randomBytes(5));
        if (customPairingCode && customPairingCode.length !== 8) {
            throw new Error('Custom pairing code must be exactly 8 chars');
        }
        authState.creds.pairingCode = pairingCode;
        const jid = jidEncode(phoneNumber, 's.whatsapp.net');
        const pairingPlatform = getPairingCodePlatform(browser);
        try {
            const result = await query({
                tag: 'iq',
                attrs: {
                    to: S_WHATSAPP_NET,
                    type: 'set',
                    xmlns: 'md'
                },
                content: [
                    {
                        tag: 'link_code_companion_reg',
                        attrs: {
                            jid,
                            stage: 'companion_hello',
                            should_show_push_notification: 'true'
                        },
                        content: [
                            {
                                tag: 'link_code_pairing_wrapped_companion_ephemeral_pub',
                                attrs: {},
                                content: await generatePairingKey()
                            },
                            {
                                tag: 'companion_server_auth_key_pub',
                                attrs: {},
                                content: authState.creds.noiseKey.public
                            },
                            {
                                tag: 'companion_platform_id',
                                attrs: {},
                                content: pairingPlatform.id
                            },
                            {
                                tag: 'companion_platform_display',
                                attrs: {},
                                content: pairingPlatform.display
                            },
                            {
                                tag: 'link_code_pairing_nonce',
                                attrs: {},
                                content: '0'
                            }
                        ]
                    }
                ]
            });
            if (!result) {
                throw new Boom('Timed out waiting for pairing code response', { statusCode: DisconnectReason.timedOut });
            }
        }
        catch (error) {
            if (authState.creds.pairingCode === pairingCode) {
                authState.creds.pairingCode = undefined;
            }
            throw error;
        }
        authState.creds.me = { id: jid, name: '~' };
        ev.emit('creds.update', authState.creds);
        return pairingCode;
    };
    const requestPairingCode = async (phoneNumber, customPairingCode) => {
        if (customPairingCode && customPairingCode.length !== 8) {
            throw new Error('Custom pairing code must be exactly 8 chars');
        }
        if (pairingInProgress) {
            throw new Boom('A pairing request is already in progress', { statusCode: 400 });
        }
        pairingInProgress = true;
        try {
            if (!pairingReady) {
                logger.debug('pairing not ready yet, queuing request until pair-device is received');
                await new Promise((resolve, reject) => {
                    pendingPairingResolve = () => {
                        pendingPairingResolve = undefined;
                        pendingPairingReject = undefined;
                        resolve();
                    };
                    pendingPairingReject = (err) => {
                        pendingPairingResolve = undefined;
                        pendingPairingReject = undefined;
                        reject(err);
                    };
                });
            }
            return await sendPairingCodeRequest(phoneNumber, customPairingCode);
        }
        finally {
            pairingInProgress = false;
        }
    };`,
        socketPath,
    );
    socket = replaceOnce(
        socket,
        `        await sendNode(iq);
        const pairDeviceNode = getBinaryNodeChild(stanza, 'pair-device');`,
        `        await sendNode(iq);
        pairingReady = true;
        pendingPairingResolve?.();
        const pairDeviceNode = getBinaryNodeChild(stanza, 'pair-device');`,
        socketPath,
    );
}

fs.writeFileSync(helperPath, helper);
fs.writeFileSync(socketPath, socket);
console.log(`Applied the pairing acknowledgement patch to Baileys ${baileysVersion}.`);