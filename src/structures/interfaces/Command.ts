import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionResolvable } from 'discord.js';

interface CommandOptions {
  cooldown?: number;
  permissions?: PermissionResolvable[];
}

export interface Command {
  data: SlashCommandBuilder;
  options?: CommandOptions;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
