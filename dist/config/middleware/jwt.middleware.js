"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_dto_1 = require("../dto/response.dto");
const messages_1 = require("../messages/messages");
class JwtMiddleware {
    constructor() {
        this.validateToken = (req, res, next) => {
            try {
                if (!req.headers.authorization) {
                    const response = new response_dto_1.ResponseDto(messages_1.TOKEN_MISSING_ERROR, 401, "ERROR");
                    res.status(response.code).json(response);
                }
                const token = req.headers.authorization.split("Bearer")[1].trim();
                const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
                // console.log(decodedToken);
                return next();
            }
            catch (error) {
                console.log("Error", error);
                const response = new response_dto_1.ResponseDto((error && error.message) ? error.message : messages_1.GENERAL_FORBIDDEN_ERROR, 401, "ERROR");
                return res.status(response.code).json(response);
            }
        };
    }
}
exports.default = JwtMiddleware;
//# sourceMappingURL=jwt.middleware.js.map