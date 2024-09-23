import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { Command } from '../structures/interfaces';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong! 🏓')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  options: {
    // Option for cooldown goes here when implemented.
  },

  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply({ fetchReply: true, ephemeral: true });

    try {
      const reply = await interaction.fetchReply();
      await interaction.editReply({
        content: `🏓 Pong took \`${reply.createdTimestamp - interaction.createdTimestamp}\` ms`,
      });
    } catch (error) {
      console.error('Error with ping command:', error);
      await interaction.editReply({
        content: 'An error occurred while trying to reply.',
      });
    }
  },
};

export default command;
