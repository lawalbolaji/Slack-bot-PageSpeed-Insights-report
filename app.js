require('dotenv').config();
const { App } = require('@slack/bolt');

// configure slack app
const app = new App({
    token: process.env['BOT_USER_TOKEN'],
    signingSecret: process.env['BOT_SIGNING_SECRET']
});

(async () => {

    // start app
    await app.start(process.env['PORT'] || 3000);

    console.log('⚡️ Bolt app is running!');
})();