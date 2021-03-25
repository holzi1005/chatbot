# chatbot
This is the dialogikTV chatbot

## .env variables
To use this chatbot, you have to copy the .env.sample file to .env and adapt the two values to fit your Twitch account.

## Commands
Create a commands.json file in the home directory with all your commands in json format.
{
    "command": "Text",
}

## Start the bot
To start the chatbot, you need Node on your PC.
Open a terminal and type ```node app.js```
You can also use __pm2__ to run the bot as a background task