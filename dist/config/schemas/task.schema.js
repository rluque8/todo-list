"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.taskCreateSchema = joi_1.default.object().keys({
    description: joi_1.default.string().required().email(),
    priority: joi_1.default.number().min(1).max(3),
    status: joi_1.default.string().optional(),
});
exports.taskGetAllSchema = joi_1.default.object().keys({
    limit: joi_1.default.string(),
    skip: joi_1.default.string(),
});
exports.taskUpdateStatusSchema = joi_1.default.object().keys({
    status: joi_1.default.string().required(),
});
//# sourceMappingURL=task.schema.js.map