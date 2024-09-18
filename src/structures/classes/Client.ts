import { Client, ClientEvents, GatewayIntentBits, Partials, Collection } from 'discord.js';
import { Command, Event } from '../interfaces';

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

export class ExtendedClient extends Client {
  public commands: Collection<string, Command>;
  public events: Collection<keyof ClientEvents, Event<keyof ClientEvents>>;

  constructor() {
    super({
      intents: [Guilds, GuildMembers, GuildMessages],
      partials: [User, Message, GuildMember, ThreadMember],
    });

    this.commands = new Collection();
    this.events = new Collection();
  }

  public async start(): Promise<void> {
    await super.login();
  }
}
