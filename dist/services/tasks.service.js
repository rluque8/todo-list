"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
                // return new ResponseDto<any>(status, message);
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