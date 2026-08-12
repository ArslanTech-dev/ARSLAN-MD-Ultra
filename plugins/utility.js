// plugins/utility.js
module.exports = {
    person: async (ctx) => {
        await ctx.react('👤');
        await ctx.sock.sendMessage(ctx.from, {
            text: `👤 *PERSON*\n\nName: ${ctx.args.join(' ') || 'Unknown'}\nStatus: Profile not found.`
        }, { quoted: ctx.msg });
    },

    readmore: async (ctx) => {
        await ctx.react('📖');
        await ctx.sock.sendMessage(ctx.from, {
            text: `📖 *READ MORE*\n\nThis is a placeholder. Use to split long messages.`
        }, { quoted: ctx.msg });
    },

    msg: async (ctx) => {
        const text = ctx.args.join(' ') || 'Hello!';
        await ctx.react('💬');
        await ctx.sock.sendMessage(ctx.from, {
            text: `💬 *MSG*\n\n${text}`
        }, { quoted: ctx.msg });
    },

    report: async (ctx) => {
        const issue = ctx.args.join(' ') || 'No details given.';
        await ctx.react('📢');
        // Forward to owner
        const owner = global.OWNER[0];
        if (owner) {
            await ctx.sock.sendMessage(owner, {
                text: `📢 *REPORT FROM ${ctx.from}*\n\n${issue}`
            });
            await ctx.sock.sendMessage(ctx.from, {
                text: '✅ Report sent to owner.'
            }, { quoted: ctx.msg });
        } else {
            await ctx.sock.sendMessage(ctx.from, {
                text: '❌ Owner not available.'
            }, { quoted: ctx.msg });
        }
    },

    time: async (ctx) => {
        const now = new Date().toLocaleTimeString();
        await ctx.react('🕐');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🕐 *CURRENT TIME*\n\n${now}`
        }, { quoted: ctx.msg });
    },

    img: async (ctx) => {
        const query = ctx.args.join(' ') || 'random';
        await ctx.react('🖼️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🖼️ *IMAGE SEARCH*\n\nSearching for "${query}"... (stub)`
        }, { quoted: ctx.msg });
    },

    img2: async (ctx) => {
        const query = ctx.args.join(' ') || 'random';
        await ctx.react('🖼️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🖼️ *IMAGE SEARCH 2*\n\nSearching for "${query}"... (stub)`
        }, { quoted: ctx.msg });
    },

    gpass: async (ctx) => {
        const length = parseInt(ctx.args[0]) || 12;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        await ctx.react('🔐');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🔐 *GENERATED PASSWORD*\n\n${password}`
        }, { quoted: ctx.msg });
    },

    iqc: async (ctx) => {
        await ctx.react('🤔');
        await ctx.sock.sendMessage(ctx.from, {
            text: '🤔 *IQC*\n\nIntelligence Quotient Check: Placeholder.'
        }, { quoted: ctx.msg });
    },

    trt: async (ctx) => {
        await ctx.react('🗣️');
        await ctx.sock.sendMessage(ctx.from, {
            text: '🗣️ *TRT*\n\nText to Speech (stub).'
        }, { quoted: ctx.msg });
    },

    tiktokstalk: async (ctx) => {
        const username = ctx.args[0] || 'unknown';
        await ctx.react('📱');
        await ctx.sock.sendMessage(ctx.from, {
            text: `📱 *TIKTOK STALK*\n\nUsername: ${username}\nFollowers: 0\nFollowing: 0\nLikes: 0 (stub)`
        }, { quoted: ctx.msg });
    },

    yts: async (ctx) => {
        const query = ctx.args.join(' ') || 'random';
        await ctx.react('▶️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `▶️ *YOUTUBE SEARCH*\n\nSearching "${query}"... (stub)`
        }, { quoted: ctx.msg });
    },

    ytstalk: async (ctx) => {
        const channel = ctx.args[0] || 'unknown';
        await ctx.react('📺');
        await ctx.sock.sendMessage(ctx.from, {
            text: `📺 *YOUTUBE STALK*\n\nChannel: ${channel}\nSubscribers: 0 (stub)`
        }, { quoted: ctx.msg });
    },

    tiny: async (ctx) => {
        const url = ctx.args[0] || 'https://example.com';
        await ctx.react('🔗');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🔗 *TINY URL*\n\nShortened: https://tinyurl.com/... (stub)`
        }, { quoted: ctx.msg });
    },

    wink: async (ctx) => {
        await ctx.react('😉');
        await ctx.sock.sendMessage(ctx.from, {
            text: '😉 *WINK*\n\n*Wink* 😉'
        }, { quoted: ctx.msg });
    },

    laugh: async (ctx) => {
        await ctx.react('😂');
        await ctx.sock.sendMessage(ctx.from, {
            text: '😂 *LAUGH*\n\nHahahaha! 😂'
        }, { quoted: ctx.msg });
    },

    smile: async (ctx) => {
        await ctx.react('😊');
        await ctx.sock.sendMessage(ctx.from, {
            text: '😊 *SMILE*\n\nKeep smiling! 😊'
        }, { quoted: ctx.msg });
    },

    statuslike: async (ctx) => {
        await ctx.react('👍');
        await ctx.sock.sendMessage(ctx.from, {
            text: '👍 *STATUS LIKE*\n\nLiked your status! (stub)'
        }, { quoted: ctx.msg });
    },

    ban: async (ctx) => {
        const target = ctx.mentionedJid[0] || ctx.args[0];
        if (!target) return ctx.sock.sendMessage(ctx.from, { text: 'Tag or mention a user.' });
        // Implement ban logic (e.g., add to ban list)
        await ctx.react('🚫');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🚫 *BANNED*\n\nUser @${target.split('@')[0]} banned.`,
            mentions: [target]
        }, { quoted: ctx.msg });
    },

    unban: async (ctx) => {
        const target = ctx.mentionedJid[0] || ctx.args[0];
        if (!target) return ctx.sock.sendMessage(ctx.from, { text: 'Tag or mention a user.' });
        await ctx.react('✅');
        await ctx.sock.sendMessage(ctx.from, {
            text: `✅ *UNBANNED*\n\nUser @${target.split('@')[0]} unbanned.`,
            mentions: [target]
        }, { quoted: ctx.msg });
    },

    banlist: async (ctx) => {
        await ctx.react('📋');
        await ctx.sock.sendMessage(ctx.from, {
            text: '📋 *BAN LIST*\n\nNo banned users. (stub)'
        }, { quoted: ctx.msg });
    },
};