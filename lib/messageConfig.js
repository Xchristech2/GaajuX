const settings = require('../settings');

const channelInfo = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: settings.newsletterJid || '120363406588763460@newsletter',
            newsletterName: 'Gaaju X',
            serverMessageId: -1
        }
    }
};

module.exports = {
    channelInfo
};
