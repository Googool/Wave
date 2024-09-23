import { ClientEvents } from 'discord.js';
import { ExtendedClient } from '../classes';

interface EventOptions {
  once?: boolean;
  rest?: boolean;
}

export interface Event<K extends keyof ClientEvents = keyof ClientEvents> {
  name: K;
  options?: EventOptions;
  execute: (client: ExtendedClient, ...args: ClientEvents[K]) => Promise<void>;
}
