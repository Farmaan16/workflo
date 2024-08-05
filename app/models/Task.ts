import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: string;
  userId: string;
}

const taskSchema: Schema<ITask> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["To-Do", "In Progress", "Under Review", "Completed"],
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default Task;
