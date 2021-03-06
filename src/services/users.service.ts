import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/database";
import { ResponseDto } from "../config/dto/response.dto";
import { IUserLoginDto, IUserRegisterDto } from "../config/dto/users.dto";
import { CREATED_USER, DELETED_USER, DUPLICATED_ERROR_USERS, INTERNAL_SERVER_ERROR_USERS,
        INVALID_PASSWORD, NOT_FOUND_USER } from "../config/messages/messages";
import { IUser } from "../interfaces/user";

class UsersService {

  /**
   * Login user in the system
   *
   * @param IUserLoginDto
   * @returns Promise<ResponseDto<string>>
   */
  public login = async (user: IUserLoginDto) => {
    try {
      const client = await pool.connect();
      // Query to check if the user exists on db or not
      const users = await client.query(`SELECT * FROM users WHERE email = $1`, [user.email]);

      if (!users || users.rows.length === 0) {
        return new ResponseDto<string>(NOT_FOUND_USER, 400, "ERROR");
      }

      const userDb: IUser = users.rows[0];

      // Validate user's typed password with the one stored in db
      const isValid = await bcrypt.compare(user.password, userDb.password);

      if (!isValid) {
        return new ResponseDto<string>(INVALID_PASSWORD, 400, "ERROR");
      }

      // Generate an auth token valid for 1 day
      const token = jwt.sign({ id: user.email }, process.env.SECRET_KEY, { expiresIn: "1d" });

      client.release();

      return new ResponseDto<string>(token);

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
      const client = await pool.connect();
      // Find in db if user email already exists and therefore duplicated
      const users = await client.query("SELECT id FROM users WHERE email = $1", [user.email]);

      if (!users || users.rows.length > 0) {
        return new ResponseDto<string>(DUPLICATED_ERROR_USERS, 400, "ERROR");
      }

      // Hash the plain password to store it in db with 12 salt rounds
      const password = await bcrypt.hash(user.password, 12);

      await client.query(
        "INSERT INTO users(email, name, password) VALUES ($1, $2, $3)",
        [user.email, user.name, password],
      );

      client.release();

      return new ResponseDto<string>(CREATED_USER);

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
      const client = await pool.connect();

      await client.query(
        "DELETE FROM users WHERE id = $1",
        [id],
      );
      client.release();

      return new ResponseDto<string>(DELETED_USER, 500, "ERROR");

    } catch (error) {
      console.log("Error in user service: delete");
      console.log(error);
      return new ResponseDto<string>(INTERNAL_SERVER_ERROR_USERS, 500, "ERROR");
    }
  }
}

export default UsersService;
