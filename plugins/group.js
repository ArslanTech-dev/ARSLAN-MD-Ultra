// commands/group.js
// All group management commands

module.exports = {
    tagall: async (ctx) => {
        if (!ctx.isGroup) return ctx.sock.sendMessage(ctx.from, { text: '❌ Group only.' });
        await ctx.react('📢');
        const meta = await ctx.sock.groupMetadata(ctx.from);
        const participants = meta.participants;
        let msg = `╭─⬡ *TAG ALL* ⬡─╮\n│\n│ @everyone\n│\n`;
        participants.forEach(p => {
            msg += `│ @${p.id.split('@')[0]}\n`;
        });
        msg += `╰───────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, {
            text: msg,
            mentions: participants.map(p => p.id)
        }, { quoted: ctx.msg });
    },

    kick: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('👢');
        const target = ctx.mentionedJid[0] || ctx.quotedSender;
        if (!target) return ctx.sock.sendMessage(ctx.from, { text: 'Tag or reply to a member.' });
        await ctx.sock.groupParticipantsUpdate(ctx.from, [target], 'remove');
        await ctx.sock.sendMessage(ctx.from, {
            text: `✅ Removed @${target.split('@')[0]}`,
            mentions: [target]
        }, { quoted: ctx.msg });
    },

    promote: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('👑');
        const target = ctx.mentionedJid[0] || ctx.quotedSender;
        if (!target) return ctx.sock.sendMessage(ctx.from, { text: 'Tag or reply to a member.' });
        await ctx.sock.groupParticipantsUpdate(ctx.from, [target], 'promote');
        await ctx.sock.sendMessage(ctx.from, {
            text: `👑 Promoted @${target.split('@')[0]}`,
            mentions: [target]
        }, { quoted: ctx.msg });
    },

    demote: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('📉');
        const target = ctx.mentionedJid[0] || ctx.quotedSender;
        if (!target) return ctx.sock.sendMessage(ctx.from, { text: 'Tag or reply to a member.' });
        await ctx.sock.groupParticipantsUpdate(ctx.from, [target], 'demote');
        await ctx.sock.sendMessage(ctx.from, {
            text: `📉 Demoted @${target.split('@')[0]}`,
            mentions: [target]
        }, { quoted: ctx.msg });
    },

    hidetag: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('🫥');
        const text = ctx.args.join(' ') || 'Hello Everyone';
        const meta = await ctx.sock.groupMetadata(ctx.from);
        const participants = meta.participants.map(p => p.id);
        await ctx.sock.sendMessage(ctx.from, {
            text: `🫥 *HIDETAG*\n\n${text}`,
            mentions: participants
        }, { quoted: ctx.msg });
    },

    tagadmins: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('👮');
        const meta = await ctx.sock.groupMetadata(ctx.from);
        const admins = meta.participants.filter(p => p.admin).map(p => p.id);
        if (admins.length === 0) return ctx.sock.sendMessage(ctx.from, { text: 'No admins found.' });
        let msg = `╭─⬡ *ADMINS* ⬡─╮\n│\n`;
        admins.forEach(admin => {
            msg += `│ @${admin.split('@')[0]}\n`;
        });
        msg += `╰───────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, {
            text: msg,
            mentions: admins
        }, { quoted: ctx.msg });
    },

    ginfo: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('ℹ️');
        const meta = await ctx.sock.groupMetadata(ctx.from);
        const admins = meta.participants.filter(p => p.admin).map(p => p.id);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *GROUP INFO* ⬡─╮
│
│ ℹ️ Name: ${meta.subject}
│ 👥 Members: ${meta.participants.length}
│ 👑 Admins: ${admins.length}
│ 📅 Created: ${new Date(meta.creation * 1000).toLocaleDateString()}
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    add: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('➕');
        const number = ctx.args[0];
        if (!number) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .add 923xxxxxxxxx' });
        const jid = number + '@s.whatsapp.net';
        await ctx.sock.groupParticipantsUpdate(ctx.from, [jid], 'add');
        await ctx.sock.sendMessage(ctx.from, { text: `✅ Added @${number}`, mentions: [jid] }, { quoted: ctx.msg });
    },

    invite: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('🔗');
        const code = await ctx.sock.groupInviteCode(ctx.from);
        const link = `https://chat.whatsapp.com/${code}`;
        await ctx.sock.sendMessage(ctx.from, { text: `🔗 *GROUP LINK*\n\n${link}` }, { quoted: ctx.msg });
    },

    link: async (ctx) => { await module.exports.invite(ctx); },

    join: async (ctx) => {
        const link = ctx.args[0];
        if (!link) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .join group_link' });
        await ctx.react('🔗');
        try {
            const code = link.split('https://chat.whatsapp.com/')[1];
            const res = await ctx.sock.groupAcceptInvite(code);
            await ctx.sock.sendMessage(ctx.from, { text: `✅ Joined group` }, { quoted: ctx.msg });
        } catch (e) {
            await ctx.sock.sendMessage(ctx.from, { text: `❌ Failed to join: ${e.message}` }, { quoted: ctx.msg });
        }
    },

    leave: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('🚪');
        await ctx.sock.groupLeave(ctx.from);
    },

    out: async (ctx) => { await module.exports.leave(ctx); },

    mute: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('🔇');
        await ctx.sock.groupSettingUpdate(ctx.from, 'announcement');
        await ctx.sock.sendMessage(ctx.from, { text: '🔇 Group muted. Only admins can send messages.' }, { quoted: ctx.msg });
    },

    unmute: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('🔊');
        await ctx.sock.groupSettingUpdate(ctx.from, 'not_announcement');
        await ctx.sock.sendMessage(ctx.from, { text: '🔊 Group unmuted. Everyone can chat.' }, { quoted: ctx.msg });
    },

    end: async (ctx) => { await module.exports.mute(ctx); },

    revoke: async (ctx) => {
        if (!ctx.isGroup) return;
        await ctx.react('🔄');
        const code = await ctx.sock.groupRevokeInvite(ctx.from);
        const link = `https://chat.whatsapp.com/${code}`;
        await ctx.sock.sendMessage(ctx.from, { text: `🔄 *LINK REVOKED*\n\nNew link: ${link}` }, { quoted: ctx.msg });
    },

    poll: async (ctx) => {
        if (!ctx.isGroup) return;
        const args = ctx.args.join(' ');
        const parts = args.split('|');
        if (parts.length < 3) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .poll Question | option1 | option2' });
        const question = parts[0].trim();
        const options = parts.slice(1).map(s => s.trim());
        await ctx.sock.sendMessage(ctx.from, {
            poll: {
                name: question,
                values: options,
                selectableCount: 1
            }
        }, { quoted: ctx.msg });
    },

    // ... add all other group commands (newgc, delete, acceptall, rejectall, requests, accept, reject, updategdesc, updategname, groupstatus, antibot, dismissall, gcpp)
};