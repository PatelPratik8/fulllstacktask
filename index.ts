import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import router from "./src/task.router";
import db from "./helper/db";
import cors from "cors"
const app = express();

dotenv.config({ path: __dirname + "/.env" });

app.use(express.json());

app.use(cors())

app.use("/tasks", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

async function startServer() {
  try {
    const port = process.env.PORT || 3000;
    await db.initialize();
    app.listen(port, () => {
      console.log(`Example app listening on port ${process.env.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}




if (process.env.NODE_ENV !== "test") {
  startServer();
} else {
  module.exports = app;
}
