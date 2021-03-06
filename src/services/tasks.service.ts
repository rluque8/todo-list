import { ResponseDto } from "../config/dto/response.dto";
import { ITaskCreateDto, ITaskGetAllDto, ITaskUpdateStatusDto } from "../config/dto/tasks.dto";
import { INTERNAL_SERVER_ERROR_TASKS } from "../config/messages/messages";
import DatabaseService from "./database.service";

class TasksService {
  private dbService: DatabaseService;

  constructor() {
  }

  /**
   * Create new task in the list
   *
   * @param ITaskCreateDto
   * @returns Promise<ResponseDto<string>>
   */
  public create = async (task: ITaskCreateDto) => {
    try {

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
      // return new ResponseDto<any>(status, message);
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

    } catch (error) {
      console.log("Error in task service: getAll");
      console.log(error);
      return new ResponseDto<string>(INTERNAL_SERVER_ERROR_TASKS, 500, "ERROR");
    }
  }

}

export default TasksService;
