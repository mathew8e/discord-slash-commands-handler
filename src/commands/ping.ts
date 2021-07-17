import { Client, CommandInteraction } from 'discord.js';

export = {
  run: async (client: Client, interaction: CommandInteraction): Promise<void> => {
    await interaction.reply({ content: '🏓', ephemeral: true });
  },
}
