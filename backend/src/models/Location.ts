import mongoose, { Schema, Document } from 'mongoose';

interface ILocation {
  timestamp: Date;
  latitude: number;
  longitude: number;
}

export interface IDailyLocation extends Document {
  employeeId: mongoose.Types.ObjectId;
  date: string;
  locations: ILocation[];
}

const LocationSchema: Schema = new Schema({
  timestamp: { type: Date, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
}, { _id: false });

const DailyLocationSchema: Schema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: String, required: true },
  locations: { type: [LocationSchema], default: [] }
});

export default mongoose.model<IDailyLocation>('DailyLocation', DailyLocationSchema);
