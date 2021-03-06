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
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_dto_1 = require("../config/dto/response.dto");
const messages_1 = require("../config/messages/messages");
const database_service_1 = __importDefault(require("./database.service"));
class UsersService {
    constructor() {
        /**
         * Login user in the system
         *
         * @param IUserLoginDto
         * @returns Promise<ResponseDto<string>>
         */
        this.login = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.dbService.query(`SELECT * FROM users WHERE email = $1`, [user.email]);
                if (users.length === 0) {
                    return new response_dto_1.ResponseDto(messages_1.NOT_FOUND_USER, 400, "ERROR");
                }
                const userDb = users[0];
                const isValid = yield bcrypt_1.default.compare(user.password, userDb.password);
                if (!isValid) {
                    return new response_dto_1.ResponseDto(messages_1.INVALID_PASSWORD, 400, "ERROR");
                }
                // TODO:
            }
            catch (error) {
                console.log("Error in user service: login");
                console.log(error);
                return new response_dto_1.ResponseDto(messages_1.INTERNAL_SERVER_ERROR_USERS, 500, "ERROR");
            }
        });
        /**
         * Create new user in the system
         *
         * @param IUserRegisterDto
         * @returns Promise<ResponseDto<string>>
         */
        this.register = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Find in db if user email already exists
                const users = yield this.dbService.query("SELECT id FROM users WHERE email = $1", [user.email]);
                if (users.length > 0) {
                    return new response_dto_1.ResponseDto(messages_1.DUPLICATED_ERROR_USERS, 400, "ERROR");
                }
                const password = yield bcrypt_1.default.hash(user.password, 12);
                // TODO:
                const result = yield this.dbService.query("INSERT INTO users(email, name, password) VALUES ($1, $2, $3)", [user.email, user.name, password]);
            }
            catch (error) {
                console.log("Error in user service: register");
                console.log(error);
                return new response_dto_1.ResponseDto(messages_1.INTERNAL_SERVER_ERROR_USERS, 500, "ERROR");
            }
        });
        /**
         * Delete user with corresponding id
         *
         * @param number
         * @returns Promise<ResponseDto<any>>
         */
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO:
                const result = yield this.dbService.query("DELETE * FROM users WHERE id = $1", [id]);
            }
            catch (error) {
                console.log("Error in user service: delete");
                console.log(error);
                return new response_dto_1.ResponseDto(messages_1.INTERNAL_SERVER_ERROR_USERS, 500, "ERROR");
            }
        });
        this.dbService = new database_service_1.default();
    }
}
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map