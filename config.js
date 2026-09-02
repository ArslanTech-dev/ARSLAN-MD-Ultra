const pairingNumber = String(process.env.PAIRING_NUMBER || '').replace(/\D/g, '');

module.exports = {
    PREFIX: '.',
    BOT_NAME: 'ARSLAN MD ULTRA',
    BOT_LOGO: 'https://files.catbox.moe/0w1hu5.jpg',
    OWNER: pairingNumber ? [`${pairingNumber}@s.whatsapp.net`] : [],
    OWNER_NAME: 'ARSLAN TECH\'S',
    VERSION: '4.0.0',
    PAIRING_NUMBER: pairingNumber,   // supplied through the PAIRING_NUMBER environment variable
    ANTI_CALL: true,
    ANTI_DELETE: false,
    AUTO_BLOCK_CALL: false,
    CALL_MSG: 'Sorry, calls are not accepted. Please DM me.',
};