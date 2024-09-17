import mongoose, { Schema, Document } from 'mongoose';

interface GuildOptions extends Document {
  guildId: string;
}

const Guild: Schema = new Schema({
  guildId: { type: String, required: true, unique: true },
});

export default mongoose.model<GuildOptions>('Guild', Guild);
