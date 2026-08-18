// plugins/myphone.js
// Get Your Own WhatsApp Number (Real Data)
// No external imports required – uses only built-in modules
// Roman Urdu – Vertical Format

const { fancyLog } = require('../utils/logger');

module.exports = {

    // ─── .myphone ──────────────────────────────────
    myphone: async (ctx) => {
        const from = ctx.from;
        const msg = ctx.msg;

        // ─── Step 1: Extract Sender JID ──────────
        // JID format: 923001234567@s.whatsapp.net or 923001234567:1@s.whatsapp.net
        let senderJid = msg.key.participant || msg.key.remoteJid || from;
        
        // ─── Step 2: Extract Phone Number ────────
        // Remove @s.whatsapp.net and any suffix like :1
        let phoneNumber = senderJid.split('@')[0];
        // Remove any colon and after (e.g., :1)
        phoneNumber = phoneNumber.split(':')[0];

        // ─── Step 3: Format Number ────────────────
        const formattedNumber = phoneNumber.startsWith('92') ? 
            '+92' + phoneNumber.slice(2) : 
            '+' + phoneNumber;

        await ctx.react('📞');

        // ─── Step 4: Send Response ────────────────
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 📞 *YOUR WHATSAPP NUMBER* 📞 ⬡─╮\n' +
                      '│\n' +
                      '│  📱 *Number:* ' + formattedNumber + '\n' +
                      '│  🔢 *Raw JID:* ' + senderJid + '\n' +
                      '│\n' +
                      '│  ✅ This is the REAL number\n' +
                      '│  registered on your WhatsApp.\n' +
                      '│\n' +
                      '│  💡 No external API needed.\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );

        await ctx.react('✅');
        fancyLog('MYPHONE', 'Real number shown: ' + formattedNumber);
    },

    // ─── .myid (Alias) ─────────────────────────────
    myid: async (ctx) => {
        // Show the full JID (for technical users)
        const from = ctx.from;
        const msg = ctx.msg;
        let senderJid = msg.key.participant || msg.key.remoteJid || from;

        await ctx.react('🆔');
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🆔 *YOUR WHATSAPP JID* 🆔 ⬡─╮\n' +
                      '│\n' +
                      '│  🔢 *JID:* ' + senderJid + '\n' +
                      '│\n' +
                      '│  💡 This is your unique ID\n' +
                      '│  in WhatsApp network.\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('MYPHONE', 'JID shown: ' + senderJid);
    }
};