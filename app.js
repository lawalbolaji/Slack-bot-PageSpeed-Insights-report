require('dotenv').config();
const { App } = require('@slack/bolt');

// Initialize app in socket mode
const app = new App({
    token: process.env['BOT_USER_TOKEN'],
    signingSecret: process.env['BOT_SIGNING_SECRET'],
    socketMode: true,
    appToken: process.env['SOCKET_MODE_TOKEN'],

    // expose port for possible OAuth
    port: process.env['PORT'] || 3000
});

// listen for messages containing hello
app.message('hello psi', async ({message, say}) => {
    
    await say({
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Hi <@${message.user}>`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": `Click Me`
                    },
                    "action_id": "button_click"
                }
            }
        ],
        text: `Hi <@${message.user}>`
    });
});

app.action("button_click", async ({body, ack, say}) => {

    await ack();
    await say(`<@${body.user.id}> clicked the button`);

});

// run app
(async () => {

    // start app
    await app.start();

    console.log('⚡️ Bolt app is running!');
})();