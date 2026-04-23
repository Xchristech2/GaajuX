const settings = require('../../settings');

async function aliveCommand(sock, chatId, message) {
    try {
        const text = `
╔═════『 ⚡ SYSTEM ACTIVE ⚡ 』═════╗
║
║  🤖 ${settings.botName || 'BOT'}
║  ───────────────
║  🧩 Version : ${settings.version || '1.0'}
║  🔹 Prefix  : ${settings.commandPrefix || '.'}
║  📡 Status  : ONLINE
║  💼 Plan    : FREE USER
║
║  🧠 Dev : ᴄʜʀɪs ɢᴀᴀᴊᴜ
║
║  💬 Cmd : ${settings.commandPrefix || '.'}menu
║
╚════════════════════════════════╝
`;

        await sock.sendMessage(chatId, {
            text,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: settings.newsletterJid || '120363423879817556@newsletter',
                    newsletterName: 'Xchristech2',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });

    } catch (error) {
        console.error('Error in alive command:', error);
        await sock.sendMessage(chatId, { 
            text: '⚡ System is active and running!' 
        }, { quoted: message });
    }
}

module.exports = aliveCommand;