import TasksController from "../src/controllers/tasks.controller";
import UsersController from "../src/controllers/users.controller";
import App from "./app";

const port = process.env.PORT || 3000;

const app = new App(
  [
    new UsersController(),
    new TasksController(),
  ],
  port,
);

app.listen();
