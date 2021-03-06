import { ITaskCreateDto, ITaskGetAllDto, ITaskUpdateStatusDto } from "../config/dto/tasks.dto";
import DatabaseService from "./database.service";

class TasksService {
  private dbService: DatabaseService;

  constructor() {
  }

  /**
   * Create new task in the list
   *
   * @param ITaskCreateDto
   * @returns Promise<ResponseDto<any>>
   */
  public create = async (task: ITaskCreateDto) => {
    try {

    } catch (error) {
      console.log("Error in task service: create");
      console.log(error);
    }
  }

  /**
   * Update the status of a task
   *
   * @param number
   * @param ITaskUpdateStatusDto
   * @returns Promise<ResponseDto<any>>
   */
  public updateStatus = async (id: number,  task: ITaskUpdateStatusDto) => {
    try {
      // return new ResponseDto<any>(status, message);
    } catch (error) {
      console.log("Error in task service: updateStatus");
      console.log(error);
    }
  }

  /**
   * Get all tasks in database
   *
   * @param ITaskGetAllDto
   * @returns Promise<ResponseDto<any>>
   */

  public getAll = async (params: ITaskGetAllDto) => {
    try {

    } catch (error) {
      console.log("Error in task service: getAll");
      console.log(error);
    }
  }

}

export default TasksService;
