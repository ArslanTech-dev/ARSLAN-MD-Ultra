const fs = require('fs');
const path = require('path');

function loadBotLogoMedia(source) {
    if (typeof source !== 'string' || !source.trim()) {
        throw new Error('BOT_LOGO must be a local file path or an HTTP(S) URL.');
    }

    const normalizedSource = source.trim();
    if (/^https?:\/\//i.test(normalizedSource)) {
        return { url: normalizedSource };
    }

    const filePath = path.isAbsolute(normalizedSource)
        ? normalizedSource
        : path.resolve(__dirname, '..', normalizedSource);
    const image = fs.readFileSync(filePath);
    if (image.length < 3 || image[0] !== 0xff || image[1] !== 0xd8 || image[2] !== 0xff) {
        throw new Error(`BOT_LOGO is not a valid JPEG image: ${filePath}`);
    }

    return image;
}

module.exports = { loadBotLogoMedia };
