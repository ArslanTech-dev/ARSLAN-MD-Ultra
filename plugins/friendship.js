// plugins/friendship.js
// Friendship commands for Asad Tech's
// Same attitude, same mindset, but Asad loves every girl, Arslan loves only Saba ❤️

const { fancyLog } = require('../utils/logger');

// ─── Asad's Bio ──────────────────────────────
const asadBio = {
    name: 'Asad Tech\'s',
    fullName: 'Muhammad Asad',
    age: '17',
    city: 'Bahawalpur',
    attitude: 'Same as Arslan 💪',
    mindset: 'Same as Arslan 🧠',
    love: 'Har larki pasand hai 😂',
    weakness: 'Larkiyan 🥰',
    friendship: 'Arslan ka best friend 🤝',
    motto: 'Jo chahiye wo lo, jo nahi wo chhoro 😎'
};

// ─── Asad Facts ──────────────────────────────
const asadFacts = [
    "😄 Asad ko har larki pasand aati hai",
    "🤣 Asad ki nazar har jagah larkiyon pe hai",
    "😂 Asad ne 50+ larkiyon ko 'hi' kaha hai",
    "😅 Asad ko har larki pyari lagti hai",
    "🤭 Asad ka phone contacts se bhara hai",
    "😍 Asad ko larkiyan pasand hain, bas",
    "💀 Asad har larki ko propose karna chahta hai",
    "😎 Asad ka kehna hai: 'Chalo kisi aur ko try karte hain'",
    "😂 Asad ki life ka goal: Sab larkiyon ko impress karna",
    "🤣 Asad ke liye har larki 'the one' hai",
    "😅 Asad ka WhatsApp full of girls",
    "🤭 Asad ko pata nahi kisko choose karna hai",
    "💀 Asad: 'Ek larki nahi, sab larkiyan meri hain'",
    "😂 Asad ki nazar mein duniya ki har larki special hai",
    "😎 Asad ka motto: 'Jitni larkiyan, utni khushiyan'"
];

// ─── Asad vs Arslan ───────────────────────────
const vsLines = [
    "😄 Asad: Har larki pasand ❤️  |  Arslan: Sirf Saba ❤️",
    "😂 Asad: 50 larkiyan  |  Arslan: 1 Saba",
    "😅 Asad: Sab ko 'hi'  |  Arslan: Sirf Saba ko",
    "🤣 Asad: Confused  |  Arslan: Clear (Saba ❤️)",
    "😎 Asad: Flirt king  |  Arslan: Saba king",
    "💀 Asad: Har jagah  |  Arslan: Saba ke saath",
    "😂 Asad: Love doctor  |  Arslan: Love specialist (Saba)",
    "😅 Asad: Sab ko propose  |  Arslan: Saba ko propose",
    "🤭 Asad: Girls' man  |  Arslan: Saba's man"
];

// ─── Bro Code ─────────────────────────────────
const broCode = [
    "🤝 Bhai pehle, baad mein duniya",
    "💪 Ek doosre ka saath dena",
    "😂 Asad ki larkiyan, Arslan ki Saba",
    "😎 Dono ka attitude same, but love different",
    "🔥 Sath mein coding, sath mein chai",
    "💀 Asad ko larkiyan, Arslan ko Saba",
    "🤣 Dono alag, magar dost asli",
    "💪 Bhai log, no matter what"
];

// ─── Asad Quotes ──────────────────────────────
const asadQuotes = [
    "😎 Asad: 'Duniya mein kitni larkiyan hain, aur mein abhi tak kisi ke sath nahi?'",
    "😂 Asad: 'Ek larki mushkil, 50 larkiyan easy'",
    "😅 Asad: 'Mujhe sab pasand hain, bas koi choose karna mushkil hai'",
    "🤣 Asad: 'Har larki meri jan hai, par koi meri jaan nahi'",
    "💀 Asad: 'Life mein goal: Har larki ko impress karna'",
    "😎 Asad: 'Mera phone, meri larkiyan'",
    "😍 Asad: 'Aaj kal ki larkiyan, mujhe sab pasand'",
    "🤭 Asad: 'Arslan ki Saba, meri sab'",
    "😂 Asad: 'Koi mujhe bhi batao kisko choose karna hai'"
];

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

module.exports = {

    /**
     * .asad – Asad's full profile
     */
    asad: async (ctx) => {
        await ctx.react('🤝');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🤝 *ASAD TECH'S* 🤝 ⬡─╮\n│\n│  👤 Name: ${asadBio.fullName}\n│  📛 Nick: ${asadBio.name}\n│  📅 Age: ${asadBio.age}\n│  📍 City: ${asadBio.city}\n│  💪 Attitude: ${asadBio.attitude}\n│  🧠 Mindset: ${asadBio.mindset}\n│  ❤️ Love: ${asadBio.love}\n│  😅 Weakness: ${asadBio.weakness}\n│  🤝 Friendship: ${asadBio.friendship}\n│  💬 Motto: ${asadBio.motto}\n│\n│  👑 BFF of ARSLAN\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('FRIENDSHIP', 'Asad profile shown');
    },

    /**
     * .asadattitude – Asad's attitude
     */
    asadattitude: async (ctx) => {
        await ctx.react('😎');
        const lines = [
            "💪 Asad ka attitude: Arslan jaisa, but larkiyon ke liye soft",
            "😎 Asad kehti hai: 'Jo chahiye lo, jo nahi chhoro'",
            "🔥 Asad ka mindset: Same as Arslan, but love different",
            "💀 Asad: 'Larkiyan meri weakness hain'",
            "😂 Asad: 'Main kisi se kam nahi, bas larkiyon se'"
        ];
        const line = random(lines);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 😎 *ASAD'S ATTITUDE* 😎 ⬡─╮\n│\n│  ${line}\n│\n│  🤝 ARSLAN × ASAD\n│  💪 Same attitude, different love\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💪');
        fancyLog('FRIENDSHIP', 'Asad attitude shown');
    },

    /**
     * .asadfact – Random fact about Asad
     */
    asadfact: async (ctx) => {
        await ctx.react('😂');
        const fact = random(asadFacts);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 😂 *FACT ABOUT ASAD* 😂 ⬡─╮\n│\n│  ${fact}\n│\n│  🤝 ARSLAN × ASAD\n│  💀 Asad's life: Girls, girls, girls\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('🤣');
        fancyLog('FRIENDSHIP', 'Asad fact shown');
    },

    /**
     * .asadvsme – Asad vs Arslan (Love comparison)
     */
    asadvsme: async (ctx) => {
        await ctx.react('⚔️');
        const line = random(vsLines);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ ⚔️ *ASAD VS ARSLAN* ⚔️ ⬡─╮\n│\n│  ${line}\n│\n│  😄 Asad: Har larki ❤️\n│  ❤️ Arslan: Sirf Saba ❤️\n│\n│  🤝 Dono bhai, but love different!\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💀');
        fancyLog('FRIENDSHIP', 'Asad vs Arslan shown');
    },

    /**
     * .brocode – Bro Code rules
     */
    brocode: async (ctx) => {
        await ctx.react('🤝');
        const code = random(broCode);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🤝 *BRO CODE* 🤝 ⬡─╮\n│\n│  📜 ${code}\n│\n│  💪 Arslan × Asad\n│  🔥 Same attitude, same mindset\n│  ❤️ Different love, same friendship\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💪');
        fancyLog('FRIENDSHIP', 'Bro code shown');
    },

    /**
     * .asadquote – Random Asad quote
     */
    asadquote: async (ctx) => {
        await ctx.react('😅');
        const quote = random(asadQuotes);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 😅 *ASAD QUOTE* 😅 ⬡─╮\n│\n│  "${quote}"\n│\n│  😂 Asad Tech's – The Girls Man\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('😂');
        fancyLog('FRIENDSHIP', 'Asad quote shown');
    },

    /**
     * .asadroast – Friendly roast for Asad
     */
    asadroast: async (ctx) => {
        await ctx.react('🔥');
        const roasts = [
            "😂 Asad ko itni larkiyan pasand hain, jab mein Saba ko dekhta hun to Asad ko 50 larkiyan yaad aati hain",
            "🤣 Asad: 'Mujhe sab pasand hain' – sab ka matlab sab larkiyan 😂",
            "💀 Asad ke liye har larki 'the one' hai, phir bhi koi nahi 😅",
            "😅 Asad ki life: Larki, larki, larki, phir Arslan, phir larki",
            "😂 Asad ko agar koi puchay 'kis ko pasand karte ho?' to wo bolta hai 'yes' 😂",
            "🤣 Asad: 'Ek larki nahi, sab larkiyan meri hain' – Asad bhai, choose karo 😭",
            "💀 Asad ka phone contacts: 50% girls, 50% girls ke numbers 😂",
            "😎 Asad kehte hain 'Larkiyan meri weakness hai' – weakness nahi, puri zindagi hai 😭"
        ];
        const roast = random(roasts);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🔥 *ROAST FOR ASAD* 🔥 ⬡─╮\n│\n│  ${roast}\n│\n│  😂 Love you bhai, but facts are facts\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💀');
        fancyLog('FRIENDSHIP', 'Asad roast shown');
    },

    /**
     * .friendzone – Asad ka friendzone status
     */
    friendzone: async (ctx) => {
        await ctx.react('😭');
        const zones = [
            "😭 Asad: 'Mujhe sab pasand hain, par kisi ko main pasand nahi'",
            "😂 Asad ka status: Friendzone king 👑",
            "💀 Asad: 'Main har larki ko propose karta hun, sab friendzone kar deti hain'",
            "😅 Asad ki life: Friendzone se friendzone tak",
            "🤣 Asad: 'Koi mujhe bhi choose karo' – No one 😭",
            "😂 Asad: 'Main hero hun, par hero ko koi nahi chahta'",
            "😎 Asad: 'Larkiyan meri hain, par main kisi ka nahi'"
        ];
        const zone = random(zones);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 😭 *ASAD'S FRIENDZONE* 😭 ⬡─╮\n│\n│  ${zone}\n│\n│  💀 Asad: Girls' man, but no one's man\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('😂');
        fancyLog('FRIENDSHIP', 'Friendzone status shown');
    },

    /**
     * .bromance – Arslan × Asad bromance
     */
    bromance: async (ctx) => {
        await ctx.react('💪');
        const bromances = [
            "💪 Arslan × Asad – Same attitude, same mindset",
            "🔥 Dono bhai, dono king",
            "🤝 Asad larkiyon ka, Arslan Saba ka, dono best friends",
            "💀 Arslan ne Saba ko pa liya, Asad ab bhi search kar raha hai",
            "😂 Arslan: Saba ❤️ | Asad: Koi bhi ❤️",
            "💪 Dono ka bond mazboot, chahe love ho different",
            "🔥 Arslan × Asad – Bhai pehle, baad mein duniya"
        ];
        const bromance = random(bromances);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💪 *BROMANCE* 💪 ⬡─╮\n│\n│  ${bromance}\n│\n│  👑 ARSLAN ❤️ ASAD\n│  🔥 Best friends forever\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('🤝');
        fancyLog('FRIENDSHIP', 'Bromance shown');
    }
};