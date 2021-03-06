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
const jwt_middleware_1 = __importDefault(require("../config/middleware/jwt.middleware"));
const validation_middleware_1 = __importDefault(require("../config/middleware/validation.middleware"));
const user_schema_1 = require("../config/schemas/user.schema");
const users_service_1 = __importDefault(require("../services/users.service"));
class UsersController {
    constructor() {
        this.path = "/users";
        this.router = express_1.default.Router();
        this.initRoutes = () => {
            this.router.post("", this.validationMiddleware.validateBody(user_schema_1.userRegisterSchema), this.registerUser);
            this.router.post("/login", this.validationMiddleware.validateBody(user_schema_1.userLoginSchema), this.loginUser);
            this.router.delete("/:id", this.jwtMiddleware.validateToken, this.deleteUser);
        };
        this.loginUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            response.send(yield this.usersService.login(request.body));
        });
        this.registerUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            response.send(yield this.usersService.register(request.body));
        });
        this.deleteUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(request.params.id, 10);
            response.send(yield this.usersService.delete(userId));
        });
        this.usersService = new users_service_1.default();
        this.validationMiddleware = new validation_middleware_1.default();
        this.jwtMiddleware = new jwt_middleware_1.default();
        this.initRoutes();
    }
}
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map