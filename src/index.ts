import 'dotenv/config';
import { Client } from 'discord.js';
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES']});

import('./handlers/event').then(module => module.default(client));
import('./handlers/command').then(module => module.default(client));

client.login(process.env.BOT_TOKEN);
