import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionResolvable } from 'discord.js';

interface CommandOptions {
  cooldown?: number /** Not implemented */;
  permissions?: PermissionResolvable[] /** Not implemented */;
}

export interface Command {
  data: SlashCommandBuilder;
  options?: CommandOptions;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
