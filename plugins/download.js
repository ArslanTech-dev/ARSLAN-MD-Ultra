// commands/download.js
// All downloader commands (TikTok, IG, FB, YT, etc.)

module.exports = {
    tiktok: async (ctx) => {
        const url = ctx.args[0];
        if (!url) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .tiktok <url>' });
        await ctx.react('🎵');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *TIKTOK VIDEO* ⬡─╮
│
│ 📥 Downloading video...
│ ⏳ Progress: [████░░░░] 60%
│ 📦 Format: MP4 (No Watermark)
│ 🔗 ${url.slice(0, 30)}...
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
        // Actual download logic would go here (fetch and send)
    },

    tiktok2: async (ctx) => {
        const url = ctx.args[0];
        if (!url) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .tiktok2 <url>' });
        await ctx.react('🎧');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *TIKTOK AUDIO* ⬡─╮
│
│ 🎧 Extracting audio...
│ ⏳ Progress: [██████░░] 80%
│ 📦 Format: MP3 320kbps
│ 🔗 ${url.slice(0,30)}...
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    // ... add all other downloaders (tiktok3, igdl, igdl2, igdl3, fb, ytpost, mediafire, megadl, gitclone, pinterest, ttmp3, igmp3, video, capcut, drama, tsticker, tts)
    // For each, similar structure
};