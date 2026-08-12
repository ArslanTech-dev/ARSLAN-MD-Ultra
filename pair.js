// pair.js – Generate pairing code for WhatsApp

const chalk = require('chalk');
const { fancyLog } = require('./utils/logger');

async function requestPairingCode(sock, phoneNumber) {
    if (!phoneNumber) {
        fancyLog('ERROR', 'PAIRING_NUMBER not set in config.js');
        return null;
    }
    try {
        const code = await sock.requestPairingCode(phoneNumber);
        console.log(chalk.yellow('\n========== PAIRING CODE =========='));
        console.log(chalk.green(`Code: ${code}`));
        console.log(chalk.yellow('Enter this code on your WhatsApp phone.\n'));
        fancyLog('SUCCESS', `Pairing code sent to ${phoneNumber}`);
        return code;
    } catch (err) {
        fancyLog('ERROR', `Pairing failed: ${err.message}`);
        return null;
    }
}

module.exports = { requestPairingCode };