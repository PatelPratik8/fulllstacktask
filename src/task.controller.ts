import { Request, Response } from "express";
import { Task } from "./task.model";
import TaskService from "./task.services";
import comResponse from "../helper/response";

async function create(req: Request, res: Response) {
  try {
    const task: Task = {
      title: req.body.title,
      text: req.body.text || "",
    };
    let taskInfo = await TaskService.create(task);
    return comResponse.create(res, taskInfo, "Task Created");
  } catch (error) {
    return comResponse.internalServerError(res, error);
  }
}

async function get(req: Request, res: Response) {
  try {
    let taskInfo = await TaskService.get({ isDeleted: false });
    return comResponse.success(res, taskInfo, "Task list");
  } catch (error) {
    return comResponse.internalServerError(res, error);
  }
}

async function getById(req: Request, res: Response) {
  try {
    let taskInfo = await TaskService.findById(req.params.id);
    return comResponse.success(res, taskInfo, "Task info");
  } catch (error) {
    return comResponse.internalServerError(res, error);
  }
}

async function update(req: Request, res: Response) {
  try {
    const task: Task = {
      title: req.body.title,
      text: req.body.text,
      completed: req.body.completed,
      updatedAt: new Date(),
    };
    let taskInfo = await TaskService.update(req.params.id, task);
    return comResponse.success(res, taskInfo, "Task info");
  } catch (error) {
    return comResponse.internalServerError(res, error);
  }
}

async function deleteTask(req: Request, res: Response) {
  try {
    await TaskService.deleteTask(req.params.id);
    return comResponse.success(res, null, "Task deleted successfully");
  } catch (error) {
    return comResponse.internalServerError(res, error);
  }
}
async function addFile(req: any, res: Response) {
  try {
    const task: Task = {
      file: req.file.path,
    };
    let taskInfo = await TaskService.update(req.body.id, task);
    return comResponse.success(res, taskInfo, "Task info");
  } catch (error) {
    return comResponse.internalServerError(res, error);
  }
}

export default {
  create,
  get,
  getById,
  update,
  deleteTask,
  addFile,
};
