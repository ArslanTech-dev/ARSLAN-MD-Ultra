// pair.js
const { fancyLog } = require('./utils/logger');

async function requestPairingCode(sock, phoneNumber) {
    if (!phoneNumber) {
        fancyLog('ERROR', 'PAIRING_NUMBER not set in config.js');
        return null;
    }
    try {
        // Clean phone number
        const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
        const code = await sock.requestPairingCode(cleanPhone);
        console.log('\n========== PAIRING CODE ==========');
        console.log(`Code: ${code}`);
        console.log('Enter this code on your WhatsApp phone.\n');
        fancyLog('SUCCESS', `Pairing code sent to ${cleanPhone}`);
        return code;
    } catch (err) {
        fancyLog('ERROR', `Pairing failed: ${err.message}`);
        return null;
    }
}

module.exports = { requestPairingCode };