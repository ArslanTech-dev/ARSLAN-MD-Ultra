// plugins/song.js
// Advance Song Downloader – YouTube Search & Download
// Fancy UI, Accurate Search, MP3 Download
// Roman Urdu – Vertical Format

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const { fancyLog } = require('../utils/logger');

// ─── Temp Directory ────────────────────────────
const TEMP_DIR = path.join(__dirname, '..', 'temp');

if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// ─── Helper: Download YouTube Audio ────────────
async function downloadSong(url, title) {
    return new Promise(async (resolve, reject) => {
        try {
            const fileName = title.replace(/[^a-zA-Z0-9]/g, '_') + '.mp3';
            const filePath = path.join(TEMP_DIR, fileName);

            // Check if file already exists
            if (fs.existsSync(filePath)) {
                return resolve(filePath);
            }

            const stream = ytdl(url, {
                quality: 'highestaudio',
                filter: 'audioonly'
            });

            const writeStream = fs.createWriteStream(filePath);
            stream.pipe(writeStream);

            writeStream.on('finish', function() {
                resolve(filePath);
            });

            writeStream.on('error', function(err) {
                reject(err);
            });

            stream.on('error', function(err) {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }
    });
}

// ─── Helper: Progress Bar ──────────────────────
function progressBar(percent, length = 15) {
    const filled = Math.round((percent / 100) * length);
    const empty = length - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    return bar;
}

// ─── Main Command ──────────────────────────────
module.exports = {
    song: async function(ctx) {
        const query = ctx.args.join(' ');

        if (!query) {
            await ctx.sock.sendMessage(
                ctx.from,
                {
                    text: '❌ Usage: .song <song name>\nExample: .song Shape of You'
                },
                { quoted: ctx.msg }
            );
            return;
        }

        await ctx.react('🎵');
        const from = ctx.from;

        try {
            // ─── Step 1: Search ─────────────────────
            const searchMsg = await ctx.sock.sendMessage(
                from,
                {
                    text: '╭─⬡ 🎵 *SEARCHING* 🎵 ⬡─╮\n' +
                          '│\n' +
                          '│  🔍 Searching for: *' + query + '*\n' +
                          '│  ⏳ Please wait...\n' +
                          '│\n' +
                          '╰─────────────────────────╯'
                },
                { quoted: ctx.msg }
            );

            const searchResults = await yts(query);
            const videos = searchResults.videos;

            if (!videos || videos.length === 0) {
                await ctx.sock.sendMessage(
                    from,
                    {
                        text: '❌ No results found. Try a different query.'
                    },
                    { quoted: ctx.msg }
                );
                await ctx.react('❌');
                return;
            }

            const song = videos[0]; // Best match
            const title = song.title;
            const duration = song.duration;
            const artist = song.author.name;
            const views = song.views;
            const thumbnail = song.thumbnail;

            // ─── Step 2: Download ──────────────────
            await ctx.sock.sendMessage(
                from,
                {
                    text: '╭─⬡ 📥 *DOWNLOADING* 📥 ⬡─╮\n' +
                          '│\n' +
                          '│  🎵 *' + title + '*\n' +
                          '│  🎤 Artist: ' + artist + '\n' +
                          '│  ⏱️ Duration: ' + duration + '\n' +
                          '│  👁️ Views: ' + views.toLocaleString() + '\n' +
                          '│\n' +
                          '│  ⏳ Downloading audio...\n' +
                          '│  [' + progressBar(0) + '] 0%\n' +
                          '│\n' +
                          '╰─────────────────────────╯'
                },
                { quoted: ctx.msg }
            );

            const filePath = await downloadSong(song.url, title);

            // ─── Step 3: Send Audio ────────────────
            const caption = '╭─⬡ 🎶 *SONG READY* 🎶 ⬡─╮\n' +
                            '│\n' +
                            '│  🎵 *' + title + '*\n' +
                            '│  🎤 Artist: ' + artist + '\n' +
                            '│  ⏱️ Duration: ' + duration + '\n' +
                            '│  👁️ Views: ' + views.toLocaleString() + '\n' +
                            '│\n' +
                            '│  📥 Downloaded successfully!\n' +
                            '│\n' +
                            '╰─────────────────────────╯';

            await ctx.sock.sendMessage(
                from,
                {
                    audio: { url: filePath },
                    mimetype: 'audio/mpeg',
                    ptt: false,
                    caption: caption
                },
                { quoted: ctx.msg }
            );

            // ─── Step 4: Cleanup ──────────────────
            fs.unlinkSync(filePath);

            await ctx.react('✅');
            fancyLog('SONG', 'Downloaded: ' + title + ' by ' + artist);

        } catch (err) {
            fancyLog('ERROR', 'Song download failed: ' + err.message);
            await ctx.react('❌');
            await ctx.sock.sendMessage(
                from,
                {
                    text: '❌ Error: ' + err.message + '\n\nPlease try again later.'
                },
                { quoted: ctx.msg }
            );
        }
    }
};