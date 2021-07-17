import { Client } from 'discord.js';
import { readdirSync } from 'fs';

export default(client:Client):void => {
    readdirSync('./src/commands').forEach(async (file) => {
        if (!file.endsWith('.ts') && !file.endsWith('.js')) return;
        console.log(`[+] ${file.split('.')[0]} [INTERACTION]`);
        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;
            try {
                (await import(`../commands/${interaction.commandName}`)).run(client, interaction);
            }
            catch {
                // Unknown interaction
            }
        });
    });
}
