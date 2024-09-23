import { Interaction } from 'discord.js';
import { Event } from '../structures/interfaces';
import { ExtendedClient } from '../structures/classes';

const event: Event<'interactionCreate'> = {
  name: 'interactionCreate',
  options: {
    once: false,
    rest: false,
  },

  execute: async (client: ExtendedClient, interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};

export default event;
