const settings = require('../../settings');

async function ownerCommand(sock, chatId) {
    try {
        const ownerNumbers = Array.isArray(settings.ownerNumbers) && settings.ownerNumbers.length
            ? settings.ownerNumbers
            : [settings.ownerNumber];

        const contacts = ownerNumbers.map((number, index) => ({
            vcard: [
                'BEGIN:VCARD',
                'VERSION:3.0',
                `FN:👑 ${settings.botOwner}${ownerNumbers.length > 1 ? ` ${index + 1}` : ''}`,
                `TEL;waid=${number}:${number}`,
                'END:VCARD'
            ].join('\n')
        }));

        const text = `
╭━━━〔 👑 OWNER INFO 〕━━━⬣
┃ 🤖 Bot Owner : ${settings.botOwner}
┃ 📞 Contacts  : ${ownerNumbers.length}
┃ ⚡ Dev     : ᴄʜʀɪs ɢᴀᴀᴊᴜ
┃ 🔐 Role       : System Owner
┃
┃ 💬 Tap below to chat with owner
╰━━━━━━━━━━━━⬣
`;

        await sock.sendMessage(chatId, { text });

        await sock.sendMessage(chatId, {
            contacts: {
                displayName: `👑 ${settings.botOwner}`,
                contacts
            }
        });

    } catch (error) {
        console.error('Owner command error:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Unable to load owner contact at the moment.'
        });
    }
}

module.exports = ownerCommand;