import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IEmployee extends Document {
  adminId: mongoose.Types.ObjectId;
  name: string;
  mobileNumber: string;
  uniqueId: string;
  password: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const EmployeeSchema: Schema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},{timestamps: true});

EmployeeSchema.methods.comparePassword = function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IEmployee>('Employee', EmployeeSchema);
