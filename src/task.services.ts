import { Task, TaskModel } from "./task.model";

function create(data: Task): Promise<Task> {
  return TaskModel.create(data);
}
async function update(id: string, data: Task): Promise<Task | null> {
  await TaskModel.updateOne({ _id: id }, data);
  return TaskModel.findById(id);
}
function get(data: Task | {}): Promise<Task[] | null> {
  return TaskModel.find(data);
}
async function findById(id: String): Promise<Task | null> {
  return TaskModel.findById(id);
}
async function find(filter: Task): Promise<Task[] | null> {
  return TaskModel.find(filter);
}
async function count(filter: Task): Promise<Number | null> {
  return TaskModel.countDocuments(filter);
}

async function deleteTask(id: string): Promise<Task | null> {
  await TaskModel.updateOne({ _id: id }, { isDeleted: true });
  return null;
}
async function upload(id: string): Promise<null> {
  await TaskModel.updateOne({ id }, { isDeleted: true });
  return null;
}

export default {
  create,
  update,
  get,
  findById,
  count,
  find,
  deleteTask,
  upload,
};
