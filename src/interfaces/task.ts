import { TaskPriority } from "../config/enumerators/task-priority.enum";
import { TaskStatus } from "../config/enumerators/task-status.enum";

export interface ITask {
  id: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
}
