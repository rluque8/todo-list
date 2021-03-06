import { IUserLoginDto, IUserRegisterDto } from "../config/dto/users.dto";
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
   * @returns Promise<ResponseDto<any>>
   */
  public login = async (user: IUserLoginDto) => {
    try {
      const users = await this.dbService.query(`SELECT * FROM users WHERE email = $1`, [user.email]);
      // TODO:
    } catch (error) {
      console.log("Error in user service: login");
      console.log(error);
    }
  }

  /**
   * Create new user in the system
   *
   * @param IUserRegisterDto
   * @returns Promise<ResponseDto<any>>
   */
  public register = async (user: IUserRegisterDto) => {
    try {

      // Find in db if user email already exists
      const users = await this.dbService.query("SELECT id FROM users WHERE email = $1", [user.email]);
      // TODO:
      const result = await this.dbService.query(
        "INSERT INTO users(email, name, password) VALUES ($1, $2, $3)",
        [user.email, user.name, user.password],
      );
    } catch (error) {
      console.log("Error in user service: register");
      console.log(error);
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
    }
  }
}

export default UsersService;
