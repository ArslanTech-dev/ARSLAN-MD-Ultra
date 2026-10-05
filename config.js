const pairingNumber = String(process.env.PAIRING_NUMBER || '').replace(/\D/g, '');
const publicPairing = String(process.env.PUBLIC_PAIRING ?? 'true').toLowerCase() !== 'false';

module.exports = {
    PREFIX: '.',
    BOT_NAME: 'ARSLAN MD ULTRA',
    BOT_LOGO: process.env.BOT_LOGO || 'assets/IMG-20260805-WA0005.jpg',
    OWNER: pairingNumber ? [`${pairingNumber}@s.whatsapp.net`] : [],
    OWNER_NAME: 'ARSLAN TECH\'S',
    VERSION: '4.0.0',
    PAIRING_NUMBER: pairingNumber,   // supplied through the PAIRING_NUMBER environment variable
    PUBLIC_PAIRING: publicPairing,   // set PUBLIC_PAIRING=false to restore owner-only pairing
    ANTI_CALL: true,
    ANTI_DELETE: false,
    AUTO_BLOCK_CALL: false,
    CALL_MSG: 'Sorry, calls are not accepted. Please DM me.',
};