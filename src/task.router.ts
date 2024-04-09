import { Router, Request, Response } from "express";
import TaskController from "./task.controller";
import upload from "../helper/upload";

const router = Router();

router.post("/", TaskController.create);

router.get("/", TaskController.get);

router.get("/:id", TaskController.getById);

router.patch("/:id", TaskController.update);

router.delete("/:id", TaskController.deleteTask);

router.post("/upload", upload.single("pdf"), TaskController.addFile);

router.get("/download/:id", TaskController.download);

router.post("/import", upload.single("excel"), TaskController.uploadXlsx);


export default router;
