import { Client } from 'discord.js';
import { readdirSync } from 'fs';

export default(client:Client):void => {
    readdirSync('./src/events').forEach(async (file) => {
        if (!file.endsWith('.ts') && !file.endsWith('.js')) return;
        const eventName = file.split('.')[0];
        // Handle interactions in the interaction handler instead
        if (eventName === 'interactionCreate') return;
        const event = (await import(`../events/${eventName}`)).default;
        client.on(eventName, event.bind(null, client));
        console.log(`[+] ${eventName} [EVENT]`);
    });
}
