require("dotenv").config();
const { Client } = require("discord.js");
const client = new Client();

client.on("ready", () => {
    ["command", "event"].forEach(handler => require(`./handlers/${handler}`)(client));
});

client.login(process.env.TOKEN);