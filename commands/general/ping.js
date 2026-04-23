const os = require('os');
const settings = require('../../settings');

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
}

async function pingCommand(sock, chatId, message) {
    try {
        const start = Date.now();

        const sent = await sock.sendMessage(chatId, {
            text: '🏓 ping...'
        }, { quoted: message });

        const ping = Date.now() - start;

        const text = `
⚡ Pong!
🏓 ${ping} ms
⏱ ${formatTime(process.uptime())}
📦 v${settings.version}
🟢 Online
`;

        await sock.sendMessage(chatId, { text }, { quoted: sent });

    } catch (error) {
        console.error(error);
        await sock.sendMessage(chatId, {
            text: '❌ Ping failed'
        }, { quoted: message });
    }
}

module.exports = pingCommand;