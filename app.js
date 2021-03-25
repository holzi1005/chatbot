const tmi = require('tmi.js');
require("dotenv").config();

const json = require('./commands.json');


const commands = json;

const options = {
    options: {
        debug: false
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: process.env.CHANNEL,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [process.env.CHANNEL]
};

const client = new tmi.client(options);
client.connect();

client.on('connected', function(address, port) {
    console.log("[Connection] " + address + ":" + port);
    client.join(process.env.CHANNEL).then((data) => {
        console.log(`I have successfully joined ${process.env.CHANNEL}`);

        client.on('chat', function(channel, user, message, self) {
            if(self) {
                return;
            }

            if(message.startsWith("!")) {
                if(message === '!commands') {
                    const commandList = '!' + Object.keys(commands).join(" !");
                    const commandText = `Ich bin ein kleiner Chat Bot und reagiere auf folgende Kommandos: ${commandList}`;
                    client.say(process.env.CHANNEL, commandText);
                }
                else {
                    message = message.substring(1);
                    if(commands.hasOwnProperty(message)) {
                        client.say(process.env.CHANNEL, commands[message]);
                    }
                }
            }
        });

    }).catch((err) => {
        console.log(`Error joining channel ${process.env.CHANNEL}`);
        console.log(err);
    });
});
