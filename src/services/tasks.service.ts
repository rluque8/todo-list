import pool from "../config/database/connection";
import { ResponseDto } from "../config/dto/response.dto";
import { ITaskCreateDto, ITaskGetAllDto, ITaskUpdateStatusDto } from "../config/dto/tasks.dto";
import { CREATED_TASK, INTERNAL_SERVER_ERROR_TASKS, UPDATED_TASK } from "../config/messages/messages";
import { ITask } from "../interfaces/task";

class TasksService {

  /**
   * Create new task in the list
   *
   * @param ITaskCreateDto
   * @returns Promise<ResponseDto<string>>
   */
  public create = async (task: ITaskCreateDto) => {
    try {
      const client = await pool.connect();

      await client.query(
        "INSERT INTO tasks(description, status, priority, created_at) VALUES ($1, $2, $3, $4)",
        [task.description, task.status, task.priority, new Date()],
      );

      client.release();

      return new ResponseDto<string>(CREATED_TASK);
    } catch (error) {
      console.log("Error in task service: create");
      console.log(error);
      return new ResponseDto<string>(INTERNAL_SERVER_ERROR_TASKS, 500, "ERROR");
    }
  }

  /**
   * Update the status of a task
   *
   * @param number
   * @param ITaskUpdateStatusDto
   * @returns Promise<ResponseDto<string>>
   */
  public updateStatus = async (id: number,  task: ITaskUpdateStatusDto) => {
    try {
      const client = await pool.connect();

      await client.query(
        "UPDATE tasks SET status = $1 WHERE id = $2",
        [task.status, id],
      );

      client.release();

      return new ResponseDto<string>(UPDATED_TASK);

    } catch (error) {
      console.log("Error in task service: updateStatus");
      console.log(error);
      return new ResponseDto<string>(INTERNAL_SERVER_ERROR_TASKS, 500, "ERROR");
    }
  }

  /**
   * Get all tasks in database
   *
   * @param ITaskGetAllDto
   * @returns Promise<ResponseDto<string>>
   */

  public getAll = async (params: ITaskGetAllDto) => {
    try {
      const client = await pool.connect();

      const result = await client.query(
        "SELECT * FROM tasks LIMIT $1 OFFSET $2",
        [params.limit, params.skip],
      );

      client.release();

      return new ResponseDto<ITask[]>(result.rows);
    } catch (error) {
      console.log("Error in task service: getAll");
      console.log(error);
      return new ResponseDto<string>(INTERNAL_SERVER_ERROR_TASKS, 500, "ERROR");
    }
  }

}

export default TasksService;
