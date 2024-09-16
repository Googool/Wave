import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import { Command, Event } from '../interfaces';
import mongoose from 'mongoose';
import path from 'node:path';
import fs from 'node:fs';

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
    await this.connectDatabase();
    await this.loadCommands();
    await this.loadEvents();
    await this.login(process.env.TOKEN);
  }

  private async loadFiles(dirName: string): Promise<string[]> {
    try {
      const files = await fs.promises.readdir(dirName);
      return files
        .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
        .map((file) => path.join(dirName, file));
    } catch {
      throw new Error(`Error loading files from directory: ${dirName}`);
    }
  }

  private clearCache(modulePath: string): void {
    const resolvedPath = require.resolve(modulePath);
    if (require.cache[resolvedPath]) {
      delete require.cache[resolvedPath];
    }
  }

  private async loadCommands(): Promise<void> {
    const commandFiles = await this.loadFiles(path.resolve(process.cwd(), 'dist/commands'));
    const commandArray: any[] = [];

    for (const file of commandFiles) {
      try {
        const commandPath = path.resolve(file);
        this.clearCache(commandPath);

        const command: Command = (await import(commandPath)).default;
        this.commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      } catch (error) {
        console.error(`Error loading command ${file}: ${error}`);
      }
    }

    this.on('ready', () => {
      if (this.application) {
        this.application.commands.set(commandArray);
      }
    });
  }

  private async loadEvents(): Promise<void> {
    const eventFiles = await this.loadFiles(path.resolve(process.cwd(), 'dist/events'));

    for (const file of eventFiles) {
      try {
        const eventPath = path.resolve(file);
        this.clearCache(eventPath);

        const event: Event = (await import(eventPath)).default;
        const execute = (...args: unknown[]) => event.execute(...args, this);

        if (event.options?.ONCE) {
          this.once(event.name, execute);
        } else {
          this.on(event.name, execute);
        }

        this.events.set(event.name, event);
      } catch (error) {
        console.error(`Error loading event ${file}: ${error}`);
      }
    }
  }

  private async connectDatabase(): Promise<void> {
    try {
      await mongoose.connect(process.env.DATABASE as string);
    } catch (error) {
      console.error('Error connecting to database:', error);
      process.exit(1);
    }
  }
}
