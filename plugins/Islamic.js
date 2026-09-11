// plugins/islamic.js
// Islamic Commands – Static Data Only (No API)
// Roman Urdu – Vertical Format
// Powered by ARSLAN TECH'S

const { fancyLog } = require('../utils/logger');

// ─── Helper: Random ──────────────────────────────
function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ─── Quranic Verses (with translation) ──────────
const quranVerses = [
    { arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'اللہ کے نام سے جو بے حد رحم فرمانے والا، نہایت مہربان ہے۔', surah: 'الفاتحہ' },
    { arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: 'تمام تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا رب ہے۔', surah: 'الفاتحہ' },
    { arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translation: 'ہم صرف تیری ہی عبادت کرتے ہیں اور صرف تجھ سے مدد مانگتے ہیں۔', surah: 'الفاتحہ' },
    { arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', translation: 'کہہ دو کہ وہ اللہ ایک ہے۔', surah: 'الاخلاص' },
    { arabic: 'اللَّهُ الصَّمَدُ', translation: 'اللہ بے نیاز ہے۔', surah: 'الاخلاص' },
    { arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', translation: 'نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے۔', surah: 'الاخلاص' },
    { arabic: 'وَلَا تَحْزَنُوا وَأَنْتُمُ الْأَعْلَوْنَ إِنْ كُنْتُمْ مُؤْمِنِينَ', translation: 'اور غم نہ کرو، تم ہی غالب رہو گے اگر تم مومن ہو۔', surah: 'آل عمران' },
    { arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', translation: 'یقیناً مشکل کے ساتھ آسانی ہے۔', surah: 'الشرح' },
    { arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', translation: 'پس یقیناً مشکل کے ساتھ آسانی ہے۔', surah: 'الشرح' },
    { arabic: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ', translation: 'اور میری توفیق اللہ ہی کی طرف سے ہے۔', surah: 'ھود' },
    { arabic: 'رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا', translation: 'اے ہمارے رب! ہمیں گرفت نہ کر اگر ہم بھول جائیں یا غلطی کریں۔', surah: 'البقرہ' },
    { arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا', translation: 'اے ہمارے رب! ہمیں اور ہمارے بھائیوں کو معاف فرما۔', surah: 'الحشر' },
];

// ─── Duas ────────────────────────────────────────
const duas = [
    '🤲 *دعا*: اے اللہ! مجھے اپنی رحمت سے نواز، اور میرے گناہوں کو معاف فرما۔',
    '🤲 *دعا*: اے اللہ! میرے دل کو ایمان سے روشن کر، اور میرے عمل کو صالح بنا۔',
    '🤲 *دعا*: اے اللہ! مجھے دنیا اور آخرت کی بھلائی عطا فرما۔',
    '🤲 *دعا*: اے اللہ! میرے والدین پر رحم فرما، اور انہیں جنت میں جگہ دے۔',
    '🤲 *دعا*: اے اللہ! میرے علم میں اضافہ فرما، اور مجھے سمجھ عطا فرما۔',
    '🤲 *دعا*: اے اللہ! مجھے صبر عطا فرما، اور مجھے ثابت قدم رکھ۔',
    '🤲 *دعا*: اے اللہ! میرے رزق کو وسیع فرما، اور مجھے حلال روزی دے۔',
    '🤲 *دعا*: اے اللہ! مجھے جنت میں داخل فرما، اور جہنم کی آگ سے بچا۔',
    '🤲 *دعا*: اے اللہ! میری اولاد کو نیک اور صالح بنا۔',
    '🤲 *دعا*: اے اللہ! مجھے اپنی محبت اور اپنے رسول کی محبت عطا فرما۔',
    '🤲 *دعا*: اے اللہ! میرے دل کو نرم فرما، اور مجھے غرور سے بچا۔',
    '🤲 *دعا*: اے اللہ! میری موت ایمان کی حالت میں کر۔',
    '🤲 *دعا*: اے اللہ! مجھے ہمیشہ سیدھے راستے پر چلا۔',
];

// ─── Hadiths ──────────────────────────────────────
const hadiths = [
    '📜 *حدیث*: "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں۔" (بخاری)',
    '📜 *حدیث*: "تم میں سے کوئی اس وقت تک مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔" (بخاری)',
    '📜 *حدیث*: "کلمہ طیبہ ایمان کی شاخ ہے، اور حیا ایمان کی ایک شاخ ہے۔" (مسلم)',
    '📜 *حدیث*: "جو شخص اللہ پر اور آخرت کے دن پر ایمان رکھتا ہے، وہ اپنے پڑوسی کو ایذا نہ دے۔" (بخاری)',
    '📜 *حدیث*: "تم میں سب سے بہتر وہ ہے جو اپنے گھر والوں کے لیے بہتر ہو، اور میں اپنے گھر والوں کے لیے سب سے بہتر ہوں۔" (ترمذی)',
    '📜 *حدیث*: "اللہ تعالیٰ رحم کرنے والوں پر رحم کرتا ہے۔" (بخاری)',
    '📜 *حدیث*: "جو شخص کسی مسلمان کی دنیاوی مصیبت دور کرے گا، اللہ اس کی قیامت کی مصیبت دور کرے گا۔" (مسلم)',
    '📜 *حدیث*: "تم میں سے کوئی اس وقت تک مومن نہیں ہو سکتا جب تک میری محبت اس کے والدین اور اولاد سے زیادہ نہ ہو جائے۔" (بخاری)',
    '📜 *حدیث*: "آدمی اپنے دوست کے دین پر ہوتا ہے، اس لیے ہر ایک کو دیکھنا چاہیے کہ وہ کس سے دوستی کرتا ہے۔" (ابو داود)',
    '📜 *حدیث*: "جو شخص اللہ کے لیے کسی سے محبت کرتا ہے اور اللہ کے لیے کسی سے نفرت کرتا ہے، تو اس کا ایمان مکمل ہو گیا۔" (ترمذی)',
];

// ─── Asmaul Husna (99 Names – 20 sample) ──────
const asmaulHusna = [
    { name: 'الرَّحْمَٰنُ', meaning: 'بے حد رحم فرمانے والا' },
    { name: 'الرَّحِيمُ', meaning: 'نہایت مہربان' },
    { name: 'الْمَلِكُ', meaning: 'بادشاہ' },
    { name: 'الْقُدُّوسُ', meaning: 'پاک' },
    { name: 'السَّلَامُ', meaning: 'سلامتی دینے والا' },
    { name: 'الْمُؤْمِنُ', meaning: 'امن دینے والا' },
    { name: 'الْمُهَيْمِنُ', meaning: 'نگہبان' },
    { name: 'الْعَزِيزُ', meaning: 'غالب' },
    { name: 'الْجَبَّارُ', meaning: 'زبردست' },
    { name: 'الْمُتَكَبِّرُ', meaning: 'بزرگ' },
    { name: 'الْخَالِقُ', meaning: 'پیدا کرنے والا' },
    { name: 'الْبَارِئُ', meaning: 'بنانے والا' },
    { name: 'الْمُصَوِّرُ', meaning: 'صورت دینے والا' },
    { name: 'الْغَفَّارُ', meaning: 'بہت معاف کرنے والا' },
    { name: 'الْقَهَّارُ', meaning: 'غلبہ والا' },
    { name: 'الْوَهَّابُ', meaning: 'بہت دینے والا' },
    { name: 'الرَّزَّاقُ', meaning: 'رزق دینے والا' },
    { name: 'الْفَتَّاحُ', meaning: 'کھولنے والا' },
    { name: 'الْعَلِيمُ', meaning: 'سب کچھ جاننے والا' },
    { name: 'الْقَابِضُ', meaning: 'قبض کرنے والا' },
    { name: 'الْبَاسِطُ', meaning: 'پھیلانے والا' },
    { name: 'الْخَافِضُ', meaning: 'پست کرنے والا' },
    { name: 'الرَّافِعُ', meaning: 'بلند کرنے والا' },
    { name: 'الْمُعِزُّ', meaning: 'عزت دینے والا' },
    { name: 'الْمُذِلُّ', meaning: 'ذلیل کرنے والا' },
    { name: 'السَّمِيعُ', meaning: 'سب کچھ سننے والا' },
    { name: 'الْبَصِيرُ', meaning: 'سب کچھ دیکھنے والا' },
    { name: 'الْحَكَمُ', meaning: 'فیصلہ کرنے والا' },
    { name: 'الْعَدْلُ', meaning: 'انصاف کرنے والا' },
    { name: 'اللَّطِيفُ', meaning: 'مہربان' },
];

// ─── Islamic Quotes ──────────────────────────────
const islamicQuotes = [
    '💡 "اللہ تعالیٰ فرماتے ہیں: میں اپنے بندے کے گمان کے مطابق ہوں۔" (حدیث قدسی)',
    '💡 "دنیا مؤمن کی قید ہے اور کافر کی جنت۔" (مسلم)',
    '💡 "جس نے اللہ کی راہ میں ایک دن روزہ رکھا، اللہ اسے جہنم سے 70 سال کی دوری پر کر دے گا۔" (بخاری)',
    '💡 "بہترین صدقہ وہ ہے جو ضرورت مند کو دیا جائے۔" (مسلم)',
    '💡 "تم میں سے بہترین وہ ہے جو قرآن سیکھے اور دوسروں کو سکھائے۔" (بخاری)',
    '💡 "اللہ تعالیٰ ہر چیز سے پاک ہے، اور وہ پاکیزہ چیزوں کو پسند کرتا ہے۔" (مسلم)',
    '💡 "جو شخص اللہ کی راہ میں ایک قدم چلے، اللہ اس کے 70 ہزار قدم اٹھا دیتا ہے۔" (حدیث)',
    '💡 "تم میں سے بہترین وہ ہے جو اپنے اہل و عیال کے ساتھ اچھا سلوک کرے۔" (ترمذی)',
];

// ─── Salah Timings (Static Example – Karachi) ──
const salahTimings = {
    city: 'کراچی',
    date: 'آج کا دن',
    Fajr: '04:30 AM',
    Sunrise: '06:00 AM',
    Dhuhr: '12:30 PM',
    Asr: '04:00 PM',
    Maghrib: '06:45 PM',
    Isha: '08:00 PM',
};

// ─── Surah Info (Static) ─────────────────────────
const surahList = {
    'الفاتحہ': { number: 1, verses: 7, revelation: 'مکی' },
    'البقرہ': { number: 2, verses: 286, revelation: 'مدنی' },
    'آل عمران': { number: 3, verses: 200, revelation: 'مدنی' },
    'النساء': { number: 4, verses: 176, revelation: 'مدنی' },
    'المائدہ': { number: 5, verses: 120, revelation: 'مدنی' },
    'الانعام': { number: 6, verses: 165, revelation: 'مکی' },
    'الاعراف': { number: 7, verses: 206, revelation: 'مکی' },
    'الانفال': { number: 8, verses: 75, revelation: 'مدنی' },
    'التوبہ': { number: 9, verses: 129, revelation: 'مدنی' },
    'یونس': { number: 10, verses: 109, revelation: 'مکی' },
    'ھود': { number: 11, verses: 123, revelation: 'مکی' },
    'یوسف': { number: 12, verses: 111, revelation: 'مکی' },
    'الرعد': { number: 13, verses: 43, revelation: 'مدنی' },
    'ابراہیم': { number: 14, verses: 52, revelation: 'مکی' },
    'الحجر': { number: 15, verses: 99, revelation: 'مکی' },
    'النحل': { number: 16, verses: 128, revelation: 'مکی' },
    'بنی اسرائیل': { number: 17, verses: 111, revelation: 'مکی' },
    'الکہف': { number: 18, verses: 110, revelation: 'مکی' },
    'مریم': { number: 19, verses: 98, revelation: 'مکی' },
    'طٰہٰ': { number: 20, verses: 135, revelation: 'مکی' },
};

// ─── Emojis ──────────────────────────────────────
const islamicEmojis = ['🕌', '☪️', '📿', '🕋', '🤲', '📖', '🕊️', '🌙', '⭐', '💚', '✨', '🕯️'];

module.exports = {

    // ─── .quran ────────────────────────────────────
    quran: async (ctx) => {
        await ctx.react('📖');
        const verse = random(quranVerses);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 📖 *QURANIC VERSE* 📖 ⬡─╮\n` +
                  `│\n` +
                  `│  🕋 Surah: ${verse.surah}\n` +
                  `│  ✨ Arabic: ${verse.arabic}\n` +
                  `│  📝 Translation: ${verse.translation}\n` +
                  `│\n` +
                  `│  ${random(islamicEmojis)}  ${random(islamicEmojis)}  ${random(islamicEmojis)}\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('ISLAMIC', 'Quran verse sent');
    },

    // ─── .dua ──────────────────────────────────────
    dua: async (ctx) => {
        await ctx.react('🤲');
        const dua = random(duas);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🤲 *DUA* 🤲 ⬡─╮\n` +
                  `│\n` +
                  `│  ${dua}\n` +
                  `│\n` +
                  `│  ${random(islamicEmojis)}  ${random(islamicEmojis)}  ${random(islamicEmojis)}\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('ISLAMIC', 'Dua sent');
    },

    // ─── .hadith ────────────────────────────────────
    hadith: async (ctx) => {
        await ctx.react('📜');
        const hadith = random(hadiths);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 📜 *HADITH* 📜 ⬡─╮\n` +
                  `│\n` +
                  `│  ${hadith}\n` +
                  `│\n` +
                  `│  ${random(islamicEmojis)}  ${random(islamicEmojis)}  ${random(islamicEmojis)}\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('ISLAMIC', 'Hadith sent');
    },

    // ─── .asma ──────────────────────────────────────
    asma: async (ctx) => {
        await ctx.react('☪️');
        const name = random(asmaulHusna);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ ☪️ *ASMAUL HUSNA* ☪️ ⬡─╮\n` +
                  `│\n` +
                  `│  🌟 Name: ${name.name}\n` +
                  `│  📝 Meaning: ${name.meaning}\n` +
                  `│  🕋 Allah's 99 Names\n` +
                  `│\n` +
                  `│  ${random(islamicEmojis)}  ${random(islamicEmojis)}  ${random(islamicEmojis)}\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('ISLAMIC', 'Asmaul Husna sent');
    },

    // ─── .islamicquote ──────────────────────────────
    islamicquote: async (ctx) => {
        await ctx.react('💡');
        const quote = random(islamicQuotes);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💡 *ISLAMIC QUOTE* 💡 ⬡─╮\n` +
                  `│\n` +
                  `│  ${quote}\n` +
                  `│\n` +
                  `│  ${random(islamicEmojis)}  ${random(islamicEmojis)}  ${random(islamicEmojis)}\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('ISLAMIC', 'Islamic quote sent');
    },

    // ─── .prayertimes (Static) ─────────────────────
    prayertimes: async (ctx) => {
        await ctx.react('🕌');
        const city = ctx.args.join(' ') || 'کراچی';
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🕌 *PRAYER TIMES* 🕌 ⬡─╮\n` +
                  `│\n` +
                  `│  📍 City: ${city}\n` +
                  `│  📅 Date: ${salahTimings.date}\n` +
                  `│  ─────────────────────\n` +
                  `│  🌅 Fajr: ${salahTimings.Fajr}\n` +
                  `│  ☀️ Sunrise: ${salahTimings.Sunrise}\n` +
                  `│  🌤️ Dhuhr: ${salahTimings.Dhuhr}\n` +
                  `│  🌤️ Asr: ${salahTimings.Asr}\n` +
                  `│  🌅 Maghrib: ${salahTimings.Maghrib}\n` +
                  `│  🌙 Isha: ${salahTimings.Isha}\n` +
                  `│  ─────────────────────\n` +
                  `│  💡 یہ ایک مثالی وقت ہے۔ اصل وقت کے لیے اپنی مسجد سے رجوع کریں۔\n` +
                  `│  ${random(islamicEmojis)}  ${random(islamicEmojis)}  ${random(islamicEmojis)}\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('ISLAMIC', 'Prayer timings shown');
    },

    // ─── .surahinfo (Static) ──────────────────────
    surahinfo: async (ctx) => {
        const surahName = ctx.args.join(' ');
        if (!surahName) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ Usage: .surahinfo <surah name>\nExample: .surahinfo Al-Fatiha'
            }, { quoted: ctx.msg });
        }

        await ctx.react('📖');

        // Find surah by name (Arabic or transliteration)
        let found = null;
        const lowerInput = surahName.toLowerCase();
        for (const [key, value] of Object.entries(surahList)) {
            if (key.toLowerCase().includes(lowerInput) || lowerInput.includes(key.toLowerCase())) {
                found = { name: key, ...value };
                break;
            }
        }

        if (!found) {
            return ctx.sock.sendMessage(ctx.from, {
                text: `❌ Surah "${surahName}" not found. Try using Arabic name (e.g., الفاتحہ)`
            }, { quoted: ctx.msg });
        }

        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 📖 *SURAH INFO* 📖 ⬡─╮\n` +
                  `│\n` +
                  `│  📜 Name: ${found.name}\n` +
                  `│  🔢 Number: ${found.number}\n` +
                  `│  📝 Verses: ${found.verses}\n` +
                  `│  🕋 Revelation: ${found.revelation}\n` +
                  `│\n` +
                  `│  ${random(islamicEmojis)}  ${random(islamicEmojis)}  ${random(islamicEmojis)}\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('ISLAMIC', `Surah info: ${found.name}`);
    },

    // ─── .islamicmenu ──────────────────────────────
    islamicmenu: async (ctx) => {
        await ctx.react('🕌');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🕌 *ISLAMIC COMMANDS* 🕌 ⬡─╮\n` +
                  `│\n` +
                  `│  📖 .quran – Random Quranic verse\n` +
                  `│  🤲 .dua – Random Dua\n` +
                  `│  📜 .hadith – Random Hadith\n` +
                  `│  ☪️ .asma – Random name from Asmaul Husna\n` +
                  `│  💡 .islamicquote – Islamic quote\n` +
                  `│  🕌 .prayertimes – Static prayer timings\n` +
                  `│  📖 .surahinfo <name> – Info about a Surah\n` +
                  `│\n` +
                  `│  ${random(islamicEmojis)}  ${random(islamicEmojis)}  ${random(islamicEmojis)}\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('ISLAMIC', 'Islamic menu shown');
    }
};