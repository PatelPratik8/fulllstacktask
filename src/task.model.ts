import { Schema, model, connect } from "mongoose";

interface Task {
  _id?: String;
  title?: string;
  text?: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: Boolean;
  file?:String
}

const taskSchema: Schema = new Schema<Task>({
  title: { type: String, required: false },
  text: { type: String, required: false },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  file: { type: String, required: false },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = model<Task>("Task", taskSchema);

export { TaskModel, Task };
