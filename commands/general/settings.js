const fs = require('fs');
const path = require('path');
const isOwnerOrSudo = require('../../lib/isOwner');

function readJsonSafe(filePath, fallback) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
        return fallback;
    }
}

async function settingsCommand(sock, chatId, message) {
    try {
        const senderId = message.key.participant || message.key.remoteJid;
        const isOwner = await isOwnerOrSudo(senderId, sock, chatId);

        if (!message.key.fromMe && !isOwner) {
            return sock.sendMessage(chatId, {
                text: '❌ Owner only command'
            }, { quoted: message });
        }

        const settings = require('../../settings');

        const dataDir = './data';
        const mode = readJsonSafe(`${dataDir}/messageCount.json`, { isPublic: true });
        const autoStatus = readJsonSafe(`${dataDir}/autoStatus.json`, { enabled: false });
        const autoread = readJsonSafe(`${dataDir}/autoread.json`, { enabled: false });
        const autotyping = readJsonSafe(`${dataDir}/autotyping.json`, { enabled: false });
        const pmblocker = readJsonSafe(`${dataDir}/pmblocker.json`, { enabled: false });
        const anticall = readJsonSafe(`${dataDir}/anticall.json`, { enabled: false });

        const text = `
⚙️ *BOT SETTINGS*

🤖 Prefix : ${settings.commandPrefix || '.'}
🌐 Mode   : ${mode.isPublic ? 'Public' : 'Private'}

🔘 Auto Status : ${autoStatus.enabled ? 'ON' : 'OFF'}
👀 Auto Read   : ${autoread.enabled ? 'ON' : 'OFF'}
⌨️ Typing      : ${autotyping.enabled ? 'ON' : 'OFF'}
🚫 PM Blocker  : ${pmblocker.enabled ? 'ON' : 'OFF'}
📞 AntiCall    : ${anticall.enabled ? 'ON' : 'OFF'}

⚡ Bot is running normally
`;

        await sock.sendMessage(chatId, {
            text
        }, { quoted: message });

    } catch (error) {
        console.error(error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to load settings'
        }, { quoted: message });
    }
}

module.exports = settingsCommand;