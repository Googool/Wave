import { ActivityType } from 'discord.js';
import { Event } from '../structures/interfaces';
import { ExtendedClient } from '../structures/classes';

const event: Event = {
  name: 'ready',
  options: {
    ONCE: true,
    REST: false,
  },

  execute: (client: ExtendedClient) => {
    client.user?.setPresence({
      status: 'online',
      activities: [
        {
          name: 'Sea Shanties!',
          type: ActivityType.Listening, // e.g., "Listening to Sea Shanties!"
        },
      ],
    });
  },
};

export default event;
