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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = __importDefault(require("../config/database/connection"));
const queries_1 = require("../config/database/queries");
const response_dto_1 = require("../config/dto/response.dto");
const messages_1 = require("../config/messages/messages");
class UsersService {
    constructor() {
        this.refreshTokens = {};
        /**
         * Login user in the system
         *
         * @param IUserLoginDto
         * @returns Promise<ResponseDto<IUserLoginResponseDto>>
         */
        this.login = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield connection_1.default.connect();
                // Query to check if the user exists on db or not
                const users = yield client.query(queries_1.QUERY_USER_BY_EMAIL, [user.email]);
                if (!users || users.rows.length === 0) {
                    return new response_dto_1.ResponseDto(messages_1.NOT_FOUND_USER, 400, "ERROR");
                }
                const userDb = users.rows[0];
                // Validate user's typed password with the one stored in db
                const isValid = yield bcrypt_1.default.compare(user.password, userDb.password);
                if (!isValid) {
                    return new response_dto_1.ResponseDto(messages_1.INVALID_PASSWORD, 400, "ERROR");
                }
                // Generate an auth token valid for 1 day and a refresh token
                const token = jsonwebtoken_1.default.sign({ id: userDb.id }, process.env.SECRET_KEY, { expiresIn: "1d" });
                const refreshToken = jsonwebtoken_1.default.sign(user, process.env.REFRESH_SECRET_KEY, {});
                this.refreshTokens[refreshToken] = userDb.id;
                client.release();
                return new response_dto_1.ResponseDto({ id: userDb.id, email: userDb.email, token, refreshToken });
            }
            catch (error) {
                console.log("Error in user service: login");
                console.log(error);
                return new response_dto_1.ResponseDto(messages_1.INTERNAL_SERVER_ERROR_USERS, 500, "ERROR");
            }
        });
        /**
         * Refrsh user authentication token
         *
         * @param IUserTokenDto
         * @returns Promise<ResponseDto<IUserLoginResponseDto>>
         */
        this.refreshToken = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the refresh token exists and corresponds to the same user
                if ((user.refreshToken) && (this.refreshTokens[user.refreshToken] === user.id)) {
                    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1d" });
                    return new response_dto_1.ResponseDto({ token });
                }
                return new response_dto_1.ResponseDto(messages_1.FORBIDDEN_ERROR_USERS, 401, "ERROR");
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
                const client = yield connection_1.default.connect();
                // Find in db if user email already exists and therefore duplicated
                const users = yield client.query(queries_1.QUERY_USER_ID_BY_EMAIL, [user.email]);
                if (!users || users.rows.length > 0) {
                    return new response_dto_1.ResponseDto(messages_1.DUPLICATED_ERROR_USERS, 400, "ERROR");
                }
                // Hash the plain password to store it in db with 12 salt rounds
                const password = yield bcrypt_1.default.hash(user.password, 12);
                yield client.query(queries_1.QUERY_USER_INSERT, [user.email, user.name, password]);
                client.release();
                return new response_dto_1.ResponseDto(messages_1.CREATED_USER);
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
                const client = yield connection_1.default.connect();
                yield client.query(queries_1.QUERY_USER_DELETE, [id]);
                client.release();
                return new response_dto_1.ResponseDto(messages_1.DELETED_USER, 500, "ERROR");
            }
            catch (error) {
                console.log("Error in user service: delete");
                console.log(error);
                return new response_dto_1.ResponseDto(messages_1.INTERNAL_SERVER_ERROR_USERS, 500, "ERROR");
            }
        });
    }
}
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map