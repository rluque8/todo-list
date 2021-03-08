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
const chai_1 = require("chai");
const users_service_1 = __importDefault(require("./../../services/users.service"));
describe("userService", () => {
    it("should create a new user without errors", () => __awaiter(this, void 0, void 0, function* () {
        const userService = new users_service_1.default();
        const newUser = {
            email: "roluquec@gmail.com",
            name: "Rodrigo Luque",
            password: "1234567",
        };
        chai_1.expect((yield userService.register(newUser)).code).to.equal(200);
    }));
});
//# sourceMappingURL=user-service-tests.js.map