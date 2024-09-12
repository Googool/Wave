import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import { Command, Event } from '../interfaces';
import { Handler } from './handler';

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

export class ExtendedClient extends Client {
  public commands: Collection<string, Command>;
  public cooldowns: Collection<string, Collection<string, number>>;
  public events: Collection<string, Event>;

  constructor() {
    super({
      intents: [Guilds, GuildMembers, GuildMessages],
      partials: [User, Message, GuildMember, ThreadMember],
    });

    this.commands = new Collection();
    this.cooldowns = new Collection();
    this.events = new Collection();
  }

  public async start(): Promise<void> {
    await this.register();
    await this.login(process.env.TOKEN);
  }

  private async register(): Promise<void> {
    const handler = new Handler(this);

    try {
      await handler.loadCommands();
      console.log('Commands loaded successfully');
    } catch (err) {
      console.error('Failed to load commands:', err);
    }

    try {
      await handler.loadEvents();
      console.log('Events loaded successfully');
    } catch (err) {
      console.error('Failed to load events:', err);
    }
  }
}
