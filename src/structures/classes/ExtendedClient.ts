import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import { Command, Event } from '../interfaces';

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
    await this.login(process.env.TOKEN);
  }
}
