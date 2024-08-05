import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IAdmin extends Document {
  adminname: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema: Schema = new Schema({
  adminname: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

AdminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

AdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IAdmin>('Admin', AdminSchema);
