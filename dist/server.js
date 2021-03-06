"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_controller_1 = __importDefault(require("../src/controllers/tasks.controller"));
const users_controller_1 = __importDefault(require("../src/controllers/users.controller"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3000;
const app = new app_1.default([
    new users_controller_1.default(),
    new tasks_controller_1.default(),
], port);
app.listen();
//# sourceMappingURL=server.js.map