import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
