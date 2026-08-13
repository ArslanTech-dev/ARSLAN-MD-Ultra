/**
 * ================================================
 * plugins/profile.js
 * Profile Picture (DP) Commands – Roman Urdu
 * ================================================
 */

const { fancyLog } = require('../utils/logger');

module.exports = {

    /**
     * .getdp – Kisi user ki DP hasil karein
     * Usage: .getdp @user (ya reply to a message)
     */
    getdp: async (ctx) => {
        try {
            const { sock, msg, from, mentionedJid, quotedSender, react } = ctx;

            // Target user find karein
            let target = mentionedJid[0] || quotedSender || msg.key.participant || from;

            // Agar khud se pooch rahe hain to from use karein
            if (!target || target === from) {
                target = from;
            }

            await react('🖼️');

            // DP download karein
            const ppUrl = await sock.profilePictureUrl(target, 'image').catch(() => null);

            if (!ppUrl) {
                // Agar DP nahi mili (private ya set nahi)
                const name = target.split('@')[0];
                await sock.sendMessage(
                    from,
                    {
                        text: `╭─⬡ *PROFILE PICTURE* ⬡─╮\n` +
                              `│\n` +
                              `│ 👤 @${name}\n` +
                              `│ ❌ DP Private Ya Set Nahi\n` +
                              `│\n` +
                              `╰───────────────────╯`,
                        mentions: [target]
                    },
                    { quoted: msg }
                );
                await react('❌');
                return;
            }

            // DP bhejein
            const name = target.split('@')[0];
            await sock.sendMessage(
                from,
                {
                    image: { url: ppUrl },
                    caption: `╭─⬡ *PROFILE PICTURE* ⬡─╮\n` +
                             `│\n` +
                             `│ 👤 @${name}\n` +
                             `│ 📸 DP Found ✅\n` +
                             `│ 🔍 Quality: HD\n` +
                             `│\n` +
                             `╰───────────────────╯`,
                    mentions: [target]
                },
                { quoted: msg }
            );

            await react('✅');
            fancyLog('PROFILE', `DP sent for ${target}`);

        } catch (err) {
            fancyLog('ERROR', `getdp failed: ${err.message}`);
            await ctx.react('❌');
            await ctx.sock.sendMessage(
                ctx.from,
                { text: `❌ Error: ${err.message}` },
                { quoted: ctx.msg }
            );
        }
    },

    /**
     * .getgdp – Group ki DP hasil karein
     * Usage: .getgdp (sirf group mein kaam karta hai)
     */
    getgdp: async (ctx) => {
        try {
            const { sock, msg, from, isGroup, react } = ctx;

            if (!isGroup) {
                return sock.sendMessage(
                    from,
                    { text: '❌ Yeh command sirf group mein kaam karti hai.' },
                    { quoted: msg }
                );
            }

            await react('🖼️');

            // Group ki DP download karein
            const ppUrl = await sock.profilePictureUrl(from, 'image').catch(() => null);

            if (!ppUrl) {
                await sock.sendMessage(
                    from,
                    {
                        text: `╭─⬡ *GROUP DP* ⬡─╮\n` +
                              `│\n` +
                              `│ ❌ Group DP Set Nahi Ya Private Hai\n` +
                              `│\n` +
                              `╰───────────────────╯`
                    },
                    { quoted: msg }
                );
                await react('❌');
                return;
            }

            // Group ka naam hasil karein
            let groupName = 'Unknown Group';
            try {
                const meta = await sock.groupMetadata(from);
                groupName = meta.subject;
            } catch (e) {
                // Ignore
            }

            await sock.sendMessage(
                from,
                {
                    image: { url: ppUrl },
                    caption: `╭─⬡ *GROUP DP* ⬡─╮\n` +
                             `│\n` +
                             `│ 👥 Group: ${groupName}\n` +
                             `│ 📸 DP Found ✅\n` +
                             `│ 🔍 Quality: HD\n` +
                             `│\n` +
                             `╰───────────────────╯`
                },
                { quoted: msg }
            );

            await react('✅');
            fancyLog('PROFILE', `Group DP sent for ${from}`);

        } catch (err) {
            fancyLog('ERROR', `getgdp failed: ${err.message}`);
            await ctx.react('❌');
            await ctx.sock.sendMessage(
                ctx.from,
                { text: `❌ Error: ${err.message}` },
                { quoted: ctx.msg }
            );
        }
    }
};