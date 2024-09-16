import { Command } from '../structures/interfaces';
import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong! 🏓')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  options: {
    // Option for cooldown goes here when implemented.
  },

  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    try {
      const reply = await interaction.fetchReply();
      const latency = reply.createdTimestamp - interaction.createdTimestamp;

      await interaction.editReply({
        content: `🏓 Pong took \`${latency}\` ms!`,
      });
    } catch (error) {
      console.error('Error with ping command:', error);
      await interaction.editReply({
        content: 'An error occurred while trying to reply with Pong.',
      });
    }
  },
};

export default command;
