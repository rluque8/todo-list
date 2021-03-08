import {expect} from "chai";
import ValidationMiddleware from "../middleware/validation.middleware";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schema";

describe("userSchema register success validation", () => {
  it("should validate without errors the register object", async () => {
    const validationMiddleware = new ValidationMiddleware();
    const newUser = {
      email: "roluquec@gmail.com",
      name: "Rodrigo Luque",
      password: "1234567",
    };
    expect(validationMiddleware.validateObjectSchema(newUser, userRegisterSchema)).to.equal(null);
  });
});

describe("userSchema register error validation", () => {
  it("should require email in register object", async () => {
    const validationMiddleware = new ValidationMiddleware();
    const newUser = {
      name: "Rodrigo Luque",
      password: "1234567",
    };
    expect(validationMiddleware.validateObjectSchema(newUser, userRegisterSchema)).to.not.equal(null);
  });
});

describe("userSchema login success validation", () => {
  it("should validate without errors the login object", async () => {
    const validationMiddleware = new ValidationMiddleware();
    const newUser = {
      email: "roluquec@gmail.com",
      password: "1234567",
    };
    expect(validationMiddleware.validateObjectSchema(newUser, userLoginSchema)).to.equal(null);
  });
});

describe("userSchema login error validation", () => {
  it("should require password in login object", async () => {
    const validationMiddleware = new ValidationMiddleware();
    const newUser = {
      email: "roluquec@gmail.com",
    };
    expect(validationMiddleware.validateObjectSchema(newUser, userLoginSchema)).to.not.equal(null);
  });
});
