import { Client, ClientEvents, GatewayIntentBits, Partials, Collection } from 'discord.js';
import { Command, Event } from '../interfaces';
import path from 'path';
import fs from 'fs/promises';

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

export class ExtendedClient extends Client {
  public commands: Collection<string, Command>;
  public events: Collection<string, Event>;

  constructor() {
    super({
      intents: [Guilds, GuildMembers, GuildMessages],
      partials: [User, Message, GuildMember, ThreadMember],
    });

    this.commands = new Collection();
    this.events = new Collection();
  }

  public async start(): Promise<void> {
    await this.registerModules();
    await super.login();
  }

  private async loadFiles(dirName: string): Promise<string[]> {
    try {
      const files = await fs.readdir(dirName);
      return files
        .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
        .map((file) => path.join(dirName, file));
    } catch {
      throw new Error(`Error loading files from directory: ${dirName}`);
    }
  }

  private async registerModules(): Promise<void> {
    const commandFiles = await this.loadFiles(`${process.cwd()}/dist/commands`);
    for (const file of commandFiles) {
      try {
        const command: Command = (await import(path.resolve(file))).default;
        this.commands.set(command.data.name, command);
      } catch (error) {
        console.error(`Error loading command at ${file}:`, error);
      }
    }

    const eventFiles = await this.loadFiles(`${process.cwd()}/dist/events`);
    for (const file of eventFiles) {
      try {
        const event: Event = (await import(path.resolve(file))).default;
        const execute = (...args: ClientEvents[typeof event.name]) => event.execute(this, ...args);
        this[event.options?.once ? 'once' : 'on'](event.name, execute);
        this.events.set(event.name, event);
      } catch (error) {
        console.error(`Error loading event at ${file}:`, error);
      }
    }
  }
}
