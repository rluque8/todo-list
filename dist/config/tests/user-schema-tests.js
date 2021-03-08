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
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const user_schema_1 = require("../schemas/user.schema");
describe("userSchema register success validation", () => {
    it("should validate without errors the register object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const newUser = {
            email: "roluquec@gmail.com",
            name: "Rodrigo Luque",
            password: "1234567",
        };
        chai_1.expect(validationMiddleware.validateObjectSchema(newUser, user_schema_1.userRegisterSchema)).to.equal(null);
    }));
});
describe("userSchema register error validation missing field", () => {
    it("should require email in register object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const newUser = {
            name: "Rodrigo Luque",
            password: "1234567",
        };
        chai_1.expect(validationMiddleware.validateObjectSchema(newUser, user_schema_1.userRegisterSchema)).to.not.equal(null);
    }));
});
describe("userSchema login success validation", () => {
    it("should validate without errors the login object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const newUser = {
            email: "roluquec@gmail.com",
            password: "1234567",
        };
        chai_1.expect(validationMiddleware.validateObjectSchema(newUser, user_schema_1.userLoginSchema)).to.equal(null);
    }));
});
describe("userSchema login error validation missing field", () => {
    it("should require password in login object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const loginUser = {
            email: "roluquec@gmail.com",
        };
        chai_1.expect(validationMiddleware.validateObjectSchema(loginUser, user_schema_1.userLoginSchema)).to.not.equal(null);
    }));
});
describe("userSchema login error validation data type", () => {
    it("should require password to be a string in login object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const loginUser = {
            email: "roluquec@gmail.com",
            password: 1234567,
        };
        chai_1.expect(validationMiddleware.validateObjectSchema(loginUser, user_schema_1.userLoginSchema)).to.not.equal(null);
    }));
});
describe("userSchema token error validation missing field", () => {
    it("should require token in user token object", () => __awaiter(this, void 0, void 0, function* () {
        const validationMiddleware = new validation_middleware_1.default();
        const newUser = {};
        chai_1.expect(validationMiddleware.validateObjectSchema(newUser, user_schema_1.userTokenSchema)).to.not.equal(null);
    }));
});
//# sourceMappingURL=user-schema-tests.js.map