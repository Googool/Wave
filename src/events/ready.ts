import { ActivityType } from 'discord.js';
import { Event } from '../structures/interfaces';
import { ExtendedClient } from '../structures/classes';

const event: Event<'ready'> = {
  name: 'ready',
  options: {
    once: true,
  },

  execute: async (client: ExtendedClient) => {
    console.log(`Logged in as ${client.user?.tag}`);

    client.user?.setPresence({
      activities: [
        {
          name: 'Sea Shanties 🎷',
          type: ActivityType.Listening,
        },
      ],
      status: 'online',
    });

    const commandArray = client.commands.map((command) => command.data.toJSON());
    await client.application?.commands.set(commandArray);
    console.log('Successfully registered application commands.');
  },
};

export default event;
