const fs = require("fs");
module.exports = (client) => {
	fs.readdir("./src/commands/", (error, files) => {
        if (error) return console.log(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let fileProp = require(`../commands/${file}`);
			// ! USE THIS INSTEAD IF YOU WANT TO ENABLE YOUR COMMANDS GLOBALLY !
            // client.api.applications(client.user.id).commands.post({ ...
            client.api.applications(client.user.id).guilds(process.env.GUILD_ID).commands.post({
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
			console.log(`Loaded command: ${fileProp.help.name}`);
        });
    });
};