import { Client, Interaction } from 'discord.js';
import { readdirSync } from 'fs';

export default async (client:Client, interaction:Interaction):Promise<void> => {
    if (!interaction.isCommand()) return;
    const commands = readdirSync('./src/commands');
    if (commands.find(cmd => cmd.split('.')[0] === interaction.commandName)) {
        (await import(`../commands/${interaction.commandName}`)).default(client, interaction);
    }
}