import { Command } from '../structures/interfaces';
import { SlashCommandBuilder, ChatInputCommandInteraction, TextChannel, PermissionFlagsBits } from 'discord.js';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear a specified number of messages! 🧹')
    .addIntegerOption((option) =>
      option.setName('amount').setDescription('Number of messages to delete (1-100)').setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  options: {
    // Option for cooldown goes here when implemented.
  },

  execute: async (interaction: ChatInputCommandInteraction) => {
    const amount = interaction.options.getInteger('amount', true);

    if (!interaction.channel || !(interaction.channel instanceof TextChannel)) {
      return interaction.reply({
        content: 'This command can only be used in text channels.',
        ephemeral: true,
      });
    }

    if (amount < 1 || amount > 100) {
      return interaction.reply({
        content: `Please enter a number between \`1\` and \`100\`.`,
        ephemeral: true,
      });
    }

    await interaction.deferReply({ ephemeral: true });

    try {
      const messages = await interaction.channel.bulkDelete(amount, true);
      await interaction.editReply({
        content: `Successfully deleted \`${messages.size}\` message${messages.size === 1 ? '' : 's'}! 🧹`,
      });
    } catch (error) {
      console.error('Error with clear command:', error);
      await interaction.editReply({
        content: 'An error occurred while trying to delete messages.',
      });
    }
  },
};

export default command;
