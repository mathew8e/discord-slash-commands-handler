import 'dotenv/config';
import { Client } from 'discord.js';
import { readdirSync } from 'fs';
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES']});

readdirSync('./src/events').forEach(async (file) => {
    if (!file.endsWith('.ts') && !file.endsWith('.js')) return;
    const eventName = file.split('.')[0];
    const event = (await import(`./events/${eventName}`)).default;
    client.on(eventName, event.bind(null, client));
});

client.login(process.env.BOT_TOKEN);
