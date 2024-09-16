import { Event } from '../structures/interfaces';
import { ExtendedClient } from '../structures/classes';
import { ActivityType } from 'discord.js';

const event: Event = {
  name: 'ready',
  options: {
    ONCE: true,
    REST: false,
  },
  execute: async (client: ExtendedClient) => {
    client.user?.setPresence({
      activities: [
        {
          name: 'Sea Shanties',
          type: ActivityType.Listening,
        },
      ],
      status: 'online',
    });
  },
};

export default event;
