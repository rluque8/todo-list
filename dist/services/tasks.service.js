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
const connection_1 = __importDefault(require("../config/database/connection"));
const queries_1 = require("../config/database/queries");
const response_dto_1 = require("../config/dto/response.dto");
const messages_1 = require("../config/messages/messages");
class TasksService {
    constructor() {
        /**
         * Create new task in the list
         *
         * @param ITaskCreateDto
         * @returns Promise<ResponseDto<string>>
         */
        this.create = (task) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield connection_1.default.connect();
                yield client.query(queries_1.QUERY_TASK_INSERT, [task.description, task.status, task.priority, new Date()]);
                client.release();
                return new response_dto_1.ResponseDto(messages_1.CREATED_TASK);
            }
            catch (error) {
                console.log("Error in task service: create");
                console.log(error);
                return new response_dto_1.ResponseDto(messages_1.INTERNAL_SERVER_ERROR_TASKS, 500, "ERROR");
            }
        });
        /**
         * Update the status of a task
         *
         * @param number
         * @param ITaskUpdateStatusDto
         * @returns Promise<ResponseDto<string>>
         */
        this.updateStatus = (id, task) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield connection_1.default.connect();
                yield client.query(queries_1.QUERY_USER_UPDATE_STATUS, [task.status, id]);
                client.release();
                return new response_dto_1.ResponseDto(messages_1.UPDATED_TASK);
            }
            catch (error) {
                console.log("Error in task service: updateStatus");
                console.log(error);
                return new response_dto_1.ResponseDto(messages_1.INTERNAL_SERVER_ERROR_TASKS, 500, "ERROR");
            }
        });
        /**
         * Get all tasks in database
         *
         * @param ITaskGetAllDto
         * @returns Promise<ResponseDto<string>>
         */
        this.getAll = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield connection_1.default.connect();
                const result = yield client.query(queries_1.QUERY_GET_ALL_TASKS, [params.limit, params.skip]);
                client.release();
                return new response_dto_1.ResponseDto(result.rows);
            }
            catch (error) {
                console.log("Error in task service: getAll");
                console.log(error);
                return new response_dto_1.ResponseDto(messages_1.INTERNAL_SERVER_ERROR_TASKS, 500, "ERROR");
            }
        });
    }
}
exports.default = TasksService;
//# sourceMappingURL=tasks.service.js.map