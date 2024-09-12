import { ExtendedClient } from '../classes';
import { Command, Event } from '../interfaces';
import { loadFiles, clearCache } from '../utils';

export class Handler {
  client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  public async loadCommands(): Promise<void> {
    const commandFiles = await loadFiles(`${process.cwd()}/dist/commands`);
    for (const file of commandFiles) {
      clearCache(file);
      const command: Command = (await import(file)).default;

      if (command && command.data.name) {
        this.client.commands.set(command.data.name, command);
      } else {
        console.error(`Failed to load command from ${file}`);
      }
    }

    this.client.once('ready', async () => {
      if (this.client.application?.commands) {
        await this.client.application.commands.set(this.client.commands.map((cmd) => cmd.data.toJSON()));
        console.log('Commands registered!');
      }
    });
  }

  public async loadEvents(): Promise<void> {
    const eventFiles = await loadFiles(`${process.cwd()}/dist/events`);
    for (const file of eventFiles) {
      clearCache(file);
      const event: Event = (await import(file)).default;

      if (event && event.name) {
        const execute = (...args: any[]) => event.execute(...args, this.client);
        if (event.options?.ONCE) {
          this.client.once(event.name, execute);
        } else {
          this.client.on(event.name, execute);
        }

        this.client.events.set(event.name, event);
      } else {
        console.error(`Failed to load event from ${file}`);
      }
    }
  }
}
