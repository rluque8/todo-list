import { TaskPriority } from "../enumerators/task-priority.enum";
import { TaskStatus } from "../enumerators/task-status.enum";

export interface ITaskCreateDto {
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface ITaskGetAllDto {
  limit: number;
  skip: number;
}

export interface ITaskUpdateStatusDto {
  status: TaskStatus;
}
