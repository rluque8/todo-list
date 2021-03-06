import express from "express";
import JwtMiddleware from "../config/middleware/jwt.middleware";
import ValidationMiddleware from "../config/middleware/validation.middleware";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../config/schemas/user.schema";
import UsersService from "../services/users.service";

class UsersController {
  public path = "/users";
  public router = express.Router();
  private usersService: UsersService;
  private validationMiddleware: ValidationMiddleware;
  private jwtMiddleware: JwtMiddleware;

  constructor() {
    this.usersService = new UsersService();
    this.validationMiddleware = new ValidationMiddleware();
    this.jwtMiddleware = new JwtMiddleware();

    this.initRoutes();
  }

  public initRoutes = () => {
    this.router.post("",
                    this.validationMiddleware.validateBody(userRegisterSchema),
                    this.registerUser);

    this.router.post("/login",
                    this.validationMiddleware.validateBody(userLoginSchema),
                    this.loginUser);

    this.router.delete("/:id",
                      this.jwtMiddleware.validateToken,
                      this.deleteUser);
  }

  public loginUser = async (request: express.Request, response: express.Response) => {
    const resp = await this.usersService.login(request.body);
    return response.status(resp.code).json(resp);
  }

  public registerUser = async (request: express.Request, response: express.Response) => {
    const resp = await this.usersService.register(request.body);
    return response.status(resp.code).json(resp);
  }

  public deleteUser = async (request: express.Request, response: express.Response) => {
    const userId = parseInt(request.params.id, 10);
    const resp = await this.usersService.delete(userId);
    return response.status(resp.code).json(resp);
  }
}

export default UsersController;
