"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const taskCreateSchema = joi_1.default.object().keys({
    description: joi_1.default.string().required().email(),
    priority: joi_1.default.number().min(1).max(3),
    status: joi_1.default.string().optional(),
});
const taskGetAllSchema = joi_1.default.object().keys({
    limit: joi_1.default.string(),
    skip: joi_1.default.string(),
});
const taskUpdateStatusSchema = joi_1.default.object().keys({
    status: joi_1.default.string().required(),
});
// const taskUpdatePrioritySchema = Joi.object().keys({
//   status: Joi.string().required(),
// });
// const taskUpdateDescriptionSchema = Joi.object().keys({
//   status: Joi.string().required(),
// });
module.exports = {
    taskCreateSchema,
    taskGetAllSchema,
    taskUpdateStatusSchema,
};
//# sourceMappingURL=task.schema.js.map