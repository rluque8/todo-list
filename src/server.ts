import App from "./app";
import TasksController from "./controllers/tasks.controller";
import UsersController from "./controllers/users.controller";

const port = process.env.PORT || 3000;

const app = new App(
  [
    new UsersController(),
    new TasksController(),
  ],
  port,
);

app.listen();
