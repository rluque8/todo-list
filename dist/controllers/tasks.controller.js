"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_service_1 = __importDefault(require("../services/tasks.service"));
class TasksController {
    constructor() {
        this.path = "/tasks";
        this.router = express_1.default.Router();
        this.initRoutes = () => {
            this.router.post(this.path, this.createTask);
            this.router.put(this.path + "/:id", this.updateTask);
            this.router.get(this.path, this.getAllTasks);
        };
        this.createTask = (request, response) => __awaiter(this, void 0, void 0, function* () {
            response.send(yield this.tasksService.create(request.body));
        });
        this.updateTask = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const taskId = parseInt(request.params.id, 10);
            response.send(yield this.tasksService.updateStatus(taskId, request.body));
        });
        this.getAllTasks = (request, response) => __awaiter(this, void 0, void 0, function* () {
            response.send(yield this.tasksService.getAll(request.body));
        });
        this.tasksService = new tasks_service_1.default();
        this.initRoutes();
    }
}
exports.default = TasksController;
//# sourceMappingURL=tasks.controller.js.map