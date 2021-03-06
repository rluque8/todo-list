"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const userLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required(),
});
const userRegisterSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required().email(),
    name: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
module.exports = {
    userLoginSchema,
    userRegisterSchema,
};
//# sourceMappingURL=user.schema.js.map