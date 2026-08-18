// plugins/instagram.js
// Instagram Downloader – Posts, Reels, Carousels
// Powered by ARSLAN TECH'S
// Roman Urdu – Vertical Format

const axios = require('axios');
const { fancyLog } = require('../utils/logger');
const instaGet = require('instagram-url-direct');

module.exports = {

    // ─── .insta ─────────────────────────────────────
    insta: async (ctx) => {
        const url = ctx.args[0];
        if (!url) {
            await ctx.sock.sendMessage(
                ctx.from,
                {
                    text: '❌ Usage: .insta <instagram_url>\nExample: .insta https://www.instagram.com/p/ABC123/'
                },
                { quoted: ctx.msg }
            );
            return;
        }

        await ctx.react('📸');
        const from = ctx.from;

        try {
            // ─── Step 1: Fetch Media Info ──────────
            const info = await instaGet(url);
            if (!info || !info.media) {
                throw new Error('No media found');
            }

            const mediaList = info.media; // Array of URLs (image/video)
            const captionText = info.caption || 'No caption';
            const type = info.type; // 'image' or 'video' or 'carousel'

            // ─── Step 2: Send Media ────────────────
            if (mediaList.length === 1) {
                // Single media
                const mediaUrl = mediaList[0];
                const isVideo = mediaUrl.includes('.mp4') || mediaUrl.includes('video');

                let caption = `╭─⬡ 📸 *INSTAGRAM DOWNLOAD* 📸 ⬡─╮\n` +
                              `│\n` +
                              `│  📥 Downloaded successfully!\n` +
                              `│  📝 Caption: ${captionText.slice(0, 100)}${captionText.length > 100 ? '...' : ''}\n` +
                              `│  🔗 Powered by ARSLAN TECH'S\n` +
                              `│\n` +
                              `╰─────────────────────────╯`;

                if (isVideo) {
                    await ctx.sock.sendMessage(
                        from,
                        {
                            video: { url: mediaUrl },
                            caption: caption
                        },
                        { quoted: ctx.msg }
                    );
                } else {
                    await ctx.sock.sendMessage(
                        from,
                        {
                            image: { url: mediaUrl },
                            caption: caption
                        },
                        { quoted: ctx.msg }
                    );
                }
            } else {
                // Carousel (multiple images/videos)
                // Send each media separately
                for (let i = 0; i < mediaList.length; i++) {
                    const mediaUrl = mediaList[i];
                    const isVideo = mediaUrl.includes('.mp4') || mediaUrl.includes('video');
                    const partCaption = `╭─⬡ 📸 *INSTAGRAM CAROUSEL* 📸 ⬡─╮\n` +
                                        `│\n` +
                                        `│  📥 Part ${i+1}/${mediaList.length}\n` +
                                        `│  🔗 Powered by ARSLAN TECH'S\n` +
                                        `│\n` +
                                        `╰─────────────────────────╯`;

                    if (isVideo) {
                        await ctx.sock.sendMessage(
                            from,
                            {
                                video: { url: mediaUrl },
                                caption: partCaption
                            },
                            { quoted: ctx.msg }
                        );
                    } else {
                        await ctx.sock.sendMessage(
                            from,
                            {
                                image: { url: mediaUrl },
                                caption: partCaption
                            },
                            { quoted: ctx.msg }
                        );
                    }
                }

                // Send final caption with original caption
                await ctx.sock.sendMessage(
                    from,
                    {
                        text: `╭─⬡ ✅ *CAROUSEL COMPLETE* ✅ ⬡─╮\n` +
                              `│\n` +
                              `│  📝 Full Caption: ${captionText}\n` +
                              `│  📸 ${mediaList.length} media items\n` +
                              `│  🔗 Powered by ARSLAN TECH'S\n` +
                              `│\n` +
                              `╰─────────────────────────╯`
                    },
                    { quoted: ctx.msg }
                );
            }

            await ctx.react('✅');
            fancyLog('INSTAGRAM', `Downloaded: ${url}`);

        } catch (err) {
            fancyLog('ERROR', 'Instagram download failed: ' + err.message);
            await ctx.react('❌');
            await ctx.sock.sendMessage(
                from,
                {
                    text: '❌ Error: ' + err.message + '\n\nPlease check the URL and try again.'
                },
                { quoted: ctx.msg }
            );
        }
    },

    // ─── .ig (Alias) ───────────────────────────────
    ig: async (ctx) => {
        // Same as .insta
        await module.exports.insta(ctx);
    }
};