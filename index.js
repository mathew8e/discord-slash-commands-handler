require("dotenv").config();
const { Client } = require("discord.js");
const fs = require("fs");
const client = new Client();

client.on("ready", () => {
    fs.readdir("./commands/", (error, files) => {
        if (error) return console.log(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let fileProp = require("./commands/" + file);
            // client.api.applications(client.user.id).guilds(GUILD_ID)
            client.api.applications(client.user.id).guilds("770319043587866675").commands.post({
                data: {
                    name: fileProp.help.name,
                    description: fileProp.help.description,
                    options: fileProp.help.options
                }
            });
            client.ws.on("INTERACTION_CREATE", async interaction => {
                const command = interaction.data.name.toLowerCase();
                const args = interaction.data.options;
                if (command == fileProp.help.name.toLowerCase()) fileProp.run(client, interaction, args);
            });
        });
    });
});

client.login(process.env.TOKEN);