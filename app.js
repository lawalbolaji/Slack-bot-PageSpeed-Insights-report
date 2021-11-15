require('dotenv').config();
const { App } = require('@slack/bolt');
const psi = require('./api/psi');

// Initialize app in socket mode
const app = new App({
    token: process.env['BOT_USER_TOKEN'],
    signingSecret: process.env['BOT_SIGNING_SECRET'],
    
    // enable socketMode for development
    socketMode: true,
    appToken: process.env['SOCKET_MODE_TOKEN'],

    // expose port for possible OAuth
    port: process.env['PORT'] || 3000
});

app.command('/psi', async ({body, ack, say}) => {
    const url = body.text;
    const userId = body.user_id;

    // acknowledge request
    await ack();

    await say(`<@${userId}> Kindly hold on, your report is being generated...\n`);

    psi.generate_report(url).then(async ({data}) => {
        await say(`<@${userId}> Your report is ready!\n`);
        await say(`Speed Score: ${data.lighthouseResult.categories.performance.score}`);
    });
});

// run app
(async () => {
    // start app
    await app.start();

    console.log('⚡️ Bolt app is running!');
})();