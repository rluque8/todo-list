import express from "express";
import JwtMiddleware from "../config/middleware/jwt.middleware";
import ValidationMiddleware from "../config/middleware/validation.middleware";
import {
  taskCreateSchema,
  taskGetAllSchema,
  taskUpdateStatusSchema,
} from "../config/schemas/task.schema";

import TasksService from "../services/tasks.service";

class TasksController {

  public path = "/tasks";
  public router = express.Router();
  private tasksService: TasksService;
  private validationMiddleware: ValidationMiddleware;
  private jwtMiddleware: JwtMiddleware;

  constructor() {
    this.tasksService = new TasksService();
    this.validationMiddleware = new ValidationMiddleware();
    this.jwtMiddleware = new JwtMiddleware();
    this.initRoutes();
  }

  public initRoutes = () => {
    this.router.post("",
                    this.jwtMiddleware.validateToken,
                    this.validationMiddleware.validateBody(taskCreateSchema),
                    this.createTask);

    this.router.put("/:id",
                    this.jwtMiddleware.validateToken,
                    this.validationMiddleware.validateBody(taskUpdateStatusSchema),
                    this.updateTask);

    this.router.get("",
                    this.jwtMiddleware.validateToken,
                    this.validationMiddleware.validateQueryParams(taskGetAllSchema),
                    this.getAllTasks);
  }

  public createTask = async (request: express.Request, response: express.Response) => {
    const resp = await this.tasksService.create(request.body);
    return response.status(resp.code).json(resp);
  }

  public updateTask = async (request: express.Request, response: express.Response) => {
    const taskId = parseInt(request.params.id, 10);
    const resp = await this.tasksService.updateStatus(taskId, request.body);
    return response.status(resp.code).json(resp);
  }

  public getAllTasks = async (request: express.Request, response: express.Response) => {
    const resp = await this.tasksService.getAll(request.body);
    return response.status(resp.code).json(resp);
  }

}

export default TasksController;
