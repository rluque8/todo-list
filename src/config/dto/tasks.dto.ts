import { TaskPriority, TaskStatus } from "../../interfaces/task";

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
