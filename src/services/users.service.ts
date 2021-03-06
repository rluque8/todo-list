import bcrypt from "bcrypt";
import { ResponseDto } from "../config/dto/response.dto";
import { IUserLoginDto, IUserRegisterDto } from "../config/dto/users.dto";
import { DUPLICATED_ERROR_USERS, INTERNAL_SERVER_ERROR_USERS,
        INVALID_PASSWORD, NOT_FOUND_USER } from "../config/messages/messages";
import { IUser } from "../interfaces/user";
import DatabaseService from "./database.service";

class UsersService {

  private dbService: DatabaseService;

  constructor() {
    this.dbService = new DatabaseService();
  }

  /**
   * Login user in the system
   *
   * @param IUserLoginDto
   * @returns Promise<ResponseDto<string>>
   */
  public login = async (user: IUserLoginDto) => {
    try {
      const users = await this.dbService.query(`SELECT * FROM users WHERE email = $1`, [user.email]);

      if (users.length === 0) {
        return new ResponseDto<string>(NOT_FOUND_USER, 400, "ERROR");
      }

      const userDb: IUser = users[0];

      const isValid = await bcrypt.compare(user.password, userDb.password);
      if (!isValid) {
        return new ResponseDto<string>(INVALID_PASSWORD, 400, "ERROR");
      }
      // TODO:
    } catch (error) {
      console.log("Error in user service: login");
      console.log(error);
      return new ResponseDto<string>(INTERNAL_SERVER_ERROR_USERS, 500, "ERROR");
    }
  }

  /**
   * Create new user in the system
   *
   * @param IUserRegisterDto
   * @returns Promise<ResponseDto<string>>
   */
  public register = async (user: IUserRegisterDto) => {
    try {

      // Find in db if user email already exists
      const users = await this.dbService.query("SELECT id FROM users WHERE email = $1", [user.email]);
      if (users.length > 0) {
        return new ResponseDto<string>(DUPLICATED_ERROR_USERS, 400, "ERROR");
      }

      const password = await bcrypt.hash(user.password, 12);
      // TODO:

      const result = await this.dbService.query(
        "INSERT INTO users(email, name, password) VALUES ($1, $2, $3)",
        [user.email, user.name, password],
      );
    } catch (error) {
      console.log("Error in user service: register");
      console.log(error);
      return new ResponseDto<string>(INTERNAL_SERVER_ERROR_USERS, 500, "ERROR");
    }
  }

  /**
   * Delete user with corresponding id
   *
   * @param number
   * @returns Promise<ResponseDto<any>>
   */
  public delete = async (id: number) => {
    try {
      // TODO:
      const result = await this.dbService.query(
        "DELETE * FROM users WHERE id = $1",
        [id],
      );
    } catch (error) {
      console.log("Error in user service: delete");
      console.log(error);
      return new ResponseDto<string>(INTERNAL_SERVER_ERROR_USERS, 500, "ERROR");
    }
  }
}

export default UsersService;
