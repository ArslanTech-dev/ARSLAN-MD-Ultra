// plugins/psychic.js – Brain Scan, IQ Test, Mind Reader, Future, Aura, etc.
// Roman Urdu mein responses – maza aur entertainment ke liye

const { fancyLog } = require('../utils/logger');

// ─── Helper: Random delay ──────────────
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Helper: Progress bar ──────────────
const progressBar = (percent, length = 20) => {
    const filled = Math.round((percent / 100) * length);
    const empty = length - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
};

// ─── Random name generator ──────────────
const randomName = () => {
    const names = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Omega', 'Sigma', 'Neuron', 'Cortex', 'Synapse', 'Zen'];
    return names[Math.floor(Math.random() * names.length)];
};

// ─── Random adjective ────────────────────
const randomAdj = () => {
    const adj = ['Intelligent', 'Creative', 'Mysterious', 'Powerful', 'Unique', 'Brilliant', 'Strange', 'Gifted'];
    return adj[Math.floor(Math.random() * adj.length)];
};

module.exports = {

    // ─── .brainscan ──────────────────────────────
    'brainscan': async (ctx) => {
        try {
            const user = ctx.mentionedJid[0] ? `@${ctx.mentionedJid[0].split('@')[0]}` : 'Aap';
            await ctx.react('🧠');
            await ctx.sock.sendMessage(ctx.from, {
                text: `🧠 *BRAIN SCAN INITIATED*\n\nTarget: ${user}\n[${progressBar(0)}] 0% Neural scanning...`
            }, { quoted: ctx.msg });
            await sleep(1000);
            await ctx.sock.sendMessage(ctx.from, { text: `[${progressBar(30)}] 30% Analyzing brain waves...` }, { quoted: ctx.msg });
            await sleep(1000);
            await ctx.sock.sendMessage(ctx.from, { text: `[${progressBar(70)}] 70% Mapping neural pathways...` }, { quoted: ctx.msg });
            await sleep(1200);
            
            const brainTypes = [
                '🧠 *Brain Type*: Creative Genius', '🧠 *Brain Type*: Logical Mastermind',
                '🧠 *Brain Type*: Emotional Intelligence', '🧠 *Brain Type*: Strategic Thinker',
                '🧠 *Brain Type*: Deep Thinker', '🧠 *Brain Type*: Visionary Mind',
                '🧠 *Brain Type*: Analytical Brain', '🧠 *Brain Type*: Artistic Soul'
            ];
            const brainPower = Math.floor(Math.random() * 30) + 70;
            const neurons = Math.floor(Math.random() * 20) + 80;
            const speed = Math.floor(Math.random() * 20) + 80;
            
            const result = `
[${progressBar(100)}] 100% SCAN COMPLETE

${brainTypes[Math.floor(Math.random() * brainTypes.length)]}
⚡ *Brain Power*: ${brainPower}%
🧬 *Neuron Activity*: ${neurons}%
🚀 *Processing Speed*: ${speed}%
💡 *IQ Level*: ${Math.floor(Math.random() * 40) + 90}

📊 *Analysis*:
Aap ka dimagh ${randomAdj()} hai. 
${brainPower > 90 ? 'Aap genius level pe ho!' : 'Aap ka dimagh bohot powerful hai!'}

🧠 *Suggestion*: Aap ${Math.random() > 0.5 ? 'chess' : 'poetry'} try karein.`;
            
            await ctx.sock.sendMessage(ctx.from, { text: result, mentions: ctx.mentionedJid }, { quoted: ctx.msg });
            await ctx.react('✅');
        } catch (e) {
            fancyLog('ERROR', `brainscan failed: ${e.message}`);
            await ctx.react('❌');
        }
    },

    // ─── .iqtest ──────────────────────────────────
    'iqtest': async (ctx) => {
        try {
            const user = ctx.mentionedJid[0] ? `@${ctx.mentionedJid[0].split('@')[0]}` : 'Aap';
            await ctx.react('🧪');
            await ctx.sock.sendMessage(ctx.from, { text: `🧪 *IQ TEST IN PROGRESS*\n\nTarget: ${user}\n[${progressBar(0)}] 0% Loading questions...` }, { quoted: ctx.msg });
            await sleep(800);
            await ctx.sock.sendMessage(ctx.from, { text: `[${progressBar(40)}] 40% Solving puzzles...` }, { quoted: ctx.msg });
            await sleep(1000);
            await ctx.sock.sendMessage(ctx.from, { text: `[${progressBar(80)}] 80% Analyzing answers...` }, { quoted: ctx.msg });
            await sleep(1200);
            
            const iq = Math.floor(Math.random() * 50) + 80;
            const categories = ['Logical', 'Creative', 'Mathematical', 'Linguistic', 'Spatial'];
            const top = categories[Math.floor(Math.random() * categories.length)];
            
            let comment = '';
            if (iq >= 130) comment = '🏆 *Aap genius ho! Einstein level!*';
            else if (iq >= 115) comment = '🌟 *Aap bohot smart ho!*';
            else if (iq >= 100) comment = '👍 *Aap average se upar ho!*';
            else if (iq >= 85) comment = '😊 *Aap normal ho, koi baat nahi!*';
            else comment = '😅 *Aap thora practice karein, improve ho sakta hai!*';
            
            const result = `
[${progressBar(100)}] 100% TEST COMPLETE

🎯 *IQ TEST RESULTS* (Simulated)
━━━━━━━━━━━━━━━━━━━━━━━
👤 Target: ${user}
🧠 *IQ Score*: ${iq}
📊 *Category*: ${top} Intelligence
💡 *Strength*: ${Math.random() > 0.5 ? 'Problem Solving' : 'Creativity'}

${comment}

📝 *Advice*: Aap ${top} skills pe focus karein.
`;
            await ctx.sock.sendMessage(ctx.from, { text: result, mentions: ctx.mentionedJid }, { quoted: ctx.msg });
            await ctx.react('✅');
        } catch (e) {
            fancyLog('ERROR', `iqtest failed: ${e.message}`);
            await ctx.react('❌');
        }
    },

    // ─── .mindreader ──────────────────────────────
    'mindreader': async (ctx) => {
        try {
            await ctx.react('🔮');
            await ctx.sock.sendMessage(ctx.from, { text: `🔮 *MIND READING IN PROGRESS*\n\n[${progressBar(0)}] 0% Connecting to your thoughts...` }, { quoted: ctx.msg });
            await sleep(1000);
            await ctx.sock.sendMessage(ctx.from, { text: `[${progressBar(50)}] 50% Reading brain waves...` }, { quoted: ctx.msg });
            await sleep(1200);
            
            const thoughts = [
                '💭 Aap soch rahe ho: "Kya maza ayega yeh bot"',
                '💭 Aap kal ke baare mein soch rahe ho',
                '💭 Aap kuch tasty khane ka soch rahe ho',
                '💭 Aap kisi special person ke baare mein soch rahe ho 😉',
                '💭 Aap kuch creative soch rahe ho',
                '💭 Aap ne aaj kuch important socha tha',
                '💭 Aap relax ho rahe ho',
                '💭 Aap kuch naya seekhna chahte ho'
            ];
            
            const result = `
[${progressBar(100)}] 100% MIND READ COMPLETE

🔮 *MIND READING RESULTS*
━━━━━━━━━━━━━━━━━━━━━━━
${thoughts[Math.floor(Math.random() * thoughts.length)]}

🧠 *Current Mood*: ${['Relaxed', 'Curious', 'Excited', 'Thoughtful', 'Happy', 'Mysterious'][Math.floor(Math.random() * 6)]}

💡 *Hidden Thought*: Aap ${Math.random() > 0.5 ? 'kuch naya try karna chahte ho' : 'kisi purani yaad mein kho gaye ho'}

🤫 Yeh sirf simulation hai, asli mind reading nahi hai! 😄
`;
            await ctx.sock.sendMessage(ctx.from, { text: result }, { quoted: ctx.msg });
            await ctx.react('✅');
        } catch (e) {
            fancyLog('ERROR', `mindreader failed: ${e.message}`);
            await ctx.react('❌');
        }
    },

    // ─── .soulmate ──────────────────────────────────
    'soulmate': async (ctx) => {
        try {
            const name = ctx.args[0] || 'Aap';
            await ctx.react('❤️');
            await ctx.sock.sendMessage(ctx.from, { text: `❤️ *SOULMATE FINDER*\n\nSearching for ${name} ka soulmate...` }, { quoted: ctx.msg });
            await sleep(1500);
            
            const mates = ['Ali', 'Sara', 'Ahmed', 'Fatima', 'Hassan', 'Zara', 'Usman', 'Ayesha', 'Bilal', 'Hira'];
            const mate = mates[Math.floor(Math.random() * mates.length)];
            const compatibility = Math.floor(Math.random() * 40) + 60;
            const stars = '⭐'.repeat(Math.floor(compatibility / 20));
            
            const result = `
❤️ *SOULMATE FOUND!*
━━━━━━━━━━━━━━━━━━━━━━━
👤 *Soulmate Name*: ${mate}
💕 *Compatibility*: ${compatibility}% ${stars}
🎯 *Zodiac Match*: ${['Perfect', 'Great', 'Good', 'Interesting'][Math.floor(Math.random() * 4)]}
🌠 *Star Sign*: ${['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][Math.floor(Math.random() * 12)]}

💬 *Message for ${name}*: 
Aap ka soulmate ${mate} hai. ${compatibility > 80 ? 'Yeh match bohot strong hai!' : 'Good vibes hain, try karein!'}

⚠️ *Disclaimer*: Yeh sirf fun ke liye hai! 😄
`;
            await ctx.sock.sendMessage(ctx.from, { text: result }, { quoted: ctx.msg });
            await ctx.react('✅');
        } catch (e) {
            fancyLog('ERROR', `soulmate failed: ${e.message}`);
            await ctx.react('❌');
        }
    },

    // ─── .future ─────────────────────────────────────
    'future': async (ctx) => {
        try {
            const name = ctx.args[0] || 'Aap';
            await ctx.react('🔮');
            await ctx.sock.sendMessage(ctx.from, { text: `🔮 *FUTURE PREDICTION*\n\n${name} ka future predict ho raha hai...` }, { quoted: ctx.msg });
            await sleep(1800);
            
            const predictions = [
                '🌟 Aap 1 saal mein bohot successful ho gaye!',
                '💼 Aapki career mein bohot growth hogi!',
                '❤️ Aapko koi special person milne wala hai!',
                '💰 Aapki financial condition improve hogi!',
                '🏠 Aap ghar ya car khareed sakte ho!',
                '✈️ Aap koi interesting trip plan karoge!',
                '💡 Aap koi new skill seekhoge jo helpful hogi!',
                '🎯 Aap ka koi bada goal achieve hone wala hai!'
            ];
            
            const date = new Date();
            date.setFullYear(date.getFullYear() + Math.floor(Math.random() * 3) + 1);
            
            const result = `
🔮 *FUTURE PREDICTION FOR ${name}*
━━━━━━━━━━━━━━━━━━━━━━━
📅 *Prediction Date*: ${date.toLocaleDateString()}

${predictions[Math.floor(Math.random() * predictions.length)]}

🌟 *Extra Tip*: ${['Naye logon se milo', 'Apni skills improve karo', 'Risk lene se daro mat', 'Apne instincts pe bharosa karo'][Math.floor(Math.random() * 4)]}

⚠️ *Disclaimer*: Yeh sirf entertainment hai! Aapki future apne haath mein hai. 💪
`;
            await ctx.sock.sendMessage(ctx.from, { text: result }, { quoted: ctx.msg });
            await ctx.react('✅');
        } catch (e) {
            fancyLog('ERROR', `future failed: ${e.message}`);
            await ctx.react('❌');
        }
    },

    // ─── .aura ──────────────────────────────────────
    'aura': async (ctx) => {
        try {
            const user = ctx.mentionedJid[0] ? `@${ctx.mentionedJid[0].split('@')[0]}` : 'Aap';
            await ctx.react('✨');
            await ctx.sock.sendMessage(ctx.from, { text: `✨ *AURA READING*\n\n${user} ki aura scan ho rahi hai...` }, { quoted: ctx.msg });
            await sleep(1500);
            
            const colors = ['🔴 Red', '🟠 Orange', '🟡 Yellow', '🟢 Green', '🔵 Blue', '🟣 Purple', '⚪ White', '🔮 Gold'];
            const meanings = [
                'Passion aur energy', 'Creativity aur joy', 'Intelligence aur optimism',
                'Balance aur harmony', 'Calm aur trust', 'Spiritual aur intuitive',
                'Purity aur truth', 'Success aur power'
            ];
            const idx = Math.floor(Math.random() * colors.length);
            
            const result = `
✨ *AURA READING COMPLETE*
━━━━━━━━━━━━━━━━━━━━━━━
👤 Target: ${user}
🎨 *Aura Color*: ${colors[idx]}
💫 *Meaning*: ${meanings[idx]}
⭐ *Energy Level*: ${['High', 'Medium', 'Intense', 'Calm'][Math.floor(Math.random() * 4)]}

🔮 *Interpretation*: 
Aapki aura ${colors[idx].split(' ')[1]} hai. ${Math.random() > 0.5 ? 'Yeh bohot strong aur positive hai!' : 'Yeh balanced aur stable hai!'}

✨ *Tip*: ${['Meditation karein', 'Nature mein time spend karein', 'Positive logon se milo', 'Apni creativity use karein'][Math.floor(Math.random() * 4)]}
`;
            await ctx.sock.sendMessage(ctx.from, { text: result, mentions: ctx.mentionedJid }, { quoted: ctx.msg });
            await ctx.react('✅');
        } catch (e) {
            fancyLog('ERROR', `aura failed: ${e.message}`);
            await ctx.react('❌');
        }
    },

    // ─── .destiny ────────────────────────────────────
    'destiny': async (ctx) => {
        try {
            await ctx.react('🌟');
            await ctx.sock.sendMessage(ctx.from, { text: `🌟 *DESTINY READING*\n\nAapki destiny calculate ho rahi hai...` }, { quoted: ctx.msg });
            await sleep(1200);
            
            const destinies = [
                '🌟 Aap ek leader banein ge', '🌟 Aap ek creator ho', '🌟 Aap ek healer ho',
                '🌟 Aap ek teacher ho', '🌟 Aap ek innovator ho', '🌟 Aap ek explorer ho',
                '🌟 Aap ek warrior ho', '🌟 Aap ek sage ho'
            ];
            const numbers = Math.floor(Math.random() * 100) + 1;
            
            const result = `
🌟 *DESTINY READING*
━━━━━━━━━━━━━━━━━━━━━━━
🔢 *Destiny Number*: ${numbers}
${destinies[Math.floor(Math.random() * destinies.length)]}

💫 *Life Path*: ${Math.random() > 0.5 ? 'Aap ka life path creativity aur innovation hai' : 'Aap ka life path service aur kindness hai'}

🌠 *Purpose*: ${['Duniya mein kuch naya laana', 'Logon ki madad karna', 'Apni art se inspire karna', 'Knowledge spread karna'][Math.floor(Math.random() * 4)]}

⚡ *Power*: Aap mein ${['leadership', 'creativity', 'empathy', 'intelligence', 'courage'][Math.floor(Math.random() * 5)]} ki bohot ability hai!

🔮 *Destiny Message*: ${['Apna time aayega', 'Trust the process', 'Believe in yourself', 'Keep going'][Math.floor(Math.random() * 4)]}
`;
            await ctx.sock.sendMessage(ctx.from, { text: result }, { quoted: ctx.msg });
            await ctx.react('✅');
        } catch (e) {
            fancyLog('ERROR', `destiny failed: ${e.message}`);
            await ctx.react('❌');
        }
    },

    // ─── .psychic ────────────────────────────────────
    'psychic': async (ctx) => {
        try {
            const question = ctx.args.join(' ') || 'Mera future kya hai?';
            await ctx.react('🔮');
            await ctx.sock.sendMessage(ctx.from, { text: `🔮 *PSYCHIC READING*\n\nQuestion: ${question}\n[${progressBar(0)}] 0% Connecting to universe...` }, { quoted: ctx.msg });
            await sleep(1000);
            await ctx.sock.sendMessage(ctx.from, { text: `[${progressBar(50)}] 50% Reading cosmic energy...` }, { quoted: ctx.msg });
            await sleep(1200);
            
            const answers = [
                '🌟 *Answer*: Yes, definitely!',
                '🌟 *Answer*: No, not right now.',
                '🌟 *Answer*: Maybe, keep trying.',
                '🌟 *Answer*: It is certain.',
                '🌟 *Answer*: Ask again later.',
                '🌟 *Answer*: Good things are coming.',
                '🌟 *Answer*: Trust your instincts.',
                '🌟 *Answer*: The universe has plans for you.',
                '🌟 *Answer*: Yes, but be patient.',
                '🌟 *Answer*: Focus on your goals.'
            ];
            
            const result = `
[${progressBar(100)}] 100% PSYCHIC READING COMPLETE

🔮 *Your Question*: ${question}
━━━━━━━━━━━━━━━━━━━━━━━
${answers[Math.floor(Math.random() * answers.length)]}

💫 *Cosmic Advice*: ${['Meditate', 'Be patient', 'Trust the process', 'Take action', 'Stay positive'][Math.floor(Math.random() * 5)]}

🌈 *Energy*: ${['High', 'Balanced', 'Positive', 'Calm', 'Intense'][Math.floor(Math.random() * 5)]}

⚠️ *Disclaimer*: Fun ke liye hai, real life decisions ke liye nahi! 😊
`;
            await ctx.sock.sendMessage(ctx.from, { text: result }, { quoted: ctx.msg });
            await ctx.react('✅');
        } catch (e) {
            fancyLog('ERROR', `psychic failed: ${e.message}`);
            await ctx.react('❌');
        }
    },

    // ─── .personality ──────────────────────────────────
    'personality': async (ctx) => {
        try {
            const user = ctx.mentionedJid[0] ? `@${ctx.mentionedJid[0].split('@')[0]}` : 'Aap';
            await ctx.react('📊');
            await ctx.sock.sendMessage(ctx.from, { text: `📊 *PERSONALITY ANALYSIS*\n\n${user} ki personality scan ho rahi hai...` }, { quoted: ctx.msg });
            await sleep(1500);
            
            const types = ['INFP', 'ENFP', 'ISTJ', 'ENFJ', 'INTJ', 'ESTP', 'ISFP', 'ENTP'];
            const qualities = ['Creative', 'Analytical', 'Empathetic', 'Adventurous', 'Strategic', 'Kind', 'Ambitious', 'Wise'];
            const careers = ['Artist', 'Scientist', 'Doctor', 'Engineer', 'Writer', 'Entrepreneur', 'Designer', 'Teacher'];
            
            const type = types[Math.floor(Math.random() * types.length)];
            const q1 = qualities[Math.floor(Math.random() * qualities.length)];
            const q2 = qualities[Math.floor(Math.random() * qualities.length)];
            const career = careers[Math.floor(Math.random() * careers.length)];
            
            const result = `
📊 *PERSONALITY ANALYSIS COMPLETE*
━━━━━━━━━━━━━━━━━━━━━━━
👤 Target: ${user}
🔬 *MBTI Type*: ${type}
💪 *Strengths*: ${q1}, ${q2}
🎯 *Ideal Career*: ${career}
🌟 *Energy*: ${['Extrovert', 'Introvert', 'Ambivert'][Math.floor(Math.random() * 3)]}

🔮 *Your Vibe*: ${['Mysterious', 'Friendly', 'Intellectual', 'Artistic', 'Charismatic'][Math.floor(Math.random() * 5)]}

💡 *Tip*: Aap ${q1.toLowerCase()} aur ${q2.toLowerCase()} hain. ${career} field mein aap ka potential hai!

⚠️ *For fun only* – real personality test ke liye professional tools use karein! 😄
`;
            await ctx.sock.sendMessage(ctx.from, { text: result, mentions: ctx.mentionedJid }, { quoted: ctx.msg });
            await ctx.react('✅');
        } catch (e) {
            fancyLog('ERROR', `personality failed: ${e.message}`);
            await ctx.react('❌');
        }
    },

    // ─── .fortuneteller ──────────────────────────────
    'fortuneteller': async (ctx) => {
        try {
            await ctx.react('🔮');
            await ctx.sock.sendMessage(ctx.from, { text: `🔮 *FORTUNE TELLER*\n\nAap ki fortune read ho rahi hai...` }, { quoted: ctx.msg });
            await sleep(2000);
            
            const fortunes = [
                '🍀 Aaj aap ka lucky day hai!',
                '🌟 Kuch unexpected positive hone wala hai!',
                '💰 Aap ko kuch financial gain ho sakta hai!',
                '❤️ Aaj koi special person se baat hogi!',
                '📚 Aaj kuch naya seekhne ko milega!',
                '🎯 Aap ka koi goal achieve ho sakta hai!',
                '😊 Aaj aap ka mood bohot acha rahega!',
                '🤝 Koi aap ki madad karne wala hai!'
            ];
            
            const luckyNum = Math.floor(Math.random() * 100) + 1;
            const luckyColor = ['Red', 'Blue', 'Green', 'Gold', 'Purple', 'Orange'][Math.floor(Math.random() * 6)];
            
            const result = `
🔮 *FORTUNE TELLING COMPLETE*
━━━━━━━━━━━━━━━━━━━━━━━
🍀 *Today's Fortune*: ${fortunes[Math.floor(Math.random() * fortunes.length)]}

🔢 *Lucky Number*: ${luckyNum}
🎨 *Lucky Color*: ${luckyColor}
⭐ *Star Sign*: ${['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][Math.floor(Math.random() * 12)]}

💫 *Cosmic Message*: ${['Trust the journey', 'Stay positive', 'Believe in yourself', 'Good things take time', 'You are on the right path'][Math.floor(Math.random() * 5)]}

⚠️ *Disclaimer*: Yeh sirf entertainment hai! 😄
`;
            await ctx.sock.sendMessage(ctx.from, { text: result }, { quoted: ctx.msg });
            await ctx.react('✅');
        } catch (e) {
            fancyLog('ERROR', `fortuneteller failed: ${e.message}`);
            await ctx.react('❌');
        }
    }
};