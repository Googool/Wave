import { Event } from '../structures/interfaces';
import { ExtendedClient } from '../structures/classes';
import { CommandInteraction } from 'discord.js';

const event: Event = {
  name: 'interactionCreate',
  options: {
    ONCE: false,
    REST: false,
  },

  execute: async (interaction: CommandInteraction, client: ExtendedClient) => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};

export default event;
