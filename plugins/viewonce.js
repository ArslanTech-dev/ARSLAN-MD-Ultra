// plugins/viewonce.js
// Commands: .vv (download & resend), .vv2 (forward without view-once flag)
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { fancyLog } = require('../utils/logger');

// ─── HELPER: Download media from view‑once message ───
const downloadMedia = async (mediaKey, mediaType) => {
    const stream = await downloadContentFromMessage(mediaKey, mediaType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
};

module.exports = {
    /**
     * .vv – Download view‑once media and send as normal media
     * Usage: reply to a view‑once message with .vv
     */
    vv: async (ctx) => {
        try {
            const { sock, msg, from, react } = ctx;

            // 1. Check if reply exists
            const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
            if (!quotedMsg) {
                return sock.sendMessage(from, {
                    text: '❌ Reply karo kisi View-Once photo/video/voice pe'
                }, { quoted: msg });
            }

            // 2. Validate it's a view‑once message
            if (!quotedMsg.viewOnceMessage) {
                return sock.sendMessage(from, {
                    text: '❌ Ye View-Once message nahi hai.'
                }, { quoted: msg });
            }

            await react('⏳');

            // 3. Extract the actual content
            const vvMsg = quotedMsg.viewOnceMessage.message;
            const type = Object.keys(vvMsg)[0];
            const content = vvMsg[type];

            // 4. Build caption
            let caption = `🔓 *ARSLAN MD ULTRA V5* | View-Once ${type.replace('Message', '').toUpperCase()}`;
            if (content.caption) caption += `\n\n📝 ${content.caption}`;

            // 5. Handle each media type
            if (type === 'imageMessage') {
                const buffer = await downloadMedia(content, 'image');
                await sock.sendMessage(from, { image: buffer, caption }, { quoted: msg });
            }
            else if (type === 'videoMessage') {
                const buffer = await downloadMedia(content, 'video');
                await sock.sendMessage(from, { video: buffer, caption }, { quoted: msg });
            }
            else if (type === 'audioMessage') {
                const buffer = await downloadMedia(content, 'audio');
                await sock.sendMessage(from, {
                    audio: buffer,
                    mimetype: 'audio/ogg; codecs=opus',
                    ptt: true
                }, { quoted: msg });
            }
            else if (type === 'conversation' || type === 'extendedTextMessage') {
                const text = content.text || content;
                await sock.sendMessage(from, {
                    text: `🔓 *ARSLAN MD ULTRA V5* | View-Once Text\n\n${text}`
                }, { quoted: msg });
            }
            else {
                return sock.sendMessage(from, {
                    text: '❌ Unsupported view-once type.'
                }, { quoted: msg });
            }

            fancyLog('SUCCESS', `View-once ${type} downloaded`);
            await react('✅');

        } catch (err) {
            fancyLog('ERROR', `vv command failed: ${err.message}`);
            await ctx.react('❌');
            await ctx.sock.sendMessage(ctx.from, {
                text: `❌ Error: ${err.message}`
            }, { quoted: ctx.msg });
        }
    },

    /**
     * .vv2 – Forward view‑once media without the view‑once flag
     * Usage: reply to a view‑once message with .vv2
     */
    vv2: async (ctx) => {
        try {
            const { sock, msg, from, react } = ctx;

            const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
            if (!quotedMsg) {
                return sock.sendMessage(from, {
                    text: '❌ Reply karo kisi View-Once message pe'
                }, { quoted: msg });
            }
            if (!quotedMsg.viewOnceMessage) {
                return sock.sendMessage(from, {
                    text: '❌ Ye View-Once message nahi hai.'
                }, { quoted: msg });
            }

            await react('🔄');

            const vvMsg = quotedMsg.viewOnceMessage.message;
            const type = Object.keys(vvMsg)[0];
            const content = vvMsg[type];

            let caption = `🔄 *Forwarded from View-Once*`;
            if (content.caption) caption += `\n\n📝 ${content.caption}`;

            if (type === 'imageMessage') {
                const buffer = await downloadMedia(content, 'image');
                await sock.sendMessage(from, { image: buffer, caption }, { quoted: msg });
            }
            else if (type === 'videoMessage') {
                const buffer = await downloadMedia(content, 'video');
                await sock.sendMessage(from, { video: buffer, caption }, { quoted: msg });
            }
            else if (type === 'audioMessage') {
                const buffer = await downloadMedia(content, 'audio');
                await sock.sendMessage(from, {
                    audio: buffer,
                    mimetype: 'audio/ogg; codecs=opus',
                    ptt: true
                }, { quoted: msg });
            }
            else if (type === 'conversation' || type === 'extendedTextMessage') {
                const text = content.text || content;
                await sock.sendMessage(from, {
                    text: `🔄 *Forwarded from View-Once*\n\n${text}`
                }, { quoted: msg });
            }
            else {
                return sock.sendMessage(from, {
                    text: '❌ Unsupported view-once type.'
                }, { quoted: msg });
            }

            fancyLog('SUCCESS', `View-once ${type} forwarded`);
            await react('✅');

        } catch (err) {
            fancyLog('ERROR', `vv2 command failed: ${err.message}`);
            await ctx.react('❌');
            await ctx.sock.sendMessage(ctx.from, {
                text: `❌ Error: ${err.message}`
            }, { quoted: ctx.msg });
        }
    }
};