export type TaskStatus = "PENDING" | "DONE" | "DROPPED";
export type TaskPriority = 1 | 2 | 3;

export interface ITask {
  id: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  created_at: Date;
}
