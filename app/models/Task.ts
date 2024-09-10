import mongoose, { Schema, Document, model, models } from "mongoose";
export interface ITask extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  status: "To-Do" | "In Progress" | "Under Review" | "Completed";
  priority: "Low" | "Medium" | "Urgent";
}

const TaskSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["To-Do", "In Progress", "Under Review", "Completed"],
      default: "To-Do",
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "Urgent"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = models.Task || model<ITask>("Task", TaskSchema);
export default Task;
