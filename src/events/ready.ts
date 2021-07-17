import { Client } from 'discord.js';

export default async (client: Client): Promise<void> => {
  console.log(`[CLIENT] Authorized as '${client.user?.username}'`);
};
