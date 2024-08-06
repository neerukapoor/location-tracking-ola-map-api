import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  adminId: mongoose.Types.ObjectId;
  name: string;
  mobileNumber: string;
  uniqueId: string;
  password: string;
  createdAt: Date;
}

const EmployeeSchema: Schema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},{timestamps: true});

export default mongoose.model<IEmployee>('Employee', EmployeeSchema);
