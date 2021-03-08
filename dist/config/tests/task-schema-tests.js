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
const chai_1 = require("chai");
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const task_schema_1 = require("../schemas/task.schema");
describe("taskSchema create success validation", () => {
    it("should validate without errors the task object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const newTask = {
            description: "This is a test task",
            priority: 1,
            status: "PENDING",
        };
        chai_1.expect(validationMiddleware.validateObjectSchema(newTask, task_schema_1.taskCreateSchema)).to.equal(null);
    }));
});
describe("taskSchema create error validation priority incorrect", () => {
    it("should require priority to be between 1 and 3 in create task object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const newTask = {
            description: "This is a test task",
            priority: 5,
            status: "PENDING",
        };
        chai_1.expect(validationMiddleware.validateObjectSchema(newTask, task_schema_1.taskCreateSchema)).to.not.equal(null);
    }));
});
describe("taskSchema create error validation missing field", () => {
    it("should require priority in create task object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const newTask = {
            description: "This is a test task",
            status: "PENDING",
        };
        chai_1.expect(validationMiddleware.validateObjectSchema(newTask, task_schema_1.taskCreateSchema)).to.not.equal(null);
    }));
});
describe("taskSchema update status error validation incorrect value in field", () => {
    it("should require status to have a valid value in update task object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const updateTask = {
            status: "NOT DONE",
        };
        chai_1.expect(validationMiddleware.validateObjectSchema(updateTask, task_schema_1.taskUpdateStatusSchema)).to.not.equal(null);
    }));
});
describe("taskSchema update status error validation missing field", () => {
    it("should require status in update task object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const updateTask = {};
        chai_1.expect(validationMiddleware.validateObjectSchema(updateTask, task_schema_1.taskUpdateStatusSchema)).to.not.equal(null);
    }));
});
describe("taskSchema update status error validation invalid data type", () => {
    it("should require status to be a string in update task object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const newTask = {
            status: 2,
        };
        chai_1.expect(validationMiddleware.validateObjectSchema(newTask, task_schema_1.taskUpdateStatusSchema)).to.not.equal(null);
    }));
});
//# sourceMappingURL=task-schema-tests.js.map