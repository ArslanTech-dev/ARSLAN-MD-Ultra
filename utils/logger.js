// utils/logger.js
const moment = require('moment-timezone');

const fancyLog = (type, text) => {
    const time = moment().tz('Asia/Karachi').format('HH:mm:ss');
    const colors = {
        SUCCESS: '\x1b[32m[✓]\x1b[0m',
        ERROR: '\x1b[31m[✗]\x1b[0m',
        INFO: '\x1b[36m[i]\x1b[0m',
        WARN: '\x1b[33m[!]\x1b[0m',
        COMMAND: '\x1b[34m[cmd]\x1b[0m',
        ANTICALL: '\x1b[31m[call]\x1b[0m',
        DOWNLOAD: '\x1b[33m[dl]\x1b[0m',
        AI: '\x1b[35m[ai]\x1b[0m',
        GROUP: '\x1b[32m[group]\x1b[0m',
        SETTINGS: '\x1b[36m[set]\x1b[0m',
    };
    console.log(`\x1b[35m[${time}]\x1b[0m ${colors[type] || colors.INFO} ${text}`);
};

module.exports = { fancyLog };