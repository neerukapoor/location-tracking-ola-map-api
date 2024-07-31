import mongoose, { Document, Schema } from 'mongoose';

interface ILocation extends Document {
  latitude: number;
  longitude: number;
  timestamp: Date;
  userId: string;
}

const LocationSchema: Schema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});

export default mongoose.model<ILocation>('Location', LocationSchema);
