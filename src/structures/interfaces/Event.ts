import { ClientEvents } from 'discord.js';

interface EventOptions {
  ONCE?: boolean;
  REST?: boolean;
}

export interface Event<K extends keyof ClientEvents> {
  name: K;
  options?: EventOptions;
  execute: (...args: ClientEvents[K]) => Promise<void> | void;
}
