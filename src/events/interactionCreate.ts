import { Collection, CommandInteraction } from 'discord.js';
import { Event } from '../structures/interfaces';
import { ExtendedClient } from '../structures/classes';

const event: Event = {
  name: 'interactionCreate',
  options: {
    ONCE: false,
    REST: false,
  },

  execute: async (interaction: CommandInteraction, client: ExtendedClient) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    const { cooldowns } = client;

    // Initialize cooldown tracking for this command if it doesn't exist
    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 0; // Default cooldown in seconds if not specified
    const cooldownAmount = (command.options?.cooldown ?? defaultCooldownDuration) * 1000; // Convert to milliseconds

    if (timestamps?.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id)! + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000); // Discord-style timestamp
        return interaction.reply({
          content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
          ephemeral: true,
        });
      }
    }

    // Set cooldown for the user
    timestamps?.set(interaction.user.id, now);
    setTimeout(() => timestamps?.delete(interaction.user.id), cooldownAmount);

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  },
};

export default event;
