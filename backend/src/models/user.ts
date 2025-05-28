import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  role: 'vendor' | 'delivery';
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['vendor', 'delivery'] }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User; 