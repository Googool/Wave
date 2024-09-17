import mongoose, { Schema, Document } from 'mongoose';

interface GuildOptions extends Document {
  name: string;
  _id: string;
}

const Guild: Schema = new Schema({
  name: { type: String, required: true },
  _id: { type: String, required: true },
});

export default mongoose.model<GuildOptions>('Guild', Guild);
