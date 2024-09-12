import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';
import { Command } from '../structures/interfaces';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong! 🏓')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  options: {
    cooldown: 5,
  },

  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply({
      content: `🏓 Pinging...`,
      ephemeral: true,
    });

    // Fetch the initial reply
    const reply = await interaction.fetchReply();
    await interaction.editReply(
      `🏓 Pong! Response time: \`${reply.createdTimestamp - interaction.createdTimestamp}\` ms`,
    );
  },
};

export default command;
