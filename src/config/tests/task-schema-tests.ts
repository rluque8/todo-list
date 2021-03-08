import {expect} from "chai";
import ValidationMiddleware from "../middleware/validation.middleware";
import { taskCreateSchema, taskUpdateStatusSchema } from "../schemas/task.schema";

describe("taskSchema create success validation", () => {
  it("should validate without errors the task object", async () => {
    const validationMiddleware = new ValidationMiddleware();
    const newTask = {
      description: "This is a test task",
      priority: 1,
      status: "PENDING",
    };
    expect(validationMiddleware.validateObjectSchema(newTask, taskCreateSchema)).to.equal(null);
  });
});

describe("taskSchema create error validation priority incorrect", () => {
  it("should require priority to be between 1 and 3 in create task object", async () => {
    const validationMiddleware = new ValidationMiddleware();
    const newTask = {
      description: "This is a test task",
      priority: 5,
      status: "PENDING",
    };
    expect(validationMiddleware.validateObjectSchema(newTask, taskCreateSchema)).to.not.equal(null);
  });
});

describe("taskSchema create error validation missing field", () => {
  it("should require priority in create task object", async () => {
    const validationMiddleware = new ValidationMiddleware();
    const newTask = {
      description: "This is a test task",
      status: "PENDING",
    };
    expect(validationMiddleware.validateObjectSchema(newTask, taskCreateSchema)).to.not.equal(null);
  });
});

describe("taskSchema update status error validation incorrect value in field", () => {
  it("should require status to have a valid value in update task object", async () => {
    const validationMiddleware = new ValidationMiddleware();
    const updateTask = {
      status: "NOT DONE",
    };
    expect(validationMiddleware.validateObjectSchema(updateTask, taskUpdateStatusSchema)).to.not.equal(null);
  });
});

describe("taskSchema update status error validation missing field", () => {
  it("should require status in update task object", async () => {
    const validationMiddleware = new ValidationMiddleware();
    const updateTask = {
    };
    expect(validationMiddleware.validateObjectSchema(updateTask, taskUpdateStatusSchema)).to.not.equal(null);
  });
});

describe("taskSchema update status error validation invalid data type", () => {
  it("should require status to be a string in update task object", async () => {
    const validationMiddleware = new ValidationMiddleware();
    const newTask = {
      status: 2,
    };
    expect(validationMiddleware.validateObjectSchema(newTask, taskUpdateStatusSchema)).to.not.equal(null);
  });
});
